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
  localStorage.setItem('is_logged_in', 'true')
  localStorage.setItem('user_phone', phone)
}

export const logout = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('is_logged_in')
  localStorage.removeItem('user_phone')
  localStorage.removeItem('test_phone')
  localStorage.removeItem('redirect_after_login')
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
