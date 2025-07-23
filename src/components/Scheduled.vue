<template>
  <FormSection title="Scheduled">
    <FormField label="Start date">
      <FormInput type="date" v-model="startDate" required />
    </FormField>
    <div class="form-row">
      <FormField label="Start time">
        <FormInput type="time" v-model="startTime" required />
      </FormField>
      <FormField label="End time">
        <FormInput type="time" v-model="endTime" required />
      </FormField>
    </div>
    <FormField label="Test select">
      <FormSelect v-model="testSelect" :options="props.testOptions" placeholder="Select option" required />
    </FormField>
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
  testOptions: Option[]
}

const props = defineProps<Props>()

const startDate = ref('')
const startTime = ref('')
const endTime = ref('')
const testSelect = ref('')
</script> 