<template>
  <div class="form">
    <div class="form__container">
      <ClientDetails />
      <JobDetails 
        :job-types="jobTypes"
        :job-sources="jobSources"
        :technicians="technicians"
      />
      <ServiceLocation :area-options="areaOptions" />
      <Scheduled />
    </div>
    <div class="form__actions">
      <button class="form__btn form__btn--create">Create Job</button>
      <button class="form__btn form__btn--save">Save Info</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { jobTypes, jobSources, areaOptions, technicians } from '../data/formOptions'
</script> 