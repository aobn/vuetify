import { mount, VueWrapper } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { Component } from 'vue'

/**
 * 创建带有 Vuetify 的测试挂载器
 */
export function createTestMount() {
  const vuetify = createVuetify()
  
  return function mountWithVuetify(component: Component, options: any = {}) {
    return mount(component, {
      global: {
        plugins: [vuetify],
        ...(options.global || {})
      },
      ...options
    })
  }
}

/**
 * 等待 Vue 的下一个 tick
 */
export async function nextTick() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

/**
 * 模拟用户点击事件
 */
export async function clickElement(wrapper: VueWrapper<any>, selector: string) {
  const element = wrapper.find(selector)
  await element.trigger('click')
  await nextTick()
}

/**
 * 模拟用户输入
 */
export async function inputText(wrapper: VueWrapper<any>, selector: string, text: string) {
  const input = wrapper.find(selector)
  await input.setValue(text)
  await nextTick()
}

/**
 * 检查元素是否可见
 */
export function isElementVisible(wrapper: VueWrapper<any>, selector: string): boolean {
  const element = wrapper.find(selector)
  return element.exists() && element.isVisible()
}