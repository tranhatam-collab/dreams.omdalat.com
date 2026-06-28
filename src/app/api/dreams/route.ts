import { NextRequest, NextResponse } from 'next/server'
import { run, queryOne } from '@/lib/db-service'

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()

    if (!body.fullName || typeof body.fullName !== 'string' || !body.fullName.trim()) {
      return NextResponse.json({ error: 'fullName is required' }, { status: 400 })
    }
    if (!body.email || typeof body.email !== 'string' || !body.email.trim()) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }
    if (!body.dreamStatement || typeof body.dreamStatement !== 'string' || !body.dreamStatement.trim()) {
      return NextResponse.json({ error: 'dreamStatement is required' }, { status: 400 })
    }
    if (body.processingConsent !== true) {
      return NextResponse.json({ error: 'processingConsent must be true' }, { status: 400 })
    }

    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await run(
      `INSERT INTO dreams (id, locale, full_name, email, phone, current_location, preferred_language,
        timezone, dream_title, dream_statement, first_thought_date, why_it_matters, blockers,
        attempts, partial_change, first_small_step, dalat_connection, current_role, responsibilities,
        available_time, financial_constraints, relocation_interest, start_window,
        privacy_level, research_consent, marketing_consent, story_contact_consent,
        processing_consent, consent_version, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id, body.locale || 'vi', body.fullName.trim(), body.email.trim(),
      body.phone || null, body.currentLocation || null, body.preferredLanguage || null,
      body.timezone || null, body.dreamTitle || null, body.dreamStatement.trim(),
      body.firstThoughtDate || null, body.whyItMatters || null, body.blockers || null,
      body.attempts || null, body.partialChange || null, body.firstSmallStep || null,
      body.dalatConnection || null, body.currentRole || null, body.responsibilities || null,
      body.availableTime || null, body.financialConstraints || null,
      body.relocationInterest || null, body.startWindow || null,
      body.privacyLevel || 'private', body.researchConsent ? 1 : 0,
      body.marketingConsent ? 1 : 0, body.storyContactConsent ? 1 : 0,
      1, body.consentVersion || '2026.1', 'submitted', now, now
    )

    await run(
      `INSERT INTO audit_events (id, actor_id, actor_role, event_type, entity_type, entity_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      crypto.randomUUID(), body.email, 'dreamer', 'dream_submitted', 'dream', id, now
    )

    return NextResponse.json({ dreamId: id, status: 'submitted' }, { status: 201 })
  } catch (error) {
    console.error('POST /api/dreams error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
