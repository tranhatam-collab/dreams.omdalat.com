import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db-service'

interface DreamRow {
  id: string
  locale: string
  full_name: string
  email: string
  phone: string | null
  current_location: string | null
  preferred_language: string | null
  dream_statement: string
  why_it_matters: string | null
  blockers: string | null
  attempts: string | null
  first_small_step: string | null
  dalat_connection: string | null
  current_role: string | null
  privacy_level: string
  status: string
  created_at: string
}

export const GET = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params
    const row = await queryOne<DreamRow>('SELECT * FROM dreams WHERE id = ?', id)

    if (!row) {
      return NextResponse.json({ error: 'Dream not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: row.id,
      locale: row.locale,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      currentLocation: row.current_location,
      preferredLanguage: row.preferred_language,
      dreamStatement: row.dream_statement,
      whyItMatters: row.why_it_matters,
      blockers: row.blockers,
      attempts: row.attempts,
      firstSmallStep: row.first_small_step,
      dalatConnection: row.dalat_connection,
      currentRole: row.current_role,
      privacyLevel: row.privacy_level,
      status: row.status,
      createdAt: row.created_at,
    })
  } catch (error) {
    console.error('GET /api/dreams/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
