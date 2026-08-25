import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: "Haneesh Gowda R",
  role: "AI/ML Engineer",
  email: "haneesh7gowda@gmail.com",
  phone: "+91 9353776395",
  location: "Bengaluru, India",
  linkedin: "https://linkedin.com/in/haneeshgowda",
  github: "https://haneesh7.github.io/haneesh-portfolio/",
  summary: "AI/ML engineering graduate (B.E., 2025) with hands-on project experience across TensorFlow, PyTorch, and Scikit-learn building LLM-integrated applications, NLP pipelines, and computer vision systems. Comfortable across the full build cycle — data preprocessing, model integration via APIs, and deploying working prototypes with Flask — with a working foundation in agentic AI workflows.",
  education: [
    {
      institution: "B.M.S. College of Engineering",
      degree: "B.E., Artificial Intelligence & Machine Learning",
      period: "2021 — 2025"
    },
    {
      institution: "SSMRV PU College",
      degree: "Pre-University Course (PCMCs)",
      period: "2019 — 2021"
    }
  ],
  experience: [
    {
      company: "NIT Goa",
      role: "Project Intern",
      period: "Mar 2025 — May 2025",
      description: [
        "Built an automated spam-detection system in Python using NLP-based text classification to flag malicious content.",
        "Designed preprocessing and feature-extraction pipelines (Pandas, NumPy, Scikit-learn) that improved model accuracy and evaluation metrics.",
        "Applied supervised ML techniques to a real-world security/text-classification problem, from data cleaning through evaluation."
      ]
    }
  ],
  projects: [
    {
      title: "Personalized AI Voice Assistant",
      period: "2023 — 2024",
      description: "Integrated an LLM-backed voice assistant with existing software via a Flask-based API layer, enabling multi-app workflow automation from natural-language commands. Used NLP/LLM intent parsing to interpret complex user requests and route them to the correct backend tool.",
      tags: ["Python", "Flask", "LLM", "NLP", "Agentic AI"],
      video: "/voice_assistant.mp4"
    },
    {
      title: "Real-Time Weapon Detection",
      period: "2024 — 2025",
      description: "Built a real-time object-detection system with YOLOv8 (PyTorch) for security monitoring, using OpenCV for frame preprocessing and tuned for low-latency inference. Iterated on training data and thresholds across multiple cycles to reduce false positives and improve reliability.",
      tags: ["YOLOv8", "PyTorch", "OpenCV", "Computer Vision"],
      video: "/weapon_detection.mp4"
    },
    {
      title: "NLP Sentiment & Entity Analysis Framework",
      period: "2022 — 2023",
      description: "Built a Python framework combining sentiment analysis and Named Entity Recognition (NER) using Scikit-learn and Pandas for automated text classification. Applied it to unstructured social-media text to extract actionable insights at scale.",
      tags: ["Python", "Scikit-learn", "Pandas", "NLP", "NER"],
      video: "/nlp_sentiment.mp4"
    }
  ],
  skills: [
    {
      title: "Languages",
      skills: ["Python", "SQL", "C++", "JavaScript", "HTML/CSS"]
    },
    {
      title: "ML/DL Frameworks",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn"]
    },
    {
      title: "AI & NLP",
      skills: ["LLM Integration", "Agentic AI", "Sentiment Analysis", "Named Entity Recognition"]
    },
    {
      title: "Computer Vision",
      skills: ["OpenCV", "YOLOv8"]
    },
    {
      title: "Backend & Data",
      skills: ["Flask", "Django", "MySQL", "Pandas", "NumPy", "REST APIs"]
    },
    {
      title: "Tools",
      skills: ["Git", "Power BI"]
    }
  ]
};
