<template>
  <FormSection title="Service location">
    <FormField label="Address">
      <FormInput v-model="address" type="text" placeholder="Address" required />
    </FormField>
    <FormField label="City">
      <FormInput v-model="city" type="text" placeholder="City" required />
    </FormField>
    <FormField label="State">
      <FormInput v-model="state" type="text" placeholder="State" required />
    </FormField>
    <div class="form-row">
      <FormField label="Zip code">
        <FormInput v-model="zipCode" type="text" placeholder="Zip code" required />
      </FormField>
      <FormField label="Area">
        <FormSelect v-model="area" :options="props.areaOptions" placeholder="Select area" required />
      </FormField>
    </div>
  </FormSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormSection from './FormSection.vue'
import FormField from './FormField.vue'
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'

interface Option {
  value: string
  label: string
}

interface Props {
  areaOptions: Option[]
}

const props = defineProps<Props>()

const address = ref('')
const city = ref('')
const state = ref('')
const zipCode = ref('')
const area = ref('')
</script> 