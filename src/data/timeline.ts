export interface TimelineItem {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
  metrics: string[];
}

export interface CodingStats {
  commitsCount: number;
  linesWritten: number;
  deploymentsCount: number;
  testCoverage: string;
  uptime: string;
  prMerged: number;
}

export const timelineData: TimelineItem[] = [
  {
    id: "bspgcl",
    year: "Dec 2025 – Jan 2026",
    role: "Web Development Intern",
    company: "Bihar State Power Generation Company Ltd. (BSPGCL)",
    description: "Architected a full-stack MERN application to digitise manual workflows for a government power utility serving millions. Developed responsive React.js components and RESTful Node/Express APIs.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "MERN Stack"],
    metrics: ["Integrated RESTful APIs with MVC patterns", "Stored persistent logs securely on MongoDB", "Conducted code reviews and team builds"]
  },
  {
    id: "external-ml",
    year: "Jun 2025",
    role: "AI & Machine Learning Intern",
    company: "External Organisation",
    description: "Assisted in developing production ML models by performing end-to-end data pre-processing, feature extraction, and model evaluation. Implemented supervised learning models in Scikit-Learn.",
    tags: ["Python", "Scikit-Learn", "Feature Engineering", "NLP"],
    metrics: ["Analyzed performance metrics on clean datasets", "Implemented text parsing pipelines", "Trained classification algorithms"]
  },
  {
    id: "kodacy",
    year: "30 Days",
    role: "AI & Machine Learning Intern",
    company: "Kodacy",
    description: "Completed an intensive 30-day AI/ML programme covering core machine learning algorithms, model training, and data evaluation workflows in an industry-guided environment.",
    tags: ["Python", "Machine Learning", "Data Pipelines"],
    metrics: ["Gained hands-on model training exposure", "Practised dataset cleaning methods"]
  },
  {
    id: "interncertify",
    year: "15 Days",
    role: "Machine Learning Intern",
    company: "InternCertify",
    description: "Implemented supervised learning algorithms, conducting Exploratory Data Analysis (EDA) and feature engineering on real-world datasets in a fast-paced environment.",
    tags: ["Python", "EDA", "Scikit-Learn"],
    metrics: ["Conducted automated data plots", "Engineered key model inputs"]
  },
  {
    id: "salesforce-dev",
    year: "8 Weeks",
    role: "Salesforce Developer Virtual Intern",
    company: "Salesforce",
    description: "Completed CRM customization, Apex scripting, and security best-practice configuration on the Lightning platform. Configured automated user dashboards.",
    tags: ["Salesforce", "Apex", "Lightning", "CRM Automation"],
    metrics: ["Built custom automation dashboards", "Structured secure CRM layouts"]
  }
];

export const codingStatsData: CodingStats = {
  commitsCount: 382,
  linesWritten: 45280,
  deploymentsCount: 34,
  testCoverage: "92.1%",
  uptime: "99.90%",
  prMerged: 24
};
