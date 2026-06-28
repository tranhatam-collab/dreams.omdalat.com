const isCloudflare = typeof globalThis.process?.env?.DREAMS_DB !== 'undefined'

interface D1Result {
  success: boolean
  error?: string
  results?: unknown[]
}

export interface D1Database {
  prepare(sql: string): { bind(...params: unknown[]): { run(): Promise<D1Result>; first(): Promise<unknown>; all(): Promise<D1Result> } }
  exec(sql: string): Promise<D1Result>
}

export function getD1(): D1Database | null {
  if (!isCloudflare) return null
  const d1 = (globalThis as unknown as Record<string, unknown>).DREAMS_DB
  return d1 as D1Database
}

export function getCloudflareDb() {
  const d1 = getD1()
  if (!d1) throw new Error('D1 database not available in this environment')
  return d1
}

export function isCloudflareEnv(): boolean {
  return isCloudflare
}
