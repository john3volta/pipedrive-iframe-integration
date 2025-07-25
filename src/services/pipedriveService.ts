import { TokenResponse } from '../types'

const PIPEDRIVE_CONFIG = {
  clientId: '595f229049211499',
  clientSecret: '6354dbc12af095c65c59e88f5219380541742aa6',
  redirectUri: 'https://john3volta.github.io/pipedrive-iframe-integration/',
  oauthUrl: 'https://oauth.pipedrive.com/oauth',
  apiUrl: 'https://api.pipedrive.com/api/v1'
}

class PipedriveService {
  async exchangeCodeForTokens(code: string): Promise<TokenResponse> {
    const credentials = btoa(`${PIPEDRIVE_CONFIG.clientId}:${PIPEDRIVE_CONFIG.clientSecret}`)
    
    const response = await fetch(`${PIPEDRIVE_CONFIG.oauthUrl}/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: PIPEDRIVE_CONFIG.redirectUri
      })
    })

    if (!response.ok) {
      throw new Error(`Failed to exchange code for tokens: ${response.statusText}`)
    }

    return response.json()
  }

  saveTokens(tokens: TokenResponse): void {
    localStorage.setItem('pipedrive_access_token', tokens.access_token)
    localStorage.setItem('pipedrive_refresh_token', tokens.refresh_token)
    localStorage.setItem('pipedrive_api_domain', tokens.api_domain)
  }

  getStoredTokens(): {
    accessToken: string | null
    refreshToken: string | null
    apiDomain: string | null
  } {
    return {
      accessToken: localStorage.getItem('pipedrive_access_token'),
      refreshToken: localStorage.getItem('pipedrive_refresh_token'),
      apiDomain: localStorage.getItem('pipedrive_api_domain')
    }
  }

  clearTokens(): void {
    localStorage.removeItem('pipedrive_access_token')
    localStorage.removeItem('pipedrive_refresh_token')
    localStorage.removeItem('pipedrive_api_domain')
  }
}

export const pipedriveService = new PipedriveService()
export default pipedriveService 