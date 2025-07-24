<template>
  <textarea 
    v-if="type === 'textarea'"
    class="form-field__input form-field__input--large"
    :id="name"
    :name="name"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    :required="required"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
  />
  <input 
    v-else
    :class="['form-field__input', type === 'date' ? 'form-field__date' : '', type === 'time' ? 'form-field__time' : '']"
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