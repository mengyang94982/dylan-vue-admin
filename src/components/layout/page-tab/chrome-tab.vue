<template>
  <div
    class=":dy: relative inline-flex justify-center items-center gap-16px -mr-18px px-24px py-6px cursor-pointer whitespace-nowrap"
    :class="[
      style['chrome-tab'],
      { [style['chrome-tab_dark']]: darkMode },
      { [style['chrome-tab_active']]: active },
      { [style['chrome-tab_active_dark']]: active && darkMode }
    ]"
  >
    <div
      class=":soy: absolute left-0 top-0 -z-1 w-full h-full pointer-events-none"
      :class="[style['chrome-tab__bg']]"
    >
      <ChromeTagBg />
    </div>
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
    <div
      class=":soy: absolute right-7px w-1px h-16px bg-#1f2225"
      :class="[style['chrome-tab-divider']]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { PageTabProps } from './types'
import ChromeTagBg from './chrome-tab-bg.vue'
import style from './index.module.css'

defineOptions({
  name: 'ChromeTab'
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
.gap-16px {
  gap: 16px;
}
.-mr-18px {
  margin-right: -18px;
}
.px-24px {
  padding-left: 24px;
  padding-right: 24px;
}
.py-6px {
  padding-top: 6px;
  padding-bottom: 6px;
}
.cursor-pointer {
  cursor: pointer;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.absolute {
  position: absolute;
}
.left-0 {
  left: 0;
}
.top-0 {
  top: 0;
}
.-z-1 {
  z-index: -1;
}
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.pointer-events-none {
  pointer-events: none;
}
.right-7px {
  right: 7px;
}
.w-1px {
  width: 1px;
}
.h-16px {
  height: 16px;
}
.bg-#1f2225 {
  background: #1f2225;
}
</style>
