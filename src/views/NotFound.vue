<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
onMounted(() => {
  document.title = '迷路了~ 🤡'
})

onUnmounted(() => {
  document.title = 'Qiao Tools'
})


</script>

<template>
  <div class="fixed m-auto left-0 right-0 top-0 bottom-0 flex justify-center items-center flex-col gap-9">
    <img src="/qiao-tools.svg" class="size-[240px]" />
    <div class="text-4xl">迷路了~ 🤡</div>
    <button role="link" @click="$router.push('/')"
      class="relative after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-main after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100 hover:text-main duration-500">
      回到主页
    </button>
  </div>
</template>

<style scoped></style>
