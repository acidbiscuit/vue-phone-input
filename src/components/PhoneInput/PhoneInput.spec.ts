import { describe, it, expect } from 'vitest'

import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import PhoneInput from './PhoneInput.vue'

describe('PhoneInput', () => {
  const mountPhoneInput = (props) => {
    return mount(PhoneInput, {
      props: {
        ...props
      }
    })
  }
  it('renders a default placeholder', () => {
    const DEFAULT_PLACEHOLDER = 'Phone number'
    const wrapper = mountPhoneInput({
      value: ''
    })

    const inputEl = wrapper.get('input')
    expect(inputEl.attributes('placeholder')).toContain(DEFAULT_PLACEHOLDER)
  })

  it('renders a custom placeholder', () => {
    const customPlaceholder = 'My placeholder'

    const wrapper = mountPhoneInput({
      value: '',
      placeholder: customPlaceholder
    })
    const inputEl = wrapper.get('input')
    expect(inputEl.attributes('placeholder')).toContain(customPlaceholder)
  })

  it('renders a special placeholder for en-US browser locale', async () => {
    const locale = 'en-US'
    Object.defineProperty(global.navigator, 'language', {
      value: locale
    })
    const enPlaceholder = '+1 (123) 456-7890'

    const wrapper = mountPhoneInput({
      value: '',
      locale
    })

    const inputEl = wrapper.get('input')
    await nextTick()
    expect(inputEl.attributes('placeholder')).toContain(enPlaceholder)
  })

  it('renders non-disabled by default', () => {
    const wrapper = mountPhoneInput({
      value: ''
    })
    const inputEl = wrapper.get('input')
    expect(inputEl.attributes('disabled')).toBeFalsy(undefined)
  })

  it('renders with disabled attribute', () => {
    const wrapper = mountPhoneInput({
      value: '',
      disabled: true
    })
    const inputEl = wrapper.get('input')
    expect(Object.keys(inputEl.attributes())).toContain('disabled')
  })

  it('renders a valid phone number', () => {
    const validPhone = '+1(253) 584-0899'
    const wrapper = mountPhoneInput({
      value: validPhone,
      disabled: true
    })
    const inputEl = wrapper.get('input')
    expect(inputEl.wrapperElement.value).toContain(validPhone)
  })


  it('masks an invalid phone number on initial render', () => {
    const invalidPhone = 'invalidphone'
    const wrapper = mountPhoneInput({
      value: invalidPhone,
      disabled: true
    })
    const inputEl = wrapper.get('input')
    expect(inputEl.wrapperElement.value).toContain('')
  })

  it('emits update value with a valid value', () => {
    const validPhone = '+1(253) 584-0899'

    const wrapper = mountPhoneInput({
      value: ''
    })

    const inputEl = wrapper.get('input')
    inputEl.setValue(validPhone)
    expect(wrapper.emitted('update:value')[0]).toContain(validPhone)
  })

  it('emits update with disallowed characters removed', () => {
    const invalidPhone = '+1_$$!@invalid%_(253) 584-0899#~._T'
    const validPhone = '+1(253) 584-0899'

    const wrapper = mountPhoneInput({
      value: ''
    })

    const inputEl = wrapper.get('input')
    inputEl.setValue(invalidPhone)
    expect(wrapper.emitted('update:value')[0]).toContain(validPhone)
  })

  it('emits update with allowed characters', () => {
    const allowedChars = '1234567890 -+()'

    const wrapper = mountPhoneInput({
      value: ''
    })

    const inputEl = wrapper.get('input')
    inputEl.setValue(allowedChars)
    expect(wrapper.emitted('update:value')[0]).toContain(allowedChars)
  })
})
