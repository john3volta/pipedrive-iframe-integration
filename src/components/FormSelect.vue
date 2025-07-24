<template>
  <div class="select" :class="{ 'select--open': isOpen, 'select--disabled': props.disabled }" @click="!props.disabled && toggleDropdown()">
    <button 
      type="button"
      class="select__button"
      @blur="handleBlur"
    >
      <span class="select__value" :class="{ 'select__value--selected': selectedLabel }">
        {{ selectedLabel || placeholder || 'Select option' }}
      </span>
      <svg class="select__arrow" viewBox="0 0 24 24" width="16" height="16">
        <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <div v-if="isOpen" class="select__dropdown">
      <div 
        v-for="option in options" 
        :key="option.value"
        class="select__option"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject, onMounted } from 'vue'
import { useFormValidation } from '../utils/useFormValidation'

interface ValidationHandler {
  handleValidation: (isValid: boolean) => void
  forceValidation?: () => void
}

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
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const isTouched = ref(false)
const { registerSelect } = useFormValidation()

const parentFormField = inject<ValidationHandler | null>('formFieldRef', null)

const validate = (force = false) => {
  if (!props.required) {
    parentFormField?.handleValidation?.(true)
    return
  }
  
  const isValid = props.modelValue.trim().length > 0
  
  if (isTouched.value || force) {
    parentFormField?.handleValidation?.(isValid)
  }
}

const handleBlur = () => {
  setTimeout(() => {
    isTouched.value = true
    validate()
    isOpen.value = false
  }, 150)
}

const forceValidation = () => {
  validate(true)
}

defineExpose({
  forceValidation
})

onMounted(() => {
  if (props.required) {
    registerSelect({ forceValidation })
  }
})

window.addEventListener('closeAllDropdowns', () => {
  if (isOpen.value) {
    isOpen.value = false
    document.removeEventListener('click', handleClickOutside)
  }
})

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(option => option.value === props.modelValue)
  return selectedOption?.label
})

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.select')) {
    isOpen.value = false
  }
}

const toggleDropdown = () => {
  if (!isOpen.value) {
    window.dispatchEvent(new CustomEvent('closeAllDropdowns'))
    
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
  
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
  document.removeEventListener('click', handleClickOutside)
  
  if (isTouched.value) {
    validate()
  }
}

watch(() => props.modelValue, () => validate(), { immediate: true })
</script> 