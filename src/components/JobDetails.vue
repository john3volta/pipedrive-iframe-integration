<template>
  <FormSection title="Job details">
    <div class="form-row">
      <FormField label="Job type">
        <FormSelect v-model="jobType" :options="props.jobTypes" placeholder="Select job type" required />
      </FormField>
      <FormField label="Job source">
        <FormSelect v-model="jobSource" :options="props.jobSources" placeholder="Select source" required />
      </FormField>
    </div>
    <FormField label="Job description (optional)">
      <FormInput v-model="description" class="form-field__input--large" placeholder="Job description (optional)" />
    </FormField>
  </FormSection>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FormSection from './FormSection.vue'
import FormField from './FormField.vue'
import FormSelect from './FormSelect.vue'
import FormInput from './FormInput.vue'

interface Option {
  value: string
  label: string
}

interface Props {
  jobTypes: Option[]
  jobSources: Option[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:jobType': [value: string]
}>()

const jobType = ref('')
const jobSource = ref('')
const description = ref('')

watch(jobType, (newValue) => {
  emit('update:jobType', newValue)
})
</script> 