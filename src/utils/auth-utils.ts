import Cookie from 'js-cookie'
import SSRCookie from 'cookie'
import { AUTH_CRED, TOKEN } from '@/constants/AuthConstants'

export function setAuthCredentials(creds: string) {
  Cookie.set(AUTH_CRED, creds)  
}

export function setToken(token: string) {
  Cookie.set(TOKEN, token)  
}

export function getAuthCredentials(context?: any): {
  token: string | null
} {
  let authToken;
  if (context) {
    authToken = parseSSRCookie(context)[AUTH_CRED]
  } else {
    authToken = Cookie.get(AUTH_CRED)
  }
  if (authToken) {
    return { token: authToken }
  }

  return { token: null }
}

export function getToken(context?: any): {
  token: string | null
} {
  let authToken;
  if (context) {
    authToken = parseSSRCookie(context)[TOKEN]
  } else {
    authToken = Cookie.get(TOKEN)
  }
  if (authToken) {
    return { token: authToken }
  }

  return { token: null }
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? '')
}

export function hasAccess(_allowedRoles: string[], _userPermissions: string[] | undefined | null) {
  if (_userPermissions) {
    return Boolean(_allowedRoles?.find(aRole => _userPermissions.includes(aRole)))
  }

  return false
}
export function isAuthenticated(_cookies: any) {
  return !!_cookies[AUTH_CRED]
}