<template>
  <div id="app">
    <OAuthHandler v-if="hasOAuthCode" />
    <JobForm v-else />
  </div>
</template>

<script setup lang="ts">
import JobForm from './components/JobForm.vue'
import OAuthHandler from './components/OAuthHandler.vue'
import { useOAuth } from './utils/oauth'

const { hasOAuthCode } = useOAuth()
</script> 