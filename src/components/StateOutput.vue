<script lang="ts" setup>
defineProps<{ content?: string, animation?: boolean }>()
</script>

<template>
  <div class="fixed w-[100vw] h-[100vh] flex items-center justify-center">
    <div :class="`${animation ? 'animate-rotational-wave' : ''} flex flex-col items-center gap-5 w-max h-max`">
      <img src="/qiao-tools.svg" class="inline-block w-[35px]" />
      <span class="ml-[5px] text-[18px]">{{ content }}</span>
    </div>
  </div>
</template>
