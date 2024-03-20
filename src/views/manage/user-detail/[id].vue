<template>
  {{ id }}
  <LookForward />
</template>

<script setup lang="ts">
interface Props {
  id: string
}

defineProps<Props>()
</script>

<style scoped></style>
