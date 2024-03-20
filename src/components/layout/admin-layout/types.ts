interface AdminLayoutHeaderConfig {
  headerVisible?: boolean
  headerClass?: string
  headerHeight?: number
}

interface AdminLayoutTabConfig {
  tabVisible?: boolean
  tabClass?: string
  tabHeight?: number
}

interface AdminLayoutSiderConfig {
  siderVisible?: boolean
  siderClass?: string
  mobileSiderClass?: string
  siderCollapse?: boolean
  siderWidth?: number
  siderCollapsedWidth?: number
}

interface AdminLayoutContentConfig {
  contentClass?: string
  fullContent?: boolean
}

export interface AdminLayoutFooterConfig {
  footerVisible?: boolean
  fixedFooter?: boolean
  footerClass?: string
  footerHeight?: number
  rightFooter?: boolean
}

export type LayoutMode = 'horizontal' | 'vertical'

export type LayoutScrollMode = 'wrapper' | 'content'

export interface AdminLayoutProps
  extends AdminLayoutHeaderConfig,
    AdminLayoutTabConfig,
    AdminLayoutSiderConfig,
    AdminLayoutContentConfig,
    AdminLayoutFooterConfig {
  mode?: LayoutMode
  isMobile?: boolean
  scrollMode?: LayoutScrollMode
  scrollElId?: string
  scrollElClass?: string
  scrollWrapperClass?: string
  commonClass?: string
  fixedTop?: boolean
  maxZIndex?: number
}

export interface Emits {
  /** Update siderCollapse */
  (e: 'update:siderCollapse', collapse: boolean): void
}

export type LayoutCssVarsProps = Pick<
  AdminLayoutProps,
  'headerHeight' | 'tabHeight' | 'siderWidth' | 'siderCollapsedWidth' | 'footerHeight'
> & {
  headerZIndex?: number
  tabZIndex?: number
  siderZIndex?: number
  mobileSiderZIndex?: number
  footerZIndex?: number
}

type Kebab<S extends string> = S extends Uncapitalize<S> ? S : `-${Uncapitalize<S>}`

type Prefix = '--dy-'

type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
  ? `${Uncapitalize<Start>}${KebabCase<Kebab<End>>}`
  : S

export type LayoutCssVars = {
  [K in keyof LayoutCssVarsProps as `${Prefix}${KebabCase<K>}`]: string | number
}
