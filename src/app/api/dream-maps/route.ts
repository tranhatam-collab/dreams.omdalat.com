import { NextRequest, NextResponse } from 'next/server'
import { run, queryOne } from '@/lib/db-service'

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()

    if (!body.dreamId) {
      return NextResponse.json({ error: 'dreamId is required' }, { status: 400 })
    }

    const dream = await queryOne('SELECT id FROM dreams WHERE id = ?', body.dreamId)

    if (!dream) {
      return NextResponse.json({ error: 'Dream not found' }, { status: 404 })
    }

    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await run(
      `INSERT INTO dream_maps (id, dream_id, version, existing_assets_json, constraints_json,
        risks_json, people_needed_json, places_needed_json, first_step, suggested_pathways_json,
        status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id, body.dreamId, 1,
      body.existingAssets ? JSON.stringify(body.existingAssets) : null,
      body.constraints ? JSON.stringify(body.constraints) : null,
      body.risks ? JSON.stringify(body.risks) : null,
      body.peopleNeeded ? JSON.stringify(body.peopleNeeded) : null,
      body.placesNeeded ? JSON.stringify(body.placesNeeded) : null,
      body.firstStep || null,
      body.suggestedPathways ? JSON.stringify(body.suggestedPathways) : null,
      body.status || 'draft', now, now
    )

    await run(
      `INSERT INTO audit_events (id, actor_id, actor_role, event_type, entity_type, entity_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      crypto.randomUUID(), null, 'system', 'dream_map_created', 'dream_map', id, now
    )

    return NextResponse.json({ id, dreamId: body.dreamId, status: body.status || 'draft' }, { status: 201 })
  } catch (error) {
    console.error('POST /api/dream-maps error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
