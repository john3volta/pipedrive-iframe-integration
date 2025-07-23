<template>
  <FormSection title="Client details">
    <div class="form-row">
      <FormField>
        <FormInput v-model="firstName" type="text" placeholder="First name" required />
      </FormField>
      <FormField>
        <FormInput v-model="lastName" type="text" placeholder="Last name" required />
      </FormField>
    </div>
    <FormField>
      <FormInput v-model="phone" type="tel" placeholder="Phone" required />
    </FormField>
    <FormField>
      <FormInput v-model="email" type="email" placeholder="Email (optional)" />
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
</script> 