'use client'
import { useState } from 'react'

interface SafeImageProps {
  src?: string | null
  alt?: string
  className?: string
  style?: React.CSSProperties
  fallbackText?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager' | string
  priority?: boolean
  sizes?: string
}

function getInitials(text: string): string {
  if (!text) return '?'
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

function getColorFromText(text: string): string {
  const colors = [
    '#2563EB', '#7C3AED', '#059669', '#DC2626',
    '#D97706', '#0891B2', '#4F46E5', '#BE185D'
  ]
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export function SafeImage({ 
  src, alt, className, style, fallbackText, width, height 
}: SafeImageProps) {
  const [failed, setFailed] = useState(false)
  const initials = getInitials(fallbackText || alt || '?')
  const bgColor = getColorFromText(fallbackText || alt || '?')
  const showFallback = !src || failed

  if (showFallback) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontWeight: '700',
          fontSize: width ? Math.max(width * 0.3, 14) + 'px' : '16px',
          fontFamily: 'Poppins, sans-serif',
          borderRadius: style?.borderRadius || '50%',
          width: width || '100%',
          height: height || '100%',
          flexShrink: 0
        }}>
        {initials}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      style={style}
      width={width}
      height={height}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default SafeImage
