<script setup lang="ts">
import allTools from '@/all-tool'
import ToolCard from '@/components/ToolCard.vue'

</script>

<template>
  <div>
    <header class="h-[70px] border-b-[1px] border-b-borderColor-1 flex justify-center items-center">
      <div class="hover:animate-rotational-wave h-[60px] inline-flex justify-center items-center gap-2 m-auto">
        <img src="/qiao-tools.svg" class="inline-block w-[25px]" />
        <h1 class="text-[25px] cursor-default ">qiao-tools</h1>
      </div>
    </header>
    <div class="p-[60px] flex gap-9 flex-wrap justify-center">
      <ToolCard :item="allTools" />
    </div>
  </div>
</template>
