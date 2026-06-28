import { NextResponse } from 'next/server'

export const GET = () => {
  return NextResponse.json({ version: '1.0.0', name: 'Dreams Om Dalat' })
}
