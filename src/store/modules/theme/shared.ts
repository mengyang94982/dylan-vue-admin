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
