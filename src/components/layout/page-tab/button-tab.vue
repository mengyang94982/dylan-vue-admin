<template>
  <div
    class=":soy: relative inline-flex justify-center items-center gap-12px px-12px py-4px border-1px border-solid rounded-4px cursor-pointer whitespace-nowrap"
    :class="[
      style['button-tab'],
      { [style['button-tab_dark']]: darkMode },
      { [style['button-tab_active']]: active },
      { [style['button-tab_active_dark']]: active && darkMode }
    ]"
  >
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="suffix"></slot>
  </div>
</template>

<script setup lang="ts">
import type { PageTabProps } from './types'
import style from './index.module.css'

defineOptions({
  name: 'ButtonTab'
})

defineProps<PageTabProps>()

type SlotFn = (props?: Record<string, unknown>) => any
type Slots = {
  default?: SlotFn
  prefix?: SlotFn
  suffix?: SlotFn
}
defineSlots<Slots>()
</script>

<style scoped>
.relative {
  position: relative;
}
.inline-flex {
  display: inline-flex;
}
.justify-center {
  justify-content: center;
}
.items-center {
  align-items: center;
}
.gap-12px {
  gap: 12px;
}
.px-12px {
  padding-left: 12px;
  padding-right: 12px;
}
.py-4px {
  padding-top: 4px;
  padding-bottom: 4px;
}
.border-1px {
  border-width: 1px;
}
.border-solid {
  border-style: solid;
}
.rounded-4px {
  border-radius: 4px;
}
.cursor-pointer {
  cursor: pointer;
}
.whitespace-nowrap {
  white-space: nowrap;
}
</style>
