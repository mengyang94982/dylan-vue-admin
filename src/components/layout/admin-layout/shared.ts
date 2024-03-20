import type { AdminLayoutProps, LayoutCssVars, LayoutCssVarsProps } from './types'

/** The id of the scroll element of the layout */
export const LAYOUT_SCROLL_EL_ID = '__SCROLL_EL_ID__'

/** The max z-index of the layout */
export const LAYOUT_MAX_Z_INDEX = 100

function createLayoutCssVarsByCssVarsProps(props: LayoutCssVarsProps) {
  const cssVars: LayoutCssVars = {
    '--dy-header-height': `${props.headerHeight}px`,
    '--dy-header-z-index': props.headerZIndex,
    '--dy-tab-height': `${props.tabHeight}px`,
    '--dy-tab-z-index': props.tabZIndex,
    '--dy-sider-width': `${props.siderWidth}px`,
    '--dy-sider-collapsed-width': `${props.siderCollapsedWidth}px`,
    '--dy-sider-z-index': props.siderZIndex,
    '--dy-mobile-sider-z-index': props.mobileSiderZIndex,
    '--dy-footer-height': `${props.footerHeight}px`,
    '--dy-footer-z-index': props.footerZIndex
  }
  return cssVars
}

export function createLayoutCssVars(props: AdminLayoutProps) {
  const {
    mode,
    isMobile,
    maxZIndex = LAYOUT_MAX_Z_INDEX,
    headerHeight,
    tabHeight,
    siderWidth,
    siderCollapsedWidth,
    footerHeight
  } = props

  const headerZIndex = maxZIndex - 3
  const tabZIndex = maxZIndex - 5
  const siderZIndex = mode === 'vertical' || isMobile ? maxZIndex - 1 : maxZIndex - 4
  const mobileSiderZIndex = isMobile ? maxZIndex - 2 : 0
  const footerZIndex = maxZIndex - 5

  const cssProps: LayoutCssVarsProps = {
    headerHeight,
    headerZIndex,
    tabHeight,
    tabZIndex,
    siderWidth,
    siderZIndex,
    mobileSiderZIndex,
    siderCollapsedWidth,
    footerHeight,
    footerZIndex
  }

  return createLayoutCssVarsByCssVarsProps(cssProps)
}
