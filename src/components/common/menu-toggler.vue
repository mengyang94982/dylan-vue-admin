<template>
  <ButtonIcon :tooltip-content='collapsed?$t("icon.expand"):$t("icon.collapse")' tooltip-placement='bottom-start'>
    <SvgIcon :icon='icon' />
  </ButtonIcon>
</template>

<script
  setup
  lang="ts"
>
import {computed, defineOptions} from 'vue'
import {$t} from '@/locales'

defineOptions({
  name:'MenuToggler'
})

interface Props{
  collapsed?:boolean
  arrowIcon?:boolean
}

const props=defineProps<Props>()

type NumberBool=0|1

const icon=computed(()=>{
  const icons: Record<NumberBool, Record<NumberBool, string>> = {
    0: {
      0: 'line-md:menu-fold-left',
      1: 'line-md:menu-fold-right'
    },
    1: {
      0: 'ph-caret-double-left-bold',
      1: 'ph-caret-double-right-bold'
    }
  };

  const arrowIcon=Number(props.arrowIcon || false) as NumberBool
  const collapsed=
})
</script>

<style scoped>

</style>
