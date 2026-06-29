import { getCloudflareContext } from '@opennextjs/cloudflare'

export interface D1Result {
  success: boolean
  error?: string
  results?: unknown[]
  meta?: { changes: number; last_row_id: number }
}

export interface D1PreparedStatement {
  bind(...params: unknown[]): {
    run(): Promise<D1Result>
    first<T = unknown>(): Promise<T | null>
    all<T = unknown>(): Promise<{ results: T[] }>
  }
}

export interface D1Database {
  prepare(sql: string): D1PreparedStatement
  exec(sql: string): Promise<D1Result>
}

let d1Cache: D1Database | null = null

export async function getD1(): Promise<D1Database> {
  if (d1Cache) return d1Cache
  
  const context = await getCloudflareContext({ async: true })
  const d1 = (context.env as Record<string, unknown>).DREAMS_DB
  
  if (!d1 || typeof d1 !== 'object' || !('prepare' in d1) || typeof d1.prepare !== 'function') {
    throw new Error('D1 binding DREAMS_DB not available. Ensure wrangler.jsonc has d1_databases binding.')
  }
  
  d1Cache = d1 as D1Database
  return d1Cache
}
