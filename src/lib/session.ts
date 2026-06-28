const sessions = new Map<string, { userId: string; email: string; name: string; role: string }>()

export function createSession(user: { userId: string; email: string; name: string; role: string }): string {
  const token = crypto.randomUUID()
  sessions.set(token, user)
  return token
}

export function getSession(token: string) {
  return sessions.get(token) || null
}

export function destroySession(token: string) {
  sessions.delete(token)
}
