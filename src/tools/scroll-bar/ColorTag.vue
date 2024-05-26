<script setup lang="ts">
import { Tag } from '@arco-design/web-vue';
import {
  IconBgColors,
  IconCloseCircleFill,
} from '@arco-design/web-vue/es/icon';
import { defineProps, withDefaults } from 'vue';
import { nextTick } from 'vue';

withDefaults(defineProps<{ color: string }>(), {});

const emit = defineEmits(['update:color'])

const onClear = () => {
  emit('update:color', 'transparent')
  nextTick(() => {
    emit('update:color', 'transparent')
  })
}

</script>

<template>
  <Tag :color="color" size="large" class="group/color-tag cursor-pointer"
    :style="{ 'border-width': 1, 'border-color': color === 'transparent' ? '#000' : 'transparent' }">
    <template #icon>
      <IconBgColors :style="{ color: color === 'transparent' ? '#000' : '#fff' }" />
    </template>
    <span class="color-name">{{ color }}</span>
    <IconCloseCircleFill @click.stop="onClear" :style="{ color: color === 'transparent' ? '#000' : '#fff' }"
      class="clear-icon opacity-0 group-hover/color-tag:opacity-100 ml-2 p-[2px] box-content duration-100 rounded-full shadow-1xl" />
  </Tag>
</template>

<style lang="less" scoped>
.color-name {
  text-shadow: 0 0 1px #000000;
}
</style>