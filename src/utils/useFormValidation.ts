import { ref } from 'vue'

const formInputs = ref<any[]>([])
const formSelects = ref<any[]>([])

export function useFormValidation() {
  const registerInput = (input: any) => {
    formInputs.value.push(input)
  }

  const registerSelect = (select: any) => {
    formSelects.value.push(select)
  }

  const validateAll = () => {
    formInputs.value.forEach(input => {
      input?.forceValidation?.()
    })
    
    formSelects.value.forEach(select => {
      select?.forceValidation?.()
    })
  }

  const clearValidation = () => {
    formInputs.value = []
    formSelects.value = []
  }

  return {
    registerInput,
    registerSelect,
    validateAll,
    clearValidation
  }
} 