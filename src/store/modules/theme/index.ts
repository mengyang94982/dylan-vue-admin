import {computed, eeffectScope, effectScope, onScopeDispose, ref, toRefs, watch} from "vue";
import type {Ref} from 'vue'
import {defineStore} from "pinia";

import {useEventListener, usePreferredColorScheme} from "@vueuse/core";
import {SetupStoreId} from "@/enum";
import {localStg} from "@/utils/storage";
import {getNaiveTheme, initThemeSettings} from "./shared";

export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const scope = effectScope()
  const osTheme = usePreferredColorScheme()

  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings())

  const darkMode = computed(() => {
    if (settings.value.themeScheme === 'auto') {
      return osTheme.value === 'dark'
    }
    return settings.value.themeScheme === 'dark'
  })

  const themeColors=computed(()=>{
    const {themeColor,otherColor,isInfoFollowPrimary}=settings.value
    const colors:App.Theme.ThemeColor={
      primary:themeColor,
      ...otherColor,
      info:isInfoFollowPrimary?themeColor:otherColor.info
    }
    return colors
  })

  const naiveTheme=computed(()=>getNaiveTheme(themeColors.value))

  function setThemeScheme(themeScheme:UnionKey.ThemeScheme){
    settings.value.themeScheme=themeScheme
  }


  function toggleThemeScheme() {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto']

    const index = themeSchemes.findIndex(item => item === settings.value.themeScheme)

    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1
    const nextThemeScheme=themeSchemes[nextIndex]
    setThemeScheme(nextThemeScheme)
  }

  return {
    ...toRefs(settings.value),
    darkMode,
    themeColors,
    naiveTheme,
    setThemeScheme,
    toggleThemeScheme
  }
})
