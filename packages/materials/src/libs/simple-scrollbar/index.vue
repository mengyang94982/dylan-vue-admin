<template>
  <div class="flex-1-hidden h-full">
    <Simplebar class="h-full">
      <slot />
    </Simplebar>
  </div>
</template>

<script setup lang="ts">
import Simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';

defineOptions({
  name: 'SimpleScrollbar'
});
</script>

<style scoped></style>
