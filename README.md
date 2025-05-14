# SaaS-Based Intelligent Content Recommendation Platform

## 📌 Overview

This is a SaaS-based intelligent content recommendation system designed for businesses to deliver personalized content experiences to their users. The platform ingests a variety of content types, tracks user behavior, and uses AI to recommend content tailored to each user’s interests.

> Built with a modern monorepo architecture using [Turborepo](https://turbo.build), the solution is optimized for scalability, maintainability, and team collaboration.

---

## 🧱 Features

### 🔄 Core Platform Features
- Ingest and manage diverse content (text, images, links)
- Track user interactions (views, clicks, likes)
- Generate personalized content recommendations using AI
- Provide a content analytics dashboard
- User authentication and authorization

---

##  Tech Stack

| Layer         | Stack / Tools                            |
|--------------|-------------------------------------------|
| **Frontend**  | Next.js, TypeScript, TailwindCSS         |
| **Backend**   | Node.js, Express, TypeScript             |
| **AI Engine** | TensorFlow.js or Python (e.g. scikit-learn) |
| **Database**  | PostgreSQL or MongoDB                    |
| **DevOps**    | Docker, GitHub Actions, Vercel/Render/AWS |
| **Monorepo**  | Turborepo + Yarn/NPM workspaces          |

---

##  Monorepo Structure

```
pearmonie_assessment/
├── apps/
│   ├── frontend/       # Next.js frontend app
│   ├── backend/        # Node.js/Express API server
│   └── ai/             # AI model (TensorFlow.js)
├── packages/
│   └── shared/         # Shared utils, types, validation
├── turbo.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js (v18+)
- Yarn or npm
- Docker (for containerized runs... optional)

### 🔧 Installation

```bash
git clone https://github.com/TheSpaceDork/pearmonie_assessment.git
npm install
```

### 📂 Running Dev Servers

```bash
# Frontend
turbo run dev --filter=frontend

# Backend
turbo run dev --filter=backend

# AI (Node or Python based)
turbo run dev --filter=ai
```

---

## 🔐 Authentication

- JWT-based auth flow
- API protection using middleware
- User roles and permissions 

---

## 📊 API Reference

### Content
- `GET /content` — List content
- `POST /content` — Add new content
- `PUT /content/:id` — Update content
- `DELETE /content/:id` — Delete content

### User Interactions
- `POST /track` — Track views, clicks, likes

### Recommendations
- `GET /recommendations?userId=xyz`

### Auth
- `POST /auth/register`
- `POST /auth/login`

---

## 🤖 AI Model Overview

###  Strategy: **Hybrid Filtering**



### 📂 AI Folder Structure
```
apps/ai/
├──  model.ts  # Training logic
├── recommender.py       # Inference / API integration
└── sample-data/         # Simulated user/content logs
```

---

## 📈 Analytics Dashboard

- Content performance metrics: views, likes, CTR
- User engagement trends
- Built using [Recharts](https://recharts.org/) and integrated via REST API

---

## ⚙️ DevOps & Deployment

- Dockerized backend and AI services
- GitHub Actions for CI/CD
- Frontend deployed to Vercel
- Backend & AI deployed to Render or AWS
- Cloud database: MongoDB Atlas

---




## 🧠 Notes

- All dependencies and tools are documented in respective app folders.
- Focused on a scalable, maintainable architecture using industry best practices.
- The AI engine is modular and can be extended with more advanced models later.

---

## 📬 Contact

If you have any questions or feedback about this project, feel free to reach out at [treasurechux@gmail.com] or open an issue in the GitHub repository.
