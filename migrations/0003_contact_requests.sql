CREATE TABLE IF NOT EXISTS contact_requests (
  id TEXT PRIMARY KEY,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'se')),
  email TEXT NOT NULL,
  message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS contact_requests_created_at_idx
  ON contact_requests (created_at DESC);

CREATE INDEX IF NOT EXISTS contact_requests_email_idx
  ON contact_requests (email);
