<template>
  <div class="form-field" :class="{ 'form-field--error': !isValid && isTouched }">
    <label v-if="label" class="form-field__label">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

interface ValidationHandler {
  handleValidation: (isValid: boolean) => void
}

interface Props {
  label?: string
  onValidation?: (isValid: boolean) => void
}

const props = defineProps<Props>()

const isValid = ref(true)
const isTouched = ref(false)

const handleValidation = (valid: boolean) => {
  isValid.value = valid
  if (!isTouched.value) {
    isTouched.value = true
  }
  props.onValidation?.(valid)
}

// Provide the FormField ref to child components
provide<ValidationHandler>('formFieldRef', {
  handleValidation
})

// Expose the validation handler
defineExpose({
  handleValidation
})
</script> 