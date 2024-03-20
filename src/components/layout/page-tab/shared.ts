import { colord } from 'colord'
import type { RgbColor } from 'colord'
import type { PageTabCssVars, PageTabCssVarsProps } from '@/components/layout/page-tab/types'

/** The active color of the tab */
export const ACTIVE_COLOR = '#1890ff'

function createCssVars(props: PageTabCssVarsProps) {
  const cssVars: PageTabCssVars = {
    '--dy-primary-color': props.primaryColor,
    '--dy-primary-color1': props.primaryColor1,
    '--dy-primary-color2': props.primaryColor2,
    '--dy-primary-color-opacity1': props.primaryColorOpacity1,
    '--dy-primary-color-opacity2': props.primaryColorOpacity2,
    '--dy-primary-color-opacity3': props.primaryColorOpacity3
  }

  return cssVars
}

export function createTabCssVars(primaryColor: string) {
  const cssProps: PageTabCssVarsProps = {
    primaryColor,
    primaryColor1: transformColorWithOpacity(primaryColor, 0.1, '#ffffff'),
    primaryColor2: transformColorWithOpacity(primaryColor, 0.3, '#000000'),
    primaryColorOpacity1: addColorAlpha(primaryColor, 0.1),
    primaryColorOpacity2: addColorAlpha(primaryColor, 0.15),
    primaryColorOpacity3: addColorAlpha(primaryColor, 0.3)
  }

  return createCssVars(cssProps)
}

export function addColorAlpha(color: string, alpha: number) {
  return colord(color).alpha(alpha).toHex()
}

/**
 * Transform color with opacity to similar color without opacity
 *
 * @param color - Color
 * @param alpha - Alpha (0 - 1)
 * @param bgColor Background color (usually white or black)
 */
export function transformColorWithOpacity(color: string, alpha: number, bgColor = '#ffffff') {
  const originColor = addColorAlpha(color, alpha)
  const { r: oR, g: oG, b: oB } = colord(originColor).toRgb()

  const { r: bgR, g: bgG, b: bgB } = colord(bgColor).toRgb()

  function calRgb(or: number, bg: number, al: number) {
    return bg + (or - bg) * al
  }

  const resultRgb: RgbColor = {
    r: calRgb(oR, bgR, alpha),
    g: calRgb(oG, bgG, alpha),
    b: calRgb(oB, bgB, alpha)
  }

  return colord(resultRgb).toHex()
}
