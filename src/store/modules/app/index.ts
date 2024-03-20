import { defineStore } from 'pinia'
import { effectScope, onScopeDispose, ref, watch } from 'vue'
import { breakpointsTailwind, useBreakpoints, useTitle } from '@vueuse/core'
import { SetupStoreId } from '@/enum'
import { router } from '@/router'
import { localStg } from '@/utils/storage'
import { $t, setLocale } from '@/locales'
import { useBoolean } from '~/packages/hooks'
import { setDayjsLocale } from '@/locales/dayjs'
import { useThemeStore } from '@/store/modules/theme'
import { useRouteStore } from '@/store/modules/route'
import { useTabStore } from '@/store/modules/tab'

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const themeStore = useThemeStore()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()
  const scope = effectScope()
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const { bool: reloadFlag, setBool: setReloadFlag } = useBoolean(true)
  const { bool: themeDrawerVisible, setTrue: openThemeDrawer, setFalse: closeThemeDrawer } = useBoolean()
  const { bool: fullContent, toggle: toggleFullContent } = useBoolean()
  const { bool: siderCollapse, setBool: setSiderCollapse, toggle: toggleSiderCollapse } = useBoolean()
  const { bool: contentXScrollable, setBool: setContentXScrollable } = useBoolean()
  const { bool: mixSiderFixed, setBool: setMixSiderFixed, toggle: toggleMixSiderFixed } = useBoolean()

  const isMobile = breakpoints.smaller('sm')

  async function reloadPage(duration = 0) {
    setReloadFlag(false)
    if (duration > 0) {
      await new Promise(resolve => {
        setTimeout(resolve, duration)
      })
    }
    setReloadFlag(true)
  }

  const locale = ref<App.I18n.LangType>(localStg.get('lang') || 'zh-CN')

  const localeOptions: App.I18n.LangOption[] = [
    {
      label: '中文',
      key: 'zh-CN'
    },
    {
      label: 'English',
      key: 'en-US'
    }
  ]

  function changeLocale(lang: App.I18n.LangType) {
    locale.value = lang
    setLocale(lang)
    localStg.set('lang', lang)
  }

  function updateDocumentTitleByLocale() {
    const { i18nKey, title } = router.currentRoute.value.meta

    const documentTitle = i18nKey ? $t(i18nKey) : title

    useTitle(documentTitle)
  }

  function init() {
    setDayjsLocale(locale.value)
  }

  scope.run(() => {
    watch(
      isMobile,
      newValue => {
        if (newValue) {
          setSiderCollapse(true)
          themeStore.setThemeLayout('vertical')
        }
      },
      {
        immediate: true
      }
    )

    watch(locale, () => {
      updateDocumentTitleByLocale()
      routeStore.updateGlobalMenusByLocale()
      tabStore.updateTabsByLocale()
      setDayjsLocale(locale.value)
    })
  })

  onScopeDispose(() => {
    scope.stop()
  })
  init()

  return {
    isMobile,
    reloadFlag,
    reloadPage,
    fullContent,
    locale,
    localeOptions,
    changeLocale,
    themeDrawerVisible,
    openThemeDrawer,
    closeThemeDrawer,
    toggleFullContent,
    contentXScrollable,
    setContentXScrollable,
    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,
    mixSiderFixed,
    setMixSiderFixed,
    toggleMixSiderFixed
  }
})
