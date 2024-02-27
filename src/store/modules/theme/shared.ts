import type {GlobalThemeOverrides} from 'naive-ui'

import {getColorByColorPaletteNumber,getColorPalette} from "~/packages/color-palette";
import {addColorAlpha,getRgbOfColor} from "@sa/utils";

import {overrideThemeSettings, themeSettings} from '@/theme/setting'
import {localStg} from "@/utils/storage";

export function initThemeSettings(){
  const isProd=import.meta.env.PROD
  if (!isProd) return themeSettings
  const settings=localStg.get('themeSettings')||themeSettings

  const isOverride=localStg.get('overrideThemeFlag') === BUILD_TIME
  if (!isOverride){
    Object.assign(settings,overrideThemeSettings)
    localStg.set('overrideThemeFlag',BUILD_TIME)
  }

  return settings
}

type NaiveColorScene=''|'Suppl'|'Hover'|'Pressed'|'Active'
type NaiveColorKey=`${App.Theme.ThemeColorKey}Color${NaiveColorScene}`
type NaiveThemeColor=Partial<Record<NaiveColorKey, string>>

interface NaiveColorAction{
  scene:NaiveColorScene
  handler:(color:string)=>string
}

function getNaiveThemeColors (colors:App.Theme.ThemeColor) {
  const colorActions:NaiveColorAction[]=[
    { scene: '', handler: color => color },
    { scene: 'Suppl', handler: color => color },
    { scene: 'Hover', handler: color => getColorByColorPaletteNumber(color, 500) },
    { scene: 'Pressed', handler: color => getColorByColorPaletteNumber(color, 700) },
    { scene: 'Active', handler: color => addColorAlpha(color, 0.1) }
  ]
  const themeColors:NaiveThemeColor={}

  const colorEntries=Object.entries(colors) as [App.Theme.ThemeColorKey,string][]

  colorEntries.forEach(color=>{
    colorActions.forEach(action=>{
      const [colorType, colorValue] = color;
      const colorKey: NaiveColorKey = `${colorType}Color${action.scene}`;
      themeColors[colorKey] = action.handler(colorValue);
    })
  })

  return themeColors

}

export function getNaiveTheme (colors:App.Theme.ThemeColor) {
  const {primary:colorLoading}=colors
  const theme:GlobalThemeOverrides={
    common:{
      ...getNaiveThemeColors(colors)
    },
    LoadingBar:{
      colorLoading
    }
  }
  return theme
}
