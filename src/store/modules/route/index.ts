import {defineStore} from "pinia";
import {SetupStoreId} from "@/enum";
import {useAppStore} from "@/store/modules/app";
import {useAuthStore} from "@/store/modules/auth";
import {useBoolean} from "@sa/hooks";
import {LastLevelRouteKey} from "@elegant-router/types";
import {ref} from "vue";
import {FUNCTION} from "prettier-plugin-jsdoc/dist/tags";
import {ElegantConstRoute} from "@elegant-router/vue";
import {RouteRecordRaw} from "vue-router";

export const useRouteStore=defineStore(SetupStoreId.Route,()=>{
  const appStore=useAppStore()
  const authStore=useAuthStore()
  const tabStore=useTabStore()

  const {bool:isInitAuthRoute,setBool:setIsInitAuthRoute}=useBoolean()

  const removeRouteFns:(()=>void)[]=[]

  const authRouteMode=ref(import.meta.env.VITE_AUTH_ROUTE_MODE)
  const routeHome=ref(import.meta.env.VITE_ROUTE_HOME)

  function setRouteHome (routeKey:LastLevelRouteKey) {
    routeHome.value=routeKey
  }

  const menus=ref<App.Global.Menu[]>([])

  function getGlobalMenus(routes: ElegantConstRoute[]) {
    menus.value = getGlobalMenusByAuthRoutes(routes);
  }

  function updateGlobalMenusByLocale () {
    menus.value=updateLocaleOfGlobalMenus(menus.value)
  }

  const cacheRoutes=ref<RouteKey[]>([])

  function getCacheRoutes (routes:RouteRecordRaw[]) {
    const {constantVueRoutes}=createRoutes()
    cacheRoutes.value=getCacheRoutesNames([...constantVueRoutes,...routes])
  }

  function addCacheRoutes (routeKey:RouteKey) {
    if (cacheRoutes.value.includes(routeKey)) return
    cacheRoutes.value.push(routeKey)
  }

  function removeCacheRoutes (routeKey:RouteKey) {
    const index=cacheRoutes.value.findIndex(item=>item === routeKey)
    if (index === -1) return
    cacheRoutes.value.splice(index,1)
  }


})
