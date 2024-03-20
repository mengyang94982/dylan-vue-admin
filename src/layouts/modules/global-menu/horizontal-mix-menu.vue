<template>
  <FirstLevelMenu
    :active-menu-key="activeFirstLevelMenuKey"
    @select="handleSelectMixMenu"
  >
    <slot></slot>
  </FirstLevelMenu>
</template>

<script setup lang="ts">
import { useRouterPush } from '@/hooks/common/router'
import { useMixMenuContext } from '@/layouts/hooks/use-mix-menu'
import FirstLevelMenu from '@/layouts/modules/global-menu/first-level-menu.vue'

defineOptions({
  name: 'HorizontalMixMenu'
})

const { activeFirstLevelMenuKey, setActiveFirstLevelMenuKey } = useMixMenuContext()

const { routerPushByKey } = useRouterPush()

function handleSelectMixMenu(menu: App.Global.Menu) {
  setActiveFirstLevelMenuKey(menu.key)
  if (!menu.children?.length) {
    routerPushByKey(menu.routeKey)
  }
}
</script>

<style scoped></style>
