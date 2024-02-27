import { type RouteLocationRaw, useRouter } from "vue-router";
import { router as globalRouter } from "@/router";
import type { RouteKey } from "@elegant-router/types";

export function useRouterPush(isSetup = true) {
  const router = isSetup ? useRouter() : globalRouter;
  const route = globalRouter.currentRoute;

  const routerPush = router.push;
  const routerBack = router.back;

  interface RouterPushOptions {
    query?: Record<string, string>;
    params?: Record<string, string>;
  }
  async function routerPushByKey(key: RouteKey, options?: RouterPushOptions) {
    const { query, params } = options || {};
    const routeLocation: RouteLocationRaw = {
      name: key,
    };
    if (query) {
      routeLocation.query = query;
    }
    if (params) {
      routeLocation.params = params;
    }
    return routerPush(routeLocation);
  }

  async function toHome() {
    return routerPushByKey("root");
  }

  async function toLogin(
    loginModule?: UnionKey.LoginModule,
    redirectUrl?: string,
  ) {
    const module = loginModule || "pwd-login";

    const options: RouterPushOptions = {
      params: {
        module,
      },
    };

    const redirect = redirectUrl || route.value.fullPath;
    options.query = {
      redirect,
    };

    return routerPushByKey("login", options);
  }

  async function toggleLoginModule(module: UnionKey.LoginModule) {
    const query = route.value.query as Record<string, string>;
    return routerPushByKey("login", { query, params: { module } });
  }

  async function redirectFormLogin() {
    const redirect = route.value.query?.redirect as string;
    if (redirect) {
      routerPush(redirect);
    } else {
      toHome();
    }
  }

  return {
    route,
    routerPush,
    routerBack,
    routerPushByKey,
    toLogin,
    toggleLoginModule,
    redirectFormLogin,
  };
}
