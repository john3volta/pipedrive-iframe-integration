export interface ClientDetails {
  firstName: string
  lastName: string
  phone: string
  email: string
}

export interface JobDetails {
  jobType: string
  jobSource: string
  description: string
}

export interface ServiceLocation {
  address: string
  city: string
  state: string
  zipCode: string
  area: string
}

export interface Scheduled {
  startDate: string
  startTime: string
  endTime: string
  technician: string
}

export interface JobFormData {
  client: ClientDetails
  job: JobDetails
  location: ServiceLocation
  scheduled: Scheduled
}

export interface PipedriveDeal {
  title: string
  value?: number
  currency?: string
  stage_id?: number
  person_id?: number
  org_id?: number
  [key: string]: any
}

export interface PipedrivePerson {
  name: string
  email?: string
  phone?: string
  org_id?: number
  [key: string]: any
}

export interface PipedriveOrganization {
  name: string
  address?: string
  [key: string]: any
}

export interface PipedriveApiResponse<T> {
  success: boolean
  data: T
  error?: string
}

export interface PipedriveConfig {
  apiToken: string
  domain: string
} 