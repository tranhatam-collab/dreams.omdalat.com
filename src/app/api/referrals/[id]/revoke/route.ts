import { NextRequest, NextResponse } from 'next/server'
import { queryOne, run } from '@/lib/db-service'

export const POST = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params

    const referral = await queryOne('SELECT id FROM referrals WHERE id = ?', id)

    if (!referral) {
      return NextResponse.json({ error: 'Referral not found' }, { status: 404 })
    }

    const now = new Date().toISOString()

    await run('UPDATE referrals SET status = ?, revoked_at = ?, updated_at = ? WHERE id = ?',
      'revoked', now, now, id)

    await run(
      `INSERT INTO audit_events (id, actor_id, actor_role, event_type, entity_type, entity_id, next_value, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      crypto.randomUUID(), null, 'system', 'referral_revoked', 'referral', id, 'revoked', now
    )

    return NextResponse.json({ id, status: 'revoked' })
  } catch (error) {
    console.error('POST /api/referrals/[id]/revoke error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
