<template>
  <div class="flex-1-hidden h-full">
    <Simplebar>
      <slot />
    </Simplebar>
  </div>
</template>

<script setup lang="ts">
import Simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'
</script>

<style scoped></style>
