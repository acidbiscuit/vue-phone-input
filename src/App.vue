<script setup lang="ts">
import PhoneInput from '@/components/PhoneInput/PhoneInput.vue'
import { ref } from 'vue'

const phoneNumber = ref('')
</script>

<template>
  <div>
    <h1>
      Custom phone number input field with Vue.js
    </h1>

    <p>
      Requirements:
    </p>

    <ol>
      <li>
        The field only allows digits, spaces, (, ), -, +
      </li>
      <li>
        The default placeholder is "Phone number". For en-US browser locale the placeholder is "+1 (123) 456-7890"
      </li>
      <li>
        The component is built with Composition API
      </li>
      <li>
        The component has v-model binding
      </li>
      <li>
        The component is SSR friendly
      </li>
      <li>
        The component has no dependencies except for Vue.js
      </li>
    </ol>

    <label
      for="my-phone-input"
    >
      Phone number
    </label>

    <PhoneInput
      v-model:value="phoneNumber"
      id="my-phone-input"
      name="my-phone-input"
    />

    <div>
      Value: {{ phoneNumber }}
    </div>
  </div>
</template>

<style scoped>

</style>
