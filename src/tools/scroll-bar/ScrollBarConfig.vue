<script lang="ts">

import { Button, ColorPicker, InputNumber, Radio, RadioGroup, Switch, Tooltip } from '@arco-design/web-vue'
import { IconCheck, IconClose } from '@arco-design/web-vue/es/icon'
import { useStorage } from '@vueuse/core'
import { codeToHtml } from 'shiki'
import { computed, defineComponent, h, ref, watch } from 'vue'
import { nextTick } from 'vue'

import { ToolName } from '@/all-tool'
import { CopyButton, PageHeader } from '@/components'

import ColorTag from './ColorTag.vue'
import type { ConfigType } from './utils'
import { initConfig } from './utils'

const SettingCard = defineComponent((props, { slots }) => {

  return () => h('div', [
    h('div', { class: 'flex gap-2 items-end mb-2' }, [
      h('span', { class: 'text-[20px] font-bold' }, [props.title]),
      h('span', { class: 'text-[15px] text-textColor-3' }, [props.secondTitle])
    ]),
    h('div', { class: 'grid grid-cols-2 gap-[8px_35px]' }, [slots.default?.()]),
  ])
}, {
  props: {
    title: {
      type: String,
    },
    secondTitle: {
      type: String,
    }
  }
})

export default {
  name: ToolName.ScrollBarConfig,
  components: {
    PageHeader,
    CopyButton,
    SettingCard,
    Tooltip,
    InputNumber,
    ColorPicker,
    ColorTag,
    ASwitch: Switch,
    IconCheck,
    IconClose,
    RadioGroup,
    Radio,
    AButton: Button,
  },
  setup() {

    const config = useStorage<ConfigType>('Scrollbar__config', initConfig, localStorage, { deep: true })
    const hasHorizontal = useStorage('Scrollbar__hasHorizontal', false)
    const showWhenHover = useStorage('Scrollbar__showWhenHover', false)
    const cssCode = ref('')
    const codeContainer = ref()

    const scrollStyle = computed(() => {
      return {
        '--sb-width': `${config.value.scrollbar.width}px`,
        '--sb-track-border-width': `${config.value.track['border-width']}px`,
        '--sb-track-border-radius': `${config.value.track['border-radius']}px`,
        '--sb-track-border-style': `${config.value.track['border-style']}`,
        '--sb-track-border-color': `${config.value.track['border-color']}`,
        '--sb-track-background-color': `${config.value.track['background-color']}`,
        '--sb-thumb-border-width': `${config.value.thumb['border-width']}px`,
        '--sb-thumb-border-radius': `${config.value.thumb['border-radius']}px`,
        '--sb-thumb-border-style': `${config.value.thumb['border-style']}`,
        '--sb-thumb-border-color': `${config.value.thumb['border-color']}`,
        '--sb-thumb-background-color': `${config.value.thumb['background-color']}`,
        '--sb-corner-background-color': `${config.value.corner['background-color']}`,
      }
    })

    watch([config, hasHorizontal, showWhenHover], async ([_config]) => {

      cssCode.value = `
.code-area::-webkit-scrollbar {
    width: ${_config.scrollbar.width}px; ${hasHorizontal.value ? `\n    height: ${_config.scrollbar.width}px;` : ''}; ${showWhenHover.value ? `\n    visibility: hidden;` : ''}
}

.code-area::-webkit-scrollbar-track {
    border: ${_config.track['border-width']}px ${_config.track['border-style']} ${_config.track['border-color']};
    border-radius: ${_config.track['border-radius']}px;
    background-color: ${_config.track['background-color']}; ${showWhenHover.value ? `\n    visibility: hidden;` : ''}
}

.code-area::-webkit-scrollbar-thumb {
    border: ${_config.thumb['border-width']}px ${_config.thumb['border-style']} ${_config.thumb['border-color']};
    border-radius: ${_config.thumb['border-radius']}px;
    background-color: ${_config.thumb['background-color']}; ${showWhenHover.value ? `\n    visibility: hidden;` : ''}
}

.code-area::-webkit-scrollbar-corner {
    background-color: ${_config.corner['background-color']};
}

${showWhenHover.value ? `
.code-area:hover::-webkit-scrollbar-track,
.code-area:hover::-webkit-scrollbar-thumb,
.code-area:hover::-webkit-scrollbar {
  visibility: visible;
}
` : ''}
`

      await nextTick()
      const shikiHtml = await codeToHtml(cssCode.value, {
        lang: 'css',
        theme: 'github-light'
      })
      codeContainer.value.innerHTML = shikiHtml
    }, { deep: true, immediate: true })

    const resetConfig = () => {
      config.value = { ...initConfig }
    }

    return { config, cssCode, scrollStyle, codeContainer, hasHorizontal, resetConfig, showWhenHover }
  }
}

