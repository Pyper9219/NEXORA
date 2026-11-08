# NEXORA - AI-Powered Business Growth Platform

A modern, full-stack web application built with Next.js 16, featuring authentication, subscription billing, dashboard analytics, and automation tools.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Authentication**: NextAuth v4 (Credentials + OAuth: Google, GitHub)
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe (Subscriptions, Checkout, Billing Portal)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Runtime**: Node.js 20.9+

## ✨ Features

### Authentication
- Email/password registration with bcrypt hashing
- OAuth providers (Google, GitHub)
- JWT-based sessions with role & subscription info
- Protected routes & API endpoints

### Dashboard
- **Overview** - Stats, subscription status, recent activity
- **Billing** - Subscription management, payment methods, invoice history
- **Analytics** - Feature usage charts, activity logs
- **Automations** - Template library, automation management
- **Settings** - Profile, security (2FA, password), API keys, integrations
- **Team** - Member management, roles/permissions, invites

### Backend APIs
- `POST /api/contact` - Contact form submission
- `POST /api/newsletter` - Newsletter subscribe/unsubscribe
- `POST /api/auth/register` - User registration
- `POST /api/checkout` - Stripe checkout sessions
- `POST /api/billing-portal` - Stripe billing portal
- `POST /api/webhooks/stripe` - Stripe webhook handler

### UI Components
- Interactive FAQ Accordion
- Newsletter subscription form
- Responsive Navbar with user menu
- Pricing preview with checkout integration
- Role-based access control

## 📁 Project Structure

```
NEXORA/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── checkout/      # Stripe checkout
│   │   │   ├── billing-portal/# Stripe billing portal
│   │   │   ├── contact/       # Contact form
│   │   │   ├── newsletter/    # Newsletter
│   │   │   ├── register/      # User registration
│   │   │   └── webhooks/      # Stripe webhooks
│   │   ├── auth/              # Auth pages (signin, signup)
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── providers.tsx      # SessionProvider
│   │   └── layout.tsx         # Root layout
│   ├── auth/
│   │   └── [...nextauth].ts   # NextAuth configuration
│   ├── components/
│   │   └── ui/                # Reusable UI components
│   └── lib/
│       └── prisma.ts          # Prisma client singleton
└── public/                    # Static assets
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 20.9+
- PostgreSQL database
- Stripe account

### Installation

```bash
# Clone the repository
git clone https://github.com/Pyper9219/NEXORA.git
cd NEXORA

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials (see below)

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nexora?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_STARTER="price_..."
STRIPE_PRICE_GROWTH="price_..."
STRIPE_PRICE_PRO="price_..."
STRIPE_PRICE_ENTERPRISE="price_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Stripe Setup

1. Create products & prices in Stripe Dashboard for each plan:
   - Starter, Growth, Pro, Enterprise
2. Copy price IDs to `.env.local`
3. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Type-check with tsc (no ESLint config yet)
npx prisma studio    # Open Prisma Studio
npx prisma db push   # Push schema changes
npx prisma migrate dev # Run migrations
```

## 🗄️ Database Schema

Key models:
- **User** - Authentication, profile, role, subscription
- **Subscription** - Stripe subscription details, plan, status
- **Payment** - Payment history, invoices
- **PaymentMethod** - Saved payment methods
- **APIKey** - API keys for programmatic access
- **Integration** - Third-party integrations (Stripe, Zapier, etc.)
- **AuditLog** - Security & activity logging
- **FeatureUsage** - Analytics tracking
- **NewsletterSubscriber** - Email list management

## 🔒 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with secure httpOnly cookies
- CSRF protection via NextAuth
- Rate limiting on auth endpoints
- Input validation on all APIs
- SQL injection prevention via Prisma

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- Stripe for payment infrastructure
- Tailwind CSS for utility-first styling
- Lucide for beautiful icons
