export type Locale = 'vi' | 'en'

export interface DreamSubmission {
  id: string
  locale: Locale
  fullName: string
  email: string
  phone?: string
  currentLocation?: string
  preferredLanguage?: string
  timezone?: string
  dreamTitle?: string
  dreamStatement: string
  firstThoughtDate?: string
  whyItMatters?: string
  blockers?: string
  attempts?: string
  partialChange?: string
  firstSmallStep?: string
  dalatConnection?: string
  currentRole?: string
  responsibilities?: string
  availableTime?: string
  financialConstraints?: string
  relocationInterest?: string
  startWindow?: string
  privacyLevel: 'private' | 'anonymous' | 'public'
  researchConsent: boolean
  marketingConsent: boolean
  storyContactConsent: boolean
  processingConsent: boolean
  consentVersion: string
  status: DreamStatus
  createdAt: string
  updatedAt: string
}

export type DreamStatus =
  | 'submitted'
  | 'under_review'
  | 'clarification_needed'
  | 'mapped'
  | 'pathway_suggested'
  | 'referred'
  | 'active'
  | 'paused'
  | 'closed'
  | 'deleted'

export interface DreamMap {
  id: string
  dreamId: string
  version: number
  existingAssets?: string[]
  constraints?: string[]
  risks?: string[]
  peopleNeeded?: string[]
  placesNeeded?: string[]
  firstStep?: string
  suggestedPathways?: string[]
  aiDraft?: string
  humanReview?: string
  status: 'draft' | 'submitted' | 'under_review' | 'clarification_needed' | 'mapped' | 'pathway_suggested' | 'referred' | 'active' | 'paused' | 'closed' | 'deleted'
  createdAt: string
  updatedAt: string
}

export interface Story {
  id: string
  dreamId?: string
  titleVi?: string
  titleEn?: string
  bodyVi?: string
  bodyEn?: string
  authorName: string
  anonymityMode: 'named' | 'anonymous' | 'pseudonym'
  consentId: string
  publicationStatus: 'draft' | 'review' | 'approved' | 'published' | 'withdrawn'
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Program {
  id: string
  slugVi: string
  slugEn?: string
  titleVi: string
  titleEn?: string
  descriptionVi: string
  descriptionEn?: string
  ownerProject: string
  partnerProjects?: string[]
  deliveryMode?: string
  duration?: string
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  publicationStatus: 'private' | 'public'
  createdAt: string
  updatedAt: string
}

export interface Referral {
  id: string
  dreamId: string
  sourceProject: string
  destinationProject: string
  destinationRoute?: string
  fieldsTransferred: string[]
  consentVersion: string
  consentGivenAt: string
  acceptedAt?: string
  rejectedAt?: string
  revokedAt?: string
  status: 'requested' | 'accepted' | 'rejected' | 'revoked'
  createdAt: string
  updatedAt: string
}

export interface Consent {
  id: string
  subjectType: string
  subjectId: string
  consentType: string
  version: string
  granted: boolean
  grantedAt?: string
  revokedAt?: string
  evidence?: string
  createdAt: string
}

export interface AuditEvent {
  id: string
  actorId?: string
  actorRole?: string
  eventType: string
  entityType: string
  entityId: string
  previousValue?: string
  nextValue?: string
  createdAt: string
}

export interface DreamIntent {
  id: string
  icon: string
  titleVi: string
  titleEn: string
  descVi: string
  descEn: string
  slugVi: string
  slugEn: string
}

export interface NavItem {
  labelVi: string
  labelEn: string
  hrefVi: string
  hrefEn: string
}
