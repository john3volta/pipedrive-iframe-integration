<template>
  <textarea 
    v-if="type === 'textarea'"
    class="input input--large"
    :id="name"
    :name="name"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    :required="required"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    maxlength="2000"
  />
  <input 
    v-else
    :class="['input', type === 'date' ? 'input--date' : '', type === 'time' ? 'input--time' : '']"
    :id="name"
    :name="name"
    :type="type"
    :value="modelValue"
    @input="handleInput"
    @paste="handlePaste"
    @click="handleInputClick"
    :required="required"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :readonly="type === 'date' || type === 'time'"
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
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const validateName = (value: string) => {
  const cleaned = value.replace(/[^a-zA-Zа-яА-Я\s-]/g, '')
  return cleaned.slice(0, 50)
}

const validatePhone = (value: string) => {
  const digits = value.replace(/\D/g, '')
  const limited = digits.slice(0, 10)
  
  if (limited.length >= 6) {
    return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6)}`
  } else if (limited.length >= 3) {
    return `${limited.slice(0, 3)}-${limited.slice(3)}`
  }
  return limited
}

const validateEmail = (value: string) => {
  return value.replace(/\s/g, '').slice(0, 254)
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value
  
  if (target.type === 'text' && (target.name === 'firstName' || target.name === 'lastName')) {
    value = validateName(value)
  } else if (target.type === 'tel') {
    value = validatePhone(value)
    target.value = value
  } else if (target.type === 'email') {
    value = validateEmail(value)
  }
  
  emit('update:modelValue', value)
}

const handlePaste = (event: ClipboardEvent) => {
  const target = event.target as HTMLInputElement
  
  if (target.type === 'tel') {
    event.preventDefault()
    const pastedText = event.clipboardData?.getData('text') || ''
    const digits = pastedText.replace(/\D/g, '').slice(0, 10)
    const formatted = validatePhone(digits)
    emit('update:modelValue', formatted)
  }
}

const handleInputClick = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (target.type === 'date' || target.type === 'time') {
    target.removeAttribute('readonly')
    target.showPicker?.()
    setTimeout(() => {
      target.setAttribute('readonly', 'readonly')
    }, 100)
  }
}
</script> 