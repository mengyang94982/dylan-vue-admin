import type { GlobalThemeOverrides } from 'naive-ui'

import { addColorAlpha, getRgbOfColor } from '@sa/utils'
import { getColorByColorPaletteNumber, getColorPalette } from '~/packages/color-palette'

import { overrideThemeSettings, themeSettings } from '@/theme/settings'
import { localStg } from '@/utils/storage'
import { themeVars } from '@/theme/vars'

const DARK_CLASS = 'dark'

export function initThemeSettings() {
  const isProd = import.meta.env.PROD
  if (!isProd) return themeSettings
  const settings = localStg.get('themeSettings') || themeSettings

  const isOverride = localStg.get('overrideThemeFlag') === BUILD_TIME
  if (!isOverride) {
    Object.assign(settings, overrideThemeSettings)
    localStg.set('overrideThemeFlag', BUILD_TIME)
  }

  return settings
}

export function createThemeToken(colors: App.Theme.ThemeColor) {
  const paletteColors = createThemePaletteColors(colors)

  const themeTokens: App.Theme.ThemeToken = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      container: 'rgb(255, 255, 255)',
      layout: 'rgb(247, 250, 252)',
      inverted: 'rgb(0, 20, 40)',
      base_text: 'rgb(31, 31, 31)'
    },
    boxShadow: {
      header: '0 1px 2px rgb(0, 21, 41, 0.08)',
      sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
      tab: '0 1px 2px rgb(0, 21, 41, 0.08)'
    }
  }

  const darkThemeTokens: App.Theme.ThemeToken = {
    colors: {
      ...themeTokens.colors,
      container: 'rgb(28, 28, 28)',
      layout: 'rgb(18, 18, 18)',
      base_text: 'rgb(224, 224, 224)'
    },
    boxShadow: {
      ...themeTokens.boxShadow
    }
  }

  return {
    themeTokens,
    darkThemeTokens
  }
}

function createThemePaletteColors(colors: App.Theme.ThemeColor) {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[]
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor

  colorKeys.forEach(key => {
    const { palettes, main } = getColorPalette(colors[key], key)

    colorPaletteVar[key] = main.hexcode

    palettes.forEach(item => {
      colorPaletteVar[`${key}-${item.number}`] = item.hexcode
    })
  })
  return colorPaletteVar
}

function getCssVarByTokens(tokens: App.Theme.BaseToken) {
  const styles: string[] = []

  function removeVarPrefix(value: string) {
    return value.replace('var(', '').replace(')', '')
  }

  function removeRgbPrefix(value: string) {
    return value.replace('rgb(', '').replace(')', '')
  }

  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue)
      let cssValue = tokens[key][tokenKey]

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey)
        const { r, g, b } = getRgbOfColor(cssValue)
        cssValue = `${r} ${g} ${b}`
      }

      styles.push(`${cssVarsKey}: ${cssValue}`)
    }
  }

  const styleStr = styles.join(';')

  return styleStr
}

export function addThemeVarsToHtml(tokens: App.Theme.BaseToken, darkTokens: App.Theme.BaseToken) {
  const cssVarStr = getCssVarByTokens(tokens)
  const darkCssVarStr = getCssVarByTokens(darkTokens)

  const css = `
    html {
      ${cssVarStr}
    }
  `

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr}
    }
  `
  const style = document.createElement('style')

  style.textContent = css + darkCss

  document.head.appendChild(style)
}

export function toggleCssDarkMode(darkMode = false) {
  function addDarkClass() {
    document.documentElement.classList.add(DARK_CLASS)
  }

  function removeDarkClass() {
    document.documentElement.classList.remove(DARK_CLASS)
  }

  if (darkMode) {
    addDarkClass()
  } else {
    removeDarkClass()
  }
}

type NaiveColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
type NaiveColorKey = `${App.Theme.ThemeColorKey}Color${NaiveColorScene}`
type NaiveThemeColor = Partial<Record<NaiveColorKey, string>>

interface NaiveColorAction {
  scene: NaiveColorScene
  handler: (color: string) => string
}

function getNaiveThemeColors(colors: App.Theme.ThemeColor) {
  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: color => color },
    { scene: 'Suppl', handler: color => color },
    {
      scene: 'Hover',
      handler: color => getColorByColorPaletteNumber(color, 500)
    },
    {
      scene: 'Pressed',
      handler: color => getColorByColorPaletteNumber(color, 700)
    },
    { scene: 'Active', handler: color => addColorAlpha(color, 0.1) }
  ]
  const themeColors: NaiveThemeColor = {}

  const colorEntries = Object.entries(colors) as [App.Theme.ThemeColorKey, string][]

  colorEntries.forEach(color => {
    colorActions.forEach(action => {
      const [colorType, colorValue] = color
      const colorKey: NaiveColorKey = `${colorType}Color${action.scene}`
      themeColors[colorKey] = action.handler(colorValue)
    })
  })

  return themeColors
}

export function getNaiveTheme(colors: App.Theme.ThemeColor) {
  const { primary: colorLoading } = colors
  const theme: GlobalThemeOverrides = {
    common: {
      ...getNaiveThemeColors(colors)
    },
    LoadingBar: {
      colorLoading
    }
  }
  return theme
}
