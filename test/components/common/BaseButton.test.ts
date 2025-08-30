import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import BaseButton from '../../../src/components/common/BaseButton.vue'

const vuetify = createVuetify()

describe('BaseButton', () => {
  const mountComponent = (props: Partial<InstanceType<typeof BaseButton>['$props']> = {}) => {
    const defaultProps = { text: 'Test Button' }
    return mount(BaseButton, {
      props: { ...defaultProps, ...props },
      global: {
        plugins: [vuetify]
      }
    })
  }

  it('渲染基本按钮', () => {
    const wrapper = mountComponent({ text: '测试按钮' })
    expect(wrapper.text()).toContain('测试按钮')
  })

  it('处理点击事件', async () => {
    const wrapper = mountComponent({ 
      text: '点击我'
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('应用正确的变体样式', () => {
    const wrapper = mountComponent({ 
      text: '主要按钮',
      variant: 'elevated',
      color: 'primary'
    })
    
    expect(wrapper.classes()).toContain('v-btn--variant-elevated')
  })

  it('禁用状态下不触发点击', async () => {
    const wrapper = mountComponent({ 
      text: '禁用按钮',
      disabled: true
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})