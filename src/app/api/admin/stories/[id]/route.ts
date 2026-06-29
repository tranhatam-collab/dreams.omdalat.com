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

    if (!body.publicationStatus) {
      return NextResponse.json({ error: 'publicationStatus is required' }, { status: 400 })
    }

    const now = new Date().toISOString()

    const story = await queryOne('SELECT id FROM stories WHERE id = ?', id)
    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    if (body.publicationStatus === 'published') {
      await run('UPDATE stories SET publication_status = ?, published_at = ?, updated_at = ? WHERE id = ?',
        'published', now, now, id)
    } else {
      await run('UPDATE stories SET publication_status = ?, updated_at = ? WHERE id = ?',
        body.publicationStatus, now, id)
    }

    return NextResponse.json({ id, status: body.publicationStatus })
  } catch (error) {
    console.error('PATCH /api/admin/stories/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
