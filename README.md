<div align="center">

⭐ **If you like this project, please star the repository!** ⭐

<hr>

<a href="[Your Repository URL]">
<img src="[Your Logo URL]" width="90" alt="Slide Logo" />
</a>

<h2>Slide - Instagram Engagement Automation Platform</h2>

![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![](https://img.shields.io/badge/NeonDB-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjZweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgNTggNTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIiBhcmlhLWhpZGRlbj0idHJ1ZSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDEwQzAgNC40NzcxNSA0LjQ3NzA1IDAgOS45OTk3NiAwSDQ3Ljk5ODlDNTMuNTIxNiAwIDU3Ljk5ODYgNC40NzcxNSA1Ny45OTg2IDEwVjQyLjMxODlDNTcuOTk4NiA0OC4wMzI2IDUwLjc2ODQgNTAuNTEyNCA0Ny4yNjE4IDQ2LjAwMTRMMzYuMjk5MSAzMS44OTg4VjQ5QzM2LjI5OTEgNTMuOTcwNiAzMi4yNjk4IDU4IDI3LjI5OTMgNThIOS45OTk3NkM0LjQ3NzA1IDU4IDAgNTMuNTIyOCAwIDQ4VjEwWk05Ljk5OTc2IDhDOC44OTUyMiA4IDcuOTk5ODEgOC44OTU0MyA3Ljk5OTgxIDEwVjQ4QzcuOTk5ODEgNDkuMTA0NiA4Ljg5NTIyIDUwIDkuOTk5NzYgNTBIMjcuNTk5M0MyOC4xNTE2IDUwIDI4LjI5OTMgNDkuNTUyMyAyOC4yOTkzIDQ5VjI2LjA2NzNDMjguMjk5MyAyMC4zNTM2IDM1LjUyOTUgMTcuODczOCAzOS4wMzYxIDIyLjM4NDhMNDkuOTk4OCAzNi40ODc0VjEwQzQ5Ljk5ODggOC44OTU0MyA1MC4xMDM0IDggNDguOTk4OCA4SDkuOTk5NzZaIiBmaWxsPSIjMTJGRkY3Ij48L3BhdGg+PC9zdmc+)
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![](https://img.shields.io/badge/Radix_UI-6200EE?style=for-the-badge&logo=radix-ui&logoColor=white)

<img src="[Your Screenshot URL]" width="80%">

</div>

## 💡 Overview

Slide is a powerful Instagram automation platform designed to revolutionize how businesses and creators engage with their audience. Built with modern technologies, it offers smart AI-powered responses and engagement automation to help grow your Instagram presence effectively.

## ✨ Features

- **🤖 AI-Powered Responses:** Smart automation for comments and DMs using advanced AI
- **🎯 Targeted Interactions:** Engage with your audience using specific keywords and phrases
- **🔄 Automated Engagement:** Set up custom triggers and responses for comments and messages
- **⚡ 24/7 Availability:** Never miss an opportunity to connect with followers
- **💳 Subscription Plans:** Free and premium plans with advanced features
- **📊 Analytics Dashboard:** Track engagement metrics and performance insights
- **🔐 Secure Authentication:** Powered by Clerk for robust user management
- **📱 Responsive Design:** Seamless experience across all devices

## 👩‍💻 Tech Stack

- **Next.js 14:** For server-side rendering and optimal performance
- **TypeScript:** For type-safe code development
- **Prisma:** For database management and ORM
- **Clerk:** For authentication and user management
- **Radix UI:** For accessible component primitives
- **Tailwind CSS:** For responsive styling
- **Redux Toolkit:** For state management
- **React Query:** For efficient data fetching
- **Framer Motion:** For smooth animations
- **Stripe:** For payment processing

## 📦 Getting Started

### 🚀 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone [your-repository-url]
   cd slide-webprodigies
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file with:

   ```env
    DATABASE_URL=""
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= ...
    CLERK_SECRET_KEY=...
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

    STRIPE_SUBSCRIPTION_PRICE_ID=...
    STRIPE_CLIENT_SECRET=...
    NEXT_PUBLIC_HOST_URL="https://your-host"
    INSTAGRAM_BASE_URL="https://graph.instagram.com"
    INSTAGRAM_EMBEDDED_OAUTH_URL=...
    INSTAGRAM_CLIENT_ID=...
    INSTAGRAM_CLIENT_SECRET=...
    INSTAGRAM_TOKEN_URL="https://api.instagram.com/oauth/access_token"
    OPEN_AI_KEY=...
   ```

4. **Run database migrations:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📖 Usage

Visit `http://localhost:3000` to access the application. Create an account to:

- Connect your Instagram account
- Set up automation rules
- Monitor engagement metrics
- Manage subscription plans

