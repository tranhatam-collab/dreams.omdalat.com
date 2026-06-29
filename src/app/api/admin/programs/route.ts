import { NextRequest, NextResponse } from 'next/server'
import { queryAll, run } from '@/lib/db-service'
import { getSession } from '@/lib/session'

export const GET = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('session_token')?.value
  if (!sessionToken || !await getSession(sessionToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const programs = await queryAll('SELECT * FROM programs ORDER BY created_at DESC')
  return NextResponse.json({ programs })
}

export const POST = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('session_token')?.value
  if (!sessionToken || !await getSession(sessionToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    if (!body.titleVi || !body.slugVi || !body.descriptionVi || !body.ownerProject) {
      return NextResponse.json({ error: 'titleVi, slugVi, descriptionVi, and ownerProject are required' }, { status: 400 })
    }

    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await run(
      `INSERT INTO programs (id, slug_vi, slug_en, title_vi, title_en, description_vi, description_en,
        owner_project, partner_projects_json, delivery_mode, duration, status, publication_status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id, body.slugVi, body.slugEn || null, body.titleVi, body.titleEn || null,
      body.descriptionVi, body.descriptionEn || null, body.ownerProject,
      body.partnerProjects ? JSON.stringify(body.partnerProjects) : null,
      body.deliveryMode || null, body.duration || null,
      body.status || 'draft', body.publicationStatus || 'private', now, now
    )

    return NextResponse.json({ id }, { status: 201 })
  } catch (error) {
    console.error('POST /api/admin/programs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
