import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../../src/pages/Home.vue'

const vuetify = createVuetify()
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home }
  ]
})

describe('Home 页面', () => {
  const mountComponent = (props = {}) => {
    return mount(Home, {
      props,
      global: {
        plugins: [vuetify, router]
      }
    })
  }

  it('正确渲染页面标题', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('包含主要内容区域', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.home-content').exists()).toBe(true)
  })

  it('响应式布局正常工作', async () => {
    const wrapper = mountComponent()
    
    // 模拟移动端视口
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })
    
    await wrapper.vm.$nextTick()
    // 验证移动端样式
    expect(wrapper.classes()).toContain('mobile-layout')
  })
})