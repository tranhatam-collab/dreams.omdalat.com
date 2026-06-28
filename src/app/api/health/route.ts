import { NextResponse } from 'next/server'

export const GET = () => {
  return NextResponse.json({ status: 'ok', version: '1.0.0', timestamp: new Date().toISOString() })
}
