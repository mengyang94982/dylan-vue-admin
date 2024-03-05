import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type ContentType =
  | 'text/html'
  | 'text/plain'
  | 'multipart/form-data'
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'application/octet-stream';

export interface RequestOption<ResponseData = any>{
  /**
   * 请求前的钩子
   * 可以在这个钩子里面添加token参数
   * @param config axios配置
   */
  onRequest:(config:InternalAxiosRequestConfig)=>InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  /**
   * 检测后端相应的钩子是否成功
   * @param response
   */
  isBackendSuccess:(response:AxiosResponse<ResponseData>)=>boolean
  /**
   * 请求失败的钩子
   * 可以在这里处理过期的token
   * @param response
   * @param instance
   */
  onBackendFail:(response:AxiosResponse<ResponseData>,instance:AxiosInstance)=>Promise<AxiosResponse> | Promise<void>

  /**
   * responseType为json时转换后端响应
   * @param response
   */
  transformBackendResponse(response:AxiosResponse<ResponseData>):any | Promise<any>
  onError:(error:AxiosError<ResponseData>)=>void | Promise<void>
}
