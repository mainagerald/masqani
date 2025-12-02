# Project Overview

A comprehensive property management and listing platform tailored for the Kenyan market. It aims to streamline the rental and property management experience for landlords, tenants, and administrators.

## Features

- **Property Listings:** Advanced search and filtering capabilities based on price, location, size, property type, and amenities (parking, pets, elevators, etc.).
- **User Roles:**
  - **Landlord:** Manage properties
  - **Tenant:** Search properties, etc.
  - **Admin:** Platform oversight.
- **Landlord-Tenant Portal:**
  - Lease management with approval workflows.
  - Maintenance request tracking.
  - Payment integration (Bank cards, M-Pesa).
- **Interactive Maps:** Map-based property search using Leaflet.
- **Notifications:** SMS and Email alerts for key activities.

## Tech Stack

### Backend (`/masqani`)
Built with robust enterprise-grade Java technologies:
- **Framework:** Spring Boot 3.3.3 (Java 17)
- **Database:** MySQL with Liquibase for migration.
- **Security:** Spring Security, OAuth2 Client (Auth0), JWT.
- **Persistence:** Spring Data JPA.
- **Caching:** Redis, Hazelcast, Caffeine.
- **Storage:** Amazon S3 / Backblaze B2 SDK.
- **Tools:** MapStruct, Lombok, Docker Compose.

### Frontend (`/masqani-fe`)
A modern, responsive user interface:
- **Framework:** React 18 with Vite.
- **Styling:** Tailwind CSS, Material UI, Shadcn/UI (Radix Primitives).
- **Maps:** Leaflet & React-Leaflet.
- **State & Routing:** React Router DOM.
- **HTTP Client:** Axios.
- **Icons:** Lucide React, React Icons.

## Project Structure

```
masqani/
├── masqani/          
│   ├── src/
│   ├── pom.xml
│   └── compose.yaml
├── masqani-fe/       
│   ├── src/
│   ├── package.json
│   └── vite.config.js
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js (v18+ recommended)
- Docker & Docker Compose
- MySQL Database

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd masqani
   ```
2. Configure your database and environment variables in `src/main/resources/application.properties` (or `application.yml`).
3. Start the supporting services (Database, etc.) if using Docker:
   ```bash
   docker-compose up -d
   ```
4. Build and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend API will be available at `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd masqani-fe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend application will be available at `http://localhost:5173`.


