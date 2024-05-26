<script setup lang="ts">
import { Tooltip } from '@arco-design/web-vue';
import { IconLaunch } from '@arco-design/web-vue/es/icon';
import { computed } from 'vue';

const props = withDefaults(defineProps<{ item: ToolInfo | ToolInfo[] }>(), { item: () => [] })

const toolList = computed(() => Array.isArray(props.item) ? props.item : [props.item])

const gotoToolWithNewTab = (tool: ToolInfo) => {
  window.open(`${location.origin}/tools/${tool.path}`)
}
</script>

<template>
  <template v-for="(tool) in toolList" :key="tool.name">
    <div
      class="tool-card relative flex justify-center rounded-md cursor-pointer p-[20px] pb-[10px] shadow-1xl hover:animate-squeeze size-[200px]"
      @click="$router.push(`/tools/${tool.path}`)">
      <img :src="tool.cover" class="tool-card-cover size-[120px] min-h-0 object-contain" />
      <div class="tool-desc flex items-center flex-col gap-5 overflow-hidden absolute bottom-0 bg-[white] pt-3 px-3">
        <div class="text-[16px] font-medium text-center">{{ tool.title }}</div>
        <div class="text-center text-[14px] text-[#0000008e]">{{ tool.description }}</div>
      </div>

      <Tooltip content="在新标签页打开">
        <icon-launch @click.stop="gotoToolWithNewTab(tool)" :size="25"
          class="absolute right-0 top-0 hover:bg-[rgba(0,0,0,0.08)] rounded-[0_5px_0_0] cursor-pointer p-[3px] z-10" />
      </Tooltip>
    </div>
  </template>
</template>

<style scoped lang="less">
.tool-desc {
  height: 50px;
  transition: all 200ms ease-in-out;
  will-change: height, box-shadow;
}

.tool-card:hover {

  .tool-desc {
    height: 120px;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.05);
    border-radius: 0.375rem;
  }
}
</style>
