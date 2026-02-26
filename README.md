# WebMarket - Next.js CMS Application

A production-ready Next.js 14 App Router application with an integrated CMS, designed to be fully responsive, SEO-optimized, and deployable on Vercel's Free Tier using free-tier services.

## Tech Stack
-   **Frontend:** Next.js 14 (App Router) + TypeScript
-   **Styling:** Tailwind CSS
-   **Backend:** Next.js Server Actions + Route Handlers
-   **Database:** Supabase PostgreSQL (Free Tier)
-   **Auth:** Supabase Auth (Admin only)
-   **Storage:** Supabase Storage (Images)
-   **Email:** Resend (Free Tier)
-   **CMS Content Editing:** Tiptap (Rich Text Editor)
-   **Image Slider:** SwiperJS

## Features
-   **Public Pages:** Home, About, Services, Products, Gallery, Blog, Contact.
-   **Dynamic Content:** All public pages fetch data dynamically from the Supabase database.
-   **CMS Admin Panel:** Protected dashboard to manage:
    -   Hero Sliders
    -   Pages (About Page content and SEO)
    -   Services (with rich text and SEO)
    -   Products (with rich text and SEO)
    -   Gallery Images (with lightbox preview)
    -   Blog Posts (with rich text, cover images, and SEO)
    -   Testimonials
    -   Enquiries (Contact form submissions)
    -   Site Settings (Logo, Footer, Contact Info, Social Links, Default SEO)
-   **SEO Optimized:** Dynamic metadata, OpenGraph tags, automated `sitemap.xml`, and `robots.txt`.
-   **Responsive Design:** Mobile-first approach using Tailwind CSS.
-   **Contact Form:** Captures enquiries to the database and sends email notifications via Resend.
-   **Server-Side Pagination:** Efficient data loading for Services, Products, and Blogs (default 25 items per page).

## Setup Instructions

### 1. Project Setup
Ensure you have Node.js installed.
\`\`\`bash
npm install
\`\`\`

### 2. Supabase Configuration
1.  Create a new project on [Supabase](https://supabase.com/).
2.  Go to the **SQL Editor** in your Supabase dashboard.
3.  Run the migration script located at `supabase/migrations/001_initial_schema.sql` to create all tables, policies, triggers, and the storage bucket.
4.  (Optional) Run the seed script `supabase/seed.sql` to populate the database with demo content.
5.  Go to **Authentication** -> **Providers** -> **Email** and ensure it's enabled. Uncheck "Confirm email" for easier development if desired.
6.  Create an Admin User:
    -   Go to **Authentication** -> **Users** and add a new user (e.g., `admin@example.com`).
    -   Go to **Table Editor** -> `profiles`, find the newly created user, and change their `role` to `admin`.
7.  Go to **Project Settings** -> **API** to get your URL and Anon Key.
8.  Go to **Project Settings** -> **API** -> **Service Role Config** to get your Service Role Key (used for admin actions bypassing RLS).

### 3. Environment Variables
Create a `.env.local` file in the root directory and copy the contents from `.env.local.example`:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend Configuration (for Contact Form emails)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev # Or your verified domain
ADMIN_EMAIL=your_email@example.com # Where you want to receive enquiries

# Site Information
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### 4. Running Locally
\`\`\`bash
npm run dev
\`\`\`
The application will be available at `http://localhost:3000`.

-   **Public Site:** `http://localhost:3000`
-   **Admin Login:** `http://localhost:3000/admin/login`

## Deployment (Vercel)
1.  Push your code to a GitHub repository.
2.  Import the repository into [Vercel](https://vercel.com).
3.  Add all the Environment Variables from your `.env.local` file to the Vercel project settings.
4.  Deploy! Vercel will automatically detect it's a Next.js project and use the correct build settings.