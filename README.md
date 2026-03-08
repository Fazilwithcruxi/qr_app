# QRGenius - Enterprise Core QR & Barcode Microservices

QRGenius is a robust, highly secure, and scalable web application that offers role-based organizational architecture to manage and generate dynamic QR codes and barcodes (Code128). It is built entirely on a containerized microservices architecture to segregate concerns securely and operate with blazing-fast reliability.

## Features

- **Microservices Architecture:** Independently scalable backend services using Express and Node.js.
- **API Gateway:** A unified entry point that transparently routes internal microservice requests.
- **Tenant Segregation:** Absolute data segregation between different Organizations/Tenants.
- **Bank-Grade JWT Auth:** Secure Authentication and Authorization systems out of the box.
- **Role-Based Access Control (RBAC):** Admin, Manager, and User tiers to structure internal organizational workflows safely.
- **Blazing Fast Code Generation:** pure functional generation mechanisms utilizing `bwip-js` and `qrcode` processing arrays of streams directly.
- **Next.js Dashboard:** A stunning glassmorphic UI integrated tightly with React, TailwindCSS, and App Router for dynamic rendering.

## Architecture & Services Stack

The application employs 5 major decoupled pieces running on distinct ports:

1. **Frontend Application** (`Next.js / 3000`) - Rich Next.js App router dashboard.
2. **API Gateway Proxy** (`Express / 4000`) - The frontend queries this, effectively masking internal service ports.
3. **Auth Service** (`Express / 4001`) - JWT generation, bcrypt hashing, User & Tenant Management.
4. **Product Service** (`Express / 4002`) - Storage & Retrieval endpoints restricted strictly by JWT `tenant_id` claims.
5. **Generator Service** (`Express / 4003`) - Pure functional endpoint streaming back decoded code buffers.
6. **PostgreSQL** (`Docker / 5433`) - Complete relational storage. 

> Database note: Operates on port `5433` to prevent clashes with typical local host Postgres (5432) installations.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Postgres (Locally or via Docker compose)
- Docker & Docker Compose (for rapid infrastructure bootup)

### Installation & Launch

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/qrgenius-microservices.git
   cd qrgenius-microservices
   ```

2. **Start the database**
   ```bash
   docker-compose up -d
   ```
   *(This triggers `init.sql` automatically, applying all fundamental DB schemas and relations!)*

3. **Install dependencies and launch services**
   You can easily launch the entire constellation of services (Frontend and the 4 backend services) via the provided PowerShell helper script:
   ```bash
   # Run the start script from the project root
   ./start-all.ps1
   ```

4. **Experience the Application**
   Open [http://localhost:3000](http://localhost:3000) inside your web browser. 

---

### Tech Stack Details:
- **Client**: Next.js, API Routing handlers, TailwindCSS, React.
- **Gateway/Microservices**: Node.js, Express, `express-http-proxy`.
- **Database layer**: PostgreSQL, `pg` driver mapping `UUID` relationships cleanly.
- **Security Checkers**: `jsonwebtoken`, `bcrypt`.
- **Generation Logic**: `bwip-js`, `qrcode`. 

## Built For Enterprise 
QRGenius was engineered specifically bypassing monolith limitations, ensuring that your organization can easily detach any logic stream (like Authentication or Code Generation) to separate deployment clusters dynamically down the road.
