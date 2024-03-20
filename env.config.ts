/**
 * 根据当前的env创建服务
 *
 * @param env 当前环境
 */
export function createServiceConfig(env: Env.ImportMeta) {
  const mockURL = 'https://mock.apifox.com/m1/4059160-0-default'

  const serviceConfigMap: App.Service.ServiceConfigMap = {
    dev: {
      baseURL: mockURL,
      otherBaseURL: {
        demo: 'http://localhost:9528'
      }
    },
    test: {
      baseURL: mockURL,
      otherBaseURL: {
        demo: 'http://localhost:9529'
      }
    },
    prod: {
      baseURL: mockURL,
      otherBaseURL: {
        demo: 'http://localhost:9530'
      }
    }
  }
  const { VITE_SERVICE_ENV = 'dev' } = env

  return serviceConfigMap[VITE_SERVICE_ENV]
}

/**
 * 创建代理模式
 *
 * @param key 如果没有传递参数，使用默认的key
 */
export function createProxyPattern(key?: App.Service.OtherBaseURLKey) {
  if (!key) {
    return '/proxy-default'
  }
  return `/proxy-${key}`
}
