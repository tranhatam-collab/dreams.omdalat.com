import { NextRequest, NextResponse } from 'next/server'
import { run, queryOne } from '@/lib/db-service'

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()

    if (!body.dreamId) {
      return NextResponse.json({ error: 'dreamId is required' }, { status: 400 })
    }
    if (!body.destinationProject) {
      return NextResponse.json({ error: 'destinationProject is required' }, { status: 400 })
    }
    if (!body.consentVersion) {
      return NextResponse.json({ error: 'consentVersion is required' }, { status: 400 })
    }

    const dream = await queryOne('SELECT id FROM dreams WHERE id = ?', body.dreamId)

    if (!dream) {
      return NextResponse.json({ error: 'Dream not found' }, { status: 404 })
    }

    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await run(
      `INSERT INTO referrals (id, dream_id, source_project, destination_project, destination_route,
        fields_transferred_json, consent_version, consent_given_at, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id, body.dreamId, body.sourceProject || 'dreams', body.destinationProject,
      body.destinationRoute || null,
      JSON.stringify(body.fieldsTransferred || []),
      body.consentVersion, now, 'requested', now, now
    )

    const consentId = crypto.randomUUID()
    await run(
      `INSERT INTO consents (id, subject_type, subject_id, consent_type, version, granted, granted_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      consentId, 'referral', id, 'referral', body.consentVersion, 1, now, now
    )

    await run(
      `INSERT INTO audit_events (id, actor_id, actor_role, event_type, entity_type, entity_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      crypto.randomUUID(), null, 'system', 'referral_requested', 'referral', id, now
    )

    return NextResponse.json({ id, status: 'requested' }, { status: 201 })
  } catch (error) {
    console.error('POST /api/referrals error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
