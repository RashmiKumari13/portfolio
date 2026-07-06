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
  // Cybersecurity (Systems)
  { id: "netsec", name: "Network Security", category: "systems", level: 9, x: 0, y: 0, z: 0 },
  { id: "cryptography", name: "Cryptography & SSL", category: "creative", level: 8, x: -1.5, y: 1.2, z: 0.5 },
  { id: "iam", name: "Identity Access (IAM)", category: "systems", level: 8, x: 1.5, y: 1.2, z: -0.5 },
  { id: "owasp", name: "OWASP Auditing", category: "systems", level: 8, x: -2.5, y: 0, z: 1.2 },
  
  // AI / ML (Backend)
  { id: "python", name: "Python", category: "backend", level: 9, x: 2, y: -1.2, z: -1 },
  { id: "pytorch", name: "PyTorch & ML Models", category: "backend", level: 8, x: 3, y: 0.5, z: -1.5 },
  { id: "scikit", name: "Scikit-Learn", category: "backend", level: 8, x: 2.2, y: -2.2, z: -0.5 },
  { id: "pandas", name: "Pandas & Numpy", category: "backend", level: 8, x: 0.5, y: -2.5, z: -1.8 },
  
  // Web & Full Stack (Frontend)
  { id: "react", name: "React / LWC", category: "frontend", level: 8, x: -1.8, y: -1.2, z: 0.8 },
  { id: "nextjs", name: "Next.js", category: "frontend", level: 7, x: -0.8, y: -2.8, z: -1 },
  { id: "typescript", name: "TypeScript", category: "frontend", level: 8, x: 4, y: -1, z: 1.5 },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", level: 8, x: 4.5, y: -2.2, z: 0.5 },

  // Cloud & Integration (Tools)
  { id: "salesforce", name: "Salesforce & Apex", category: "tools", level: 9, x: 3.5, y: 2, z: 2 },
  { id: "docker", name: "Docker", category: "tools", level: 7, x: 1, y: 3, z: 1 },
  { id: "postgres", name: "PostgreSQL & SQL", category: "tools", level: 8, x: -3.5, y: 2.5, z: -1 },
  { id: "git", name: "Git / CI-CD", category: "tools", level: 8, x: -2, y: 2.8, z: -0.5 },
];

export const skillConnections: SkillConnection[] = [
  { source: "netsec", target: "cryptography" },
  { source: "netsec", target: "iam" },
  { source: "netsec", target: "owasp" },
  { source: "netsec", target: "python" },
  { source: "python", target: "pytorch" },
  { source: "python", target: "scikit" },
  { source: "python", target: "pandas" },
  { source: "python", target: "postgres" },
  { source: "react", target: "nextjs" },
  { source: "react", target: "typescript" },
  { source: "react", target: "salesforce" },
  { source: "typescript", target: "tailwind" },
  { source: "salesforce", target: "iam" },
  { source: "docker", target: "git" },
  { source: "git", target: "netsec" },
  { source: "cryptography", target: "postgres" },
];
