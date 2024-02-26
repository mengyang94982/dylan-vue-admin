import {computed, eeffectScope, effectScope, onScopeDispose, ref, toRefs, watch} from "vue";
import type {Ref} from 'vue'
import {defineStore} from "pinia";

import {useEventListener,usePreferredColorScheme} from "@vueuse/core";
import {SetupStoreId} from "@/enum";
import {localStg} from "@/utils/storage";

export const useThemeStore=defineStore(SetupStoreId.Theme,()=>{
  const scope=effectScope()
  const osTheme=usePreferredColorScheme()

  const settings:Ref<App.Theme.ThemeSetting> = ref(initThemeSettings())

  const darkMode=computed(()=>{
    if (settings.value.themeScheme === 'auto') {
      return osTheme.value === 'dark'
    }
    return settings.value.themeScheme === 'dark'
  })
})
