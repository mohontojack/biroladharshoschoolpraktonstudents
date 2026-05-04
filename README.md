# 🏫 Biral Adarsha High School — Alumni Eid Reunion & Farewell 2026

> **বিরল আদর্শ উচ্চ বিদ্যালয় — প্রাক্তন শিক্ষার্থীদের ঈদ পুনর্মিলনী ও বিদায় সংবর্ধনা ২০২৬**

A premium, production-ready alumni reunion landing page built for **Biral Adarsha High School (BAHS)**, Dinajpur, Bangladesh. Features an immersive splash screen, animated sections, photo gallery with lightbox, AI chatbot, registration system with email notifications, and admin panel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mohontojack/biroladharshoschoolpraktonstudents)

---

## ✨ Features

### 🎨 Frontend
- **Immersive Splash Screen** — Animated logo reveal with Bangla tagline
- **Hero Section** — Parallax scrolling, floating particles, mouse-tracking glow
- **Photo Gallery** — Masonry grid with 19 real school photos, category filters, fullscreen lightbox with zoom/swipe
- **Memories Section** — Interactive memory cards with 3D tilt effect, expandable stories, heart reactions
- **About School** — Timeline, achievements, teacher honor cards, animated counters
- **Teachers Wall** — Farewell honorees with photos and descriptions
- **Event Details** — Date, venue, contact info with interactive cards
- **Registration Form** — Full validation, duplicate detection, prefilled by AI chatbot
- **Floating Navigation** — Quick section access, mobile-friendly
- **WhatsApp Button** — Direct contact via WhatsApp
- **AI Chatbot** — Bilingual (Bengali/English) event assistant
- **Back to Top** — Smooth scroll button
- **Video Section** — YouTube integration
- **Dark theme footer** — School branding, contact info, social links

### 🔧 Backend
- **Registration API** — Zod validation, rate limiting, duplicate phone check
- **Admin API** — API key authentication, search, filter, pagination
- **Email Notifications** — HTML emails to organizer on registration, confirmation to registrant
- **Prisma ORM** — SQLite database for registration data
- **Vercel Analytics** — Built-in visitor analytics

### 📱 Responsive
- Mobile-first design with iOS safe area support
- Touch-friendly 44px tap targets
- Adaptive layouts for all screen sizes
- Optimized for slow connections

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ or **Bun** latest
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/mohontojack/biroladharshoschoolpraktonstudents.git
cd biroladharshoschoolpraktonstudents
```

### 2. Install Dependencies

```bash
npm install
# or: bun install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values:

```env
# Required
DATABASE_URL="file:./db/custom.db"

# Required for admin panel
ADMIN_API_KEY="your-secure-api-key-here"

# Optional — for email notifications
EMAIL_APP_PASSWORD="your-gmail-app-password"
```

### 4. Initialize Database

```bash
npx prisma db push
```

### 5. Start Development Server

