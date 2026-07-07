import { NextResponse } from "next/server";
import { z } from "zod";

// Zod validation schema for request payload (Security against injection)
const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().min(1).max(500),
    })
  ),
});

interface QAEntry {
  keywords: string[];
  answer: string;
}

const knowledgeBase: QAEntry[] = [
  {
    keywords: ["project", "projects", "what did you build", "portfolio"],
    answer: "Here are the projects I have built:\n1. **LocalBiz** (React/TypeScript/SQLite/Drizzle ORM) - Location-based business discovery platform.\n2. **AniVault** (HTML5/CSS3/Vanilla JS/Jikan API) - Static anime discovery hub with custom fetch throttling.\n3. **Internship Management Platform** (MERN Stack) - Developed for BSPGCL during my internship to digitise manual logs.\nCheck the Projects panel to inspect the full source code highlights!",
  },
  {
    keywords: ["localbiz", "location", "drizzle", "sqlite", "orm", "map"],
    answer: "LocalBiz is a location-based business discovery and e-commerce platform built with React, TypeScript, Node.js, and SQLite. It maps dynamic product catalogs, handles persistent cart states, and utilizes Drizzle ORM schemas along with RBAC admin dashboards.",
  },
  {
    keywords: ["anivault", "anime", "jikan", "throttle", "rate limit"],
    answer: "AniVault is a static, zero-backend anime database built with Vanilla JS (ES2020+) consuming the Jikan API v4. It features a custom asynchronous throttle scheduler with staggered delays (400-600ms) to respect Jikan's 3 requests/second rate limit, along with skeleton loader states.",
  },
  {
    keywords: ["internship", "management", "platform", "mern", "bspgcl"],
    answer: "I built the Internship Management Platform during my web development internship at Bihar State Power Generation Company Ltd. (BSPGCL). It's a full-stack MERN (MongoDB, Express, React, Node) application that digitises manual student progress logs using secure JWT sessions.",
  },
  {
    keywords: ["tech stack", "skills", "languages", "technologies", "react", "salesforce", "node", "express"],
    answer: "My technical competencies are:\n- **Frontend**: React.js, Tailwind CSS, HTML5, CSS3, Vite, Radix UI, Responsive Design.\n- **Backend**: Node.js, Express.js, JWT Auth, REST APIs, Nodemailer.\n- **Databases**: MongoDB, SQLite, Oracle PL/SQL, Drizzle ORM.\n- **Security**: AES Encryption, bcryptjs, HTTPS, Input Validation.\n- **Tools & Platforms**: Salesforce, Apex, Lightning Web Components, Git/GitHub, Postman.",
  },
  {
    keywords: ["experience", "work", "history", "internships", "bspgcl", "kodacy", "interncertify", "salesforce"],
    answer: "I have completed 6+ internships: \n1. **Web Dev Intern** at BSPGCL (MERN stack, Patna) \n2. **AI/ML Intern** at an External Organisation (Scikit-Learn, NLP) \n3. **AI/ML Intern** at Kodacy \n4. **ML Intern** at InternCertify \n5. **Salesforce Developer Virtual Intern** (Apex, Lightning).\nCheck the Journey tab for details!",
  },
  {
    keywords: ["education", "college", "gec", "cgpa", "marks", "btech", "degree", "west champaran"],
    answer: "I am a B.Tech Computer Science & Engineering student at Government Engineering College, West Champaran (Bettiah, Bihar) graduating in 2026. I specialize in Cybersecurity coursework (DSA, DBMS, OS, TOC, and Network Security).",
  },
  {
    keywords: ["certifications", "achievements", "credentials", "tata", "forage", "roorkee"],
    answer: "My key credentials include: \n- **Web Development**: IIT Roorkee (Ihub Divya Sampark) \n- **Tata (Forage)**: Cybersecurity Virtual Simulation \n- **Salesforce**: Developer Virtual Internship Certificate \n- **NPTEL Swayam**: Data Science & IOT Certificates.",
  },
  {
    keywords: ["relocate", "relocation", "remote", "availability", "job", "hire", "contact", "email"],
    answer: "I am available for full-time Cybersecurity, AI/ML, and Software Developer positions. I am open to remote arrangements, relocation, and contract roles. You can email me at: rashmikumari042005@gmail.com!",
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload. Limit query length." },
        { status: 400 }
      );
    }

    const { messages } = parsed.data;
    const latestMessage = messages[messages.length - 1].content.toLowerCase();

    // Scoring
    let bestMatch: QAEntry | null = null;
    let maxScore = 0;

    for (const entry of knowledgeBase) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (latestMessage.includes(kw)) {
          score += 1;
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestMatch = entry;
      }
    }

    const answer = bestMatch && maxScore > 0
      ? bestMatch.answer
      : "That is a great question! I'm trained on Rashmi's B.Tech CSE education (GEC West Champaran), her internships (BSPGCL, Salesforce, Kodacy), her projects (LocalBiz, AniVault), and certifications. Ask me about her skills, experience, or how to contact her at: rashmikumari042005@gmail.com.";

    return NextResponse.json({
      role: "assistant",
      content: answer,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
