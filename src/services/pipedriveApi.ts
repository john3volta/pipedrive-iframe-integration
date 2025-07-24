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

  async updateDeal(dealId: number, dealData: PipedriveDeal): Promise<PipedriveApiResponse<any>> {
    try {
      const response = await axios.put(`${this.apiUrl}/deals/${dealId}`, dealData, {
        params: { api_token: this.apiToken }
      })
      return {
        success: true,
        data: response.data
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to update deal'
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

      const personId = personResponse.data.data.id

      const dealData: PipedriveDeal = {
        title: `${formData.job.jobType} - ${formData.location.city} - ${formData.client.firstName} ${formData.client.lastName}`,
        person_id: personId,
        value: 0,
        currency: 'USD',
        '5a70d2849e7c6c17d715a46f596da9c6ecbaad28': formData.job.jobType,
        '2f99faa600faab7f8b9141cf8fc0bfde2cf0e705': formData.job.jobSource,
        'af854d393e79786397df559d44155e653b90cc10': formData.job.description || '',
        'f74546bb83feed34796962a6e5c123aabca16358': formData.location.address,
        '3bdad87c3106be4142b88bc1929d6a820ec70f9f': formData.location.city,
        'd025256b2afeade5f4babed988a05bc68e5c0d2f': formData.location.state,
        'fe8907cf8884d5012d8087faae49dfd37d02c6d2': formData.location.zipCode,
        '5ced816c61d9e51ba8d88e9c0e60df8ef3cd36d7': formData.location.area,
        'eeca6343f6b8347bceb548767a6c4b0eb17cf562': formData.scheduled.startDate,
        '2e25a1c2388756137fd588d2844c791022ed012e': formData.scheduled.startTime,
        '99a7a66672a9cb1eaab21e524daef7e212895353': formData.scheduled.endTime,
        '61303573e667d9edbd658cbda410c1dfe4205dec': formData.scheduled.technician,
        '566efe65e8504779d8fc1994a7071deaf9a33c42': formData.client.phone,
        '80cc1a0f4889ece566f97ebd6882751a2581d2ec': formData.client.email
      }

      const dealResponse = await this.createDeal(dealData)
      if (!dealResponse.success) {
        return dealResponse
      }

      return {
        success: true,
        data: {
          person: personResponse.data,
          deal: dealResponse.data
        }
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to submit job form'
      }
    }
  }

  async getCustomFields(): Promise<PipedriveApiResponse<any>> {
    try {
      const response = await axios.get(`${this.apiUrl}/dealFields`, {
        params: { api_token: this.apiToken }
      })
      return {
        success: true,
        data: response.data
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to get custom fields'
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