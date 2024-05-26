<script setup lang="ts">
import 'vue-json-pretty/lib/styles.css';

import { Tabs as ATabs } from '@arco-design/web-vue'
import { IconCode, IconCodeBlock } from '@arco-design/web-vue/es/icon';
import { useDebounceFn } from '@vueuse/core';
import { codeToHtml } from 'shiki';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import VueJsonPretty from 'vue-json-pretty';

import { CopyButton } from '@/components';

import { shikiLanguages } from './utils';

const props = withDefaults(defineProps<{
  sourceCode: string;
  wholeAst?: boolean;
  outputFormat?: (typeof shikiLanguages)[number]
}>(), {
  sourceCode: '',
  outputFormat: 'typescript'
})

/** 先存起来，根据tabKey按需渲染，dirty为true说明需要内容已变更，需要渲染 */
const previewOriginContent = {
  code: {
    content: '',
    dirty: false
  },
  ast: {
    content: {},
    wholeAst: {},
    dirty: false
  }
}
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })

const tabKey = ref('code')
const error = ref<string>()
const jsonObj = ref({})

const renderCodeArea = async (force?: boolean) => {
  if (!previewOriginContent.code.dirty && !force) return

  const shikiHtml = await codeToHtml(previewOriginContent.code.content, {
    lang: props.outputFormat,
    theme: 'github-light'
  })
  document.getElementById('shiki-code')!.innerHTML = shikiHtml

  previewOriginContent.code.dirty = false
}
const renderJsonArea = (force?: boolean) => {
  if (!previewOriginContent.ast.dirty && !force) return

  jsonObj.value = props.wholeAst ? previewOriginContent.ast.wholeAst : previewOriginContent.ast.content
  previewOriginContent.ast.dirty = false
}

const renderPreview = () => {
  if (tabKey.value === 'code') {
    renderCodeArea()
  } else {
    renderJsonArea()
  }
}

watch(() => props.wholeAst, () => renderJsonArea(true))
watch(() => props.outputFormat, () => renderCodeArea(true))

onMounted(() => {
  worker.addEventListener('message', async ({ data }) => {
    if (data.success) {
      error.value = undefined
      previewOriginContent.ast = { content: data.ast, wholeAst: data.wholeAst, dirty: true }
      previewOriginContent.code = { content: data.targetCode, dirty: true }
      renderPreview()
    } else {
      error.value = data.message
    }
  })
})

watch(tabKey, () => renderPreview())

const postMessage = useDebounceFn((content: string) => {
  worker.postMessage({ sourceCode: content })
}, 1000)

watch(() => props.sourceCode, (newCode) => {
  postMessage(newCode)
}, { immediate: true })

onBeforeUnmount(() => {
  worker.terminate()
})

const copyContentGetter = () => {
  if (tabKey.value === 'code') {
    return previewOriginContent.code.content
  } else {
    return JSON.stringify(props.wholeAst ? previewOriginContent.ast.wholeAst : previewOriginContent.ast.content)
  }
}

defineExpose({ tabKey })

</script>

<template>
  <div class="size-full p-2" v-show="error">
    <pre
      class="bg-[#fef0f0] text-[#f56c6c] border-[2px] border-[#f56c6c] rounded-[5px] p-2 text-wrap"><code>{{ error }}</code></pre>
  </div>
  <ATabs v-show="!error" class="size-full" v-model:active-key="tabKey">
    <ATabPane key="code">
      <template #title>
        <IconCode /> Code
      </template>
      <div id="shiki-code"></div>
    </ATabPane>
    <a-tab-pane key="json">
      <template #title>
        <IconCodeBlock /> AST Json
      </template>
      <VueJsonPretty :data="jsonObj" showIcon class="h-max mb-10 json-pretty" />
    </a-tab-pane>
    <template #extra>
      <CopyButton class="mr-5 h-4" :content="copyContentGetter" />
    </template>
  </ATabs>
</template>

<style scoped lang="less">
:deep(.arco-tabs-content) {
  height: 100%;
  padding: 10px;

  &,
  #shiki-code pre,
  .json-pretty {
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      visibility: hidden;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: transparent;
      visibility: hidden;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #CACACA;
      visibility: hidden;
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }

    &:hover::-webkit-scrollbar-track,
    &:hover::-webkit-scrollbar-thumb,
    &:hover::-webkit-scrollbar {
      visibility: visible;
    }
  }

}

:deep(.arco-btn) {
  height: 25px !important;
}
</style>