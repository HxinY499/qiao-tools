<script lang="ts">
import { Tooltip } from '@arco-design/web-vue'
import { IconHome } from '@arco-design/web-vue/es/icon'
import { RouterView } from 'vue-router'

import { StateOutput } from '@/components'
import useGlobalStore from '@/store/global'

export default {
  components: {
    RouterView, IconHome, Tooltip, StateOutput
  },
  name: 'ToolWrapper',
  setup() {
    const store = useGlobalStore()

    return { store }
  }
}
</script>

<template>
  <div>
    <router-view router-view v-slot="{ Component }">
      <suspense :timeout="200">
        <!-- <transition mode="out-in" :name="route.meta.transition ?? 'fade'"> -->
        <keep-alive :include="store.keepAliveComponents">
          <component :is="Component"></component>
        </keep-alive>
        <!-- </transition> -->

        <template #fallback>
          <StateOutput content="加载中，请稍等～～" animation></StateOutput>
        </template>
      </suspense>
    </router-view>
  </div>
</template>

<style scoped>
.btn {
  font-size: 18px;
}
</style>
