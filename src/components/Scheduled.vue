<template>
  <FormSection title="Scheduled">
    <FormField>
      <FormInput type="date" v-model="startDate" name="startDate" autocomplete="off" required />
    </FormField>
    <div class="form-row">
      <FormField>
        <FormInput type="time" v-model="startTime" name="startTime" autocomplete="off" required />
      </FormField>
      <FormField>
        <FormInput type="time" v-model="endTime" name="endTime" autocomplete="off" required />
      </FormField>
    </div>
    <FormField>
      <FormSelect v-model="selectedTechnician" name="technician" :options="availableTechnicians" placeholder="Select technician" required />
    </FormField>
  </FormSection>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FormSection from './FormSection.vue'
import FormField from './FormField.vue'
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'

interface Option {
  value: string
  label: string
}

interface Props {
  jobType: string
  technicians: Record<string, Option[]>
}

const props = defineProps<Props>()

const startDate = ref('')
const startTime = ref('')
const endTime = ref('')
const selectedTechnician = ref('')

const availableTechnicians = computed(() => {
  if (!props.jobType) return []
  return props.technicians[props.jobType] || []
})
</script> 