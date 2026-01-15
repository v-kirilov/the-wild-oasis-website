# 🏕️ The Wild Oasis - Guest Website

A modern, full-stack cabin booking website built with **Next.js 14**, allowing guests to browse luxury cabins, make reservations, and manage their bookings. This is the customer-facing website for The Wild Oasis luxury cabin hotel, located in the heart of the Italian Dolomites.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

---

## 📖 About The Project

**The Wild Oasis** is a luxury cabin hotel website where guests can:

- 🏠 Browse available luxury cabins with detailed information
- 📅 Make reservations with an interactive date picker
- 👤 Manage their profile and personal information
- 📋 View, edit, and cancel their reservations
- 🔐 Securely sign in using Google authentication

The application leverages the latest Next.js 14 App Router features including Server Components, Server Actions, Suspense, and streaming for optimal performance and user experience.

---

## 🌐 Live Demo

The project is hosted on **Vercel**: [View Live Site](https://the-wild-oasis-website-lac-delta.vercel.app/)

---

## 🗂️ Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | **Home Page** - Welcome page with hero section and call-to-action to explore cabins |
| `/cabins` | **Cabins Listing** - Browse all available cabins with filtering by capacity (small, medium, large) |
| `/cabins/[cabinId]` | **Cabin Details** - Detailed cabin information with photos, amenities, and reservation form |
| `/cabins/thankyou` | **Thank You Page** - Confirmation page after successful booking |
| `/about` | **About Page** - Information about The Wild Oasis and the team |
| `/login` | **Login Page** - Google OAuth sign-in page |
| `/account` | **Guest Dashboard** - Protected area welcoming the logged-in user |
| `/account/profile` | **Profile Management** - Update nationality and national ID for faster check-in |
| `/account/reservations` | **Reservations List** - View all upcoming and past reservations |
| `/account/reservations/edit/[bookingId]` | **Edit Reservation** - Modify guest count and observations for a booking |

---

## ✨ Key Features

### 🏕️ Cabin Browsing
- View all luxury cabins with images, capacity, and pricing
- Filter cabins by guest capacity (1-3, 4-7, or 8-12 guests)
- Detailed cabin pages with full descriptions and amenities
- Dynamic pricing display with discounts

### 📅 Reservation System
- Interactive date picker powered by `react-day-picker`
- Real-time availability checking (blocked dates shown)
- Automatic price calculation based on selected dates
- Configurable minimum and maximum booking lengths
- Guest count selection based on cabin capacity

### 👤 User Authentication
- **Google OAuth** integration via NextAuth.js (Auth.js v5)
- Automatic guest profile creation on first sign-in
- Protected routes with middleware authentication
- Session management with guest ID tracking

### 📋 Reservation Management
- View all reservations (upcoming and past)
- Edit reservations (guest count, special observations)
- Delete/cancel reservations with authorization checks
- Reservation status indicators (upcoming/past)

### 🎨 User Experience
- Responsive design with Tailwind CSS
- Loading states with spinners and Suspense boundaries
- Custom error and not-found pages
- Optimized images with Next.js Image component
- Beautiful typography with Josefin Sans font

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with Server Components
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons
- **react-day-picker** - Flexible date picker component

### Backend & Database
- **Supabase** - PostgreSQL database with real-time capabilities
- **Server Actions** - Form handling and data mutations
- **API Routes** - RESTful endpoints for cabin data

### Authentication
- **NextAuth.js v5** (Auth.js) - Authentication library
- **Google OAuth** - Social sign-in provider

### Utilities
- **date-fns** - Modern JavaScript date utility library

### Deployment
- **Vercel** - Hosting and deployment platform

---

## 🗄️ Database Schema (Supabase)

The application uses Supabase PostgreSQL with the following tables:

### `cabins`
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| name | text | Cabin name |
| maxCapacity | integer | Maximum guest capacity |
| regularPrice | numeric | Price per night |
| discount | numeric | Discount amount |
| description | text | Cabin description |
| image | text | Image URL |

### `guests`
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| fullName | text | Guest's full name |
| email | text | Email address (unique) |
| nationality | text | Country of origin |
| nationalID | text | National ID number |
| countryFlag | text | Country flag emoji/URL |

### `bookings`
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| startDate | date | Check-in date |
| endDate | date | Check-out date |
| numNights | integer | Number of nights |
| numGuests | integer | Number of guests |
| cabinId | integer | Foreign key to cabins |
| guestId | integer | Foreign key to guests |
| totalPrice | numeric | Total booking price |
| status | text | Booking status |
| observations | text | Special requests |

### `settings`
| Column | Type | Description |
|--------|------|-------------|
| minBookingLength | integer | Minimum nights allowed |
| maxBookingLength | integer | Maximum nights allowed |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account and project
- Google Cloud Console project (for OAuth)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# NextAuth.js
AUTH_SECRET=your_random_secret_string
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

### Installation

1. **Clone the repository**
   ```bash
   git clone
   cd the-wild-oasis-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase and Google OAuth credentials

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run prod` | Build and start production |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
the-wild-oasis-website/
├── app/
│   ├── _components/       # Reusable React components
│   │   ├── Cabin.js
│   │   ├── CabinCard.js
│   │   ├── CabinList.js
│   │   ├── DateSelector.js
│   │   ├── DeleteReservation.js
│   │   ├── Filter.js
│   │   ├── Header.js
│   │   ├── Navigation.js
│   │   ├── Reservation.js
│   │   ├── ReservationCard.js
│   │   ├── ReservationContext.js
│   │   ├── ReservationForm.js
│   │   ├── ReservationList.js
│   │   ├── SelectCountry.js
│   │   ├── SideNavigation.js
│   │   ├── SignInButton.js
│   │   ├── SignOutButton.js
│   │   ├── Spinner.js
│   │   ├── SubmitButton.js
│   │   ├── TextExpander.js
│   │   └── UpdateProfileForm.js
│   ├── _lib/              # Utility functions and configurations
│   │   ├── actions.js     # Server Actions
│   │   ├── auth.js        # NextAuth configuration
│   │   ├── data-service.js # Supabase queries
│   │   └── supabase.js    # Supabase client
│   ├── _styles/           # Global CSS styles
│   │   └── globals.css
│   ├── about/             # About page
│   ├── account/           # Protected user account pages
│   │   ├── profile/
│   │   └── reservations/
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth API routes
│   │   └── cabins/        # Cabin API endpoints
│   ├── cabins/            # Cabin pages
│   │   ├── [cabinId]/
│   │   └── thankyou/
│   ├── login/             # Login page
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── error.js           # Error boundary
│   ├── loading.js         # Loading UI
│   └── not-found.js       # 404 page
├── public/                # Static assets
├── middleware.js          # Route protection middleware
├── next.config.mjs        # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json
```

---

## 🔐 Authentication Flow

1. User clicks "Sign in with Google" on the login page
2. Redirected to Google OAuth consent screen
3. Upon successful authentication:
   - If new user: Guest profile created in Supabase
   - If existing user: Guest profile retrieved
4. Session created with guest ID attached
5. User redirected to `/account` dashboard
6. Protected routes validated via middleware

---

## 🎯 Server Actions

The app uses Next.js Server Actions for data mutations:

| Action | Description |
|--------|-------------|
| `signInAction` | Initiates Google OAuth sign-in |
| `signOutAction` | Signs out user and redirects home |
| `updateGuest` | Updates guest profile information |
| `createBooking` | Creates a new reservation |
| `updateBooking` | Updates reservation details |
| `deleteBooking` | Cancels a reservation |

---

## 🌟 Performance Optimizations

- **Static Generation** - Cabin pages pre-rendered at build time
- **Incremental Static Regeneration** - Data revalidation every hour
- **Suspense Boundaries** - Streaming for better perceived performance
- **Image Optimization** - Automatic image optimization via Next.js
- **Font Optimization** - Google Fonts loaded via `next/font`

---

## 📝 License

This project is for educational purposes.

---

## 🙏 Acknowledgments

- Design inspiration from Jonas Schmedtmann's courses
- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)

---

Made with ❤️ for nature lovers and cabin enthusiasts
