<template>
  <NPopover
    placement="bottom-end"
    trigger="click"
  >
    <template #trigger>
      <NButton size="small">
        <template #icon>
          <icon-ant-design-setting-outlined class="text-icon" />
        </template>
        {{ $t('common.columnSetting') }}
      </NButton>
    </template>
    <VueDraggable v-model="columns">
      <div
        v-for="item in columns"
        :key="item.key"
        class="flex-y-center h-36px hover:(bg-primary bg-opacity-20) rd-4px"
      >
        <icon-mdi-drag class="mr-8px text-icon cursor-move" />
        <NCheckbox v-model:checked="item.checked">
          {{ item.title }}
        </NCheckbox>
      </div>
    </VueDraggable>
  </NPopover>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { $t } from '@/locales'
import type { FilteredColumn } from '@/hooks/common/table'

defineOptions({
  name: 'TableColumnSetting'
})
const columns = defineModel<FilteredColumn[]>('columns', {
  required: true
})
</script>

<style lang="less" scoped></style>
