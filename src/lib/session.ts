import { getD1 } from './d1'

async function getDb() {
  return getD1()
}

export async function createSession(user: { userId: string; email: string; name: string; role: string }): Promise<string> {
  const d1 = await getDb()
  const token = crypto.randomUUID()
  const now = new Date().toISOString()
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  await d1.prepare(
    'INSERT INTO sessions (token, user_id, email, name, role, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(token, user.userId, user.email, user.name, user.role, now, expires).run()
  return token
}

export async function getSession(token: string) {
  const d1 = await getDb()
  const session = await d1.prepare(
    'SELECT user_id as userId, email, name, role FROM sessions WHERE token = ? AND expires_at > datetime("now")'
  ).bind(token).first<{ userId: string; email: string; name: string; role: string }>()
  return session || null
}

export async function destroySession(token: string) {
  const d1 = await getDb()
  await d1.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()
}
