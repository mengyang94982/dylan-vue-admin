/**
 * 命名空间环境
 *
 * 用于声明import.meta对象的类型
 */

declare namespace Env {
  /**
   * 路由历史记录
   */
  type RouterHistoryMode = "hash" | "history" | "memory";

  /**
   * import.meta的接口
   */
  interface ImportMeta extends ImportMetaEnv {
    /**
     * 项目的基础url
     */
    readonly VITE_BASE_URL: string;
    /**
     * 项目的名称
     */
    readonly VITE_APP_TITLE: string;
    /**
     * 项目的介绍
     */
    readonly VITE_APP_DESC: string;
    /**
     * 项目使用的路由模式
     */
    readonly VITE_ROUTER_HISTORY_MODE?: RouterHistoryMode;
    /**
     * 图标的前缀
     */
    readonly VITE_ICON_PREFIX: "icon";
    /**
     * 本地图标的前缀
     */
    readonly VITE_ICON_LOCAL_PREFIX: "local-icon";
    /**
     * 是否启用代理 仅在开发模式下有效
     */
    readonly VITE_HTTP_PROXY?: CommonType.YesOrNo;
    /**
     * 后台开发环境
     */
    readonly VITE_SERVICE_ENV?: App.Service.EnvType;
    /**
     * 静态路由：路由写死在前台
     * 动态路由：路由由后台返回
     */
    readonly VITE_AUTH_ROUTE_MODE: "static" | "dynamic";
    /**
     * 路由首页
     * 只有在静态路由才有效
     * 动态路由由后台返回
     */
    readonly VITE_ROUTE_HOME: import("@elegant-router/types").LastLevelRouteKey;
    /**
     * 默认的菜单图标
     */
    readonly VITE_MENU_ICON:string
    /**
     * 是否启用source-map
     */
    readonly VITE_SOURCE_MAP:CommonType.YesOrNo
    /**
     * 图标部署到自己的网址
     */
    readonly VITE_ICONIFY_URL?:string
  }
}
