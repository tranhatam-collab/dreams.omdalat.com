import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { queryOne } from '@/lib/db-service'
import { createSession } from '@/lib/session'

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()

    if (!body.email || !body.password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const user = await queryOne('SELECT * FROM users WHERE email = ?', body.email)

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(body.password, user.password_hash)

    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const sessionToken = createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    const response = NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    response.cookies.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (error) {
    console.error('POST /api/admin/login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
