-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CorporateClient Table
CREATE TABLE CorporateClient (
    client_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- KYCRequest Table
CREATE TABLE KYCRequest (
    request_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES CorporateClient(client_id),
    nik VARCHAR(16) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- VerificationResult Table
CREATE TABLE VerificationResult (
    result_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES KYCRequest(request_id),
    stage VARCHAR(50) NOT NULL,
    score NUMERIC(5, 2),
    success BOOLEAN NOT NULL,
    result_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AuditLog Table (Immutable Audit Trail)
CREATE TABLE AuditLog (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL,
    changed_by VARCHAR(255),
    old_value JSONB,
    new_value JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to prevent updates/deletes on AuditLog to ensure immutability
CREATE OR REPLACE FUNCTION protect_audit_log()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'AuditLog table is immutable and cannot be updated or deleted';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_protect_audit_log
BEFORE UPDATE OR DELETE ON AuditLog
FOR EACH ROW EXECUTE FUNCTION protect_audit_log();