```bash
npm run dev
# or: bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🌐 Deploy to Vercel

### One-Click Deploy

Click the button above or visit: [vercel.com/new](https://vercel.com/new/clone?repository-url=https://github.com/mohontojack/biroladharshoschoolpraktonstudents)

### Manual Deploy

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com) → New Project → Import Git Repository
   - Select `biroladharshoschoolpraktonstudents`

2. **Set Environment Variables**
   - `DATABASE_URL` — For Vercel, use a persistent database URL (see Database section below)
   - `ADMIN_API_KEY` — Your secure admin API key
   - `EMAIL_APP_PASSWORD` — (Optional) Gmail app password for email notifications

3. **Deploy**
   - Click "Deploy" — Vercel will build and deploy automatically

### ⚠️ Important: Database on Vercel

SQLite is **not persistent** on Vercel serverless functions. For production registration data, use one of these options:

#### Option A: Turso (Free, Recommended)
1. Create account at [turso.tech](https://turso.tech)
2. Create a database: `turso db create bails-reunion`
3. Create auth token: `turso db tokens create bails-reunion`
4. Set env vars on Vercel:
   ```
   DATABASE_URL="libsql://bails-reunion-yourname.turso.io"
   ```
5. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

#### Option B: Accept In-Memory (For Demo/Events)
- Registration will work during each serverless invocation
- Data will not persist between deployments
- Suitable for testing or single-day events

---

## 📁 Project Structure

```
biroladharshoschoolpraktonstudents/
├── prisma/
│   └── schema.prisma          # Database schema (AlumniRegistration)
├── public/
│   ├── images/
│   │   ├── gallery/           # 19 real school photos (img01-img19.jpg)
│   │   ├── school-emblem.png  # Official school emblem
│   │   ├── hero-bg-new.jpg    # Hero section background
│   │   ├── mahi-uddin-sir.jpg # Teacher photo
│   │   └── rai-komol-sir.jpg  # Teacher photo
│   ├── logo.svg
│   ├── reunion-poster.jpg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles & animations
│   │   ├── layout.tsx         # Root layout with Vercel Analytics
│   │   ├── page.tsx           # Main landing page
│   │   ├── admin/
│   │   │   └── page.tsx       # Admin panel (protected)
│   │   └── api/
│   │       ├── register/route.ts      # POST registration
│   │       ├── registrations/route.ts # GET registrations (admin)
│   │       └── chatbot/route.ts       # Chatbot proxy
│   ├── components/
│   │   ├── landing/           # All landing page components
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MemorySection.tsx
│   │   │   ├── MemoriesGallerySection.tsx
│   │   │   ├── PhotoGallerySection.tsx
│   │   │   ├── ImageLightbox.tsx
│   │   │   ├── AboutSchoolSection.tsx
│   │   │   ├── TeachersSection.tsx
│   │   │   ├── EventDetailsSection.tsx
│   │   │   ├── WhyJoinSection.tsx
│   │   │   ├── AboutUsSection.tsx
│   │   │   ├── RegistrationSection.tsx
│   │   │   ├── VideoSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── FloatingNav.tsx
│   │   │   ├── BackToTop.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   ├── AIChatbot.tsx
│   │   │   └── SectionReveal.tsx
│   │   └── ui/                # shadcn/ui components
│   ├── hooks/                 # Custom React hooks
│   └── lib/
│       ├── db.ts              # Prisma database client
│       ├── api-auth.ts        # Rate limiting & admin auth
│       ├── email.ts           # Email notification system
│       └── utils.ts           # Utility functions
├── .env.example               # Environment variables template
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── package.json
```

---

## 🔑 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | ✅ | — | Prisma database connection URL |
| `ADMIN_API_KEY` | ✅ | `bairs-admin-2026-secret-key` | API key for admin panel access |
| `EMAIL_APP_PASSWORD` | ❌ | — | Gmail app password for email notifications |

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **shadcn/ui** | Pre-built UI components |
| **Framer Motion** | Animations and transitions |
| **Prisma** | Database ORM (SQLite) |
| **Zod** | Runtime data validation |
| **Nodemailer** | Email notifications |
| **Vercel Analytics** | Visitor analytics |
| **Lucide Icons** | Icon library |

---

## 📸 Key Sections

| Section | Description |
|---------|-------------|
| Splash Screen | Animated school emblem + Bangla tagline |
| Hero | Event title, date, parallax background |
| Memories | 6 nostalgic memory cards with reactions |
| Photo Gallery | 19 real photos with lightbox viewer |
| About School | History, timeline, achievements |
| Teachers | 5 farewell honoree profiles |
| Event Details | Date, venue, contact cards |
| Registration | Form with validation + email confirmation |
| Footer | School branding + social links |

---

## 📞 Contact

- **Phone**: +8801705937212
- **Email**: mohontobacklinks22@gmail.com
- **Facebook**: [facebook.com/bahs.dnj](https://facebook.com/bahs.dnj)

---

## 📄 License

This project is for the exclusive use of **Biral Adarsha High School Alumni Association**. All rights reserved.

---

<p align="center">
  <strong>বিজয়ের ৫৪ বছর — শিক্ষার আলোয় আলোকিত বিরল ✨</strong>
</p>
