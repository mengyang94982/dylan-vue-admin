<template>
  <div class='base-layout'>
    <RouterView v-slot="{ Component, route }">
      <component
        :is="Component"
        class="flex-grow bg-layout transition-300"
      />
    </RouterView>
  </div>
</template>

<script
  setup
  lang="ts"
>

</script>

<style scoped>

</style>
