CREATE TABLE IF NOT EXISTS assessments (
  id TEXT PRIMARY KEY,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'se')),
  email TEXT NOT NULL,
  transcript_json TEXT NOT NULL,
  opportunity TEXT NOT NULL,
  who_benefits TEXT NOT NULL,
  why_before_migration TEXT NOT NULL,
  fit TEXT NOT NULL,
  company TEXT,
  current_crm TEXT,
  team_size TEXT,
  primary_pain TEXT,
  qualification TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS assessments_created_at_idx
  ON assessments (created_at DESC);

CREATE INDEX IF NOT EXISTS assessments_email_idx
  ON assessments (email);
