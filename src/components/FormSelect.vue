<template>
  <select 
    class="form-field__input" 
    :id="name"
    :name="name"
    :value="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    :required="required"
  >
    <option value="">{{ placeholder || 'Select option' }}</option>
    <option 
      v-for="option in options" 
      :key="option.value" 
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string
  name?: string
  options: Option[]
  required?: boolean
  placeholder?: string
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script> 