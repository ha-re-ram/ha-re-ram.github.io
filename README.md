# 🚀 Hareram Kushwaha | Software Engineer Portfolio

A premium, high-performance personal portfolio built with **Next.js 15 (App Router)** and **Tailwind CSS**. Designed for speed, aesthetics, and adaptability, featuring a fully integrated custom **Firebase CMS** for real-time content management.

## 🌐 Live Presence
- **Website**: [hareramkushwaha.name.np](https://hareramkushwaha.name.np)
- **LinkedIn**: [linkedin.com/in/ha-re-ram](https://linkedin.com/in/ha-re-ram)
- **GitHub**: [github.com/ha-re-ram](https://github.com/ha-re-ram)

## ✨ Key Features
- **Dynamic CMS**: Custom-built Admin Dashboard to manage Projects, Blogs, and Certifications in real-time.
- **Bento Grid Architecture**: Modern, responsive layout optimized for all device categories.
- **Cinematic Interactions**: Fluid animations powered by **Framer Motion** for a premium user experience.
- **SEO Optimized**: Fully enriched with OpenGraph, JSON-LD schema, and semantic HTML5 for maximum reach.
- **Terminal Easter Egg**: Interactive CLI-style command center for a unique developer touch (Press `Ctrl + `).

## 🛠️ Technical Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS (Mobile-First)
- **Animations**: Framer Motion
- **Backend/Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Icons**: Lucide React
- **Hosting**: GitHub Pages / Vercel

## 📁 Project Structure
```text
src/
├── app/          # App Router (Pages, Layouts, APIs)
├── components/   # Reusable UI Architecture
├── lib/          # Utilities, Firebase Config, Site Constants
└── content/      # (Deprecated) Migrated to Firebase CMS
```

## 🚀 Local Development

1. **Clone & Install**:
   ```bash
   git clone https://github.com/ha-re-ram/ha-re-ram.github.io.git
   cd ha-re-ram.github.io
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env.local` file with your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   NEXT_PUBLIC_ADMIN_EMAIL=...
   ```

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## 📄 License
Licensed under the [MIT License](LICENSE). Built with 🤍 by Hareram Kushwaha.
