import { ref, onMounted } from 'vue'

export function useOAuth() {
  const hasOAuthCode = ref(false)

  onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    
    if (code) {
      hasOAuthCode.value = true
    }
  })

  return {
    hasOAuthCode
  }
} 