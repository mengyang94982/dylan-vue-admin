import type {CancelTokenSource, CreateAxiosDefaults, InternalAxiosRequestConfig} from "axios";
import axios from "axios";

import axiosRetry from 'axios-retry'

import {nanoid} from '@sa/utils'

import {createAxiosConfig, createDefaultOptions, createRetryOptions} from './options';
import {REQUEST_ID_KEY} from './constant';
import type {RequestOption} from './type';

function createCommonRequest<ResponseData = any>(axiosConfig?:CreateAxiosDefaults,options?:Partial<RequestOption<ResponseData>){
  const opts=createDefaultOptions<ResponseData>(options)
  const axiosConf=createAxiosConfig(axiosConfig)
  const instance=axios.create(axiosConf)
  const cancelTokenSourceMap=new Map<string,CancelTokenSource>()

  const retryOptions=createRetryOptions(axiosConf)
  axiosRetry(instance,retryOptions)
  instance.interceptors.request.use(conf=>{
    const config:InternalAxiosRequestConfig={...conf}
    const requestId=nanoid()
    config.headers.set(REQUEST_ID_KEY,requestId)
    const cancelTokenSource=axios.CancelToken.source()

    const cancelToken=cancelTokenSource.token
    cancelTokenSourceMap.set(requestId,cancelTokenSource)

    return opts.onRequest?.(config) || config
  })
}

export function createRequest(){

}


export function createFlatRequest(){

}
