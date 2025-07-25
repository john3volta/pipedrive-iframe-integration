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
      <button 
        class="form__btn form__btn--create" 
        @click="handleCreateJob"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Creating...' : 'Create Job' }}
      </button>
      <button class="form__btn form__btn--save">Save Info</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { jobTypes, jobSources, areaOptions, technicians } from '../data/formOptions'
import { createPipedriveService } from '../services/pipedriveApi'
import pipedriveService from '../services/pipedriveService'
import type { JobFormData } from '../types'
import ClientDetails from './ClientDetails.vue'
import JobDetails from './JobDetails.vue'
import ServiceLocation from './ServiceLocation.vue'
import Scheduled from './Scheduled.vue'

const jobType = ref('')
const isSubmitting = ref(false)

const clientDetailsRef = ref()
const jobDetailsRef = ref()
const serviceLocationRef = ref()
const scheduledRef = ref()

const collectFormData = (): JobFormData | null => {
  try {
    const clientData = clientDetailsRef.value
    if (!clientData) return null

    const jobData = jobDetailsRef.value
    if (!jobData) return null

    const locationData = serviceLocationRef.value
    if (!locationData) return null

    const scheduledData = scheduledRef.value
    if (!scheduledData) return null

    return {
      client: {
        firstName: clientData.firstName || '',
        lastName: clientData.lastName || '',
        email: clientData.email || '',
        phone: clientData.phone || ''
      },
      job: {
        jobType: jobData.jobType || '',
        jobSource: jobData.jobSource || '',
        description: jobData.description || ''
      },
      location: {
        address: locationData.address || '',
        city: locationData.city || '',
        state: locationData.state || '',
        zipCode: locationData.zipCode || '',
        area: locationData.area || ''
      },
      scheduled: {
        startDate: scheduledData.startDate || '',
        startTime: scheduledData.startTime || '',
        endTime: scheduledData.endTime || '',
        technician: scheduledData.selectedTechnician || ''
      }
    }
  } catch (error) {
    console.error('Error collecting form data:', error)
    return null
  }
}

const handleCreateJob = async () => {
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

  const formData = collectFormData()
  if (!formData) {
    return
  }

  const requiredFields = [
    formData.client.firstName,
    formData.client.lastName,
    formData.client.email,
    formData.client.phone,
    formData.job.jobType,
    formData.location.address,
    formData.location.city,
    formData.scheduled.startDate,
    formData.scheduled.startTime,
    formData.scheduled.technician
  ]

  if (requiredFields.some(field => !field.trim())) {
    return
  }

  isSubmitting.value = true

  try {
    const tokens = pipedriveService.getStoredTokens()
    
    if (!tokens.accessToken || !tokens.apiDomain) {
      alert('Please install the app first to get access to Pipedrive')
      return
    }

    const pipedriveApiService = createPipedriveService({
      apiToken: tokens.accessToken,
      domain: tokens.apiDomain.replace('.pipedrive.com', '')
    })

    const result = await pipedriveApiService.submitJobForm(formData)

    if (result.success) {
      alert('Job created successfully in Pipedrive!')
    } else {
      alert(`Error creating job: ${result.error}`)
    }
  } catch (error) {
    alert('Error submitting to Pipedrive. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script> 