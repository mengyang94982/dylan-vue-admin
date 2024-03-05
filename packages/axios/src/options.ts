import {RequestOption} from "./type";
import {AxiosResponse} from "axios";


export function createDefaultOptions<ResponseData = any>(options?:Partial<RequestOption<ResponseData>>){
  const opts:RequestOption<ResponseData>={
    onRequest:async config=>config,
    isBackendSuccess:_response=>true,
    onBackendFail:async ()=>{},
    transformBackendResponse:async response=>response.data,
    onError:async ()=>{}
  }
  Object.assign(opts,options)
  return opts
}
