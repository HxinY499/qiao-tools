<template>
  <div class="flex flex-col h-[100vh] w-[100vw] box-border">
    <PageHeader title="Babel Ast Playground">

      <ADropdown @select="(outputFormatChange as any)" trigger="hover">
        <AButton v-show="previewRef?.tabKey === 'code'">
          {{ outputFormat }}
          <ATooltip content="输出代码的类型" position="br">
            <IconQuestionCircle class="cursor-help ml-1" />
          </ATooltip>
        </AButton>
        <template #content>
          <template v-for="lang in shikiLanguages" :key="lang">
            <ADoption :value="lang">{{ lang }}</ADoption>
          </template>
        </template>
      </ADropdown>

      <AButton :type="wholeAst ? 'outline' : 'secondary'" @click="wholeAst = !wholeAst"
        v-show="previewRef?.tabKey === 'json'">
        <span :class="wholeAst ? 'text-main' : 'text-textColor-2'">
          展示完整AST
          <ATooltip content="不选中时展示export default出来的AST，选中时展示包含File节点的完整AST" position="br">
            <IconQuestionCircle class="cursor-help" />
          </ATooltip>
        </span>
      </AButton>

      <ATooltip content="重置代码" position="br">
        <AButton @click="code = initialCode">
          <template #icon>
            <IconRefresh />
          </template>
        </AButton>
      </ATooltip>
    </PageHeader>
    <a-split class="size-full flex-1 min-h-0" min="80px" default-size="0.65">
      <template #first>
        <VueMonacoEditor @keydown.ctrl.s.prevent @keydown.meta.s.prevent language="typescript" v-model:value="code"
          path="babel-playground.ts" theme="vs-dark" @mount="onMonacoMount" :options="{
            fontSize: 13,
            tabSize: 2,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            minimap: {
              enabled: false,
            },
          }">
          <ASpin dot />
        </VueMonacoEditor>
      </template>
      <template #second>
        <Preview :sourceCode="code" :wholeAst="wholeAst" :outputFormat="outputFormat" ref="previewRef" />
      </template>
    </a-split>
  </div>
</template>

<script setup lang="ts">
import { Button as AButton, Doption as ADoption, Dropdown as ADropdown, Spin as ASpin, Split as ASplit, Tooltip as ATooltip } from '@arco-design/web-vue'
import { IconQuestionCircle, IconRefresh } from '@arco-design/web-vue/es/icon';
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { useStorage } from '@vueuse/core';
import { ref } from 'vue';

import { PageHeader } from '@/components';
import { Monaco, MonacoEditor } from '@/module';

import Preview from './Preview.vue';
import { initialCode, shikiLanguages, useExtraLibs } from './utils'

const editor = ref<MonacoEditor>()
const monaco = ref<Monaco>()
const previewRef = ref()
const code = useStorage<string>('BabelAstPlayground__code', initialCode, localStorage)
const wholeAst = useStorage('BabelAstPlayground__wholeAst', false, localStorage)
const outputFormat = useStorage<typeof shikiLanguages[number]>('BabelAstPlayground__outputFormat', 'typescript', localStorage)

useExtraLibs(monaco)

const onMonacoMount = async (editorInstance: MonacoEditor, monacoInstance: Monaco) => {
  editor.value = editorInstance;
  monaco.value = monacoInstance

  monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...monacoInstance.languages.typescript.typescriptDefaults.getCompilerOptions(),
    esModuleInterop: true,
    moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs
  })
}

const outputFormatChange = (val: typeof shikiLanguages[number]) => {
  outputFormat.value = val
}

</script>
