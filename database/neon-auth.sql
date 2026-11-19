-- SOLO autenticacion, usuarios y sesiones. No migrar pedidos aun.
CREATE TABLE IF NOT EXISTS users (
 id text PRIMARY KEY,
 names text NOT NULL,
 surnames text NOT NULL,
 birth_date text NOT NULL,
 gender text NOT NULL CHECK (gender IN ('Masculino','Femenino')),
 phone text NOT NULL,
 email text NOT NULL,
 password_hash text NOT NULL,
 role text NOT NULL CHECK (role IN ('cliente','vendedor','admin')),
 employee_code text UNIQUE,
 created_at text NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS unique_users_email_lower ON users(lower(email));
CREATE TABLE IF NOT EXISTS sessions (
 token_hash text PRIMARY KEY,
 user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 expires_at bigint NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_expires ON sessions(expires_at);
CREATE TABLE IF NOT EXISTS login_attempts (
 email_hash text PRIMARY KEY,
 attempts integer NOT NULL,
 locked_until bigint NOT NULL
);
