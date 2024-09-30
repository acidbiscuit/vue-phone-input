<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'PhoneInput'
})

export type PhoneInputProps = {
  autocomplete?: string
  disabled?: boolean
  id?: string
  locale?: string
  name?: string
  placeholder?: string
  type?: string
  value: string
}

const props = withDefaults(defineProps<PhoneInputProps>(), {
  autocomplete: 'tel',
  disabled: false,
  type: 'tel'
})

const emit = defineEmits<{
  (ev: 'update:value', value: string): void
}>()

const getDefaultLocale = (): string => {
  if (typeof window === 'undefined') {
    return ''
  }

  const { language, languages } = window.navigator
  if (languages && languages.length > 0) {
    return languages[0]
  }

  return language || ''
}

const allowedCharactersRegex = /([^0-9\s()\-+]+)/gi

const inputRef = ref<HTMLInputElement | null>(null)
const innerLocale = ref('')

const defaultPlaceholder = computed(() => {
  if (innerLocale.value === 'en-US') {
    return '+1 (123) 456-7890'
  }

  return 'Phone number'
})

const inputProps = computed(() => {
  return {
    autocomplete: props.autocomplete,
    disabled: props.disabled,
    name: props.name,
    placeholder: props.placeholder || defaultPlaceholder.value,
    type: props.type
  }
})

const setLocale = (locale: string) => {
  innerLocale.value = locale || getDefaultLocale()
}

/**
 * Mask raw input value
 * - extract only allowed characters
 * - remove start/end white spaces
 */
const applyMask = (value: string): string => {
  return (value || '')
    .replace(allowedCharactersRegex, '')
    .trimStart()
}

/**
 * Set sanitized value as input element value manually,
 * since Vue caches value prop if it hasn't changed
 */
const syncInputElementValue = (value: string) => {
  if (inputRef.value && inputRef.value.value !== value) {
    inputRef.value.value = value
  }
}

const handleTextChange = (text: string): void => {
  const value = applyMask(text)
  syncInputElementValue(value)
  emit('update:value', value)
}

watch(() => props.value, (value) => {
  if (value) {
    handleTextChange(props.value)
  }
}, { immediate: true })

onMounted(() => {
  // Set locale on mounted to prevent hydration issues with SSR
  setLocale(props.locale)
  if (props.value) {
    handleTextChange(props.value)
  }
})

const onInput = (ev: Event): void => {
  const text = (ev.target as HTMLInputElement)?.value || ''
  handleTextChange(text)
}

const onPaste = (ev: Event): void => {
  const text = (ev.target as HTMLInputElement)?.value || ''
  handleTextChange(text)
}
</script>

<template>
  <input
    ref="inputRef"
    v-bind="inputProps"
    :value="value"
    @input="onInput"
    @paste="onPaste"
  >
</template>
