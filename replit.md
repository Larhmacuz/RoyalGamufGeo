# Royal Gamuf Nig LTD - Professional Geological & Estate Services Website

## Overview

This is a professional B2B services website for Royal Gamuf Nig LTD, a Nigerian company offering geological surveys, land verification, estate management, and property sales services. The application is built as a full-stack TypeScript project with a React frontend and Express backend, designed to establish credibility and trust for geological and real estate consulting services.

The website features multiple pages including Home, Services, Properties, About, Careers, Contact, and Request Quote functionality. It emphasizes professional polish, clear information architecture, and trust-building elements like CAC registration status and service credentials.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **UI Components**: shadcn/ui component library (New York style variant) with Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ES modules
- **API Structure**: REST endpoints prefixed with /api
- **Storage Pattern**: Interface-based storage abstraction (IStorage) with in-memory implementation (MemStorage) that can be swapped for database storage

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: shared/schema.ts (shared between frontend and backend)
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Database Migrations**: Drizzle Kit with migrations output to ./migrations

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data storage interface
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between client/server
│   └── schema.ts     # Database schema and types
└── attached_assets/  # Static assets
```

### Design System
- Professional B2B aesthetic with blue primary color (matching company logo)
- Light/dark mode support via CSS variables
- Typography: Inter/Roboto font family
- Responsive design with mobile-first approach
- Custom hover/elevation effects for interactive elements

### Key Features
- **Contact Form**: Database-backed form submission with loading states and success confirmation
- **Quote Request Form**: Database-backed form submission with loading states and success confirmation
- **Property Gallery**: Interactive image gallery modal with thumbnails and navigation
- **Service Packages**: Optional pricing packages for select services (field-investigation, engineering-geology)
- **WhatsApp Floating Button**: Green WhatsApp button for quick contact
- **Client Testimonials**: Homepage section with client reviews and star ratings
- **Service Areas**: Homepage section showing coverage across South-West Nigeria
- **FAQ Page**: Frequently asked questions about services with accordion-style answers
- **Admin Panel**: Protected admin area for managing properties, testimonials, and viewing inquiries

### Admin Panel
- **Login URL**: /admin/login
- **Dashboard**: /admin - Shows statistics (properties, inquiries, testimonials counts)
- **Properties Management**: /admin/properties - Full CRUD for property listings
- **Inquiries**: /admin/inquiries - View contact, quote, and property inquiries
- **Testimonials**: /admin/testimonials - Manage client testimonials with visibility toggle
- **Credentials**: username: admin, password: royalgamuf2024

### Company Information
- **Email**: royalgamufnig.ltd@gmail.com
- **Phone**: +234 704 826 6273
- **Address**: Suite 27 & 28, S.O.A. Shopping Complex, Abiola Way, Olorunsogo, Abeokuta, Ogun State, Nigeria
- **RC Number**: 1001042
- **Social Media**: X (@royalgamufnig), Instagram (@royalgamuf)

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via DATABASE_URL environment variable)
- **Neon Serverless**: PostgreSQL driver (@neondatabase/serverless) for serverless-compatible connections

### Important: Neon HTTP Driver Workarounds
The Neon HTTP driver has some known issues that require workarounds:
1. **Boolean Parsing Bug**: Boolean columns return incorrect values. Workaround: Cast to text with `is_admin::text` and manually parse in code.
2. **`.returning()` Returns Null**: The `.returning()` method returns null. Workaround: Construct return objects manually rather than relying on `.returning()`.
3. **Apply Defaults Before Insert**: Always apply default values (features: [], images: [], status: "available", isVisible: true) to the insert object before calling db.insert(), not just in the return object.

### UI Framework Dependencies
- **Radix UI**: Full suite of accessible UI primitives (dialogs, dropdowns, forms, etc.)
- **Lucide React**: Icon library
- **React Icons**: Additional icon sets (social media icons)
- **Embla Carousel**: Carousel/slider functionality
- **Vaul**: Drawer component

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Runtime type validation
- **@hookform/resolvers**: Zod integration for React Hook Form

### Session Management
- **connect-pg-simple**: PostgreSQL session store (available for future auth implementation)

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **esbuild**: Server bundling for production