</script>

<template>
  <div class="flex flex-col h-[100vh] w-[100vw] box-border" :style="scrollStyle">
    <PageHeader title="scroll-bar可视化"></PageHeader>
    <div class="page-content flex-1 overflow-auto">
      <div class="flex items-center flex-wrap justify-center gap-[20px]">
        <!-- setting-area -->
        <div class="p-6 flex flex-col gap-9 relative border-borderColor-2 border-r">
          <Tooltip content="恢复默认" position="right">
            <AButton class="reset-btn w-[50px] right-3 top-4" type="text" @click="resetConfig">
              <img src="/icon/init-brush.svg" />
            </AButton>
          </Tooltip>
          <SettingCard title="主体" second-title="scrollbar">
            <div>
              <div class="leading-7">width</div>
              <InputNumber mode="button" :min="0" v-model:model-value="config.scrollbar.width"
                :style="{ width: '150px' }">
                <template #suffix>
                  px
                </template>
              </InputNumber>
            </div>
          </SettingCard>
          <SettingCard title="轨道" second-title="track">
            <div>
              <div class="leading-7">background-color</div>
              <ColorPicker v-model:model-value="config.track['background-color']">
                <ColorTag v-model:color="config.track['background-color']" />
              </ColorPicker>
            </div>
            <div>
              <div class="leading-7">border-color</div>
              <ColorPicker v-model:model-value="config.track['border-color']">
                <ColorTag v-model:color="config.track['border-color']" />
              </ColorPicker>
            </div>
            <div>
              <div class="leading-7">border-width</div>
              <InputNumber mode="button" :min="0" v-model:model-value="config.track['border-width']"
                :style="{ width: '150px' }">
                <template #suffix>
                  px
                </template>
              </InputNumber>
            </div>
            <div>
              <div class="leading-7">border-radius</div>
              <InputNumber mode="button" :min="0" v-model:model-value="config.track['border-radius']"
                :style="{ width: '150px' }">
                <template #suffix>
                  px
                </template>
              </InputNumber>
            </div>
            <div class="col-span-2">
              <div class="leading-7">border-style</div>
              <RadioGroup type="button" v-model:model-value="config.track['border-style']">
                <Radio value="solid">solid</Radio>
                <Radio value="dashed">dashed</Radio>
                <Radio value="dotted">dotted</Radio>
                <Radio value="double">double</Radio>
              </RadioGroup>
            </div>
          </SettingCard>
          <SettingCard title="滑块" second-title="thumb">
            <div>
              <div class="leading-7">background-color</div>
              <ColorPicker v-model:model-value="config.thumb['background-color']">
                <ColorTag v-model:color="config.thumb['background-color']" />
              </ColorPicker>
            </div>
            <div>
              <div class="leading-7">border-color</div>
              <ColorPicker v-model:model-value="config.thumb['border-color']">
                <ColorTag v-model:color="config.thumb['border-color']" />
              </ColorPicker>
            </div>
            <div>
              <div class="leading-7">border-width</div>
              <InputNumber mode="button" :min="0" :style="{ width: '150px' }"
                v-model:model-value="config.thumb['border-width']">
                <template #suffix>
                  px
                </template>
              </InputNumber>
            </div>
            <div>
              <div class="leading-7">border-radius</div>
              <InputNumber mode="button" :min="0" :style="{ width: '150px' }"
                v-model:model-value="config.thumb['border-radius']">
                <template #suffix>
                  px
                </template>
              </InputNumber>
            </div>
            <div class="col-span-2">
              <div class="leading-7">border-style</div>
              <RadioGroup type="button" v-model:model-value="config.thumb['border-style']">
                <Radio value="solid">solid</Radio>
                <Radio value="dashed">dashed</Radio>
                <Radio value="dotted">dotted</Radio>
                <Radio value="double">double</Radio>
              </RadioGroup>
            </div>
          </SettingCard>
          <SettingCard title="拐角" second-title="corner">
            <div>
              <div class="leading-7">background-color</div>
              <ColorPicker v-model:model-value="config.corner['background-color']">
                <ColorTag v-model:color="config.corner['background-color']" />
              </ColorPicker>
            </div>
          </SettingCard>
        </div>

        <!-- code-area -->
        <div class="p-6"
          :style="{ '--code-area-width': hasHorizontal ? '1000px' : 'max-content', '--sb-visibility': showWhenHover ? 'hidden' : 'visible' }">
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <h2 class="text-[24px] font-bold mb-2">CSS Code</h2>
              <CopyButton :content="cssCode"></CopyButton>
            </div>
            <div class="code-area text-[16px] border border-borderColor-1 size-[450px] overflow-auto px-4">
              <div ref="codeContainer" :style="{ width: hasHorizontal ? '1000px' : '100%' }"></div>
            </div>
          </div>

          <div class="flex gap-2 justify-end">
            <ASwitch v-model:model-value="showWhenHover" type="round" size='medium' checked-text="hover时显示"
              unchecked-text="一直显示">
              <template #checked-icon>
                <IconCheck />
              </template>
              <template #unchecked-icon>
                <IconClose />
              </template>
            </ASwitch>

            <ASwitch v-model:model-value="hasHorizontal" type="round" size='medium' checked-text="有横向"
              unchecked-text="无横向">
              <template #checked-icon>
                <IconCheck />
              </template>
              <template #unchecked-icon>
                <IconClose />
              </template>
            </ASwitch>
          </div>


        </div>
      </div>
    </div>
  </div>

