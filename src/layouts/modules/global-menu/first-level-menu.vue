<template>
  <DefineMixMenuItem v-slot="{ label, icon, active, isMini }">
    <div
      class="flex-vertical-center mx-4px mb-6px px-8px px-4px rounded-8px bg-transparent transition-300 cursor-pointer hover:bg-[rgb(0,0,0,0.08)]"
      :class="{
        'text-primary selected-mix-menu': active,
        'text-white:65 hover:text-white': inverted,
        '!text-white !bg-primary': active && inverted
      }"
    >
      <component
        :is="icon"
        :class="[isMini ? 'text-icon-smail' : 'text-icon-large']"
      />
      <p
        class="w-full text-center ellipsis-text text012px transition-height-300"
        :class="[isMini ? 'h-0 pt-0' : 'h-24px pt-4px']"
      >
        {{ label }}
      </p>
    </div>
  </DefineMixMenuItem>
  <div class="flex-1-hidden flex-vertical-stretch h-full">
    <slot></slot>
    <SimpleScrollbar>
      <MixMenuItem
        v-for="menu in routeStore.menus"
        :key="menu.key"
        :label="menu.label"
        :icon="menu.icon"
        :active="menu.key === activeMenuKey"
        :is-mini="appStore.siderCollapse"
        @click="handleClickMixMenu(menu)"
      />
    </SimpleScrollbar>
    <MenuToggler
      arrow-icon
      :collapsed="appStore.siderCollapse"
      :class="{ 'text-white:88 !hover:text-white': inverted }"
      @click="appStore.toggleSiderCollapse"
    />
  </div>
</template>

<script setup lang="ts">
// import { SimpleScrollbar } from '@sa/materials'
import { transformColorWithOpacity } from '@sa/utils'
import { createReusableTemplate } from '@vueuse/core'
import { computed } from 'vue'
import SimpleScrollbar from '@/components/layout/simple-scrollbar/index'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
import { useRouteStore } from '@/store/modules/route'

defineOptions({
  name: 'FirstLevelMenu'
})

interface Props {
  activeMenuKey?: string
  inverted?: boolean
}

defineProps<Props>()

interface Emits {
  (e: 'select', menu: App.Global.Menu): boolean
}

const emit = defineEmits<Emits>()

const appStore = useAppStore()
const themeStore = useThemeStore()
const routeStore = useRouteStore()

interface MixMenuItemProps {
  label: App.Global.Menu['label']
  icon: App.Global.Menu['icon']
  active: boolean
  isMini: boolean
}

const [DefineMixMenuItem, MixMenuItem] = createReusableTemplate<MixMenuItemProps>()

const selectedBgColor = computed(() => {
  const { darkMode, themeColor } = themeStore
  const light = transformColorWithOpacity(themeColor, 0.1, '#ffffff')
  const dark = transformColorWithOpacity(themeColor, 0.3, '#000000')
  return darkMode ? dark : light
})

function handleClickMixMenu(menu: App.Global.Menu) {
  emit('select', menu)
}
</script>

<style lang="scss" scoped>
.selected-mix-menu {
  background-color: v-bind(selectedBgColor);
}
</style>
