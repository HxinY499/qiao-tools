<script setup lang="ts">
import { ref } from 'vue';
import { onErrorCaptured } from 'vue';
import { RouterView } from 'vue-router'

import { StateOutput } from '@/components';

const err = ref<Error>()

onErrorCaptured((error) => {
  console.error('Error captured in App.vue:', error)

  err.value = error
})
</script>


<template>
  <div>
    <div v-if="err">
      <StateOutput content="抱歉，页面出错了🙇"></StateOutput>
    </div>

    <router-view v-else v-slot="{ Component }">
      <transition appear mode="out-in" name='fade'>
        <keep-alive :include="['ToolWrapper']">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>

</template>