import axios, { AxiosResponse } from 'axios'
import type { 
  PipedriveDeal, 
  PipedrivePerson, 
  PipedriveOrganization, 
  PipedriveApiResponse,
  PipedriveConfig,
  JobFormData
} from '../types'

export class PipedriveApiService {
  private apiToken: string
  private baseUrl: string
  private apiUrl: string

  constructor(config: PipedriveConfig) {
    this.apiToken = config.apiToken
    this.baseUrl = config.domain
    this.apiUrl = `https://${this.baseUrl}.pipedrive.com/api/v1`
  }

  async createDeal(dealData: PipedriveDeal): Promise<PipedriveApiResponse<any>> {
    try {
      const response = await this.makeRequest<any>('/deals', dealData)
      return {
        success: true,
        data: response.data
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to create deal'
      }
    }
  }

  async createPerson(personData: PipedrivePerson): Promise<PipedriveApiResponse<any>> {
    try {
      const response = await this.makeRequest<any>('/persons', personData)
      return {
        success: true,
        data: response.data
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to create person'
      }
    }
  }

  async createOrganization(orgData: PipedriveOrganization): Promise<PipedriveApiResponse<any>> {
    try {
      const response = await this.makeRequest<any>('/organizations', orgData)
      return {
        success: true,
        data: response.data
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to create organization'
      }
    }
  }

  async linkPersonToDeal(dealId: number, personId: number): Promise<PipedriveApiResponse<any>> {
    try {
      const response = await this.makeRequest<any>(`/deals/${dealId}/persons`, {
        person_id: personId
      })
      return {
        success: true,
        data: response.data
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to link person to deal'
      }
    }
  }

  async submitJobForm(formData: JobFormData): Promise<PipedriveApiResponse<any>> {
    try {
      const personData: PipedrivePerson = {
        name: `${formData.client.firstName} ${formData.client.lastName}`,
        email: formData.client.email,
        phone: formData.client.phone
      }

      const personResponse = await this.createPerson(personData)
      if (!personResponse.success) {
        return personResponse
      }

      const dealData: PipedriveDeal = {
        title: `${formData.job.jobType} - ${formData.location.city}`,
        person_id: personResponse.data.id
      }

      const dealResponse = await this.createDeal(dealData)
      return dealResponse
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to submit job form'
      }
    }
  }

  private async makeRequest<T>(endpoint: string, data?: any): Promise<AxiosResponse<T>> {
    const url = `${this.apiUrl}${endpoint}`
    const params = {
      api_token: this.apiToken
    }

    if (data) {
      return axios.post(url, data, { params })
    } else {
      return axios.get(url, { params })
    }
  }

}

export const createPipedriveService = (config: PipedriveConfig): PipedriveApiService => {
  return new PipedriveApiService(config)
} 