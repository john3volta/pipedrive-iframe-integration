<template>
  <div class="form">
    <div class="form__container">
      <ClientDetails ref="clientDetailsRef" />
      <JobDetails 
        ref="jobDetailsRef"
        :job-types="jobTypes"
        :job-sources="jobSources"
        @update:job-type="jobType = $event"
      />
      <ServiceLocation ref="serviceLocationRef" :area-options="areaOptions" />
      <Scheduled 
        ref="scheduledRef"
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
import ClientDetails from './ClientDetails.vue'
import JobDetails from './JobDetails.vue'
import ServiceLocation from './ServiceLocation.vue'
import Scheduled from './Scheduled.vue'

const jobType = ref('')

const clientDetailsRef = ref()
const jobDetailsRef = ref()
const serviceLocationRef = ref()
const scheduledRef = ref()

const handleCreateJob = () => {
  const components = [clientDetailsRef, jobDetailsRef, serviceLocationRef, scheduledRef]
  
  components.forEach(component => {
    if (component.value) {
      const inputs = component.value.$el?.querySelectorAll('input[required]')
      const selects = component.value.$el?.querySelectorAll('.select')
      
      inputs?.forEach((input: HTMLElement) => {
        input.dispatchEvent(new Event('blur'))
      })
      
      selects?.forEach((select: HTMLElement) => {
        const button = select.querySelector('button')
        if (button) {
          button.dispatchEvent(new Event('blur'))
        }
      })
    }
  })
  
  console.log('Creating job...')
}
</script> 