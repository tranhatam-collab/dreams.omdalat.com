import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db-service'

export const GET = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params
    const row = await queryOne('SELECT * FROM dreams WHERE id = ?', id)

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
