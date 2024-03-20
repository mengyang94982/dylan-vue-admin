import { computed, effectScope, onScopeDispose, ref, toRefs, watch } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useEventListener, usePreferredColorScheme } from '@vueuse/core'
import { SetupStoreId } from '@/enum'
import { localStg } from '@/utils/storage'
import { addThemeVarsToHtml, createThemeToken, getNaiveTheme, initThemeSettings, toggleCssDarkMode } from './shared'

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

  const themeColors = computed(() => {
    const { themeColor, otherColor, isInfoFollowPrimary } = settings.value
    const colors: App.Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info
    }
    return colors
  })

  const naiveTheme = computed(() => getNaiveTheme(themeColors.value))

  const settingsJson = computed(() => JSON.stringify(settings.value))

  function resetStore() {
    const themeStore = useThemeStore()
    themeStore.$reset()
  }

  function setThemeScheme(themeScheme: UnionKey.ThemeScheme) {
    settings.value.themeScheme = themeScheme
  }

  function toggleThemeScheme() {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto']

    const index = themeSchemes.findIndex(item => item === settings.value.themeScheme)

    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1
    const nextThemeScheme = themeSchemes[nextIndex]
    setThemeScheme(nextThemeScheme)
  }

  function updateThemeColors(key: App.Theme.ThemeColorKey, color: string) {
    if (key === 'primary') {
      settings.value.themeColor = color
    } else {
      settings.value.otherColor[key] = color
    }
  }

  function setThemeLayout(mode: UnionKey.ThemeLayoutMode) {
    settings.value.layout.mode = mode
  }

  function setupThemeVarsToHtml() {
    const { themeTokens, darkThemeTokens } = createThemeToken(themeColors.value)
    addThemeVarsToHtml(themeTokens, darkThemeTokens)
  }

  function cacheThemeSettings() {
    const isProd = import.meta.env.PROD
    if (!isProd) return
    localStg.set('themeSettings', settings.value)
  }

  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings()
  })

  scope.run(() => {
    watch(
      darkMode,
      val => {
        toggleCssDarkMode(val)
      },
      {
        immediate: true
      }
    )

    watch(
      themeColors,
      val => {
        setupThemeVarsToHtml()
        localStg.set('themeColor', val.primary)
      },
      {
        immediate: true
      }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })

  return {
    ...toRefs(settings.value),
    darkMode,
    themeColors,
    naiveTheme,
    settingsJson,
    resetStore,
    setThemeScheme,
    toggleThemeScheme,
    updateThemeColors,
    setThemeLayout
  }
})
