'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Worker {
  id: string
  name: string
  slug?: string
  category_id?: string
  location?: string
  rating?: number
  image_url?: string
  category?: string
}

interface Props {
  workers: Worker[]
}

export default function PopularWorkersSection({ workers }: Props) {
  const router = useRouter()
  if (!workers || workers.length === 0) return null

  // Split into rows of 3
  const rows: Worker[][] = []
  for (let i = 0; i < workers.length; i += 3) {
    rows.push(workers.slice(i, i + 3))
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Header */}
      <div style={{ padding:'0 16px', marginBottom:'12px' }}>
        <h2 style={{ fontSize:'17px', fontWeight:'700',
          color:'#1E293B', margin:0 }}>Popular Near You</h2>
      </div>

      {/* One WorkerRow per group of 3 */}
      {rows.map((rowWorkers, rowIndex) => (
        <WorkerRow key={rowIndex} workers={rowWorkers} router={router} />
      ))}
    </div>
  )
}

function WorkerRow({ workers, router }: { workers: Worker[], router: any }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setAtStart(scrollLeft <= 4)
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 4)
  }

  useEffect(() => {
    handleScroll()
    const timer = setTimeout(handleScroll, 100)
    window.addEventListener('resize', handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleScroll)
    }
  }, [workers])

  const scrollLeft = () => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const card = container.firstElementChild as HTMLElement
      const scrollAmount = card ? card.clientWidth + 10 : 220
      container.scrollLeft -= scrollAmount
    }
  }
  const scrollRight = () => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const card = container.firstElementChild as HTMLElement
      const scrollAmount = card ? card.clientWidth + 10 : 220
      container.scrollLeft += scrollAmount
    }
  }

  return (
    <div style={{ marginBottom:'16px', padding:'0 16px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>

        {/* LEFT ARROW */}
        {!atStart ? (
          <button onClick={scrollLeft} disabled={atStart}
            style={{
              width:'36px', height:'36px', borderRadius:'50%', flexShrink:0,
              border:'1px solid rgba(255,255,255,0.4)',
              background:'rgba(255,255,255,0.25)',
              backdropFilter:'blur(8px)',
              WebkitBackdropFilter:'blur(8px)',
              cursor: atStart ? 'not-allowed' : 'pointer',
              fontSize:'16px', fontWeight:'bold',
              color: atStart ? '#CBD5E1' : '#2563EB',
              opacity: atStart ? 0.5 : 1,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 2px 8px rgba(0,0,0,0.10)',
              transition:'opacity 0.2s'
            }}>
            ←
          </button>
        ) : null}

        {/* SCROLL AREA with right fade overlay */}
        <div style={{ flex:1, position:'relative', overflow:'hidden' }}>

          {/* Scrollable cards */}
          <div ref={scrollRef} onScroll={handleScroll}
            style={{
              display:'flex', gap:'10px',
              overflowX:'auto', scrollSnapType:'x mandatory',
              scrollBehavior:'smooth',
              WebkitOverflowScrolling:'touch',
              scrollbarWidth:'none', msOverflowStyle:'none',
              paddingBottom:'2px'
            }}>
            {workers.map((worker) => (
              <div key={worker.id} style={{
                minWidth:'78%', scrollSnapAlign:'start', flexShrink:0
              }}>
                <WorkerCard worker={worker} router={router} />
              </div>
            ))}
          </div>

          {/* RIGHT FADE GRADIENT OVERLAY — shows more content hint */}
          {!atEnd && (
            <div style={{
              position:'absolute', top:0, right:0,
              width:'60px', height:'100%', pointerEvents:'none',
              background:'linear-gradient(to right, rgba(248,250,252,0) 0%, rgba(248,250,252,0.85) 60%, rgba(248,250,252,1) 100%)',
              zIndex: 10
            }} />
          )}

          {/* LEFT FADE GRADIENT OVERLAY */}
          {!atStart && (
            <div style={{
              position:'absolute', top:0, left:0,
              width:'30px', height:'100%', pointerEvents:'none',
              background:'linear-gradient(to left, rgba(248,250,252,0) 0%, rgba(248,250,252,0.7) 100%)',
              zIndex: 10
            }} />
          )}

        </div>

        {/* RIGHT ARROW */}
        {!atEnd ? (
          <button onClick={scrollRight}
            style={{
              width:'36px', height:'36px', borderRadius:'50%', flexShrink:0,
              border:'1px solid rgba(255,255,255,0.4)',
              background:'rgba(255,255,255,0.25)',
              backdropFilter:'blur(8px)',
              WebkitBackdropFilter:'blur(8px)',
              cursor: atEnd ? 'not-allowed' : 'pointer',
              fontSize:'16px', fontWeight:'bold',
              color: atEnd ? '#CBD5E1' : '#2563EB',
              opacity: atEnd ? 0.5 : 1,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 2px 8px rgba(0,0,0,0.10)',
              transition:'opacity 0.2s'
            }}>
            →
          </button>
        ) : null}

      </div>
    </div>
  )
}

function WorkerCard({ worker, router }: { worker: Worker, router: any }) {
  const [saved, setSaved] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
      return wishlist.some((w: any) => w.id === worker.id)
    } catch { return false }
  })

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    const isLoggedIn = localStorage.getItem('is_logged_in') === 'true'
    if (!isLoggedIn) {
      localStorage.setItem('redirect_after_login', window.location.pathname)
      window.location.href = '/login'
      return
    }
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
      const servehomeWishlist = JSON.parse(localStorage.getItem('servehome-wishlist') || '[]')
      if (saved) {
        localStorage.setItem('wishlist',
          JSON.stringify(wishlist.filter((w: any) => w.id !== worker.id)))
        localStorage.setItem('servehome-wishlist',
          JSON.stringify(servehomeWishlist.filter((id: any) => id !== worker.id)))
        setSaved(false)
      } else {
        wishlist.push({
          id: worker.id, name: worker.name, slug: worker.slug || '',
          category: worker.category_id || '', location: worker.location || '',
          image_url: worker.image_url || null
        })
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
        if (!servehomeWishlist.includes(worker.id)) {
          servehomeWishlist.push(worker.id)
        }
        localStorage.setItem('servehome-wishlist', JSON.stringify(servehomeWishlist))
        setSaved(true)
      }
    } catch {}
  }

  // To be robust against w.image_url vs w.imageUrl and w.location vs w.area
  const imageUrl = worker.image_url || (worker as any).imageUrl;
  const location = worker.location || (worker as any).area || 'Jagtial';
  const category = worker.category || worker.category_id || 'Worker';
  const rating = worker.rating || 0;

  return (
    <div style={{
      background:'#FFFFFF', borderRadius:'14px', padding:'14px',
      border:'1px solid #E2E8F0', boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
      position:'relative'
    }}>
      {/* Heart icon — top right inside card */}
      <button onClick={toggleWishlist}
        style={{
          position:'absolute', top:'10px', right:'10px',
          background:'none', border:'none', cursor:'pointer',
          fontSize:'22px', lineHeight:1, padding:'4px',
          color: saved ? '#EF4444' : '#CBD5E1'
        }}>
        {saved ? '♥' : '♡'}
      </button>

      {/* Card content */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        {/* Avatar */}
        <div style={{
          width:'48px', height:'48px', borderRadius:'50%',
          background:'#EFF6FF', flexShrink:0, overflow:'hidden',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          {imageUrl ? (
            <img src={imageUrl} alt={worker.name}
              style={{ width:'100%', height:'100%', objectFit:'cover' }}
              loading="lazy" />
          ) : (
            <span style={{ fontSize:'20px' }}>👤</span>
          )}
        </div>

        {/* Info */}
        <div style={{ flex:1, minWidth:0, paddingRight:'24px' }}>
          <p style={{ margin:'0 0 2px', fontWeight:'600', fontSize:'14px',
            color:'#1E293B', whiteSpace:'nowrap',
            overflow:'hidden', textOverflow:'ellipsis' }}>
            {worker.name}
          </p>
          
          <div style={{ display:'flex', alignItems:'center', gap:'4px', margin:'0 0 6px', flexWrap:'wrap' }}>
            <span style={{
              fontSize:'10px', fontWeight:'600', background:'#EFF6FF', color:'#1E40AF',
              padding:'1px 5px', borderRadius:'4px', whiteSpace:'nowrap'
            }}>
              {category}
            </span>
            <p style={{ margin:0, fontSize:'11px', color:'#6B7280',
              whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              📍 {location}
            </p>
          </div>

          {rating > 0 && (
            <p style={{ margin:0, fontSize:'11px', color:'#F59E0B', fontWeight:'600' }}>
              ★ {rating}
            </p>
          )}
        </div>
      </div>

      {/* View Profile button — full width below */}
      <button onClick={() => router.push(`/worker/${worker.id || worker.slug}`)}
        style={{
          marginTop:'10px', width:'100%', background:'#2563EB',
          color:'#FFFFFF', border:'none', borderRadius:'8px',
          padding:'8px', fontSize:'13px', fontWeight:'600', cursor:'pointer'
        }}>
        View Profile
      </button>
    </div>
  )
}
