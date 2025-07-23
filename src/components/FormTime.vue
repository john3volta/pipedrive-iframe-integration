<template>
  <input 
    class="form-field__input" 
    type="time"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :required="required"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  required?: boolean
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script> 