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
    answer: "Here are the projects I have built:\n1. **Async Port Scanner** (C++20/Boost.Asio) - A multi-threaded, asynchronous TCP scanner.\n2. **Fake News Detector** (Python/Scikit-Learn) - An NLP classifier analyzing misinformation with 85% accuracy.\n3. **Spam Detection System** (Python) - An ML classification pipeline.\n4. **Internship Management Platform** (MERN Stack) - Built for BSPGCL to digitise manual logs.\n5. **ML Topics Lab & Trainer Dashboard**.\nCheck the Projects panel to inspect the full source code highlights!",
  },
  {
    keywords: ["port scanner", "async", "cpp", "asio", "socket"],
    answer: "The Async Port Scanner is a high-performance network auditing tool built in C++20 with Boost.Asio. It uses an asynchronous event loop and thread pooling to execute concurrent TCP connection tests, supporting banner grabbing to identify host HTTP/SSH services.",
  },
  {
    keywords: ["fake news", "detector", "classifier", "nlp", "tfidf"],
    answer: "The Fake News Detector is a text-classification system built in Python. It cleans inputs using NLTK, converts text to vectors via TF-IDF, and trains a Passive-Aggressive Classifier to detect news validity with 85% accuracy.",
  },
  {
    keywords: ["internship", "management", "platform", "mern", "bspgcl"],
    answer: "I built the Internship Management Platform during my web development internship at Bihar State Power Generation Company Ltd. (BSPGCL). It's a full-stack MERN (MongoDB, Express, React, Node) application that digitises manual student progress logs using secure JWT sessions.",
  },
  {
    keywords: ["tech stack", "skills", "languages", "technologies", "python", "cpp", "react", "salesforce"],
    answer: "My engineering toolkit contains:\n- **Languages**: Python, C++, JavaScript, SQL, Bash.\n- **AI & Machine Learning**: Scikit-Learn, NumPy, Pandas, NLP, Deep Learning.\n- **Cybersecurity**: Port Scanning, Network Analysis, IAM, Boost.Asio.\n- **Web & Cloud**: React.js, Node.js, Express.js, MongoDB, Salesforce.\n- **Tools**: Git/GitHub, Jupyter, CMake, Linux.",
  },
  {
    keywords: ["experience", "work", "history", "internships", "bspgcl", "kodacy", "interncertify", "salesforce"],
    answer: "I have completed 6+ internships: \n1. **Web Dev Intern** at BSPGCL (MERN stack, Patna) \n2. **AI/ML Intern** at an External Organisation (Scikit-Learn, NLP) \n3. **AI/ML Intern** at Kodacy \n4. **ML Intern** at InternCertify \n5. **Salesforce Developer Virtual Intern** (Apex, Lightning).\nCheck the Journey tab for details!",
  },
  {
    keywords: ["education", "college", "gec", "cgpa", "marks", "btech", "degree"],
    answer: "I am a final-year B.Tech student in Computer Science & Engineering at Government Engineering College, West Champaran. I maintain a cumulative CGPA of 8.2/10 and will graduate in 2026.",
  },
  {
    keywords: ["certifications", "achievements", "credentials", "tata", "forage"],
    answer: "My key credentials include: \n- **Tata (Forage)**: Cybersecurity Virtual Simulation \n- **Salesforce**: Developer Virtual Internship Certificate \n- **Kodacy/InternCertify**: AI & ML Bootcamp Certificates.",
  },
  {
    keywords: ["relocate", "relocation", "remote", "availability", "job", "hire", "contact", "email"],
    answer: "I am available for full-time Cybersecurity, AI/ML, and Software Developer positions graduating in mid-2026. I am open to remote arrangements and relocation. You can email me at: rashmikumar42005@gmail.com!",
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
      : "That is a great question! I'm trained on Rashmi's technical education (B.Tech at GEC West Champaran, 8.2 CGPA), her 6+ internships (BSPGCL, Salesforce, Kodacy), her C++ Port Scanner, and NLP model projects. Ask me about her skills, experience, or how to contact her at: rashmikumar42005@gmail.com.";

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
