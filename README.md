# Obvio Traffic Annotation System

## Deployments

- **Web Application**: [https://obvioweb.vercel.app](https://obvioweb.vercel.app)
- **API Endpoint**: [https://obvio.tallymatic.com](https://obvio.tallymatic.com)

## Stack

### Frontend
- **Framework**: React with Vite
- **Styling**: TailwindCSS
- **UI Components**: 
  - shadcn/ui for core components
  - Catalyst UI (TailwindUI) for advanced components
- **Type Safety**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Type Safety**: TypeScript

### Infrastructure
- **Web Hosting**: Vercel
- **API & Database Hosting**: Hetzner VPS
- **Deployment Tool**: Dokploy
- **DNS Management**: Cloudflare
- **Database Options**:
  - Self-hosted PostgreSQL with Docker

### Load & Browser Testing

- **Load Testing (API)**: __tests__/load.js contains API tests 
    - Use `yarn test:load` to run those tests
- **Browser Testing (UI)**: __tests__/browser.js contains Webapp tests 
    - Use `yarn test:browser` to run those tests
    

## Local Development Setup

### Prerequisites
- Node.js (LTS version)
- Docker (if using local PostgreSQL)
- yarn (package manager)

### Environment Setup

1. Clone the repository:
```bash
git clone git@github.com:zainzafar90/obvio-traffic-ticketing.git
cd obvio-ticketing
```

2. Install dependencies:
```bash
yarn install
```

3. Configure environment variables:

For Web App (`apps/web`):
```bash
cp .env.example .env
```

For API (`apps/api`):
```bash
cp .env.example .env
```

4 (a). Database Setup (Choose one):

**Option 1: Docker PostgreSQL**
```bash
docker run --name obvio-postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
```

**Option 2: Supabase**
- Create a new Supabase project
- Use the provided connection URL in your `.env` file

4 (b). Setting up data

```bash
yarn db:push 
yarn db:seed
```

5. Start the development servers:

```bash
# Start both API and Web Server
yarn dev
```

6. Login

- Use email: `admin@obvio.ai` and password: `securePassword123` (I know what you are thinking lol)


## Some Gotchas

- Haven't implemented CSRF tokens yet. Permissions are in place but strict validations need more granular testing.
- No server side framework was used (like Remix or Next.js) to speed up the initial rendering time. Next.js might have some caching challenges on local hosting anyway.
- For the time being, cookie authentication is minimal, but we can implement stricter policies once we have proper domains that I can put restrictions on (api.obvio.ai, app.obvio.ai).
- The `/random` endpoint exists for simplicity for now.
- Logging could be way better - it's almost non-existent right now. Planning to add Sentry for proper error tracking.
- I focused more on UX than colors - there are too many greens and reds in the UI, please bear with me on that!
- CORS exists but since we're dealing with different sub-domains, I'm not using lax or strict settings for cookies yet, and I'm not imposing strict CORS policies for now.
- Had to drop CDK and AWS deployment because I was hosting on a VPS and ran out of time, but CI/CD is already in place.
- Would be good to move all frontend enums to a common place for easier maintenance. (its a monorepo so already have shared packages in place)

### AI Generated Components
- Enum values 
- JSDoc style comments on methods
- Basic help on improving accessibility 
- Evaluating scenarios and asking questions like I would in real life about what might be a positive workflow/experience
- Logos
- Commit messages 
- Car colors


