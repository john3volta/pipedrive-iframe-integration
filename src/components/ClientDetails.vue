<template>
  <FormSection title="Client details">
    <div class="form-row">
      <FormField>
        <FormInput 
          v-model="firstName"
          name="firstName" 
          type="text" 
          placeholder="First name" 
          autocomplete="given-name" 
          required 
        />
      </FormField>
      <FormField>
        <FormInput 
          v-model="lastName"
          name="lastName" 
          type="text" 
          placeholder="Last name" 
          autocomplete="family-name" 
          required 
        />
      </FormField>
    </div>
    <FormField>
      <FormInput 
        v-model="phone"
        name="phone" 
        type="tel" 
        placeholder="Phone" 
        autocomplete="tel" 
        required 
      />
    </FormField>
    <FormField>
      <FormInput v-model="email" name="email" type="email" placeholder="Email (optional)" autocomplete="email" />
    </FormField>
  </FormSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormSection from './FormSection.vue'
import FormField from './FormField.vue'
import FormInput from './FormInput.vue'

const firstName = ref('')
const lastName = ref('')
const phone = ref('')
const email = ref('')

defineExpose({
  firstName,
  lastName,
  phone,
  email
})
</script> 