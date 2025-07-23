<template>
  <input 
    class="form-field__input" 
    :id="name"
    :name="name"
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :required="required"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  name?: string
  type?: string
  required?: boolean
  placeholder?: string
  autocomplete?: string
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script> 