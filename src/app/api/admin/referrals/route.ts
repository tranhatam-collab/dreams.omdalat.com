import { NextRequest, NextResponse } from 'next/server'
import { queryAll } from '@/lib/db-service'
import { getSession } from '@/lib/session'

export const GET = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('session_token')?.value
  if (!sessionToken || !getSession(sessionToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const referrals = await queryAll('SELECT * FROM referrals ORDER BY created_at DESC')
  return NextResponse.json({ referrals })
}
