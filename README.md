# Restaurant Menu Demo

## 1. Project Overview
A modern restaurant menu web application built with Next.js, React, and TypeScript. The app demonstrates both Server-Side Rendering (SSR) and Client-Side Rendering (CSR) patterns, integrates Redis for caching, and uses GSAP for smooth UI animations. It fetches real restaurant data from the [Dicoding Restaurant API](https://restaurant-api.dicoding.dev/).

**Technologies Used:**
- Next.js 14+
- React 18+
- TypeScript
- Redis (for caching)
- GSAP (animations)
- Tailwind CSS (styling)
- SWR (data fetching)

---

## 2. Features
- **SSR with Redis Caching:**
  - Home page is server-rendered and leverages Redis for fast, cached responses.
- **CSR with API & Redis:**
  - (Optional) Category pages fetch menu items from API routes with Redis support.
- **GSAP Animations:**
  - Smooth entrance and transition animations for menu items.
- **Performance Optimizations:**
  - Caching, code splitting, image optimization, and more.
- **Dark/Light Mode:**
  - Toggleable theme with custom color palette.
- **Mobile Responsive:**
  - Burger menu and adaptive layout for all devices.

---

## 3. Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd restaurant-menu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variable Setup
Create a `.env.local` file in the root directory:
```env
# Redis connection string
REDIS_URL=redis://localhost:6379
# Public API base URL
NEXT_PUBLIC_API_BASE_URL=https://restaurant-api.dicoding.dev
```

### 4. Redis Installation
#### Option 1: Local Installation
- [Install Redis](https://redis.io/download) for your OS and start the server:
```bash
redis-server
```
#### Option 2: Docker
```bash
docker run --name redis -p 6379:6379 -d redis
```

### 5. Run the App
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Environment Variables
| Variable                  | Description                                 |
|---------------------------|---------------------------------------------|
| `REDIS_URL`               | Redis connection string (e.g., `redis://localhost:6379`) |
| `NEXT_PUBLIC_API_BASE_URL`| Base URL for the public restaurant API      |

---

## 5. Architecture Overview

- **Data Flow:**
  - On SSR pages, data is fetched from the API. If Redis is enabled, responses are cached for subsequent requests.
  - On CSR pages, data is fetched client-side from API routes, which also use Redis for caching.
- **SSR/CSR Integration:**
  - Home page uses SSR for fast initial load and SEO.
  - (Optional) Category/detail pages use CSR for dynamic, interactive experiences.
- **File/Folder Structure:**
```
src/
├── app/
│   ├── components/      # React components (Navbar, DarkModeToggle, etc.)
│   ├── lib/             # API utilities, Redis logic
│   ├── page.tsx         # Home (SSR)
│   ├── detail/[id]/     # Restaurant detail (SSR)
│   └── layout.tsx       # App layout (SSR)
├── types/               # TypeScript types
├── styles/              # Global styles
```

---

## 6. Performance Benchmarking

### Tools Used
- Chrome DevTools
- Lighthouse
- Custom logging (for cache hits/misses)

### Example Metrics
| Scenario                | First Load (ms) | Cached Load (ms) |
|-------------------------|-----------------|------------------|
| Without Redis           | 800-1200        | N/A              |
| With Redis (cache hit)  | 100-200         | 100-200          |

> **Note:** Actual numbers will vary based on your machine and network.

### Screenshots/Logs
- ![Lighthouse Score Example](./docs/lighthouse-score.png)
- Example log: `Cache hit for /api/categories`

---

## 7. Scaling Strategy
To support a large user base:
- **Horizontal Scaling:** Deploy multiple Next.js instances behind a load balancer.
- **Distributed Redis:** Use a Redis cluster for shared, distributed caching.
- **CDN:** Serve static assets and images via a CDN for global performance.
- **Microservices:** Separate API, frontend, and caching layers for maintainability.
- **Monitoring:** Use APM tools and real-time monitoring for performance and error tracking.

---

## 8. Credits / Acknowledgements
- **API:** [Dicoding Restaurant API](https://restaurant-api.dicoding.dev/)
- **Libraries:**
  - [Next.js](https://nextjs.org/)
  - [React](https://react.dev/)
  - [Redis](https://redis.io/)
  - [GSAP](https://gsap.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [SWR](https://swr.vercel.app/)

---

## 9. License
MIT
