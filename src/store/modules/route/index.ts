import { computed, ref } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { useBoolean } from '@sa/hooks';
import type { CustomRoute, ElegantConstRoute, LastLevelRouteKey, RouteKey, RouteMap } from '@elegant-router/types';
import { SetupStoreId } from '@/enum';
import { router } from '@/router';
import { ROOT_ROUTE, createRoutes, getAuthVueRoutes } from '@/router/routes';
import { getRouteName, getRoutePath } from '@/router/elegant/transform';
import { fetchGetUserRoutes, fetchIsRouteExist } from '@/service/api';
import { useAppStore } from '../app';
import { useAuthStore } from '../auth';
import { useTabStore } from '../tab';
import {
  filterAuthRoutesByRoles,
  getBreadcrumbsByRoute,
  getCacheRouteNames,
  getGlobalMenusByAuthRoutes,
  getSelectedMenuKeyPathByKey,
  isRouteExistByRouteName,
  sortRoutesByOrder,
  updateLocaleOfGlobalMenus
} from './shared';

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

  function getCacheRoutes(routes: RouteRecordRaw[]) {
    const { constantVueRoutes } = createRoutes();

    cacheRoutes.value = getCacheRouteNames([...constantVueRoutes, ...routes]);
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

  async function reCacheRoutesByKey(routeKey:RouteKey){
    removeCacheRoutes(routeKey)
    await appStore.reloadPage()
    addCacheRoutes(routeKey)
  }

  async function reCacheRoutesByKeys(routeKeys:RouteKey[]){
    for await (const key of routeKeys){
      await reCacheRoutesByKey(key)
    }
  }

  const breadcrumbs = computed(() => getBreadcrumbsByRoute(router.currentRoute.value, menus.value));

  async function resetStore() {
    const routeStore = useRouteStore();

    routeStore.$reset();

    resetVueRoutes();
  }

  function resetVueRoutes() {
    removeRouteFns.forEach(fn => fn());
    removeRouteFns.length = 0;
  }

  async function initAuthRoute() {
    if (authRouteMode.value === 'static') {
      await initStaticAuthRoute();
    } else {
      await initDynamicAuthRoute();
    }

    tabStore.initHomeTab();
  }

  async function initStaticAuthRoute() {
    const { authRoutes } = createRoutes();

    const filteredAuthRoutes = filterAuthRoutesByRoles(authRoutes, authStore.userInfo.roles);

    handleAuthRoutes(filteredAuthRoutes);

    setIsInitAuthRoute(true);
  }

  async function initDynamicAuthRoute() {
    const { data, error } = await fetchGetUserRoutes();

    if (!error) {
      const { routes, home } = data;

      handleAuthRoutes(routes);

      setRouteHome(home);

      handleUpdateRootRouteRedirect(home);

      setIsInitAuthRoute(true);
    }
  }

  function handleAuthRoutes(routes: ElegantConstRoute[]) {
    const sortRoutes = sortRoutesByOrder(routes);

    const vueRoutes = getAuthVueRoutes(sortRoutes);

    addRoutesToVueRouter(vueRoutes);

    getGlobalMenus(sortRoutes);

    getCacheRoutes(vueRoutes);
  }

  function addRoutesToVueRouter(routes: RouteRecordRaw[]) {
    routes.forEach(route => {
      const removeFn = router.addRoute(route);
      addRemoveRouteFn(removeFn);
    });
  }

  function addRemoveRouteFn(fn: () => void) {
    removeRouteFns.push(fn);
  }

  function handleUpdateRootRouteRedirect(redirectKey: LastLevelRouteKey) {
    const redirect = getRoutePath(redirectKey);

    if (redirect) {
      const rootRoute: CustomRoute = { ...ROOT_ROUTE, redirect };

      router.removeRoute(rootRoute.name);

      const [rootVueRoute] = getAuthVueRoutes([rootRoute]);

      router.addRoute(rootVueRoute);
    }
  }

  async function getIsAuthRouteExist(routePath: RouteMap[RouteKey]) {
    const routeName = getRouteName(routePath);

    if (!routeName) {
      return false;
    }

    if (authRouteMode.value === 'static') {
      const { authRoutes } = createRoutes();

      return isRouteExistByRouteName(routeName, authRoutes);
    }

    const { data } = await fetchIsRouteExist(routeName);

    return data;
  }

  function getSelectedMenuKeyPath(selectedKey: string) {
    return getSelectedMenuKeyPathByKey(selectedKey, menus.value);
  }

  return {
    resetStore,
    routeHome,
    menus,
    updateGlobalMenusByLocale,
    cacheRoutes,
    reCacheRoutesByKey,
    reCacheRoutesByKeys,
    breadcrumbs,
    initAuthRoute,
    isInitAuthRoute,
    setIsInitAuthRoute,
    getIsAuthRouteExist,
    getSelectedMenuKeyPath
  };

})
