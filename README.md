# B2B SaaS eKYC Platform BNI

## Overview
The **B2B SaaS eKYC Platform BNI** is a high-performance electronic Know Your Customer (eKYC) verification system designed for corporate clients. The platform automates identity verification through a sophisticated pipeline consisting of OCR data extraction, liveness detection, facial matching, and real-time validation against government databases (Dukcapil).

### Core Verification Pipeline
1. **Request**: Corporate clients submit KTP images and selfie photos via REST API.
2. **OCR**: Automatic extraction of NIK, Name, and Address from KTP.
3. **Liveness**: Anti-spoofing checks to ensure the presence of a real person.
4. **Face Match**: Similarity calculation between the KTP photo and the live selfie.
5. **Dukcapil Validation**: Final verification of identity data against the national database.
6. **Decision**: Automatic approval based on confidence scores or routing to BNI internal reviewers for manual audit.
7. **Notification**: Asynchronous result delivery via signed Webhooks.

---

## Technical Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Backend** | Java Spring Boot 3.2 | Standard BNI microservices framework |
| **AI/ML Engine** | Python FastAPI | High-performance serving for AI models |
| **Frontend** | React.js | Responsive Admin Dashboard |
| **Database** | PostgreSQL 15 | Relational data with strong ACID compliance |
| **Caching** | Redis 7.0 | Session management and rate limiting |
| **Message Broker** | Apache Kafka 3.5 | Asynchronous event-driven notifications |
| **Orchestration** | Kubernetes (K8s) | Scalability and service orchestration |
| **Hardware** | NVIDIA A100 40GB | GPU acceleration for OCR and Face Match |

---

## Architecture & Components

### System Topology
The system is deployed **on-prem (BNI Private Cloud)** across four distinct network zones:
- **DMZ Zone**: Hosts the B2B API Gateway for secure external entry.
- **Internal K8s Cluster**: Contains the core application logic, messaging, and persistence layers.
- **Integration Zone**: Manages the BNI Internal Gateway for secure communication with government systems.
- **External Zone**: The Dukcapil government system.

### Key Components
- **B2B API Gateway**: Entry point handling OAuth2 validation and rate limiting.
- **eKYC Orchestrator**: The central workflow manager coordinating the verification pipeline.
- **AI Microservices**: Specialized services for OCR, Liveness, and Face Matching.
- **Webhook Service**: Handles asynchronous delivery of verification results.
- **Admin Dashboard**: Interface for BNI Internal Reviewers to perform manual audits.

---

## Security & Compliance

### Authentication & Authorization
- **Admin Access**: AD BNI Integration with mandatory TOTP (Google Authenticator) MFA.
- **Service Communication**: mTLS (Mutual TLS) via Istio Service Mesh.
- **Client Access**: OAuth2 JWT (Client Credentials Grant) via B2B API Gateway.
- **RBAC**: Granular roles (Super Admin, Internal Reviewer) to control access to PII and management modules.

### Data Protection
- **Encryption at Rest**: AES-256-GCM via KMS/HSM with column-level encryption for PII.
- **Encryption in Transit**: TLS 1.3 for all API connections.
- **PII Management**: Strict data classification and automated purge policies (e.g., images purged after 30 days).
- **Compliance**: Adheres to OJK APU PPT (Anti Pencucian Uang dan Pencegahan Pendanaan Terorisme).

---

## API & Data Model

### Primary API
- **Endpoint**: `POST /v1/kyc/submit`
- **Function**: Submit KTP and Selfie images for verification.
- **Auth**: OAuth2 Client Credentials Grant.
- **Response**: `202 Accepted` with a `request_id`.

### Data Entities
- **CorporateClient**: Manages partner corporate data and webhook configurations.
- **KYCRequest**: Tracks the lifecycle of a verification request.
- **VerificationResult**: Stores AI scores, Dukcapil status, and the final decision.
- **AuditLog**: Immutable record of all PII access and system actions.

---

## Project Roadmap

### Phase 1: Core eKYC Engine
- Implementation of OCR, Liveness, Face Match, and Dukcapil integration.
- Validation of engine accuracy and PII security.

### Phase 2: B2B SaaS Enablement
- Deployment of B2B API Gateway and Rate Limiting.
- Implementation of Webhook notifications and Admin Dashboard for case management.
- Reporting and Analytics dashboard for Super Admins.
