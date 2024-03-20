import { request } from '../request'

export function fetchGetUserRoutes() {
  return request<Api.Route.UserRoute>({
    url: '/route/getUserRoutes'
  })
}

export function fetchIsRouteExist(routeName: string) {
  return request<boolean>({
    url: '/route/isRouteExist',
    params: { routeName }
  })
}
