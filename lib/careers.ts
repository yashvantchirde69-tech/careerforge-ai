// ─── CareerForge AI — Career Database ───────────────────────────────────────
// Universal coverage: Engineering, Healthcare, Business, Arts

export type Domain = "tech" | "healthcare" | "business" | "creative";
export type UserRole = "student" | "fresher" | "jobseeker" | null;

export interface Career {
  id: string;
  title: string;
  domain: Domain;
  emoji: string;
  tagline: string;
  description: string;
  avgSalary2026: { entry: string; mid: string; senior: string };
  skills: Skill[];
  roadmapSteps: RoadmapStep[];
  jobOutlook: string;
  topCompanies: string[];
}

export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  learnUrl: string;
  estimatedHours: number;
}

export interface RoadmapStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  salaryImpact: string;
  resources: { name: string; url: string; type: "Course" | "Book" | "Tool" | "Certification" }[];
}

export const CAREERS: Career[] = [
  // ─── TECH ───────────────────────────────────────────────────────────────────
  {
    id: "ai-ml-engineer",
    title: "AI / ML Engineer",
    domain: "tech",
    emoji: "🤖",
    tagline: "Build the intelligent systems of tomorrow",
    description: "Design, build, and deploy machine learning models and AI systems at scale.",
    avgSalary2026: { entry: "₹8–12 LPA", mid: "₹18–35 LPA", senior: "₹45–90 LPA" },
    jobOutlook: "📈 40% growth by 2030 — Highest demand globally",
    topCompanies: ["Google", "Microsoft", "OpenAI", "Flipkart", "Swiggy"],
    skills: [
      { name: "Python", level: "Beginner", learnUrl: "https://www.kaggle.com/learn/python", estimatedHours: 40 },
      { name: "Machine Learning", level: "Intermediate", learnUrl: "https://www.coursera.org/learn/machine-learning", estimatedHours: 80 },
      { name: "Deep Learning", level: "Advanced", learnUrl: "https://www.fast.ai", estimatedHours: 120 },
      { name: "MLOps", level: "Advanced", learnUrl: "https://www.coursera.org/learn/mlops", estimatedHours: 60 },
    ],
    roadmapSteps: [
      { id: "ai-1", phase: "Foundation", title: "Python & Math Basics", description: "Master Python, linear algebra, statistics and probability — the bedrock of all AI work.", duration: "2–3 months", skills: ["Python", "NumPy", "Statistics", "Linear Algebra"], salaryImpact: "+0% (prerequisite)", resources: [{ name: "Kaggle Python Course", url: "https://www.kaggle.com/learn/python", type: "Course" }, { name: "3Blue1Brown Linear Algebra", url: "https://www.3blue1brown.com/", type: "Course" }] },
      { id: "ai-2", phase: "Core Skills", title: "Machine Learning Fundamentals", description: "Learn supervised/unsupervised learning, model evaluation. Build your first prediction model.", duration: "3–4 months", skills: ["Scikit-learn", "Pandas", "ML Algorithms", "Feature Engineering"], salaryImpact: "+40% over baseline", resources: [{ name: "Andrew Ng ML Course", url: "https://www.coursera.org/learn/machine-learning", type: "Course" }, { name: "Hands-On ML (Book)", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/", type: "Book" }] },
      { id: "ai-3", phase: "Specialization", title: "Deep Learning & Neural Networks", description: "Build CNNs, RNNs, Transformers. Train large models on real datasets.", duration: "4–5 months", skills: ["TensorFlow", "PyTorch", "LLMs", "Computer Vision"], salaryImpact: "+80% over baseline", resources: [{ name: "Fast.ai Deep Learning", url: "https://www.fast.ai", type: "Course" }, { name: "DeepLearning.AI Specialization", url: "https://www.deeplearning.ai", type: "Certification" }] },
      { id: "ai-4", phase: "Professional", title: "MLOps & Production AI", description: "Deploy models to production, build pipelines, monitor drift, work with cloud platforms.", duration: "2–3 months", skills: ["Docker", "Kubernetes", "AWS SageMaker", "MLflow"], salaryImpact: "+120% — Senior level", resources: [{ name: "MLOps Zoomcamp", url: "https://github.com/DataTalksClub/mlops-zoomcamp", type: "Course" }, { name: "AWS ML Specialty", url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/", type: "Certification" }] },
    ],
  },
  {
    id: "full-stack-developer",
    title: "Full-Stack Developer",
    domain: "tech",
    emoji: "💻",
    tagline: "Build end-to-end web products users love",
    description: "Create complete web applications from database to user interface.",
    avgSalary2026: { entry: "₹5–9 LPA", mid: "₹15–28 LPA", senior: "₹35–70 LPA" },
    jobOutlook: "📈 25% growth — Evergreen demand across all industries",
    topCompanies: ["Infosys", "TCS", "Razorpay", "Zomato", "Remote Global"],
    skills: [
      { name: "HTML/CSS/JS", level: "Beginner", learnUrl: "https://www.freecodecamp.org", estimatedHours: 60 },
      { name: "React.js", level: "Intermediate", learnUrl: "https://react.dev/learn", estimatedHours: 80 },
      { name: "Node.js", level: "Intermediate", learnUrl: "https://nodejs.org/en/learn", estimatedHours: 60 },
      { name: "System Design", level: "Advanced", learnUrl: "https://www.educative.io/courses/grokking-the-system-design-interview", estimatedHours: 100 },
    ],
    roadmapSteps: [
      { id: "fs-1", phase: "Foundation", title: "HTML, CSS & JavaScript", description: "Build the visual layer. Master semantic HTML, Flexbox/Grid, and JavaScript ES6+.", duration: "2–3 months", skills: ["HTML5", "CSS3", "JavaScript", "Git"], salaryImpact: "+0% (prerequisite)", resources: [{ name: "The Odin Project", url: "https://www.theodinproject.com", type: "Course" }, { name: "freeCodeCamp", url: "https://www.freecodecamp.org", type: "Course" }] },
      { id: "fs-2", phase: "Frontend", title: "React & Modern Frontend", description: "Build dynamic UIs with React, state management, routing, and API calls.", duration: "3–4 months", skills: ["React", "TypeScript", "Next.js", "REST APIs"], salaryImpact: "+50% over baseline", resources: [{ name: "React Official Docs", url: "https://react.dev/learn", type: "Course" }, { name: "Josh Comeau CSS", url: "https://www.joshwcomeau.com/css/", type: "Book" }] },
      { id: "fs-3", phase: "Backend", title: "Node.js, Databases & APIs", description: "Build REST/GraphQL APIs, connect to SQL/NoSQL databases, authentication.", duration: "3–4 months", skills: ["Node.js", "Express", "PostgreSQL", "MongoDB"], salaryImpact: "+90% over baseline", resources: [{ name: "The Odin Project — Backend", url: "https://www.theodinproject.com/paths/full-stack-javascript", type: "Course" }, { name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com", type: "Course" }] },
      { id: "fs-4", phase: "Professional", title: "DevOps, Cloud & System Design", description: "CI/CD pipelines, cloud deployment, caching, load balancing. Interview-ready.", duration: "2–3 months", skills: ["AWS/GCP", "Docker", "Redis", "System Design"], salaryImpact: "+120% — Senior level", resources: [{ name: "System Design Interview", url: "https://www.educative.io/courses/grokking-the-system-design-interview", type: "Book" }, { name: "AWS Free Tier", url: "https://aws.amazon.com/free/", type: "Tool" }] },
    ],
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    domain: "tech",
    emoji: "🔐",
    tagline: "Protect digital assets from the invisible threat",
    description: "Identify, prevent, and respond to cyber threats and security breaches.",
    avgSalary2026: { entry: "₹6–10 LPA", mid: "₹15–30 LPA", senior: "₹40–80 LPA" },
    jobOutlook: "📈 35% growth — Critical national need with massive shortage",
    topCompanies: ["Wipro CyberSec", "KPMG", "Deloitte", "Palo Alto Networks", "Government"],
    skills: [
      { name: "Networking Basics", level: "Beginner", learnUrl: "https://www.coursera.org/learn/computer-networking", estimatedHours: 40 },
      { name: "Ethical Hacking", level: "Intermediate", learnUrl: "https://www.udemy.com/course/ethical-hacking-bootcamp/", estimatedHours: 80 },
      { name: "SOC Operations", level: "Intermediate", learnUrl: "https://www.cybrary.it/", estimatedHours: 60 },
      { name: "CISSP Certification", level: "Advanced", learnUrl: "https://www.isc2.org/certifications/cissp", estimatedHours: 150 },
    ],
    roadmapSteps: [
      { id: "cy-1", phase: "Foundation", title: "Networking & Linux Fundamentals", description: "TCP/IP, DNS, firewalls, Linux CLI — the operating system of the internet.", duration: "2 months", skills: ["Networking", "Linux", "CLI", "TCP/IP"], salaryImpact: "+0%", resources: [{ name: "CompTIA Network+", url: "https://www.comptia.org/certifications/network", type: "Certification" }] },
      { id: "cy-2", phase: "Core", title: "Ethical Hacking & Penetration Testing", description: "Learn how attackers think. Legally hack systems to find vulnerabilities.", duration: "4 months", skills: ["Kali Linux", "Metasploit", "Burp Suite", "OWASP"], salaryImpact: "+60%", resources: [{ name: "TryHackMe", url: "https://tryhackme.com", type: "Tool" }, { name: "CEH Certification", url: "https://www.eccouncil.org/ceh", type: "Certification" }] },
      { id: "cy-3", phase: "Professional", title: "SOC Analyst & Cloud Security", description: "Monitor, detect, and respond to incidents. Secure cloud infrastructure.", duration: "3 months", skills: ["SIEM", "Incident Response", "AWS Security", "CISSP"], salaryImpact: "+110%", resources: [{ name: "CISSP Study Guide", url: "https://www.isc2.org/certifications/cissp", type: "Certification" }, { name: "Cybrary SOC Analyst", url: "https://www.cybrary.it/", type: "Course" }] },
    ],
  },

  // ─── HEALTHCARE ─────────────────────────────────────────────────────────────
  {
    id: "hospital-management",
    title: "Hospital Administrator",
    domain: "healthcare",
    emoji: "🏥",
    tagline: "Lead the operational backbone of healthcare",
    description: "Manage hospital operations, staff, budgets, compliance and patient experience.",
    avgSalary2026: { entry: "₹4–7 LPA", mid: "₹10–20 LPA", senior: "₹25–50 LPA" },
    jobOutlook: "📈 22% growth — Healthcare expansion driving massive demand",
    topCompanies: ["Apollo Hospitals", "Fortis", "AIIMS", "Max Healthcare", "WHO NGOs"],
    skills: [
      { name: "Healthcare Management", level: "Beginner", learnUrl: "https://www.coursera.org/learn/healthcare-management", estimatedHours: 50 },
      { name: "Medical Billing & Coding", level: "Intermediate", learnUrl: "https://www.aapc.com/training/medical-coding-course.aspx", estimatedHours: 60 },
      { name: "Health Informatics", level: "Intermediate", learnUrl: "https://www.coursera.org/specializations/healthcare-informatics", estimatedHours: 80 },
      { name: "Healthcare Policy", level: "Advanced", learnUrl: "https://www.edx.org/learn/health-policy", estimatedHours: 40 },
    ],
    roadmapSteps: [
      { id: "hm-1", phase: "Foundation", title: "Healthcare Fundamentals & MBA", description: "Understand healthcare systems, hospital hierarchy, SOPs and medical terminology.", duration: "2–3 years (MBA)", skills: ["Management", "Healthcare Law", "Accounting", "HR"], salaryImpact: "+0%", resources: [{ name: "IIHMR Delhi", url: "https://www.iihmr.edu.in", type: "Course" }, { name: "Coursera Health Management", url: "https://www.coursera.org/learn/healthcare-management", type: "Course" }] },
      { id: "hm-2", phase: "Operations", title: "Hospital Operations & Quality", description: "NABH accreditation, JCI standards, patient safety protocols, waste management.", duration: "1–2 years", skills: ["NABH", "Quality Control", "SOPs", "Patient Safety"], salaryImpact: "+40%", resources: [{ name: "NABH Standards", url: "https://www.nabh.co/", type: "Tool" }, { name: "WHO Patient Safety", url: "https://www.who.int/teams/integrated-health-services/patient-safety", type: "Book" }] },
      { id: "hm-3", phase: "Leadership", title: "Strategic Leadership & Digital Health", description: "Lead departments, manage budgets, implement EHR systems and telemedicine.", duration: "2–3 years", skills: ["EHR Systems", "Telemedicine", "Budget Management", "Strategy"], salaryImpact: "+100%", resources: [{ name: "Health Informatics Specialization", url: "https://www.coursera.org/specializations/healthcare-informatics", type: "Certification" }] },
    ],
  },
  {
    id: "health-informatics",
    title: "Health Informatics Specialist",
    domain: "healthcare",
    emoji: "📊",
    tagline: "Where data science meets life-saving medicine",
    description: "Bridge technology and healthcare — manage EHR systems, analyze health data.",
    avgSalary2026: { entry: "₹6–10 LPA", mid: "₹14–25 LPA", senior: "₹30–55 LPA" },
    jobOutlook: "📈 30% growth — Digital transformation of hospitals globally",
    topCompanies: ["Epic Systems", "Cerner", "AIIMS Digital", "Narayana Health", "Practo"],
    skills: [
      { name: "EHR Systems", level: "Beginner", learnUrl: "https://www.coursera.org/specializations/healthcare-informatics", estimatedHours: 50 },
      { name: "Health Data Analytics", level: "Intermediate", learnUrl: "https://www.edx.org/learn/data-analytics", estimatedHours: 80 },
      { name: "HL7 / FHIR Standards", level: "Advanced", learnUrl: "https://www.hl7.org/fhir/", estimatedHours: 60 },
    ],
    roadmapSteps: [
      { id: "hi-1", phase: "Foundation", title: "Medical Terminology & IT Basics", description: "Healthcare vocabulary, basic IT, database concepts.", duration: "3 months", skills: ["Medical Terminology", "SQL", "Healthcare IT"], salaryImpact: "+0%", resources: [{ name: "Coursera Health Informatics", url: "https://www.coursera.org/specializations/healthcare-informatics", type: "Course" }] },
      { id: "hi-2", phase: "Core", title: "EHR Implementation & Data Analytics", description: "Epic/Cerner training, health data pipelines, HIPAA compliance.", duration: "6 months", skills: ["Epic/Cerner", "Data Analytics", "HIPAA", "Python"], salaryImpact: "+60%", resources: [{ name: "Epic Training", url: "https://www.epic.com/", type: "Tool" }] },
    ],
  },

  // ─── BUSINESS ───────────────────────────────────────────────────────────────
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    domain: "business",
    emoji: "📈",
    tagline: "Turn numbers into strategic decisions",
    description: "Analyse financial data, build models, and guide investment and business decisions.",
    avgSalary2026: { entry: "₹5–8 LPA", mid: "₹12–25 LPA", senior: "₹30–70 LPA" },
    jobOutlook: "📈 18% growth — Core role in every organization globally",
    topCompanies: ["JP Morgan", "Goldman Sachs", "HDFC Bank", "McKinsey", "Deloitte"],
    skills: [
      { name: "Excel & Financial Modeling", level: "Beginner", learnUrl: "https://www.corporatefinanceinstitute.com/courses/excel/", estimatedHours: 50 },
      { name: "Financial Statement Analysis", level: "Intermediate", learnUrl: "https://www.coursera.org/learn/financial-analysis", estimatedHours: 60 },
      { name: "CFA Prep", level: "Advanced", learnUrl: "https://www.cfainstitute.org", estimatedHours: 300 },
    ],
    roadmapSteps: [
      { id: "fa-1", phase: "Foundation", title: "Accounting & Excel Mastery", description: "Debit/credit, P&L statements, balance sheets, Excel for financial modeling.", duration: "2–3 months", skills: ["Accounting", "Excel", "Financial Statements"], salaryImpact: "+0%", resources: [{ name: "CFI Excel Course", url: "https://www.corporatefinanceinstitute.com/courses/excel/", type: "Course" }, { name: "AccountingCoach", url: "https://www.accountingcoach.com", type: "Book" }] },
      { id: "fa-2", phase: "Core", title: "Valuation & Financial Modeling", description: "DCF, comparable analysis, LBO. Build real company models from scratch.", duration: "4–5 months", skills: ["DCF Valuation", "LBO", "Comparable Analysis", "PowerPoint Decks"], salaryImpact: "+50%", resources: [{ name: "Breaking Into Wall Street", url: "https://breakingintowallstreet.com", type: "Course" }, { name: "CFI FMVA", url: "https://www.corporatefinanceinstitute.com/certifications/fmva/", type: "Certification" }] },
      { id: "fa-3", phase: "Advanced", title: "CFA & Investment Banking", description: "CFA Level 1, equity research, M&A basics, portfolio management.", duration: "6–12 months", skills: ["CFA", "Equity Research", "M&A", "Portfolio Management"], salaryImpact: "+130%", resources: [{ name: "CFA Institute", url: "https://www.cfainstitute.org", type: "Certification" }, { name: "Investopedia Academy", url: "https://www.investopedia.com/investopedia-academy-4506498.asp", type: "Course" }] },
    ],
  },
  {
    id: "digital-marketing-manager",
    title: "Digital Marketing Manager",
    domain: "business",
    emoji: "📣",
    tagline: "Scale brands with data-driven creativity",
    description: "Lead digital campaigns across SEO, social media, paid ads, and content marketing.",
    avgSalary2026: { entry: "₹3–6 LPA", mid: "₹10–20 LPA", senior: "₹25–50 LPA" },
    jobOutlook: "📈 32% growth — Every business needs digital presence",
    topCompanies: ["WPP", "Dentsu", "Byju's", "Nykaa", "Startup ecosystem"],
    skills: [
      { name: "SEO & Content", level: "Beginner", learnUrl: "https://ahrefs.com/seo", estimatedHours: 40 },
      { name: "Google Ads & Meta Ads", level: "Intermediate", learnUrl: "https://skillshop.withgoogle.com", estimatedHours: 60 },
      { name: "Analytics & Conversion", level: "Intermediate", learnUrl: "https://analytics.google.com/analytics/academy/", estimatedHours: 40 },
      { name: "Marketing Automation", level: "Advanced", learnUrl: "https://academy.hubspot.com", estimatedHours: 50 },
    ],
    roadmapSteps: [
      { id: "dm-1", phase: "Foundation", title: "Digital Marketing Fundamentals", description: "SEO, content marketing, email, social media basics. The digital toolkit.", duration: "2–3 months", skills: ["SEO", "Content Marketing", "Email Marketing", "Social Media"], salaryImpact: "+0%", resources: [{ name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage", type: "Certification" }, { name: "HubSpot Academy", url: "https://academy.hubspot.com", type: "Certification" }] },
      { id: "dm-2", phase: "Core", title: "Paid Ads & Analytics", description: "Run Google, Meta, and LinkedIn campaigns. Measure ROI with GA4.", duration: "3–4 months", skills: ["Google Ads", "Meta Ads", "GA4", "A/B Testing"], salaryImpact: "+60%", resources: [{ name: "Google Skillshop", url: "https://skillshop.withgoogle.com", type: "Certification" }, { name: "Meta Blueprint", url: "https://www.facebook.com/business/learn", type: "Certification" }] },
      { id: "dm-3", phase: "Leadership", title: "Growth Hacking & Team Leadership", description: "Budget management, funnel optimization, automation, leading creative teams.", duration: "Ongoing", skills: ["Marketing Automation", "CRO", "Brand Strategy", "HubSpot"], salaryImpact: "+120%", resources: [{ name: "CXL Institute", url: "https://cxl.com/", type: "Course" }] },
    ],
  },
  {
    id: "fintech-analyst",
    title: "Fintech Analyst",
    domain: "business",
    emoji: "💳",
    tagline: "Reshape the future of money with code and finance",
    description: "Work at the intersection of finance and technology — payments, lending, blockchain.",
    avgSalary2026: { entry: "₹7–12 LPA", mid: "₹18–35 LPA", senior: "₹40–80 LPA" },
    jobOutlook: "📈 45% growth — India's Fintech sector is a global leader",
    topCompanies: ["Razorpay", "Paytm", "CRED", "PhonePe", "Groww"],
    skills: [
      { name: "Finance Fundamentals", level: "Beginner", learnUrl: "https://www.coursera.org/learn/financial-markets-global", estimatedHours: 40 },
      { name: "Python for Finance", level: "Intermediate", learnUrl: "https://www.udemy.com/course/python-for-finance-investment-fundamentals-data-analytics/", estimatedHours: 60 },
      { name: "Blockchain & DeFi", level: "Advanced", learnUrl: "https://www.coursera.org/learn/cryptocurrency", estimatedHours: 80 },
    ],
    roadmapSteps: [
      { id: "ft-1", phase: "Foundation", title: "Finance + Technology Basics", description: "Banking systems, payment rails, SQL, Python basics for financial data.", duration: "3 months", skills: ["Finance", "Python", "SQL", "Payment Systems"], salaryImpact: "+0%", resources: [{ name: "MIT OpenCourseWare Finance", url: "https://ocw.mit.edu/courses/finance/", type: "Course" }] },
      { id: "ft-2", phase: "Core", title: "Fintech Products & Regulation", description: "UPI, NBFC regulations, lending algorithms, risk modeling.", duration: "4 months", skills: ["UPI/Payments", "Risk Modeling", "RegTech", "API Integration"], salaryImpact: "+70%", resources: [{ name: "NPCI Learning", url: "https://www.npci.org.in/", type: "Tool" }] },
      { id: "ft-3", phase: "Advanced", title: "Blockchain, DeFi & Advanced Analytics", description: "Smart contracts, DeFi protocols, ML for credit scoring.", duration: "4 months", skills: ["Solidity", "DeFi", "Credit Scoring ML", "Blockchain"], salaryImpact: "+130%", resources: [{ name: "Coursera Cryptocurrency", url: "https://www.coursera.org/learn/cryptocurrency", type: "Course" }] },
    ],
  },

  // ─── CREATIVE ───────────────────────────────────────────────────────────────
  {
    id: "ux-designer",
    title: "UX Designer",
    domain: "creative",
    emoji: "🎨",
    tagline: "Design experiences humans fall in love with",
    description: "Research user behaviour and design intuitive, beautiful digital interfaces.",
    avgSalary2026: { entry: "₹5–8 LPA", mid: "₹14–28 LPA", senior: "₹35–65 LPA" },
    jobOutlook: "📈 28% growth — UX is a boardroom priority globally",
    topCompanies: ["Google", "Apple", "InMobi", "Flipkart", "Any tech startup"],
    skills: [
      { name: "Figma", level: "Beginner", learnUrl: "https://www.figma.com/resources/learn-design/", estimatedHours: 40 },
      { name: "User Research", level: "Intermediate", learnUrl: "https://www.nngroup.com/courses/", estimatedHours: 60 },
      { name: "Design Systems", level: "Advanced", learnUrl: "https://www.designbetter.co/", estimatedHours: 80 },
    ],
    roadmapSteps: [
      { id: "ux-1", phase: "Foundation", title: "Design Principles & Figma", description: "Visual design, color theory, typography, Figma from scratch.", duration: "2–3 months", skills: ["Figma", "Color Theory", "Typography", "Layout"], salaryImpact: "+0%", resources: [{ name: "Google UX Design Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design", type: "Certification" }, { name: "Figma Tutorials", url: "https://www.figma.com/resources/learn-design/", type: "Course" }] },
      { id: "ux-2", phase: "Core", title: "User Research & Interaction Design", description: "Personas, user journeys, wireframing, prototyping, usability testing.", duration: "3–4 months", skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"], salaryImpact: "+60%", resources: [{ name: "Nielsen Norman Group", url: "https://www.nngroup.com/courses/", type: "Course" }, { name: "Interaction Design Foundation", url: "https://www.interaction-design.org", type: "Certification" }] },
      { id: "ux-3", phase: "Professional", title: "Design Systems & Portfolio", description: "Build scalable design systems, master Accessibility (WCAG), launch a killer portfolio.", duration: "2–3 months", skills: ["Design Systems", "Accessibility", "Portfolio", "Zeroheight"], salaryImpact: "+120%", resources: [{ name: "Design Better by InVision", url: "https://www.designbetter.co/", type: "Book" }] },
    ],
  },
  {
    id: "fine-arts-illustrator",
    title: "Fine Arts & Illustration",
    domain: "creative",
    emoji: "🖌️",
    tagline: "Turn imagination into art that moves the world",
    description: "Create visual art for galleries, publishing, animation studios, and brands.",
    avgSalary2026: { entry: "₹2.5–5 LPA", mid: "₹8–18 LPA", senior: "₹20–50 LPA + Royalties" },
    jobOutlook: "📈 Freelance revolution — Artists earning 5x through digital + traditional",
    topCompanies: ["Disney India", "Penguin Books", "Prasoon Pandey Studios", "Netflix Originals"],
    skills: [
      { name: "Drawing & Composition", level: "Beginner", learnUrl: "https://www.proko.com", estimatedHours: 100 },
      { name: "Digital Art (Procreate/Photoshop)", level: "Intermediate", learnUrl: "https://www.skillshare.com/browse/illustration", estimatedHours: 80 },
      { name: "Brand Illustration", level: "Advanced", learnUrl: "https://www.domestika.org/en/courses/illustration", estimatedHours: 60 },
    ],
    roadmapSteps: [
      { id: "art-1", phase: "Foundation", title: "Fundamentals of Drawing & Color", description: "Gesture, anatomy, perspective, color theory. The non-negotiable core.", duration: "3–6 months", skills: ["Drawing", "Anatomy", "Color Theory", "Perspective"], salaryImpact: "+0%", resources: [{ name: "Proko Figure Drawing", url: "https://www.proko.com", type: "Course" }, { name: "Color and Light: A Guide", url: "https://www.amazon.in/Color-Light-Realists-Fantasists-Gurney/dp/0740797719", type: "Book" }] },
      { id: "art-2", phase: "Digital", title: "Digital Art & Illustration Tools", description: "Procreate, Photoshop/Illustrator, digital painting, vector art.", duration: "3–4 months", skills: ["Procreate", "Adobe Illustrator", "Photoshop", "Digital Painting"], salaryImpact: "+80%", resources: [{ name: "Skillshare Illustration", url: "https://www.skillshare.com/browse/illustration", type: "Course" }, { name: "Domestika Illustration", url: "https://www.domestika.org/en/courses/illustration", type: "Course" }] },
      { id: "art-3", phase: "Professional", title: "Portfolio, Freelancing & Brand Deals", description: "Build ArtStation/Behance portfolio, pitch to publishers, price your work.", duration: "Ongoing", skills: ["Portfolio", "Behance", "Client Communication", "NFT/Licensing"], salaryImpact: "+150%+", resources: [{ name: "ArtStation Learning", url: "https://www.artstation.com/learning", type: "Course" }, { name: "Behance Portfolio", url: "https://www.behance.net", type: "Tool" }] },
    ],
  },
];

// Domain metadata
export const DOMAIN_META = {
  tech: { label: "Engineering & Tech", color: "#8B5CF6", glow: "rgba(139,92,246,0.3)", emoji: "⚡" },
  healthcare: { label: "Healthcare & Medicine", color: "#10B981", glow: "rgba(16,185,129,0.3)", emoji: "🏥" },
  business: { label: "Business & Finance", color: "#F59E0B", glow: "rgba(245,158,11,0.3)", emoji: "📊" },
  creative: { label: "Creative & Arts", color: "#EC4899", glow: "rgba(236,72,153,0.3)", emoji: "🎨" },
};

export const CAREERS_BY_ID = Object.fromEntries(CAREERS.map(c => [c.id, c]));
export const CAREERS_BY_DOMAIN = (domain: Domain) => CAREERS.filter(c => c.domain === domain);
