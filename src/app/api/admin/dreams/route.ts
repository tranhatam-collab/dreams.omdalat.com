import { NextRequest, NextResponse } from 'next/server'
import { queryAll, queryOne, run } from '@/lib/db-service'
import { getSession } from '@/lib/session'

export const GET = async (request: NextRequest) => {
  try {
    const sessionToken = request.cookies.get('session_token')?.value
    if (!sessionToken || !getSession(sessionToken)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = (page - 1) * limit

    let countSql = 'SELECT COUNT(*) as total FROM dreams'
    let dataSql = 'SELECT * FROM dreams'
    const params: string[] = []

    if (status) {
      countSql += ' WHERE status = ?'
      dataSql += ' WHERE status = ?'
      params.push(status)
    }

    dataSql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'

    const totalRow = await queryOne(countSql, ...params)
    const total = totalRow?.total || 0
    const dreams = await queryAll(dataSql, ...params, String(limit), String(offset))

    return NextResponse.json({
      dreams: dreams.map((row: any) => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        locale: row.locale,
        status: row.status,
        dreamStatement: row.dream_statement ? String(row.dream_statement).substring(0, 100) : null,
        createdAt: row.created_at,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('GET /api/admin/dreams error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const PATCH = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('session_token')?.value
  if (!sessionToken || !getSession(sessionToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    if (!body.id || !body.status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 })
    }

    const now = new Date().toISOString()

    const dream = await queryOne('SELECT id FROM dreams WHERE id = ?', body.id)
    if (!dream) {
      return NextResponse.json({ error: 'Dream not found' }, { status: 404 })
    }

    await run('UPDATE dreams SET status = ?, updated_at = ? WHERE id = ?', body.status, now, body.id)

    await run(
      `INSERT INTO audit_events (id, actor_id, actor_role, event_type, entity_type, entity_id, next_value, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      crypto.randomUUID(), getSession(sessionToken)?.userId, 'admin', 'dream_status_changed', 'dream', body.id, body.status, now
    )

    return NextResponse.json({ id: body.id, status: body.status })
  } catch (error) {
    console.error('PATCH /api/admin/dreams error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
