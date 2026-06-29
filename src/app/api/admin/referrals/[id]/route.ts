import { NextRequest, NextResponse } from 'next/server'
import { queryOne, run } from '@/lib/db-service'
import { getSession } from '@/lib/session'

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const sessionToken = request.cookies.get('session_token')?.value
  if (!sessionToken || !await getSession(sessionToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    if (!body.status || !['accepted', 'rejected', 'revoked'].includes(body.status)) {
      return NextResponse.json({ error: 'Status must be accepted, rejected, or revoked' }, { status: 400 })
    }

    const now = new Date().toISOString()

    const referral = await queryOne('SELECT id FROM referrals WHERE id = ?', id)
    if (!referral) {
      return NextResponse.json({ error: 'Referral not found' }, { status: 404 })
    }

    await run(`UPDATE referrals SET status = ?, ${body.status}_at = ?, updated_at = ? WHERE id = ?`,
      body.status, now, now, id)

    await run(
      `INSERT INTO audit_events (id, actor_id, actor_role, event_type, entity_type, entity_id, next_value, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      crypto.randomUUID(), (await getSession(sessionToken))?.userId, 'admin', `referral_${body.status}`, 'referral', id, body.status, now
    )

    return NextResponse.json({ id, status: body.status })
  } catch (error) {
    console.error('PATCH /api/admin/referrals/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
