<template>
  <div class="form">
    <div class="form__container">
      <ClientDetails />
      <JobDetails 
        :job-types="jobTypes"
        :job-sources="jobSources"
        @update:job-type="jobType = $event"
      />
      <ServiceLocation :area-options="areaOptions" />
      <Scheduled 
        :job-type="jobType"
        :technicians="technicians"
      />
    </div>
    <div class="form__actions">
      <button class="form__btn form__btn--create" @click="handleCreateJob">Create Job</button>
      <button class="form__btn form__btn--save">Save Info</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { jobTypes, jobSources, areaOptions, technicians } from '../data/formOptions'
import { useFormValidation } from '../utils/useFormValidation'
import ClientDetails from './ClientDetails.vue'
import JobDetails from './JobDetails.vue'
import ServiceLocation from './ServiceLocation.vue'
import Scheduled from './Scheduled.vue'

const jobType = ref('')
const { validateAll } = useFormValidation()

const handleCreateJob = () => {
  validateAll()
  console.log('Creating job...')
}
</script> 