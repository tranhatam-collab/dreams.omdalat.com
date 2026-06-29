import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export const GET = async (request: NextRequest) => {
  const sessionToken = request.cookies.get('session_token')?.value

  if (!sessionToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const user = await getSession(sessionToken)

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, user })
}
