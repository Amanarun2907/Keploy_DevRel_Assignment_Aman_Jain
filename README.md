# Keploy DevRel Candidate Assignment - Go Quickstart Documentation

![Keploy Banner](https://raw.githubusercontent.com/keploy/keploy/main/docs/static/img/keploy-logo-dark.svg)

> **Live Demo**: [Deploy on Vercel](#deployment)  
> **Author**: Keploy DevRel Candidate  
> **Tech Stack**: Next.js 14 (App Router), MDX, Tailwind CSS, TypeScript, Framer Motion, next-themes  

---

## 📌 Project Overview

This repository contains an end-to-end, single-page documentation site built for the **Keploy DevRel Candidate Assignment**.

It presents a beginner-friendly, deeply technical tutorial guiding developers through testing a **Go (Gin) + MongoDB REST API** with **zero manual code modification** using **Keploy's eBPF kernel engine**.

---

## ✨ Key Features & Technical Highlights

- **MDX-Powered Tutorial**: Blends markdown technical documentation with interactive React components.
- **Interactive eBPF Architecture Diagram**: Animated flowchart visualizing kernel-level packet capture, proxy routing, and MongoDB wire-protocol mocking.
- **Interactive CLI Simulator**: In-browser sandbox where developers can simulate running `keploy record`, triggering API calls, inspecting generated `test-1.yaml` / `mock-1.yaml` files, and replaying tests with confetti feedback.
- **Dark & Light Mode Toggle**: Smooth theme switching using `next-themes` with custom HSL/RGB CSS variables.
- **Cmd/Ctrl+K Search Modal**: Instant documentation search overlay across all sections.
- **Interactive Code Snippet Controls**: One-click copy buttons, syntax badges, and line-highlighting.
- **Tabbed OS / Execution Switcher**: Switch between Linux, macOS, and Windows WSL2 CLI commands.
- **Active Reading Table of Contents**: Heading observer spy tracking reading progress in real time.
- **Troubleshooting Accordion**: Collapsible FAQs addressing eBPF kernel permissions, Docker networking, and noise filtering.

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Local Run

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/keploy-go-docs.git
   cd keploy-go-docs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css          # Theme variables & glassmorphism utilities
│   │   ├── layout.tsx           # Global layout with Header, Sidebar, TOC, Footer
│   │   ├── page.tsx             # MDX renderer with custom components
│   │   └── providers.tsx        # Next-themes provider
│   ├── components/
│   │   ├── mdx/                 # Custom MDX components
│   │   │   ├── Accordion.tsx              # Collapsible FAQs
│   │   │   ├── Callout.tsx                # Info/Tip/Warning alerts
│   │   │   ├── CodeBlock.tsx              # Copyable code container
│   │   │   ├── InteractiveArchitecture.tsx# eBPF workflow visualizer
│   │   │   ├── InteractiveTestSimulator.tsx# In-browser CLI sandbox
│   │   │   ├── Steps.tsx                  # Numbered step workflow
│   │   │   └── Tabs.tsx                   # OS / CLI command tabs
│   │   └── ui/                  # Site UI elements
│   │       ├── FeedbackWidget.tsx         # Rating & confetti widget
│   │       ├── Footer.tsx                 # Site footer
│   │       ├── Header.tsx                 # Top navbar & search trigger
│   │       ├── SearchModal.tsx            # Ctrl+K Search overlay
│   │       ├── Sidebar.tsx                # Left navigation
│   │       └── TableOfContents.tsx        # Right heading observer
│   └── content/
│       └── keploy-go-quickstart.mdx       # Complete Go + Gin tutorial
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Keploy Go Documentation"
   git remote add origin https://github.com/YOUR_USERNAME/keploy-go-docs.git
   git push -u origin main
   ```

2. Deploy using Vercel CLI:
   ```bash
   npx vercel
   ```
   Or import the GitHub repo directly in the [Vercel Dashboard](https://vercel.com/new).

---

## 📄 License

MIT License - feel free to use and adapt for developer documentation!
