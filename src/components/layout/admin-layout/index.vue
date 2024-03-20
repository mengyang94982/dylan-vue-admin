<template>
  <div
    class="relative h-full"
    :class="[commonClass]"
    :style="cssVars"
  >
    <div
      :id="isWrapperScroll ? scrollElId : undefined"
      class="flex flex-col h-full"
      :class="[commonClass, scrollWrapperClass, { 'overflow-y-auto': isWrapperScroll }]"
    >
      <!-- header -->
      <template v-if="showHeader">
        <header
          v-show="!fullContent"
          class="flex-shrink-0"
          :class="[
            style['layout-header'],
            commonClass,
            headerClass,
            headerLeftGapClass,
            { 'absolute top-0 left-0 w-full': fixedHeaderAndTab }
          ]"
        >
          <slot name="header" />
        </header>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          class="flex-shrink-0 overflow-hidden"
          :class="[style['layout-header-placement']]"
        ></div>
      </template>
      <!-- tab -->
      <template v-if="showTab">
        <div
          class="flex-shrink-0"
          :class="[
            style['layout-tab'],
            commonClass,
            tabClass,
            { 'top-0i': fullContent || !showHeader },
            leftGapClass,
            { 'absolute left-0 w-full': fixedHeaderAndTab }
          ]"
        >
          <slot name="tab" />
        </div>
        <div
          v-show="fullContent || fixedHeaderAndTab"
          class="flex-shrink-0 overflow-hidden"
          :class="[style['layout-tab-placement']]"
        ></div>
      </template>
      <!-- Sider -->
      <template v-if="showSider">
        <aside
          v-show="!fullContent"
          class="absolute left-0 top-0 h-full"
          :class="[
            commonClass,
            siderClass,
            siderPaddingClass,
            siderCollapse ? style['layout-sider_collapsed'] : style['layout-sider']
          ]"
        >
          <slot name="sider" />
        </aside>
      </template>
      <!-- Mobile Sider  -->
      <template v-if="showMobileSider">
        <aside
          class="absolute left-0 top-0 w-0 h-full bg-white"
          :class="[
            commonClass,
            mobileSiderClass,
            style['layout-mobile-sider'],
            siderCollapse ? 'overflow-hidden' : style['layout-sider']
          ]"
        >
          <slot name="sider" />
        </aside>
        <div
          v-show="!siderCollapse"
          class="absolute left-0 top-0 w-full h-full bg-black]"
          :class="[style['layout-mobile-sider-mask']]"
          @click="handleClickMask"
        ></div>
      </template>
      <!-- main -->
      <main
        :id="isContentScroll ? scrollElId : undefined"
        class="flex flex-col flex-grow"
        :class="[commonClass, contentClass, leftGapClass, { 'overflow-y-auto': isContentScroll }]"
      >
        <slot />
      </main>
      <!-- footer -->
      <template v-if="showFooter">
        <footer
          v-show="!fullContent"
          class="flex-shrink-0"
          :class="[
            style['layout-footer'],
            commonClass,
            footerClass,
            footerLeftGapClass,
            { 'absolute left-0 bottom-0 w-full': fixedFooter }
          ]"
        >
          <slot name="footer" />
        </footer>
        <div
          v-show="!fullContent && fixedFooter"
          class="flex-shrink-0 overflow-hidden"
          :class="[style['layout-footer-placement']]"
        ></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AdminLayoutProps, Emits } from './types'
import { LAYOUT_MAX_Z_INDEX, LAYOUT_SCROLL_EL_ID, createLayoutCssVars } from './shared'
import style from './index.module.css'

defineOptions({
  name: 'AdminLayout'
})

const props = withDefaults(defineProps<AdminLayoutProps>(), {
  mode: 'vertical',
  scrollMode: 'content',
  scrollElId: LAYOUT_SCROLL_EL_ID,
  commonClass: 'transition-all-300',
  fixedTop: true,
  maxZIndex: LAYOUT_MAX_Z_INDEX,
  headerVisible: true,
  headerHeight: 56,
  tabVisible: true,
  tabHeight: 48,
  siderVisible: true,
  siderCollapse: false,
  siderWidth: 220,
  siderCollapsedWidth: 64,
  footerVisible: true,
  footerHeight: 48,
  rightFooter: false
})

const emit = defineEmits<Emits>()

type SlotFn = (props?: Record<string, unknown>) => any

type Slots = {
  default?: SlotFn
  header?: SlotFn
  tab?: SlotFn
  sider?: SlotFn
  footer?: SlotFn
}

const slots = defineSlots<Slots>()

const cssVars = computed(() => createLayoutCssVars(props))

const showHeader = computed(() => Boolean(slots.header) && props.headerVisible)
const showTab = computed(() => Boolean(slots.tab) && props.tabVisible)
const showSider = computed(() => !props.isMobile && Boolean(slots.sider) && props.siderVisible)
const showMobileSider = computed(() => props.isMobile && Boolean(slots.sider) && props.siderVisible)
const showFooter = computed(() => Boolean(slots.footer) && props.footerVisible)

// scroll mode
const isWrapperScroll = computed(() => props.scrollMode === 'wrapper')
const isContentScroll = computed(() => props.scrollMode === 'content')

// layout direction
const isVertical = computed(() => props.mode === 'vertical')
const isHorizontal = computed(() => props.mode === 'horizontal')

const fixedHeaderAndTab = computed(() => props.fixedTop || (isHorizontal.value && isWrapperScroll.value))

// css
const leftGapClass = computed(() => {
  if (!props.fullContent && showSider.value) {
    return props.siderCollapse ? style['left-gap_collapsed'] : style['left-gap']
  }
  return ''
})

const headerLeftGapClass = computed(() => (isVertical.value ? leftGapClass.value : ''))

const footerLeftGapClass = computed(() => {
  const condition1 = isVertical.value
  const condition2 = isHorizontal.value && isWrapperScroll.value && !props.fixedFooter
  const condition3 = Boolean(isHorizontal.value && props.rightFooter)

  if (condition1 || condition2 || condition3) {
    return leftGapClass.value
  }
  return ''
})

const siderPaddingClass = computed(() => {
  let cls = ''

  if (showHeader.value && !headerLeftGapClass.value) {
    cls += style['sider-padding-top']
  }
  if (showFooter.value && !footerLeftGapClass.value) {
    cls += ` ${style['sider-padding-bottom']}`
  }

  return cls
})

function handleClickMask() {
  emit('update:siderCollapse', true)
}
</script>

<style scoped>
.relative {
  position: relative;
}
.transition-all-300 {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.h-full {
  height: 100%;
}
.overflow-y-auto {
  overflow-y: auto;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.absolute {
  position: absolute;
}
.top-0 {
  top: 0;
}
.left-0 {
  left: 0;
}
.w-full {
  width: 100%;
}
.overflow-hidden {
  overflow: hidden;
}
.top-0i {
  top: 0 !important;
}
.w-0 {
  width: 0;
}
.bg-white {
  background-color: rgb(255 255 255);
}
.bg-black {
  background: rgba(0, 0, 0, 0.2);
}
.flex-grow {
  flex-grow: 1;
}
.bottom-0 {
  bottom: 0;
}
</style>
