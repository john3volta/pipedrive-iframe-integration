<template>
  <FormSection title="Service location">
    <FormField>
      <FormInput 
        v-model="address" 
        name="address" 
        type="text" 
        placeholder="Address" 
        autocomplete="street-address" 
        required 
      />
    </FormField>
    <FormField>
      <FormInput 
        v-model="city" 
        name="city" 
        type="text" 
        placeholder="City" 
        autocomplete="address-level2" 
        required 
      />
    </FormField>
    <FormField>
      <FormInput 
        v-model="state" 
        name="state" 
        type="text" 
        placeholder="State" 
        autocomplete="address-level1" 
        required 
      />
    </FormField>
    <div class="form-row">
      <FormField>
        <FormInput 
          v-model="zipCode" 
          name="zipCode" 
          type="text" 
          placeholder="Zip code" 
          autocomplete="postal-code" 
          required 
        />
      </FormField>
      <FormField>
        <FormSelect 
          v-model="area" 
          name="area" 
          :options="props.areaOptions" 
          placeholder="Select area" 
          required 
        />
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