<template>
  <DefineMixMenuItem v-slot="{ label, icon, active, isMini }">
    <div
      class="flex-vertical-center mx-4px mb-6px px-8px px-4px rounded-8px bg-transparent transition-300 cursor-pointer hover:bg-[rgb(0,0,0,0.08)]"
      :class="{
        'text-primary selected-mix-menu': active,
        'text-white:65 hover:text-white': inverted,
        '!text-white !bg-primary': active && inverted,
      }"
    >
      <component
        :is="icon"
        :class="[isMini ? 'text-icon-smail' : 'text-icon-large']"
      />
      <p class="w-full text-center ellipsis-text text012px transition-height-300" :class="[isMini?'h-0 pt-0':'h-24px pt-4px']">
        {{label}}
      </p>
    </div>
  </DefineMixMenuItem>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
