import 'vue-router'

import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import allTools from './all-tool'
import { entry } from './buried-point'

declare module 'vue-router' {
  interface RouteMeta {
    transition?: string
    KeepAlive?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./views/FrontPage.vue') },
  {
    path: '/tools',
    component: () => import('./views/ToolWrapper.vue'),
    children: allTools.map((tool) => ({
      path: tool.path,
      name: tool.name,
      component: defineAsyncComponent({
        loader: tool.component
      }),
      meta: { KeepAlive: tool.keepAlive ?? false },
      beforeEnter: () => {
        entry(tool.name)
        return true
      }
    })) as RouteRecordRaw[]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFound.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
