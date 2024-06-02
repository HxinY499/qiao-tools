<script setup lang="ts">
import { Doption as ADoption, Dropdown as ADropdown } from '@arco-design/web-vue'
import { IconEmail, IconLaunch, IconWechat } from '@arco-design/web-vue/es/icon';

import allTools from '@/all-tool'
import { CopyButton } from '@/components';
import ToolCard from '@/components/ToolCard.vue'

const openWindow = (url: string) => {
  window.open(url)
}

</script>

<template>
  <div>
    <header class="h-[70px] border-b-[1px] border-b-borderColor-1 flex justify-center items-center px-5">
      <div class="hover:animate-rotational-wave h-[60px] inline-flex justify-center items-center gap-2 m-auto">
        <img src="/qiao-tools.svg" class="inline-block w-[25px]" />
        <h1 class="text-[25px] cursor-default ">qiao-tools</h1>
      </div>
      <div>
        <ADropdown>
          <div class="w-[25px] cursor-pointer hover:bg-borderColor-1 p-[3px] box-content rounded-lg duration-100"><img
              src="/icon/contact.svg" /></div>
          <template #content>
            <ADoption>
              <template #icon>
                <IconEmail style="color: #e73c30;" size="18" />
              </template>
              838195242@qq.com
              <CopyButton content="838195242@qq.com" buttonText="" successButtonText="" class="text-[14px]"
                :arcoProps="{ size: 'mini' }" />
            </ADoption>
            <ADoption>
              <template #icon>
                <IconWechat style="color: #65dc79;" size="18" />
              </template>
              H_Y838195242
              <CopyButton content="H_Y838195242" buttonText="" successButtonText="" class="text-[14px]"
                :arcoProps="{ size: 'mini' }" />
            </ADoption>
            <ADoption @click="openWindow('https://juejin.cn/user/808891021536542/posts')">
              <template #icon>
                <img src="/icon/juejin.svg" style="width: 18px;" />
              </template>
              掘金
              <IconLaunch />
            </ADoption>
          </template>
        </ADropdown>
      </div>
    </header>
    <div class="p-[60px] flex gap-9 flex-wrap justify-center">
      <ToolCard :item="allTools" />
    </div>
  </div>
</template>
