<template>
  <input 
    class="form-field__input" 
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :required="required"
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  type?: string
  required?: boolean
  placeholder?: string
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script> 