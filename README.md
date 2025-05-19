# SaaS-Based Intelligent Content Recommendation Platform

##  Overview

This is a SaaS-based intelligent content recommendation system designed for businesses to deliver personalized content experiences to their users. The platform ingests a variety of content types, tracks user behavior, and uses AI to recommend content tailored to each user’s interests.

> Built with a modern monorepo architecture using [Turborepo](https://turbo.build), the solution is optimized for scalability, maintainability, and team collaboration.

---

##  Features

###  Core Platform Features
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
| **AI Engine** | TensorFlow.js |
| **Database**  |  MongoDB                    |
| **DevOps**    | Docker, GitHub Actions, Vercel/Render/AWS |
| **Monorepo**  | Turborepo + Yarn/NPM workspaces          |

---

##  Monorepo Structure

```
pearmonie_assessment/
├── apps/
│   ├── frontend/       # Next.js frontend app
│   ├── backend/        # Node.js/Express API server
│  
├── packages/
│   ├──shared/         # Shared utils, types, validation
    ├── ai-utils/         # AI model (TensorFlow.js)
    └── src/getSimilarContent # AI exported file
    └── index.ts exports the ai file
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



---

## Authentication

- JWT-based auth flow
- API protection using middleware
- User roles and permissions 

---

##  API Reference
## Auth
- `POST /api/auth/register` — Add new User
- `POST /api/auth/login` — Login as User or Admin
# Admin authentication details are admin@admin.com and password is password the route for creating admins isn't accessible through the frontend
- `POST /api/auth/create-admin` — Creates new Admin
- `GET /api/auth/logout` — Calls the logout route
- `GET /api/auth/get-user` — Fetch user data
- `PUT /api/users/:id` — Edit user data

### Content
- `POST /api/admin/recommendations` — Admin to create content... this route is protected
- `GET /api/recommendations` — Fetches  content on user side

### User Interactions
- `POST /recommendations/:id/like` —  toggle likes
- `POST /recommendations/:id/comment` —  add comments
- `POST /recommendations/:id/view` —  track view 




##  AI Model Overview

This project includes a hybrid recommendation engine that combines AI-powered suggestions with traditional content-based filtering. The system uses a custom hook to generate tailored recommendations, excluding duplicates and ensuring content diversity. Users can filter content by post type, and a real-time analytics dashboard provides engagement insights to guide future improvements.

### Highlights
-  AI + fallback blending strategy for resilience and relevance
-  Dynamic filtering by post type
-  Intelligent async state handling
-  Built-in analytics for continuous feedback loop





##  Analytics Dashboard

- Content performance metrics: views, likes, CTR
- User engagement trends
- Built using Charts js 

---

##  DevOps & Deployment

- Dockerized backend and Frontend services
- GitHub Actions for CI/CD
- Frontend deployed to Vercel
- Backend  deployed to Render 
- Cloud database: MongoDB Atlas

---




##  Notes

- All dependencies and tools are documented in respective app folders.
- Focused on a scalable, maintainable architecture using industry best practices.
- The AI engine is modular and can be extended with more advanced models later.

---

##  Contact

If you have any questions or feedback about this project, feel free to reach out at treasurechux@gmail.com or open an issue in the GitHub repository.
