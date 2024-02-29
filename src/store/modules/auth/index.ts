import {defineStore} from "pinia";
import {SetupStoreId} from "@/enum";
import {useLoading} from "@sa/hooks";
import {useRouteStore} from "@/store/modules/route";
import {useRouterPush} from "@/hooks/common/router";
import {computed, reactive, ref} from "vue";
import {clearAuthStore, getToken, getUserInfo} from "./shared";
import {$t} from "@/locales";
import {fetchGetUserInfo,fetchLogin} from "@/service/api";
import {localStg} from "@/utils/storage";

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const routeStore = useRouteStore()
  const {route, toLogin, redirectFromLogin} = useRouterPush(false)
  const {loading: loginLoading, startLoading, endLoading} = useLoading();

  const token = ref(getToken())

  const userInfo: Api.Auth.UserInfo = reactive(getUserInfo())

  const isLogin = computed(() => Boolean(token.value))

  async function resetStore() {
    const authStore = useAuthStore()
    clearAuthStore()
    authStore.$reset()
    if (!route.value.meta.constant) {
      await toLogin()
    }
    await routeStore.resetStore()
  }


  async function login(userName: string, password: string) {
    const {data: loginToken, error} = await fetchLogin(userName, password)
    if (!error) {
      const pass = await loginByToken(loginToken)
      if (pass) {
        await routeStore.initAuthRoute()
        await redirectFromLogin()
        if (routeStore.isInitAuthRoute) {
          window.$notification?.success({
            title: $t('page.login.common.loginSuccess'),
            content: $t('page.login.common.welcomeBack', {userName: userInfo.userName}),
            duration: 4500
          })
        }
      }
    } else {
      await resetStore()
    }

    endLoading()
  }

  async function loginByToken (loginToken:Api.Auth.LoginToken) {
    localStg.set('token',loginToken.token)
    localStg.set('refreshToken',loginToken.refreshToken)

    const {data:info,error}=await fetchGetUserInfo()
    if (!error) {
      localStg.set('userInfo',info)
      token.value=loginToken.token
      Object.assign(userInfo,info)
      return true
    }
    return false
  }

  return {
    token,
    userInfo,
    isLogin,
    loginLoading,
    resetStore,
    login
  };
});
