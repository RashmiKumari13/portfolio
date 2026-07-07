export interface CodeHighlight {
  filename: string;
  language: string;
  code: string;
  explanation: string;
}

export interface PerformanceMetrics {
  lighthousePerformance: number;
  lighthouseAccessibility: number;
  lighthouseBestPractices: number;
  lighthouseSEO: number;
  loadTimeMs: number;
  fcpMs: number;
  bundleSizeKb: number;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  demoVideo?: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  features: string[];
  architecture: {
    description: string;
    diagramNodes: Array<{ id: string; label: string; type: string }>;
    diagramEdges: Array<{ from: string; to: string; label?: string }>;
  };
  challenges: string[];
  solutions: string[];
  engineeringDecisions: string[];
  roadmap: string[];
  performance: PerformanceMetrics;
  codeHighlights: CodeHighlight[];
  documentation: string;
}

export const projectsData: Project[] = [
  {
    id: "localbiz",
    title: "LocalBiz",
    tagline: "Location-Based Business Discovery Platform built with React, TypeScript, and Drizzle ORM.",
    description: "A full-stack e-commerce and discovery platform featuring dynamic product routing, persistent shopping carts, checkout processing, and historical order tracking. Includes Role-Based Access Control (RBAC) and admin dashboards.",
    heroImage: "/images/sentinel_hero.png",
    demoVideo: "/videos/hero.mp4",
    githubUrl: "https://github.com/RashmiKumari13",
    liveUrl: "https://github.com/RashmiKumari13",
    techStack: ["React", "TypeScript", "Node.js", "SQLite", "Drizzle ORM", "Radix UI", "React Query"],
    features: [
      "Dynamic product search and routing mapped to location inputs.",
      "Persistent cart state synchronization across user sessions.",
      "Role-Based Access Control (RBAC) protecting management views.",
      "Automated order tracking updates and Nodemailer notifications."
    ],
    architecture: {
      description: "React client leverages React Query to fetch business data. The Node.js Express server queries a SQLite database via Drizzle ORM schemas, verifying JWT access tokens.",
      diagramNodes: [
        { id: "client", label: "React + Radix UI SPA Client", type: "client" },
        { id: "query", label: "React Query Cache Handler", type: "service" },
        { id: "express", label: "Node/Express Auth REST API", type: "leader" },
        { id: "drizzle", label: "Drizzle ORM Mapping Layer", type: "storage" },
        { id: "sqlite", label: "SQLite Database", type: "storage" }
      ],
      diagramEdges: [
        { from: "client", to: "query", label: "Query Cache Hook" },
        { from: "query", to: "express", label: "Signed JWT Fetch Requests" },
        { from: "express", to: "drizzle", label: "ORM Schema Query" },
        { from: "drizzle", to: "sqlite", label: "SQL Execution Loop" }
      ]
    },
    challenges: [
      "Managing complex cart state and caching updates correctly during concurrent user navigation.",
      "Securing administrative and inventory editing routes from credential forgery."
    ],
    solutions: [
      "Configured React Query with custom caching policies and synchronized cart states to localStorage.",
      "Implemented a robust Express JWT middleware verification layer parsing role access levels."
    ],
    engineeringDecisions: [
      "Chose SQLite with Drizzle ORM for serverless database speeds and strong, type-safe SQL schemas.",
      "Utilized TypeScript to catch type-mismatches in database models during compilation."
    ],
    roadmap: [
      "Integrate Google Maps Geolocation API loops.",
      "Implement multi-vendor registration workflows.",
      "Add Stripe payment gateway layers."
    ],
    performance: {
      lighthousePerformance: 98,
      lighthouseAccessibility: 100,
      lighthouseBestPractices: 99,
      lighthouseSEO: 98,
      loadTimeMs: 140,
      fcpMs: 70,
      bundleSizeKb: 38
    },
    codeHighlights: [
      {
        filename: "schema.ts",
        language: "typescript",
        code: `import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role', { enum: ['user', 'admin'] }).default('user'),
});

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  totalAmount: integer('total_amount').notNull(),
  status: text('status').default('pending'),
});`,
        explanation: "Uses Drizzle ORM schema mapping to define type-safe database models, ensuring compile-time safety and automatic schema synchronization."
      }
    ],
    documentation: `## LocalBiz Setup Guide

### Install project dependencies:
\`\`\`bash
npm install
\`\`

### Run database migrations:
\`\`\`bash
npx drizzle-kit push:sqlite
\`\`\`
`
  },
  {
    id: "anivault",
    title: "AniVault",
    tagline: "Static, Zero-Backend Anime Discovery and Download Hub utilizing the Jikan API.",
    description: "A fully static client-side anime database consuming the Jikan API v4 (MyAnimeList wrapper) with custom request throttling to handle rate limits seamlessly. Features responsive grids and real-time pagination search.",
    heroImage: "/images/flux_hero.png",
    demoVideo: "/videos/journey.mp4",
    githubUrl: "https://github.com/RashmiKumari13/AniVault",
    liveUrl: "https://github.com/RashmiKumari13/AniVault",
    techStack: ["HTML5", "CSS3", "Vanilla JS", "Jikan API v4", "REST APIs", "Tailwind CSS"],
    features: [
      "Zero-backend architecture querying live MyAnimeList database endpoints.",
      "Custom request throttling handling Jikan's 3 requests/sec rate limits.",
      "Dynamic hero slider with auto-rotation, dot navigation, and metadata fetches.",
      "Real-time global search query filters with skeleton shimmer loading states."
    ],
    architecture: {
      description: "Vanilla JavaScript fetch loops request data directly from the public Jikan API. A middleware throttling queue delays calls by 400-600ms, populating responsive UI containers.",
      diagramNodes: [
        { id: "ui", label: "HTML5/CSS3 Responsive UI", type: "client" },
        { id: "throttle", label: "Request Throttling Queue", type: "service" },
        { id: "jikan", label: "Jikan API v4 Endpoints", type: "network" }
      ],
      diagramEdges: [
        { from: "ui", to: "throttle", label: "User Search Query" },
        { from: "throttle", to: "jikan", label: "Throttled Fetch (400-600ms Delay)" },
        { from: "jikan", to: "ui", label: "JSON Metadata Payload" }
      ]
    },
    challenges: [
      "Jikan API rate limits (3 requests/second) returned HTTP 429 errors when loading multiple sections.",
      "Maintaining state agreement when reloading pages during token expirations."
    ],
    solutions: [
      "Built a custom asynchronous throttle scheduler with staggered delays (400-600ms) between concurrent fetch pipelines.",
      "Implemented local caching of API responses to minimize redundant HTTP calls."
    ],
    engineeringDecisions: [
      "Kept architecture static to ensure lightning-fast loads and zero hosting overhead.",
      "Utilized pure CSS Flexbox and Grid layouts to achieve absolute responsiveness without heavy framework packages."
    ],
    roadmap: [
      "Support user bookmark collections via localStorage.",
      "Add dark mode style variations.",
      "Integrate an video trailer preview modal."
    ],
    performance: {
      lighthousePerformance: 99,
      lighthouseAccessibility: 98,
      lighthouseBestPractices: 100,
      lighthouseSEO: 97,
      loadTimeMs: 120,
      fcpMs: 60,
      bundleSizeKb: 25
    },
    codeHighlights: [
      {
        filename: "api.js",
        language: "javascript",
        code: `// Asynchronous throttle helper to respect 3 req/s limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function throttledFetch(url) {
    await delay(500); // 500ms staggered delay
    const response = await fetch(url);
    if (response.status === 429) {
        console.warn("Rate limited, retrying in 1s...");
        await delay(1000);
        return throttledFetch(url);
    }
    return response.json();
}

async function loadAnimeData() {
    const list = await throttledFetch('https://api.jikan.moe/v4/top/anime');
    // Render list...
}`,
        explanation: "Implements a custom retry-on-limit and staggered delay fetch wrapper to prevent HTTP 429 Rate Limiting errors from the public Jikan API."
      }
    ],
    documentation: `## AniVault Setup Guide

### Clone repository:
\`\`\`bash
git clone https://github.com/RashmiKumari13/AniVault.git
\`\`

### Launch app:
Open \`index.html\` directly in any web browser!
`
  },
  {
    id: "intern-management",
    title: "Internship Platform",
    tagline: "Full-stack MERN application built for BSPGCL to digitise manual tracking.",
    description: "Developed during your BSPGCL government internship to digitize manual workflows. Implements a clean MVC architecture with React, Express, and MongoDB to manage developer progress logs, approvals, and credentials.",
    heroImage: "/images/lumina_hero.png",
    demoVideo: "/videos/journey.mp4",
    githubUrl: "https://github.com/vikrant-kumar-cse/Internship_Project",
    liveUrl: "https://github.com/vikrant-kumar-cse/Internship_Project",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JSON Web Tokens"],
    features: [
      "RESTful API route handlers structured under MVC architectures.",
      "JWT-based user sessions and role permissions (Interns, Administrators).",
      "Persistent document collections mapping progress reports and log records.",
      "Responsive React components styled using dark glass variables."
    ],
    architecture: {
      description: "React client triggers REST API requests. Express middleware parses authorization headers, query MongoDB collections via Mongoose, and responds.",
      diagramNodes: [
        { id: "react", label: "React Client", type: "client" },
        { id: "express", label: "Express API Server", type: "service" },
        { id: "mongo", label: "MongoDB Database", type: "storage" }
      ],
      diagramEdges: [
        { from: "react", to: "express", label: "Signed JWT API Calls" },
        { from: "express", to: "mongo", label: "Mongoose Query Operations" }
      ]
    },
    challenges: [
      "Exposing database passwords and keys in shared version controls.",
      "Maintaining state agreement when reloading pages during token expirations."
    ],
    solutions: [
      "Configured dotenv variables separating configuration parameters from deployment packages.",
      "Stored JWT tokens in HTTP-only secure cookie packages protecting sessions."
    ],
    engineeringDecisions: [
      "Chose MongoDB for dynamic schema options matching flexible workflow reports.",
      "Engineered clean MVC routers separating data controllers from route paths."
    ],
    roadmap: [
      "Add email verification protocols.",
      "Implement PDF report generation exporters.",
      "Support profile picture uploads to secure storage buckets."
    ],
    performance: {
      lighthousePerformance: 97,
      lighthouseAccessibility: 99,
      lighthouseBestPractices: 100,
      lighthouseSEO: 97,
      loadTimeMs: 190,
      fcpMs: 80,
      bundleSizeKb: 45
    },
    codeHighlights: [
      {
        filename: "server.js",
        language: "javascript",
        code: `const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Secure auth verification middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalid' });
    req.user = user;
    next();
  });
};

app.get('/api/interns/profile', authenticateToken, async (req, res) => {
  // DB query logic...
});`,
        explanation: "Express endpoint route setup with custom middleware to verify JSON Web Tokens, securing routes from unauthorized operations."
      }
    ],
    documentation: `## MERN Platform Dev Guide

### Install node modules:
\`\`\`bash
npm install
\`\`\`

### Run dev server:
\`\`\`bash
npm run dev
\`\`\`
`
  }
];
