export interface SelectOption {
  value: string
  label: string
}

export const jobTypes: SelectOption[] = [
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'carpentry', label: 'Carpentry' },
  { value: 'painting', label: 'Painting' },
  { value: 'cleaning', label: 'Cleaning' }
]

export const jobSources: SelectOption[] = [
  { value: 'website', label: 'Website' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'referral', label: 'Referral' },
  { value: 'walk-in', label: 'Walk-in' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'google', label: 'Google Search' },
  { value: 'yelp', label: 'Yelp' }
]

export const areaOptions: SelectOption[] = [
  { value: 'tampa', label: 'Tampa' },
  { value: 'orlando', label: 'Orlando' },
  { value: 'miami', label: 'Miami' },
  { value: 'jacksonville', label: 'Jacksonville' },
  { value: 'fort-lauderdale', label: 'Fort Lauderdale' },
  { value: 'west-palm-beach', label: 'West Palm Beach' },
  { value: 'sarasota', label: 'Sarasota' },
  { value: 'naples', label: 'Naples' },
  { value: 'fort-myers', label: 'Fort Myers' },
  { value: 'clearwater', label: 'Clearwater' }
]

export const technicians: Record<string, SelectOption[]> = {
  plumbing: [
    { value: 'tech1', label: 'John Smith' },
    { value: 'tech2', label: 'Mike Johnson' },
    { value: 'tech3', label: 'Robert Davis' }
  ],
  electrical: [
    { value: 'tech4', label: 'David Brown' },
    { value: 'tech5', label: 'Tom Anderson' },
    { value: 'tech6', label: 'James Taylor' }
  ],
  hvac: [
    { value: 'tech7', label: 'Alex Martinez' },
    { value: 'tech8', label: 'Chris Rodriguez' },
    { value: 'tech9', label: 'Daniel Lopez' }
  ],
  carpentry: [
    { value: 'tech10', label: 'Kevin Hernandez' },
    { value: 'tech11', label: 'Mark Thompson' }
  ],
  painting: [
    { value: 'tech12', label: 'Steve Wilson' },
    { value: 'tech13', label: 'Paul Garcia' }
  ],
  cleaning: [
    { value: 'tech14', label: 'Carlos Rodriguez' },
    { value: 'tech15', label: 'Miguel Torres' }
  ]
}

export function getTechniciansByJobType(jobType: string): SelectOption[] {
  return technicians[jobType] || []
} 