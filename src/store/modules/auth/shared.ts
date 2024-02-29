import {localStg} from "@/utils/storage";

export function getToken () {
  return localStg.get('token') || ''
}

export function getUserInfo () {
  const emptyInfo:Api.Auth.UserInfo={
    userId:'',
    userName:'',
    roles:[]
  }
  return localStg.get('userInfo') || emptyInfo
}

export function clearAuthStore () {
  localStg.remove('token')
  localStg.remove('refreshToken')
  localStg.remove('userInfo')
}
