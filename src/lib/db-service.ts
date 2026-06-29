import { getD1, type D1Database } from './d1'

async function getDb(): Promise<D1Database> {
  return getD1()
}

export interface DbResult {
  success: boolean
  results?: unknown[]
  error?: string
}

export async function query(sql: string, ...params: unknown[]): Promise<DbResult> {
  const d1 = await getDb()
  if (params.length > 0) {
    const stmt = d1.prepare(sql)
    const bound = stmt.bind(...params)
    const result = await bound.all()
    return { success: true, results: result.results }
  }
  const result = await d1.exec(sql)
  return { success: result.success }
}

export async function queryOne<T = unknown>(sql: string, ...params: unknown[]): Promise<T | null> {
  const d1 = await getDb()
  const stmt = d1.prepare(sql)
  const bound = stmt.bind(...params)
  const result = await bound.first<T>()
  return result || null
}

export async function queryAll<T = unknown>(sql: string, ...params: unknown[]): Promise<T[]> {
  const d1 = await getDb()
  const stmt = d1.prepare(sql)
  const bound = stmt.bind(...params)
  const result = await bound.all()
  return (result.results as T[]) || []
}

export async function execute(sql: string): Promise<DbResult> {
  const d1 = await getDb()
  const result = await d1.exec(sql)
  return { success: result.success }
}

export async function run(sql: string, ...params: unknown[]): Promise<{ changes: number; lastInsertRowid?: bigint }> {
  const d1 = await getDb()
  const stmt = d1.prepare(sql)
  const bound = stmt.bind(...params)
  const result = await bound.run()
  return { changes: result.meta?.changes || 0, lastInsertRowid: BigInt(result.meta?.last_row_id || 0) }
}