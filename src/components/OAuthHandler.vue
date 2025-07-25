<template>
  <div class="oauth-handler">
    <div v-if="isProcessing" class="oauth-handler__processing">
      <h2>Processing authorization...</h2>
      <p>Please wait</p>
    </div>
    
    <div v-else-if="isSuccess" class="oauth-handler__success">
      <h2>✅ Installation completed!</h2>
      <p>App successfully connected to Pipedrive</p>
    </div>
    
    <div v-else-if="isError" class="oauth-handler__error">
      <h2>❌ Installation failed</h2>
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import pipedriveService from '../services/pipedriveService'

const isProcessing = ref(false)
const isSuccess = ref(false)
const isError = ref(false)
const errorMessage = ref('')

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  
  if (code) {
    isProcessing.value = true
    
    pipedriveService.exchangeCodeForTokens(code)
      .then(tokens => {
        pipedriveService.saveTokens(tokens)
        isProcessing.value = false
        isSuccess.value = true
        
        setTimeout(() => {
          window.location.href = window.location.pathname
        }, 2000)
      })
      .catch(error => {
        isProcessing.value = false
        isError.value = true
        errorMessage.value = error.message || 'Unknown error'
      })
  }
})
</script> 