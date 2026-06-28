import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = path.join(process.cwd(), 'data', 'dreams.db')

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!db) {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    initSchema(db)
  }
  return db
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS dreams (
      id TEXT PRIMARY KEY,
      locale TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      current_location TEXT,
      preferred_language TEXT,
      timezone TEXT,
      dream_title TEXT,
      dream_statement TEXT NOT NULL,
      first_thought_date TEXT,
      why_it_matters TEXT,
      blockers TEXT,
      attempts TEXT,
      partial_change TEXT,
      first_small_step TEXT,
      dalat_connection TEXT,
      current_role TEXT,
      responsibilities TEXT,
      available_time TEXT,
      financial_constraints TEXT,
      relocation_interest TEXT,
      start_window TEXT,
      privacy_level TEXT NOT NULL DEFAULT 'private',
      research_consent INTEGER NOT NULL DEFAULT 0,
      marketing_consent INTEGER NOT NULL DEFAULT 0,
      story_contact_consent INTEGER NOT NULL DEFAULT 0,
      processing_consent INTEGER NOT NULL,
      consent_version TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'submitted',
      source_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dream_maps (
      id TEXT PRIMARY KEY,
      dream_id TEXT NOT NULL,
      version INTEGER NOT NULL DEFAULT 1,
      existing_assets_json TEXT,
      constraints_json TEXT,
      risks_json TEXT,
      people_needed_json TEXT,
      places_needed_json TEXT,
      first_step TEXT,
      suggested_pathways_json TEXT,
      ai_draft TEXT,
      human_review TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (dream_id) REFERENCES dreams(id)
    );

    CREATE TABLE IF NOT EXISTS stories (
      id TEXT PRIMARY KEY,
      dream_id TEXT,
      title_vi TEXT,
      title_en TEXT,
      body_vi TEXT,
      body_en TEXT,
      author_name TEXT,
      anonymity_mode TEXT NOT NULL DEFAULT 'named',
      consent_id TEXT NOT NULL,
      publication_status TEXT NOT NULL DEFAULT 'draft',
      published_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS programs (
      id TEXT PRIMARY KEY,
      slug_vi TEXT NOT NULL,
      slug_en TEXT,
      title_vi TEXT NOT NULL,
      title_en TEXT,
      description_vi TEXT NOT NULL,
      description_en TEXT,
      owner_project TEXT NOT NULL,
      partner_projects_json TEXT,
      delivery_mode TEXT,
      duration TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      publication_status TEXT NOT NULL DEFAULT 'private',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS consents (
      id TEXT PRIMARY KEY,
      subject_type TEXT NOT NULL,
      subject_id TEXT NOT NULL,
      consent_type TEXT NOT NULL,
      version TEXT NOT NULL,
      granted INTEGER NOT NULL,
      granted_at TEXT,
      revoked_at TEXT,
      evidence_json TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS referrals (
      id TEXT PRIMARY KEY,
      dream_id TEXT NOT NULL,
      source_project TEXT NOT NULL DEFAULT 'dreams',
      destination_project TEXT NOT NULL,
      destination_route TEXT,
      fields_transferred_json TEXT NOT NULL,
      consent_version TEXT NOT NULL,
      consent_given_at TEXT NOT NULL,
      accepted_at TEXT,
      rejected_at TEXT,
      revoked_at TEXT,
      status TEXT NOT NULL DEFAULT 'requested',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (dream_id) REFERENCES dreams(id)
    );

    CREATE TABLE IF NOT EXISTS audit_events (
      id TEXT PRIMARY KEY,
      actor_id TEXT,
      actor_role TEXT,
      event_type TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      previous_value TEXT,
      next_value TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'editor',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `)
}

export function closeDb() {
  if (db) {
    db.close()
    db = null
  }
}
