CREATE TABLE IF NOT EXISTS funnel_sessions (
  id TEXT PRIMARY KEY,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'se')),
  landing_path TEXT NOT NULL,
  referrer_host TEXT,
  source TEXT NOT NULL,
  medium TEXT NOT NULL,
  campaign TEXT,
  content TEXT,
  term TEXT,
  country TEXT,
  device TEXT NOT NULL CHECK (device IN ('desktop', 'mobile', 'tablet', 'unknown')),
  first_seen_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS funnel_events (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  name TEXT NOT NULL CHECK (name IN (
    'page_view',
    'cta_click',
    'outbound_click',
    'language_change',
    'assessment_viewed',
    'assessment_started',
    'assessment_answered',
    'assessment_email_requested',
    'assessment_error',
    'contact_opened',
    'contact_submitted',
    'contact_error'
  )),
  path TEXT NOT NULL,
  location TEXT,
  step INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

ALTER TABLE assessments ADD COLUMN session_id TEXT;
ALTER TABLE assessments ADD COLUMN sales_status TEXT NOT NULL DEFAULT 'new'
  CHECK (sales_status IN ('new', 'contacted', 'conversation', 'pilot_proposed', 'won', 'lost'));
ALTER TABLE assessments ADD COLUMN outcome_note TEXT;
ALTER TABLE assessments ADD COLUMN status_updated_at TEXT;

ALTER TABLE contact_requests ADD COLUMN session_id TEXT;
ALTER TABLE contact_requests ADD COLUMN sales_status TEXT NOT NULL DEFAULT 'new'
  CHECK (sales_status IN ('new', 'contacted', 'conversation', 'pilot_proposed', 'won', 'lost'));
ALTER TABLE contact_requests ADD COLUMN outcome_note TEXT;
ALTER TABLE contact_requests ADD COLUMN status_updated_at TEXT;

CREATE INDEX IF NOT EXISTS idx_funnel_sessions_first_seen
  ON funnel_sessions (first_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_funnel_sessions_source_campaign
  ON funnel_sessions (source, campaign, first_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_funnel_events_session_name
  ON funnel_events (session_id, name);
CREATE INDEX IF NOT EXISTS idx_funnel_events_created_at
  ON funnel_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessments_session_id
  ON assessments (session_id);
CREATE INDEX IF NOT EXISTS idx_assessments_sales_status
  ON assessments (sales_status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_session_id
  ON contact_requests (session_id);
CREATE INDEX IF NOT EXISTS idx_contact_requests_sales_status
  ON contact_requests (sales_status, created_at DESC);

PRAGMA optimize;
