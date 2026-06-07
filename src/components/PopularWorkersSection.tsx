'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SafeImage } from '@/components/ui/safe-image'

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
    if (!scrollRef.current) return
    const start = scrollRef.current.scrollLeft
    const target = start - 230
    const duration = 400
    const startTime = performance.now()
    const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      scrollRef.current!.scrollLeft = start + (target - start) * ease(progress)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  const scrollRight = () => {
    if (!scrollRef.current) return
    const start = scrollRef.current.scrollLeft
    const target = start + 230
    const duration = 400
    const startTime = performance.now()
    const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      scrollRef.current!.scrollLeft = start + (target - start) * ease(progress)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  return (
    <div style={{ marginBottom:'16px', padding:'0 16px' }}>
      <div style={{ position:'relative' }}>

        {/* Scrollable cards — full width */}
        <div ref={scrollRef} onScroll={handleScroll}
          style={{
            display:'flex', gap:'10px',
            overflowX:'auto',
            WebkitOverflowScrolling:'touch',
            scrollbarWidth:'none', msOverflowStyle:'none',
            paddingBottom:'2px'
          }}>
          {workers.map((worker) => (
            <div key={worker.id} style={{
              minWidth:'72%', flexShrink:0
            }}>
              <WorkerCard worker={worker} router={router} />
            </div>
          ))}
        </div>

        {/* LEFT ARROW — overlaid on left edge, only when not at start */}
        {!atStart && (
          <button onClick={scrollLeft}
            style={{
              position:'absolute', left:'4px',
              top:'50%', transform:'translateY(-50%)',
              width:'32px', height:'32px', borderRadius:'50%',
              border:'1px solid rgba(255,255,255,0.5)',
              background:'rgba(255,255,255,0.35)',
              backdropFilter:'blur(10px)',
              WebkitBackdropFilter:'blur(10px)',
              cursor:'pointer', fontSize:'15px', fontWeight:'bold',
              color:'#2563EB', zIndex:10,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 2px 8px rgba(0,0,0,0.12)'
            }}>
            ←
          </button>
        )}

        {/* RIGHT ARROW — overlaid on right edge, only when not at end */}
        {!atEnd && (
          <button onClick={scrollRight}
            style={{
              position:'absolute', right:'4px',
              top:'50%', transform:'translateY(-50%)',
              width:'32px', height:'32px', borderRadius:'50%',
              border:'1px solid rgba(255,255,255,0.5)',
              background:'rgba(255,255,255,0.35)',
              backdropFilter:'blur(10px)',
              WebkitBackdropFilter:'blur(10px)',
              cursor:'pointer', fontSize:'15px', fontWeight:'bold',
              color:'#2563EB', zIndex:10,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 2px 8px rgba(0,0,0,0.12)'
            }}>
            →
          </button>
        )}

        {/* RIGHT FADE GRADIENT */}
        {!atEnd && (
          <div style={{
            position:'absolute', top:0, right:0,
            width:'60px', height:'100%', pointerEvents:'none',
            background:'linear-gradient(to right, rgba(248,250,252,0) 0%, rgba(248,250,252,0.85) 60%, rgba(248,250,252,1) 100%)'
          }} />
        )}

        {/* LEFT FADE GRADIENT */}
        {!atStart && (
          <div style={{
            position:'absolute', top:0, left:0,
            width:'30px', height:'100%', pointerEvents:'none',
            background:'linear-gradient(to left, rgba(248,250,252,0) 0%, rgba(248,250,252,0.7) 100%)'
          }} />
        )}

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
          <SafeImage
            src={imageUrl || ""}
            alt={worker.name}
            width={48}
            height={48}
            fallbackText={worker.name}
            style={{ width:'100%', height:'100%', objectFit:'cover' }}
            loading="lazy"
          />
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
