import { request } from '../request'

export function fetchLogin(userName: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({
    url: '/auth/getUserInfo'
  })
}

export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  })
}

export function fetchDebug() {
  return request<string>({
    url: '/debug-post',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      a: 1
    }
  })
}