</template>



<style scoped lang="less">
.code-area {
  &:deep(code) {
    background: transparent;
    overflow: hidden;
    padding: 0;
    width: var(--code-area-width);
    line-height: 30px;
  }
}

.page-content,
.code-area {
  &::-webkit-scrollbar {
    width: var(--sb-width);
    height: var(--sb-width);
    visibility: var(--sb-visibility);
  }

  &::-webkit-scrollbar-track {
    background-color: var(--sb-track-background-color);
    border: var(--sb-track-border-width) var(--sb-track-border-style) var(--sb-track-border-color);
    border-radius: var(--sb-track-border-radius);
    visibility: var(--sb-visibility);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--sb-thumb-background-color);
    border: var(--sb-thumb-border-width) var(--sb-thumb-border-style) var(--sb-thumb-border-color);
    border-radius: var(--sb-thumb-border-radius);
    visibility: var(--sb-visibility);
  }

  &::-webkit-scrollbar-corner {
    background-color: var(--sb-corner-background-color);
  }

  &:hover::-webkit-scrollbar-track,
  &:hover::-webkit-scrollbar-thumb,
  &:hover::-webkit-scrollbar {
    visibility: visible;
  }
}

:deep(.reset-btn) {
  position: absolute !important;
}

:deep(.arco-radio-group-button) {
  width: 100%;

  .arco-radio-button {
    flex: 1;

    .arco-radio-button-content {
      text-align: center;
    }
  }
}
</style>
