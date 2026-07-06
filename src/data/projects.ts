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
    id: "async-port-scanner",
    title: "Async Port Scanner",
    tagline: "High-performance, asynchronous TCP port scanner built with C++20 and Boost.Asio.",
    description: "A C++ network auditing tool that broadcasts concurrent TCP connection probes across port ranges. Bypasses blocking network queues to perform massive port audits rapidly, including service version grabbing (HTTP, SSH, FTP).",
    heroImage: "/images/sentinel_hero.png",
    demoVideo: "/videos/journey.mp4",
    githubUrl: "https://github.com/RashmiKumari13/cyber_project",
    liveUrl: "https://github.com/RashmiKumari13/cyber_project",
    techStack: ["C++20", "Boost.Asio", "Multi-threading", "Network Socket API", "CMake"],
    features: [
      "Asynchronous I/O polling via Boost.Asio context executors.",
      "Multi-threaded thread pool distributing target subnets dynamically.",
      "Service identification and banner grabbing from responsive ports.",
      "Custom socket timeouts protecting against network hang-ups."
    ],
    architecture: {
      description: "App threads post connection jobs to the Boost.Asio event context pool, creating non-blocking sockets. Active callbacks grab host banners on connection, reporting open sockets.",
      diagramNodes: [
        { id: "scanner", label: "Scanner Main (C++ Threads)", type: "client" },
        { id: "asio", label: "Boost.Asio Event Loop Context", type: "service" },
        { id: "target", label: "Target Socket IP/Ports", type: "storage" },
        { id: "banner", label: "Banner Grabbing Parser", type: "network" }
      ],
      diagramEdges: [
        { from: "scanner", to: "asio", label: "Submit async_connect" },
        { from: "asio", to: "target", label: "Non-blocking Handshake" },
        { from: "target", to: "banner", label: "OnSuccess: Read Banner" },
        { from: "banner", to: "scanner", label: "Log Open Port" }
      ]
    },
    challenges: [
      "Sequential TCP socket timeouts blocks scanner threads, leading to extremely slow scan times over large networks.",
      "Socket file descriptor leaks when managing hundreds of concurrent connections."
    ],
    solutions: [
      "Replaced blocking syscalls with Boost.Asio's async_connect loop, managing connection lifetimes in-context.",
      "Wrapped socket handlers in std::unique_ptr and smart resource scopes, ensuring proper cleanups on exit."
    ],
    engineeringDecisions: [
      "Used C++20 for static typing, safety, and raw performance over Python for network scanners.",
      "Built with CMake to facilitate library dependency links across Linux environments."
    ],
    roadmap: [
      "Support SYN stealth half-open scanning mode.",
      "Implement OS fingerprinting signatures database.",
      "Add UDP port check loops."
    ],
    performance: {
      lighthousePerformance: 98,
      lighthouseAccessibility: 100,
      lighthouseBestPractices: 100,
      lighthouseSEO: 98,
      loadTimeMs: 120,
      fcpMs: 60,
      bundleSizeKb: 34
    },
    codeHighlights: [
      {
        filename: "scanner.cpp",
        language: "cpp",
        code: `#include <boost/asio.hpp>
#include <iostream>
#include <memory>

using boost::asio::ip::tcp;

class PortScanner : public std::enable_shared_from_this<PortScanner> {
public:
    PortScanner(boost::asio::io_context& io_ctx, const std::string& ip, int port)
        : socket_(io_ctx), endpoint_(boost::asio::ip::make_address(ip), port) {}

    void start() {
        auto self = shared_from_this();
        socket_.async_connect(endpoint_, [self, this](const boost::system::error_code& ec) {
            if (!ec) {
                std::cout << "[+] Port " << endpoint_.port() << " is OPEN\\n";
                self->grab_banner();
            }
        });
    }

private:
    void grab_banner() {
        // Asynchronously read service header logs...
    }
    tcp::socket socket_;
    tcp::endpoint endpoint_;
};`,
        explanation: "Uses Boost.Asio's async_connect to spawn non-blocking socket connections. This lets the program scan multiple ports in parallel on a single thread."
      }
    ],
    documentation: `## Async Scanner Compile Guide

### Build binary:
\`\`\`bash
mkdir build && cd build
cmake ..
make
\`\`

### Run scanner:
\`\`\`bash
./port_scanner --target 192.168.1.1 --ports 1-1000
\`\`\`
`
  },
  {
    id: "fake-news-detector",
    title: "Fake News Detector",
    tagline: "NLP-powered machine learning classifier detecting misinformation with 85% accuracy.",
    description: "An NLP classifier that flags fake news articles. It converts article body text to feature matrices using TF-IDF vectorization and trains a Passive-Aggressive Classifier to evaluate facts versus misinformation.",
    heroImage: "/images/flux_hero.png",
    demoVideo: "/videos/journey.mp4",
    githubUrl: "https://github.com/RashmiKumari13/FakeNewsDetector",
    liveUrl: "https://github.com/RashmiKumari13/FakeNewsDetector",
    techStack: ["Python", "Scikit-Learn", "NLP", "Pandas", "Jupyter Notebook"],
    features: [
      "Natural Language Processing pre-processing pipeline parsing HTML/special chars.",
      "TF-IDF (Term Frequency-Inverse Document Frequency) text vectorizer.",
      "Passive-Aggressive Classifier for real-time online learning adjustments.",
      "Confusion matrix evaluation tracking model accuracy thresholds."
    ],
    architecture: {
      description: "Text is loaded and cleaned. TF-IDF maps word distributions to sparse matrices. The Passive-Aggressive classifier learns decision boundaries, marking predictions as REAL or FAKE.",
      diagramNodes: [
        { id: "raw_text", label: "News Articles Dataset", type: "client" },
        { id: "vectorizer", label: "TF-IDF Vectorizer", type: "service" },
        { id: "model", label: "Passive-Aggressive Model", type: "leader" },
        { id: "eval", label: "Confusion Matrix Metrics", type: "storage" }
      ],
      diagramEdges: [
        { from: "raw_text", to: "vectorizer", label: "Preprocessed Text" },
        { from: "vectorizer", to: "model", label: "Feature Matrix" },
        { from: "model", to: "eval", label: "Evaluate Predictions" }
      ]
    },
    challenges: [
      "Stopwords and casing introduced text noise, degrading accuracy below 75%.",
      "Model overfitting on training datasets."
    ],
    solutions: [
      "Integrated NLTK text normalization (casing filters and stopword cleanups).",
      "Tuned tfidf-vectorizer parameters to filter out rare words and enforce regularisation."
    ],
    engineeringDecisions: [
      "Chose the Passive-Aggressive classifier for its online learning efficiency on massive text vectors.",
      "Utilized Pandas dataframes for high-performance memory dataset mappings."
    ],
    roadmap: [
      "Implement deep learning transformers (BERT).",
      "Develop browser extensions to audit articles in real-time.",
      "Create API endpoints for integration in news feeds."
    ],
    performance: {
      lighthousePerformance: 99,
      lighthouseAccessibility: 98,
      lighthouseBestPractices: 100,
      lighthouseSEO: 96,
      loadTimeMs: 140,
      fcpMs: 70,
      bundleSizeKb: 36
    },
    codeHighlights: [
      {
        filename: "detector.py",
        language: "python",
        code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

# Vectorize dataset text features
tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7)
x_train_tfidf = tfidf_vectorizer.fit_transform(x_train)
x_test_tfidf = tfidf_vectorizer.transform(x_test)

# Initialize online Passive-Aggressive Classifier
pac = PassiveAggressiveClassifier(max_iter=50)
pac.fit(x_train_tfidf, y_train)

# Predict and evaluate
y_pred = pac.predict(x_test_tfidf)
score = accuracy_score(y_test, y_pred)
print(f'Accuracy: {round(score*100, 2)}%')`,
        explanation: "Utilizes Scikit-learn to convert raw texts to term frequencies and fits an online Passive-Aggressive classifier to rapidly adjust weights for text classification."
      }
    ],
    documentation: `## ML Model Train Guide

### Install packages:
\`\`\`bash
pip install scikit-learn pandas nltk
\`\`\`

### Run Notebook evaluation:
\`\`\`bash
jupyter notebook notebooks/detector.ipynb
\`\`\`
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
