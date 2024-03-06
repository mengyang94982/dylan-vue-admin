<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <DefineGradientBg v-slot="{$slots,gradientColor}">
      <div class="px-16px pt-8px pb-4px rd-8px text-white" :style="{
        backgroundImage:gradientColor
      }">
        <component :is="$slots.default"/>
      </div>
    </DefineGradientBg>
    <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
      <NGi v-for="item in cardData" :key="item.key">
        <GradientBg :gradient-color="getGradientColor(item.color)" class="flex-1">
          <h3 class="text-16px">{{item.title}}</h3>
          <div class="flex justify-between pt-12px">
            <SvgIcon :icon="item.icon" class="text-32px" />
            <CountTo :prefix="item.unit" :start-value="1" :end-value="item.value" class="text-30px text-white dark:text-dark" />
          </div>
        </GradientBg>
      </NGi>
    </NGrid>
  </NCard>
</template>

<script setup lang="ts">

</script>


<style scoped>

</style>
