<script setup lang="ts">
import { Button, ButtonProps as ArcoButtonProps } from '@arco-design/web-vue'
import { IconCheck, IconCopy } from '@arco-design/web-vue/es/icon'
import { ref } from 'vue';

const copyFeedback = ref(false)

interface Props {
  content?: MaybeGetter<string | ClipboardItem | ClipboardItems>,
  /** 
   * 复制成功后，恢复显示复制按钮的延迟，单位毫秒
   * @default 2000
   */
  recoverDelay?: number,
  buttonText?: string,
  successButtonText?: string,
  arcoProps?: ArcoButtonProps
  onDone?: () => any,
  onError?: (err: any) => any
}

const props = withDefaults(defineProps<Props>(), { content: '', recoverDelay: 2000, buttonText: 'copy', successButtonText: 'copied!' })

const onCopy = () => {
  if (copyFeedback.value) return
  let promise
  const realContent = typeof props.content === 'function' ? props.content() : props.content
  if (typeof realContent === 'string') {
    promise = navigator.clipboard.writeText(realContent)
  } else {
    promise = navigator.clipboard.write(Array.isArray(realContent) ? realContent : [realContent])
  }
  promise.then(
    () => {
      props.onDone?.();
    },
    (err) => {
      props.onError?.(err);
    },
  )
  copyFeedback.value = true
  setTimeout(() => {
    copyFeedback.value = false
  }, 2000)
}
</script>

<template>
  <Button @click.stop="onCopy" type="text" class="copy-button text-[16px]" v-bind="arcoProps">
    <template v-if="copyFeedback">
      <slot name="success" v-if="$slots.success"></slot>
      <span v-else class="text-[#00B42A]">
        <IconCheck />
        {{ successButtonText }}
      </span>
    </template>
    <template v-else>
      <slot v-if="$slots.default"></slot>
      <span v-else class="text-[#000]">
        <IconCopy />
        {{ buttonText }}
      </span>
    </template>
  </Button>
</template>