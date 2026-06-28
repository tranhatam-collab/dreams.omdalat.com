const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const dbPath = path.join(__dirname, '..', 'data', 'dreams.db')
const dir = path.dirname(dbPath)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const db = new Database(dbPath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS dreams (
    id TEXT PRIMARY KEY, locale TEXT NOT NULL, full_name TEXT NOT NULL,
    email TEXT NOT NULL, phone TEXT, current_location TEXT,
    preferred_language TEXT, timezone TEXT, dream_title TEXT,
    dream_statement TEXT NOT NULL, first_thought_date TEXT, why_it_matters TEXT,
    blockers TEXT, attempts TEXT, partial_change TEXT, first_small_step TEXT,
    dalat_connection TEXT, current_role TEXT, responsibilities TEXT,
    available_time TEXT, financial_constraints TEXT, relocation_interest TEXT,
    start_window TEXT, privacy_level TEXT NOT NULL DEFAULT 'private',
    research_consent INTEGER NOT NULL DEFAULT 0,
    marketing_consent INTEGER NOT NULL DEFAULT 0,
    story_contact_consent INTEGER NOT NULL DEFAULT 0,
    processing_consent INTEGER NOT NULL, consent_version TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'submitted', source_url TEXT,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS dream_maps (
    id TEXT PRIMARY KEY, dream_id TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1,
    existing_assets_json TEXT, constraints_json TEXT, risks_json TEXT,
    people_needed_json TEXT, places_needed_json TEXT, first_step TEXT,
    suggested_pathways_json TEXT, ai_draft TEXT, human_review TEXT,
    status TEXT NOT NULL DEFAULT 'draft', created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
    FOREIGN KEY (dream_id) REFERENCES dreams(id)
  );
  CREATE TABLE IF NOT EXISTS stories (
    id TEXT PRIMARY KEY, dream_id TEXT, title_vi TEXT, title_en TEXT,
    body_vi TEXT, body_en TEXT, author_name TEXT,
    anonymity_mode TEXT NOT NULL DEFAULT 'named', consent_id TEXT NOT NULL,
    publication_status TEXT NOT NULL DEFAULT 'draft', published_at TEXT,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS programs (
    id TEXT PRIMARY KEY, slug_vi TEXT NOT NULL, slug_en TEXT,
    title_vi TEXT NOT NULL, title_en TEXT,
    description_vi TEXT NOT NULL, description_en TEXT,
    owner_project TEXT NOT NULL, partner_projects_json TEXT,
    delivery_mode TEXT, duration TEXT, status TEXT NOT NULL DEFAULT 'draft',
    publication_status TEXT NOT NULL DEFAULT 'private',
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS consents (
    id TEXT PRIMARY KEY, subject_type TEXT NOT NULL, subject_id TEXT NOT NULL,
    consent_type TEXT NOT NULL, version TEXT NOT NULL,
    granted INTEGER NOT NULL, granted_at TEXT, revoked_at TEXT,
    evidence_json TEXT, created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS referrals (
    id TEXT PRIMARY KEY, dream_id TEXT NOT NULL,
    source_project TEXT NOT NULL DEFAULT 'dreams',
    destination_project TEXT NOT NULL, destination_route TEXT,
    fields_transferred_json TEXT NOT NULL, consent_version TEXT NOT NULL,
    consent_given_at TEXT NOT NULL, accepted_at TEXT, rejected_at TEXT,
    revoked_at TEXT, status TEXT NOT NULL DEFAULT 'requested',
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
    FOREIGN KEY (dream_id) REFERENCES dreams(id)
  );
  CREATE TABLE IF NOT EXISTS audit_events (
    id TEXT PRIMARY KEY, actor_id TEXT, actor_role TEXT,
    event_type TEXT NOT NULL, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL,
    previous_value TEXT, next_value TEXT, created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor',
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  );
`)

const now = new Date().toISOString()

const existingAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@dreams.omdalat.com')
if (!existingAdmin) {
  const hash = bcrypt.hashSync('admin123', 10)
  db.prepare('INSERT INTO users (id, email, password_hash, name, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
    crypto.randomUUID(), 'admin@dreams.omdalat.com', hash, 'Admin', 'super_admin', now, now
  )
  console.log('Created admin user: admin@dreams.omdalat.com / admin123')
} else {
  console.log('Admin user already exists')
}

const programs = [
  {
    id: crypto.randomUUID(), slug_vi: 'goi-ten-mot-uoc-mo', slug_en: 'name-a-dream',
    title_vi: 'Gọi Tên Một Ước Mơ', title_en: 'Name a Dream',
    description_vi: 'Chương trình nhập môn giúp bạn diễn đạt điều mình thực sự muốn, phân biệt mong muốn, áp lực và tưởng tượng, xác định bối cảnh sống thật và chọn một hướng cần khám phá.',
    description_en: 'An introductory program to articulate what you truly want, distinguish desire from pressure and fantasy, identify your real-life context, and choose a direction to explore.',
    owner_project: 'Dreams', partner_projects_json: '[]',
    delivery_mode: 'online', duration: '1 session or 3 days',
    status: 'active', publication_status: 'public',
  },
  {
    id: crypto.randomUUID(), slug_vi: 'ban-do-uoc-mo', slug_en: 'dream-map',
    title_vi: 'Bản Đồ Ước Mơ', title_en: 'Dream Map',
    description_vi: 'Xác định điều bạn muốn, lý do, điều đã có, điều còn thiếu, giới hạn, rủi ro, con người cần gặp, nơi chốn phù hợp và bước thử đầu tiên.',
    description_en: 'Identify what you want, why, what you already have, what is missing, constraints, risks, people to meet, places to go, and a first step to try.',
    owner_project: 'Dreams', partner_projects_json: '[]',
    delivery_mode: 'self-guided', duration: '7 days',
    status: 'active', publication_status: 'public',
  },
  {
    id: crypto.randomUUID(), slug_vi: '21-ngay-cham-mot-uoc-mo', slug_en: '21-day-dream-experiment',
    title_vi: '21 Ngày Chạm Một Ước Mơ', title_en: '21-Day Dream Experiment',
    description_vi: 'Hành trình phối hợp giữa Dreams và Chạm giúp bạn chuyển một ước mơ thành một thử nghiệm nhỏ có đầu ra.',
    description_en: 'A partnered journey between Dreams and Cham to turn a dream into a small experiment with output.',
    owner_project: 'Dreams + Chạm', partner_projects_json: '["cham"]',
    delivery_mode: 'guided', duration: '21 days',
    status: 'active', publication_status: 'public',
  },
  {
    id: crypto.randomUUID(), slug_vi: 'dream-residency', slug_en: 'dream-residency',
    title_vi: 'Dream Residency', title_en: 'Dream Residency',
    description_vi: 'Chương trình offline tại Lily: đưa bạn ra khỏi nhịp sống cũ, tạo không gian suy nghĩ, học và làm, thực hiện thử nghiệm và review đầu ra.',
    description_en: 'An offline program at Lily: step out of your old rhythm, create thinking space, learn and work, run experiments, and review outcomes.',
    owner_project: 'Dreams + Lily + Chạm', partner_projects_json: '["lily","cham"]',
    delivery_mode: 'offline', duration: '3–28 days',
    status: 'active', publication_status: 'public',
  },
  {
    id: crypto.randomUUID(), slug_vi: 'dream-to-project', slug_en: 'dream-to-project',
    title_vi: 'Dream to Project', title_en: 'Dream to Project',
    description_vi: 'Dành cho người đã có ước mơ rõ, thử nghiệm ban đầu và tín hiệu đáng tiếp tục. Hỗ trợ chuyển thành project, portfolio, workshop, dịch vụ hoặc sản phẩm.',
    description_en: 'For those with a clear dream, initial experiment, and signal to continue. Support turning it into a project, portfolio, workshop, service, or product.',
    owner_project: 'Chạm Create', partner_projects_json: '["cham"]',
    delivery_mode: 'mentored', duration: 'On demand',
    status: 'active', publication_status: 'public',
  },
]

for (const p of programs) {
  const existing = db.prepare('SELECT id FROM programs WHERE slug_vi = ?').get(p.slug_vi)
  if (!existing) {
    db.prepare(`INSERT INTO programs (id, slug_vi, slug_en, title_vi, title_en, description_vi, description_en, owner_project, partner_projects_json, delivery_mode, duration, status, publication_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
      p.id, p.slug_vi, p.slug_en, p.title_vi, p.title_en,
      p.description_vi, p.description_en, p.owner_project,
      p.partner_projects_json, p.delivery_mode, p.duration,
      p.status, p.publication_status, now, now
    )
    console.log(`Created program: ${p.title_vi}`)
  } else {
    console.log(`Program already exists: ${p.title_vi}`)
  }
}

db.close()
console.log('Seed complete!')
