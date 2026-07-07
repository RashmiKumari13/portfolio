export interface SkillNode {
  id: string;
  name: string;
  category: "frontend" | "backend" | "systems" | "tools" | "creative";
  level: number;
  x: number;
  y: number;
  z: number;
}

export interface SkillConnection {
  source: string;
  target: string;
}

export const skillsData: SkillNode[] = [
  // Security (Systems)
  { id: "netsec", name: "Network Security", category: "systems", level: 9, x: 0, y: 0, z: 0 },
  { id: "aes", name: "AES Encryption & bcryptjs", category: "systems", level: 8, x: -1.5, y: 1.2, z: 0.5 },
  { id: "https", name: "HTTPS & SSL Secure Loops", category: "systems", level: 8, x: 1.5, y: 1.2, z: -0.5 },
  { id: "validation", name: "Input Validation & Sanitising", category: "systems", level: 8, x: -2.5, y: 0, z: 1.2 },
  
  // Backend (Backend)
  { id: "nodejs", name: "Node.js", category: "backend", level: 9, x: 2, y: -1.2, z: -1 },
  { id: "express", name: "Express.js", category: "backend", level: 9, x: 3, y: 0.5, z: -1.5 },
  { id: "drizzle", name: "Drizzle ORM", category: "backend", level: 8, x: 2.2, y: -2.2, z: -0.5 },
  { id: "nodemailer", name: "Nodemailer APIs", category: "backend", level: 8, x: 0.5, y: -2.5, z: -1.8 },
  
  // Databases (Creative)
  { id: "mongodb", name: "MongoDB Database", category: "creative", level: 8, x: -1.8, y: -1.2, z: 0.8 },
  { id: "sqlite", name: "SQLite Database", category: "creative", level: 8, x: -0.8, y: -2.8, z: -1 },
  { id: "oracle", name: "Oracle PL/SQL", category: "creative", level: 8, x: 4, y: -1, z: 1.5 },
  
  // Frontend (Frontend)
  { id: "react", name: "React.js Framework", category: "frontend", level: 9, x: -3.5, y: -1.5, z: -1.5 },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", level: 9, x: -4.5, y: -0.5, z: -2 },
  { id: "radix", name: "Radix UI & Space", category: "frontend", level: 8, x: -3.8, y: -2.5, z: -0.5 },
  { id: "vite", name: "Vite Builder", category: "frontend", level: 8, x: -2.2, y: -3.2, z: 0.5 },

  // Tools & Platforms (Tools)
  { id: "salesforce", name: "Salesforce CRM", category: "tools", level: 8, x: 3.5, y: 2, z: 2 },
  { id: "apex", name: "Apex Scripting", category: "tools", level: 8, x: 1, y: 3, z: 1 },
  { id: "git", name: "Git & GitHub Workflow", category: "tools", level: 9, x: -3.5, y: 2.5, z: -1 },
  { id: "postman", name: "Postman API Tests", category: "tools", level: 8, x: -2, y: 2.8, z: -0.5 },
];

export const skillConnections: SkillConnection[] = [
  { source: "netsec", target: "aes" },
  { source: "netsec", target: "https" },
  { source: "netsec", target: "validation" },
  { source: "netsec", target: "nodejs" },
  { source: "nodejs", target: "express" },
  { source: "express", target: "drizzle" },
  { source: "express", target: "nodemailer" },
  { source: "drizzle", target: "sqlite" },
  { source: "react", target: "tailwind" },
  { source: "react", target: "radix" },
  { source: "react", target: "vite" },
  { source: "react", target: "mongodb" },
  { source: "salesforce", target: "apex" },
  { source: "git", target: "postman" },
  { source: "git", target: "netsec" },
  { source: "aes", target: "oracle" },
];
