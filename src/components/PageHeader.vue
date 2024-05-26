<script setup lang="ts">
import { withDefaults } from 'vue'

withDefaults(defineProps<{ title?: string, titleType?: '1' | '2' }>(), {
  titleType: '1'
})
</script>

<template>
  <div
    class="page-header relative max-h-[70px] min-h-[55px] px-[25px] flex items-center border-b-[1px] border-b-borderColor-1">
    <div class="flex justify-center items-center gap-2">
      <img src="/qiao-tools.svg" class="inline-block w-[20px] cursor-pointer" @click="$router.push('/')" />
      <span v-if="titleType === '1'"
        class="ml-[5px] text-[18px] font-medium border-l-[1px] border-l-borderColor-1 pl-2">{{ title }}</span>
      <h1 v-else-if="titleType === '2'"
        class="absolute top-0 bottom-0 left-0 right-0 m-auto text-[15px] w-max cursor-default p-[10px_20px] bg-[#eeeeef] font-medium rounded-3xl h-[36px] flex items-center justify-center">
        {{ title }}
      </h1>
    </div>

    <div class="ml-auto flex justify-center items-center gap-2">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.btn {
  font-size: 18px;
}
</style>
