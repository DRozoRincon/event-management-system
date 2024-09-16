CREATE TABLE users (
  id serial PRIMARY KEY,  
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password text NOT NULL,
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  UNIQUE (email)
);

CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updatedAt" = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_users_updatedAt
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();


CREATE TABLE events (
  id serial PRIMARY KEY,  
  name varchar(255) NOT NULL,
  description varchar(255),
  start_date date,
  end_date date,
  lat decimal(10,8),
  long decimal(10,8),
  user_id integer REFERENCES users(id), 
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updated_at" = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TABLE type_documents (
  id serial PRIMARY KEY,
  name varchar(10) NOT NULL,
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updated_at" = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_type_documents_updated_at
BEFORE UPDATE ON type_documents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TABLE attendants (
  id serial PRIMARY KEY, 
  name varchar(100) NOT NULL,
  document varchar(20) NOT NULL,
  email varchar(100) NOT NULL,
  type_document_id integer REFERENCES type_documents(id),
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updated_at" = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_attendants_updated_at
BEFORE UPDATE ON attendants
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TABLE attendances (
  id serial PRIMARY KEY,  
  date date NOT NULL,
  attendant_id integer REFERENCES attendants(id) ON DELETE CASCADE,
  event_id integer REFERENCES events(id) ON DELETE CASCADE,
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updated_at" = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_attendances_updated_at
BEFORE UPDATE ON attendances
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
