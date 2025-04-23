# Previsit Questionnaire App (EHR Integration)

A multi-tenant platform that allows clinics and hospitals to collect patient responses and route them to the appropriate fields and endpoints across multiple EHR systems (e.g., Athena, Allscripts), based on flexible mappings.

---

## Overview

This system allows:
- Patients to answer previsit questions.
- Admins to define custom mappings per EHR provider.
- The backend to dynamically route each response to the correct EHR field & endpoint.
- Future readiness through modularity, caching, and tenant-aware architecture.

This project is focused on **modular architecture**, **multi-tenancy**, **data mapping**, and **performance-aware design**.

---

## Project Structure (pnpm Monorepo)

```
previsit-questionnaire-app/
├── previsit-api/          # NestJS backend
├── previsit-console/      # React admin panel (for mappings)
├── previsit-app/          # Patient-facing form (WIP)
├── packages/
│   └── shared/            # Shared types and utilities
├── docker-compose.yml
├── Dockerfile
└── pnpm-workspace.yaml
```

---

## Backend (`previsit-api`)

### Key Features
- **Multi-tenancy** via `x-tenant-id` header
- **Dynamic EHR field resolution** using `EhrFieldMapping`
- **Modular EHR integration strategy** (e.g., Athena, Allscripts)
- **MongoDB with Mongoose**
- **Redis caching** (via `@Cacheable` decorator and custom interceptor)
- **Swagger Docs** at `/docs`

### Core Domain Models
- `Tenant`: Hospital/clinic scope
- `Question`: Previsit form question definition
- `Questionnaire`: A named set of questions
- `PatientAnswer`: Submission payload linked to a questionnaire
- `EhrFieldMapping`: Maps question keys to EHR fields & endpoints

### Strategy Pattern for EHRs

Each EHR provider (e.g., Athena) implements a strategy like:

```ts
interface EhrProviderStrategy {
  submitToEhr(payload: any): Promise<void>;
}
```

Registered via a provider registry that allows dynamic routing by tenant + provider.

---

## Testing Strategy

- Unit tests for mapping service and strategies (planned with Jest)
- Integration test for patient submission and mapping resolution
- Use of mocks for EHR provider APIs
- Testcontainers for MongoDB & Redis (optional in extended setup)

---

## Frontend (`previsit-console`)

### Admin Tool Features
- View/edit mappings per EHR provider
- Create new mappings via modal form
- Delete mappings
- Form validation and feedback (toasts)

### Planned Enhancements
- Bulk CSV/JSON upload
- Pagination, filtering
- Multi-language UI support

---

## Multi-language Support (Planned)
- Use `i18next` in frontend
- Define `question.text` with keys and fallback per language
- API accepts `lang` param or header to localize questions & responses

---

## Performance Considerations
- Redis caching on read-heavy routes (mappings, questions)
- Async event publishing for EHR submission (planned)
- MongoDB indexes on `tenantId`, `questionKey`, `ehrProvider`

---

## Scalability Plan (Design Only)

To scale for millions of users:
- **Horizontal scaling** of services (stateless APIs)
- **Message Queue** (e.g., NATS or Kafka) for decoupled EHR delivery
- **Worker service** to process patient submissions and retry failures
- **Load balancer** in front of backend
- **CDN + static hosting** for frontend apps
- **Rate limiting** and **circuit breakers** for external EHRs

---

## Assumptions
- Each tenant uses a single EHR provider for the questionnaire. Tenants can have multiple EHR to choose from
- Question keys are unique per tenant for each provider
- Responses must be routed immediately, not batch processed
- EHR field mappings are managed manually by admin users

---

## How to Run

### Prerequisites
- Node.js v18+
- pnpm
- Docker (for MongoDB and Redis)

### Steps

```bash
# 1. Install dependencies
pnpm install

# 2. Start services
docker-compose up -d

# 3. Start backend
pnpm --filter previsit-api dev

# 4. Start admin console
pnpm --filter previsit-console dev
```

> Visit `http://localhost:3000` for the admin panel.  
> Swagger docs: `http://localhost:3001/docs`

---

## API Sample: Resolve Mapping

```
GET /api/v1/ehr-mappings/resolve?ehrProvider=Athena&questionKey=currentMedications
Headers:
  x-tenant-id: clinic-abc
```

```json
{
  "endpoint": "/api/patient/medications",
  "ehrField": "PATIENT_MEDICATIONS_CURRENT"
}
```