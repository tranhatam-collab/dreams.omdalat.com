import { getD1, isCloudflareEnv } from './d1'
import type { D1Database } from './d1'

let localDb: any = null

async function getLocalDb() {
  if (!localDb) {
    const { getDb } = await import('./db')
    localDb = getDb()
  }
  return localDb
}

export interface DbResult {
  success: boolean
  results?: any[]
  error?: string
}

export async function query(sql: string, ...params: any[]): Promise<DbResult> {
  if (isCloudflareEnv()) {
    const d1 = getD1() as any
    if (params.length > 0) {
      const stmt = d1.prepare(sql)
      const bound = stmt.bind(...params)
      const result = await bound.all()
      return { success: true, results: result.results }
    }
    const result = await d1.exec(sql)
    return { success: result.success }
  } else {
    const db = await getLocalDb()
    const stmt = db.prepare(sql)
    const result = stmt.run(...params)
    return { success: true, results: [{ changes: result.changes, lastInsertRowid: result.lastInsertRowid }] }
  }
}

export async function queryOne(sql: string, ...params: any[]): Promise<any | null> {
  if (isCloudflareEnv()) {
    const d1 = getD1() as any
    const stmt = d1.prepare(sql)
    const bound = stmt.bind(...params)
    const result = await bound.first()
    return result || null
  } else {
    const db = await getLocalDb()
    const row = db.prepare(sql).get(...params)
    return row || null
  }
}

export async function queryAll(sql: string, ...params: any[]): Promise<any[]> {
  if (isCloudflareEnv()) {
    const d1 = getD1() as any
    const stmt = d1.prepare(sql)
    const bound = stmt.bind(...params)
    const result = await bound.all()
    return result.results || []
  } else {
    const db = await getLocalDb()
    const rows = db.prepare(sql).all(...params)
    return rows || []
  }
}

export async function execute(sql: string): Promise<DbResult> {
  if (isCloudflareEnv()) {
    const d1 = getD1() as any
    const result = await d1.exec(sql)
    return { success: result.success }
  } else {
    const db = await getLocalDb()
    db.exec(sql)
    return { success: true }
  }
}

export async function run(sql: string, ...params: any[]): Promise<{ changes: number; lastInsertRowid?: bigint }> {
  if (isCloudflareEnv()) {
    const d1 = getD1() as any
    const stmt = d1.prepare(sql)
    const bound = stmt.bind(...params)
    const result = await bound.run()
    return { changes: result.meta?.changes || 0, lastInsertRowid: BigInt(result.meta?.last_row_id || 0) }
  } else {
    const db = await getLocalDb()
    const info = db.prepare(sql).run(...params)
    return { changes: info.changes }
  }
}
