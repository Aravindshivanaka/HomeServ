'use client'

export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem('is_logged_in') === 'true'
  } catch {
    return false
  }
}

export const getUserPhone = (): string | null => {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem('user_phone')
  } catch {
    return null
  }
}

export const setLoggedIn = (phone: string): void => {
  if (typeof window === 'undefined') return
  const previousPhone = localStorage.getItem('user_phone')
  
  // Backup previous phone's wishlist if it exists
  if (previousPhone) {
    const wishlist = localStorage.getItem('wishlist')
    const servehomeWishlist = localStorage.getItem('servehome-wishlist')
    if (wishlist) {
      localStorage.setItem(`wishlist_${previousPhone}`, wishlist)
    }
    if (servehomeWishlist) {
      localStorage.setItem(`servehome-wishlist_${previousPhone}`, servehomeWishlist)
    }
  }

  // If different user logging in — clear their wishlist
  if (previousPhone && previousPhone !== phone) {
    localStorage.removeItem('wishlist')
    localStorage.removeItem('servehome-wishlist')
  }

  // Restore logged-in user's wishlist
  const savedWishlist = localStorage.getItem(`wishlist_${phone}`)
  const savedServehome = localStorage.getItem(`servehome-wishlist_${phone}`)
  if (savedWishlist) {
    localStorage.setItem('wishlist', savedWishlist)
  }
  if (savedServehome) {
    localStorage.setItem('servehome-wishlist', savedServehome)
  }

  localStorage.setItem('is_logged_in', 'true')
  localStorage.setItem('user_phone', phone)
}

export const logout = (): void => {
  if (typeof window === 'undefined') return
  const phone = localStorage.getItem('user_phone')

  // Backup current wishlist before clearing session
  if (phone) {
    const wishlist = localStorage.getItem('wishlist')
    const servehomeWishlist = localStorage.getItem('servehome-wishlist')
    if (wishlist) {
      localStorage.setItem(`wishlist_${phone}`, wishlist)
    }
    if (servehomeWishlist) {
      localStorage.setItem(`servehome-wishlist_${phone}`, servehomeWishlist)
    }
  }

  localStorage.removeItem('is_logged_in')
  localStorage.removeItem('user_phone')
  localStorage.removeItem('test_phone')
  localStorage.removeItem('redirect_after_login')
  localStorage.removeItem('wishlist')
  localStorage.removeItem('servehome-wishlist')
  window.location.href = '/'
}

export const saveRedirectUrl = (url: string): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('redirect_after_login', url)
}

export const getAndClearRedirectUrl = (): string => {
  if (typeof window === 'undefined') return '/'
  const url = localStorage.getItem('redirect_after_login') || '/'
  localStorage.removeItem('redirect_after_login')
  return url
}
