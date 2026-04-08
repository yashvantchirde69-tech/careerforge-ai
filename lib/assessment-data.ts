// ─── Assessment Data — 3 Tier System ────────────────────────────────────────

import type { Domain } from "./careers";

// ─── Level 1: Psychometric Test ─────────────────────────────────────────────

export interface PsychoQuestion {
  id: number;
  question: string;
  category: string;
  options: {
    text: string;
    scores: Partial<Record<Domain, number>>;
  }[];
}

export const PSYCHO_QUESTIONS: PsychoQuestion[] = [
  {
    id: 1,
    question: "When you encounter a complex problem, what's your first instinct?",
    category: "Problem Solving",
    options: [
      { text: "Break it down into logical, data-driven steps", scores: { tech: 3, business: 1 } },
      { text: "Consider how it affects people around you", scores: { healthcare: 3, creative: 1 } },
      { text: "Think about the financial or strategic impact", scores: { business: 3, tech: 1 } },
      { text: "Imagine creative, out-of-the-box solutions", scores: { creative: 3, tech: 1 } },
    ],
  },
  {
    id: 2,
    question: "Which activity would you find most fulfilling on a Saturday?",
    category: "Passion & Interest",
    options: [
      { text: "Building a small app or automating a task", scores: { tech: 3 } },
      { text: "Volunteering at a hospital or community health camp", scores: { healthcare: 3 } },
      { text: "Reading about market trends or making investments", scores: { business: 3 } },
      { text: "Painting, music, writing, or any creative pursuit", scores: { creative: 3 } },
    ],
  },
  {
    id: 3,
    question: "In a group project, which role do you naturally drift toward?",
    category: "Work Style",
    options: [
      { text: "The technical expert who builds the solution", scores: { tech: 3 } },
      { text: "The caregiver who ensures team wellbeing and coordination", scores: { healthcare: 2, business: 1 } },
      { text: "The leader who manages timelines and resources", scores: { business: 3 } },
      { text: "The creative who designs visuals and storytelling", scores: { creative: 3 } },
    ],
  },
  {
    id: 4,
    question: "How do you feel about working with large amounts of data?",
    category: "Data Orientation",
    options: [
      { text: "Love it — patterns in data excite me", scores: { tech: 3, business: 1 } },
      { text: "I prefer patient data and health records", scores: { healthcare: 2 } },
      { text: "Financial data and market trends are interesting", scores: { business: 3 } },
      { text: "I find raw data boring — I prefer visual storytelling", scores: { creative: 3 } },
    ],
  },
  {
    id: 5,
    question: "Pick the environment you'd most love to work in:",
    category: "Work Environment",
    options: [
      { text: "A cutting-edge tech lab or startup", scores: { tech: 3 } },
      { text: "A hospital, clinic, or wellness center", scores: { healthcare: 3 } },
      { text: "A corporate office or financial firm", scores: { business: 3 } },
      { text: "A creative studio, gallery, or agency", scores: { creative: 3 } },
    ],
  },
  {
    id: 6,
    question: "A friend is in trouble. What's your approach?",
    category: "Empathy & Logic",
    options: [
      { text: "Analyze the situation and find an optimal solution", scores: { tech: 2, business: 1 } },
      { text: "Listen deeply, empathize, and provide emotional support", scores: { healthcare: 3 } },
      { text: "Create a plan with clear action steps and deadlines", scores: { business: 2, tech: 1 } },
      { text: "Help through art, music or storytelling to lift spirits", scores: { creative: 3 } },
    ],
  },
  {
    id: 7,
    question: "What kind of impact do you want to make?",
    category: "Impact",
    options: [
      { text: "Build technology that automates millions of tasks", scores: { tech: 3 } },
      { text: "Directly save lives and improve human health", scores: { healthcare: 3 } },
      { text: "Create wealth, drive economic growth and opportunity", scores: { business: 3 } },
      { text: "Create art that inspires and moves people forever", scores: { creative: 3 } },
    ],
  },
  {
    id: 8,
    question: "Your ideal work reward is:",
    category: "Motivation",
    options: [
      { text: "Solving an impossible technical challenge", scores: { tech: 3 } },
      { text: "Hearing 'you saved my life' from a patient", scores: { healthcare: 3 } },
      { text: "Closing a massive deal or hitting revenue targets", scores: { business: 3 } },
      { text: "Seeing your creative work displayed publicly", scores: { creative: 3 } },
    ],
  },
  {
    id: 9,
    question: "How comfortable are you with learning mathematics?",
    category: "Math Aptitude",
    options: [
      { text: "Very comfortable — I love math and algorithms", scores: { tech: 3 } },
      { text: "Basic medical stats are fine, but not advanced math", scores: { healthcare: 2 } },
      { text: "I enjoy financial math, statistics and economics", scores: { business: 3 } },
      { text: "I prefer visual or spatial thinking over numbers", scores: { creative: 2 } },
    ],
  },
  {
    id: 10,
    question: "Which school subject did you enjoy most?",
    category: "Academic Interest",
    options: [
      { text: "Physics, Maths, Computer Science", scores: { tech: 3 } },
      { text: "Biology, Chemistry, Home Science", scores: { healthcare: 3 } },
      { text: "Economics, Business Studies, Accountancy", scores: { business: 3 } },
      { text: "Art, Music, Literature, Physical Education", scores: { creative: 3 } },
    ],
  },
  {
    id: 11,
    question: "How do you prefer to communicate your ideas?",
    category: "Communication",
    options: [
      { text: "Through code, diagrams and technical documentation", scores: { tech: 3 } },
      { text: "Through patient conversations and clinical reports", scores: { healthcare: 2 } },
      { text: "Through presentations, pitch decks and reports", scores: { business: 3 } },
      { text: "Through visuals, sketches, performances or writing", scores: { creative: 3 } },
    ],
  },
  {
    id: 12,
    question: "What excites you most about the future?",
    category: "Future Orientation",
    options: [
      { text: "AI, robotics, quantum computing and the metaverse", scores: { tech: 3 } },
      { text: "Precision medicine, gene therapy and mental health breakthroughs", scores: { healthcare: 3 } },
      { text: "Fintech disruption, ESG investing and global markets", scores: { business: 3 } },
      { text: "Immersive experiences, AR/VR art and the creator economy", scores: { creative: 3 } },
    ],
  },
  {
    id: 13,
    question: "You just received ₹5 lakhs unexpectedly. What do you do?",
    category: "Financial Mindset",
    options: [
      { text: "Build a side project or buy tech gear/courses", scores: { tech: 2 } },
      { text: "Invest it wisely and create multiple savings accounts", scores: { business: 3, healthcare: 1 } },
      { text: "Donate to charity or fund a community health initiative", scores: { healthcare: 2 } },
      { text: "Fund your next creative project or art exhibition", scores: { creative: 3 } },
    ],
  },
  {
    id: 14,
    question: "Which describes your ideal daily work rhythm?",
    category: "Work Rhythm",
    options: [
      { text: "Deep focus coding sessions — 8 hours in the zone", scores: { tech: 3 } },
      { text: "Patient rounds, consultations, shift-based structure", scores: { healthcare: 3 } },
      { text: "Meetings, strategy calls, Excel models, client pitches", scores: { business: 3 } },
      { text: "Open-ended, flexible creative sessions with deadlines", scores: { creative: 3 } },
    ],
  },
  {
    id: 15,
    question: "When you see a beautifully designed product, what catches your eye first?",
    category: "Aesthetic Sense",
    options: [
      { text: "The technical engineering behind it", scores: { tech: 3 } },
      { text: "How ergonomically safe and user-friendly it is", scores: { healthcare: 2, creative: 1 } },
      { text: "Its market positioning and price point", scores: { business: 3 } },
      { text: "Its colors, form, texture and visual storytelling", scores: { creative: 3 } },
    ],
  },
  {
    id: 16,
    question: "How do you handle uncertainty and ambiguity?",
    category: "Adaptability",
    options: [
      { text: "Build a prototype to test and iterate fast", scores: { tech: 3 } },
      { text: "Follow established clinical guidelines and protocols", scores: { healthcare: 3 } },
      { text: "Analyze data and make a calculated risk decision", scores: { business: 3 } },
      { text: "Embrace it — uncertainty is where creativity lives", scores: { creative: 3 } },
    ],
  },
  {
    id: 17,
    question: "What kind of stories inspire you most?",
    category: "Inspiration",
    options: [
      { text: "Elon Musk, Jeff Dean — tech visionaries changing the world", scores: { tech: 3 } },
      { text: "Dr. Sanjay Gupta, Florence Nightingale — healing heroes", scores: { healthcare: 3 } },
      { text: "Warren Buffett, Ratan Tata — business legends", scores: { business: 3 } },
      { text: "Picasso, A.R. Rahman, Satyajit Ray — creative geniuses", scores: { creative: 3 } },
    ],
  },
  {
    id: 18,
    question: "Which skill would you most like to master in 5 years?",
    category: "Skill Ambition",
    options: [
      { text: "Build and deploy production-grade AI systems", scores: { tech: 3 } },
      { text: "Diagnose rare diseases or manage a hospital", scores: { healthcare: 3 } },
      { text: "Run a successful business or manage a ₹100Cr portfolio", scores: { business: 3 } },
      { text: "Create a globally recognized artistic work or brand", scores: { creative: 3 } },
    ],
  },
  {
    id: 19,
    question: "How important is social interaction to your work?",
    category: "Social Preference",
    options: [
      { text: "I prefer working independently or in small technical teams", scores: { tech: 2 } },
      { text: "Constant human interaction is essential — I thrive with people", scores: { healthcare: 3 } },
      { text: "I enjoy high-stakes negotiations and client relationships", scores: { business: 3 } },
      { text: "I love collaborating creatively with diverse people", scores: { creative: 2 } },
    ],
  },
  {
    id: 20,
    question: "If you could fix one problem in the world, it would be:",
    category: "Values",
    options: [
      { text: "The digital divide — everyone deserves access to technology", scores: { tech: 3 } },
      { text: "Healthcare inequality — no one should suffer without medicine", scores: { healthcare: 3 } },
      { text: "Financial poverty — create economic opportunity for all", scores: { business: 3 } },
      { text: "Loss of culture — preserve art, heritage and human expression", scores: { creative: 3 } },
    ],
  },
];

// ─── Level 2: Domain Technical Quizzes ──────────────────────────────────────

export interface TechQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export const TECH_QUIZZES: Record<Domain, TechQuestion[]> = {
  tech: [
    { id: 1, question: "What does 'ML' stand for in the context of AI?", options: ["Machine Logic", "Machine Learning", "Model Layer", "Meta Language"], correctIndex: 1, explanation: "Machine Learning is a subset of AI where systems learn patterns from data without being explicitly programmed.", topic: "AI/ML Basics" },
    { id: 2, question: "Which data structure is used to implement a 'Last In, First Out' (LIFO) system?", options: ["Queue", "Array", "Stack", "Linked List"], correctIndex: 2, explanation: "A Stack follows LIFO — the last element pushed is the first to be popped, like a stack of plates.", topic: "Data Structures" },
    { id: 3, question: "What does 'API' stand for?", options: ["Application Program Interface", "Automated Protocol Integration", "Application Programming Interface", "Advanced Protocol Interface"], correctIndex: 2, explanation: "APIs allow software applications to communicate. REST APIs are the backbone of modern web services.", topic: "Web Development" },
    { id: 4, question: "In Python, what does the 'len()' function do?", options: ["Returns the last element", "Returns the length/size of an object", "Deletes the last element", "Sorts the list"], correctIndex: 1, explanation: "len() returns the number of items in a list, string, dictionary, etc.", topic: "Python" },
    { id: 5, question: "What is 'Big O Notation' used for?", options: ["Measuring code readability", "Describing algorithm time/space complexity", "Naming variables", "Database queries"], correctIndex: 1, explanation: "Big O notation describes how an algorithm's performance scales with input size. O(n²) is slower than O(n log n).", topic: "Algorithms" },
    { id: 6, question: "Which of these is NOT a type of Machine Learning?", options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Instructed Learning"], correctIndex: 3, explanation: "The three main ML types are Supervised, Unsupervised, and Reinforcement Learning. 'Instructed Learning' is not a recognized ML paradigm.", topic: "AI/ML Basics" },
    { id: 7, question: "What does 'SQL' stand for?", options: ["Standard Query Language", "Structured Query Language", "Simple Query Logic", "System Query Layer"], correctIndex: 1, explanation: "SQL (Structured Query Language) is the standard language for managing relational databases.", topic: "Databases" },
    { id: 8, question: "In web development, what does 'CSS' primarily control?", options: ["Server-side logic", "Database queries", "Visual styling and layout", "User authentication"], correctIndex: 2, explanation: "CSS (Cascading Style Sheets) controls the visual presentation — colors, fonts, spacing, animations.", topic: "Web Development" },
    { id: 9, question: "What is a 'neural network' inspired by?", options: ["Computer circuits", "The human brain's structure", "Mathematical equations", "Network protocols"], correctIndex: 1, explanation: "Neural networks are loosely inspired by the structure of biological brains — interconnected neurons passing signals.", topic: "Deep Learning" },
    { id: 10, question: "What does 'version control' with Git allow you to do?", options: ["Style code prettier", "Track changes and collaborate without conflicts", "Run code faster", "Connect to APIs"], correctIndex: 1, explanation: "Git tracks every change to code, enables teamwork, and lets you roll back to any previous version.", topic: "Developer Tools" },
    { id: 11, question: "What is 'cloud computing'?", options: ["Computing done in foggy weather", "Using internet-based remote servers to store/process data", "Local computer processing", "A type of encryption"], correctIndex: 1, explanation: "Cloud computing delivers computing services (servers, storage, databases, AI) over the internet — examples: AWS, Azure, GCP.", topic: "Cloud" },
    { id: 12, question: "What is the purpose of a 'for loop'?", options: ["Define variables", "Repeat a block of code multiple times", "Write conditions", "Connect to databases"], correctIndex: 1, explanation: "A for loop iterates over a sequence, executing the code block for each item — fundamental to automation.", topic: "Programming" },
    { id: 13, question: "What does 'HTTP' stand for?", options: ["Hyper Text Transfer Protocol", "High Transfer Text Process", "HyperText Terminal Program", "Hosted Text Transfer Protocol"], correctIndex: 0, explanation: "HTTP is the foundation of data communication on the web. HTTPS adds encryption (TLS/SSL) for security.", topic: "Networking" },
    { id: 14, question: "Which algorithm is commonly used to find the shortest path in a graph?", options: ["Bubble Sort", "Binary Search", "Dijkstra's Algorithm", "Merge Sort"], correctIndex: 2, explanation: "Dijkstra's algorithm efficiently finds the shortest path between nodes in a weighted graph — used in GPS navigation.", topic: "Algorithms" },
    { id: 15, question: "What is 'open source' software?", options: ["Paid software with visible source", "Free software whose source code is publicly available", "Government-owned software", "Beta testing software"], correctIndex: 1, explanation: "Open source software has publicly available code — anyone can view, modify, and distribute it. Examples: Linux, Python, React.", topic: "Software Engineering" },
  ],
  healthcare: [
    { id: 1, question: "What does 'BMI' stand for?", options: ["Basic Medical Index", "Body Mass Index", "Blood Mineral Indicator", "Basal Metabolic Index"], correctIndex: 1, explanation: "BMI (Body Mass Index) is calculated as weight (kg) ÷ height² (m²). It's a screening tool for weight-related health issues.", topic: "Clinical Basics" },
    { id: 2, question: "What is the primary function of red blood cells?", options: ["Fight infections", "Carry oxygen throughout the body", "Produce antibodies", "Regulate blood pressure"], correctIndex: 1, explanation: "Red blood cells (erythrocytes) carry oxygen from lungs to body tissues via hemoglobin protein.", topic: "Anatomy & Physiology" },
    { id: 3, question: "What is 'NABH' in the context of Indian healthcare?", options: ["National Authority for Blood and Health", "National Accreditation Board for Hospitals", "National Agency for Better Healthcare", "None of the above"], correctIndex: 1, explanation: "NABH accreditation is the gold standard for hospital quality in India, covering patient safety, clinical standards, and infrastructure.", topic: "Hospital Management" },
    { id: 4, question: "What does an ECG measure?", options: ["Brain activity", "Blood glucose levels", "Electrical activity of the heart", "Lung capacity"], correctIndex: 2, explanation: "An ECG (Electrocardiogram) records the heart's electrical signals to detect arrhythmias, heart attacks, and other conditions.", topic: "Diagnostics" },
    { id: 5, question: "What is 'triage' in emergency medicine?", options: ["A surgical procedure", "Sorting patients by urgency of treatment", "A billing process", "A type of medication"], correctIndex: 1, explanation: "Triage prioritizes patients based on severity — critical patients are treated first to maximize survival outcomes.", topic: "Emergency Medicine" },
    { id: 6, question: "Which vitamin is primarily produced when skin is exposed to sunlight?", options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], correctIndex: 3, explanation: "Vitamin D is synthesized by the skin upon UV exposure. Deficiency is extremely common in India and linked to many diseases.", topic: "Nutrition" },
    { id: 7, question: "What does 'EHR' stand for?", options: ["Electronic Health Records", "Emergency Health Reporting", "Enhanced Health Registry", "Extended Health Research"], correctIndex: 0, explanation: "EHR systems digitize patient records, enabling better data sharing, diagnosis support, and care coordination.", topic: "Health Informatics" },
    { id: 8, question: "What is the normal resting heart rate for adults?", options: ["40–50 bpm", "60–100 bpm", "100–120 bpm", "120–140 bpm"], correctIndex: 1, explanation: "60–100 BPM is normal at rest. Athletes may have lower rates. Above 100 is tachycardia, below 60 is bradycardia.", topic: "Clinical Basics" },
    { id: 9, question: "What does 'ICU' stand for?", options: ["Internal Care Unit", "Intensive Care Unit", "Intermediate Clinical Unit", "Inpatient Care Unit"], correctIndex: 1, explanation: "The ICU provides specialized monitoring and life support for critically ill patients requiring intensive medical attention.", topic: "Hospital Operations" },
    { id: 10, question: "Which organization sets global health standards?", options: ["UNICEF", "WHO", "UNESCO", "IMF"], correctIndex: 1, explanation: "WHO (World Health Organization) is the UN agency coordinating international public health — it sets standards, monitors outbreaks, and funds global health initiatives.", topic: "Public Health" },
    { id: 11, question: "What is 'informed consent' in healthcare?", options: ["A legal contract for payment", "Patient's right to understand and agree to treatment", "A diagnosis confirmation form", "Insurance pre-authorization"], correctIndex: 1, explanation: "Informed consent ensures patients understand their treatment, risks, and alternatives. It's both an ethical and legal requirement.", topic: "Medical Ethics" },
    { id: 12, question: "What is the main function of the liver?", options: ["Pumping blood", "Producing insulin", "Detoxifying blood and producing bile", "Gas exchange"], correctIndex: 2, explanation: "The liver performs 500+ functions including detoxification, protein synthesis, bile production, and glucose regulation.", topic: "Anatomy & Physiology" },
    { id: 13, question: "What does 'OPD' stand for in hospitals?", options: ["Outpatient Department", "Operation Planning Division", "Overall Patient Data", "Overnight Patient Discharge"], correctIndex: 0, explanation: "OPD (Outpatient Department) handles patients who don't require hospital admission — the most patient-dense area of a hospital.", topic: "Hospital Operations" },
    { id: 14, question: "What is 'herd immunity'?", options: ["Animals developing immunity", "Vaccination of livestock", "When enough people have immunity to slow disease spread", "Immunity in rural communities"], correctIndex: 2, explanation: "Herd immunity occurs when a large portion of a population is immune, protecting those who can't be vaccinated (e.g., newborns).", topic: "Public Health" },
    { id: 15, question: "Which hormone regulates blood sugar levels?", options: ["Adrenaline", "Cortisol", "Insulin", "Thyroxine"], correctIndex: 2, explanation: "Insulin (produced by pancreatic beta cells) allows cells to absorb glucose. Diabetes occurs when this mechanism fails.", topic: "Endocrinology" },
  ],
  business: [
    { id: 1, question: "What does 'ROI' stand for?", options: ["Return on Investment", "Rate of Interest", "Revenue on Income", "Risk of Inflation"], correctIndex: 0, explanation: "ROI = (Net Profit ÷ Cost of Investment) × 100. It measures how efficiently an investment generates returns.", topic: "Finance" },
    { id: 2, question: "What is a 'Balance Sheet'?", options: ["A sales report", "A snapshot of assets, liabilities and equity at a point in time", "An income statement", "A cash flow record"], correctIndex: 1, explanation: "The balance sheet follows: Assets = Liabilities + Equity. It shows what a company owns and owes.", topic: "Accounting" },
    { id: 3, question: "What does 'SEO' primarily help a business achieve?", options: ["Faster payment processing", "Higher search engine rankings to drive organic traffic", "Better HR policies", "Improved cash flow"], correctIndex: 1, explanation: "SEO (Search Engine Optimization) improves website visibility on Google, driving free organic traffic — a key digital marketing pillar.", topic: "Marketing" },
    { id: 4, question: "In business, what is a 'USP'?", options: ["Universal Standard Protocol", "Unique Selling Proposition", "Unified Sales Platform", "Upfront Subscription Payment"], correctIndex: 1, explanation: "USP is what makes your product/service uniquely better than competitors — the core reason customers choose you.", topic: "Strategy" },
    { id: 5, question: "What is 'compounding' in finance?", options: ["Adding interest only to principal", "Earning interest on both principal AND accumulated interest", "A fixed rate of return", "A type of stock"], correctIndex: 1, explanation: "Compounding is the 8th wonder of the world (Einstein). Your money grows exponentially because interest earns interest.", topic: "Finance" },
    { id: 6, question: "What does 'B2B' mean?", options: ["Business to Bank", "Business to Business", "Brand to Buyer", "Budget to Budget"], correctIndex: 1, explanation: "B2B means companies sell to other companies (e.g., Salesforce, Tata Steel). B2C means selling directly to consumers.", topic: "Business Models" },
    { id: 7, question: "What is 'market capitalization'?", options: ["The physical office size of a company", "Total market value of a company's outstanding shares", "Annual revenue", "Net profit after taxes"], correctIndex: 1, explanation: "Market Cap = Share Price × Total Shares Outstanding. It categorizes companies as small-cap, mid-cap, or large-cap.", topic: "Stock Market" },
    { id: 8, question: "What is a SWOT analysis?", options: ["Sales, Workforce, Operations, Technology", "Strengths, Weaknesses, Opportunities, Threats", "Strategy, Work, Order, Target", "Supply, Workflow, Operations, Trends"], correctIndex: 1, explanation: "SWOT is a strategic planning framework analyzing internal (Strengths/Weaknesses) and external (Opportunities/Threats) factors.", topic: "Strategy" },
    { id: 9, question: "What does 'venture capital' primarily fund?", options: ["Government projects", "Real estate", "Early-stage high-growth startups with equity exchange", "Personal loans"], correctIndex: 2, explanation: "VCs invest in startups in exchange for equity, betting on exponential growth. Examples: Sequoia, Tiger Global investing in Flipkart, Ola.", topic: "Funding" },
    { id: 10, question: "What is 'inflation'?", options: ["Decrease in money supply", "The rate at which prices rise and purchasing power falls", "Increase in GDP", "Stock market growth"], correctIndex: 1, explanation: "Inflation erodes purchasing power. At 6% inflation, ₹100 today is worth ₹94 next year. RBI manages this through interest rates.", topic: "Economics" },
    { id: 11, question: "What does 'P&L' stand for in business?", options: ["Planning and Logistics", "Profit and Loss", "Products and Licensing", "Pay and Leave"], correctIndex: 1, explanation: "P&L (Profit & Loss Statement) shows revenues, costs, and profitability over a period — the most important financial statement.", topic: "Accounting" },
    { id: 12, question: "What is a 'startup'?", options: ["Any new business", "A scalable, technology-driven business designed for rapid growth", "A business under 5 years old", "A business with no profit"], correctIndex: 1, explanation: "Startups specifically aim to scale rapidly with technology. They differ from small businesses in their exponential growth potential.", topic: "Entrepreneurship" },
    { id: 13, question: "What is 'liquidity' in finance?", options: ["Cash kept in banks", "How quickly an asset can be converted to cash without losing value", "Water-based investments", "Dividend payments"], correctIndex: 1, explanation: "Cash is the most liquid asset. Real estate is illiquid. Liquidity matters during crises when you need funds fast.", topic: "Finance" },
    { id: 14, question: "What does 'KPI' stand for?", options: ["Key Performance Indicator", "Known Profit Index", "Key Process Integration", "Knowledge Point Initiative"], correctIndex: 0, explanation: "KPIs measure how well an individual, team, or company is achieving objectives. Good KPIs are SMART: Specific, Measurable, Achievable, Relevant, Time-bound.", topic: "Management" },
    { id: 15, question: "What is 'digital marketing' primarily?", options: ["Marketing using printed digital materials", "Promoting products/services through digital channels (internet, mobile, social)", "A type of TV advertising", "Email-only marketing"], correctIndex: 1, explanation: "Digital marketing encompasses SEO, social media, paid ads, email, content marketing — all executed through digital channels.", topic: "Marketing" },
  ],
  creative: [
    { id: 1, question: "What are the three PRIMARY colors in traditional art?", options: ["Green, Orange, Purple", "Red, Yellow, Blue", "Red, Green, Blue", "Cyan, Magenta, Yellow"], correctIndex: 1, explanation: "In traditional pigment mixing, primary colors are Red, Yellow, and Blue. (Digital art uses RGB — Red, Green, Blue.)", topic: "Color Theory" },
    { id: 2, question: "What does 'UX' stand for in design?", options: ["Unified Experience", "User Experience", "Unique Expression", "Universal Exchange"], correctIndex: 1, explanation: "UX (User Experience) encompasses all aspects of the user's interaction with a product — usability, accessibility, pleasure.", topic: "UX Design" },
    { id: 3, question: "What is 'typography' in design?", options: ["Writing long texts", "The art and technique of arranging type to make text readable and visually appealing", "Photo editing", "Creating logos only"], correctIndex: 1, explanation: "Typography is critical in design — font choice, size, spacing, and hierarchy directly impact how a design communicates.", topic: "Graphic Design" },
    { id: 4, question: "What does 'composition' mean in visual art?", options: ["Writing music", "The arrangement of visual elements within a frame", "Color mixing", "Digital editing"], correctIndex: 1, explanation: "Composition is how elements are arranged. Key principles: Rule of thirds, balance, contrast, negative space, leading lines.", topic: "Art Fundamentals" },
    { id: 5, question: "What is 'SEO content writing'?", options: ["Creating only long blog posts", "Writing content optimized to rank high in search engines", "Technical writing for engineers", "Screen writing for films"], correctIndex: 1, explanation: "SEO content writing integrates target keywords, user intent, proper headings and structure to rank organically on Google.", topic: "Content Marketing" },
    { id: 6, question: "What is 'A/B testing' used for in digital marketing?", options: ["Comparing two marketing alternatives to find which performs better", "Testing apps on Android and browser", "A method of brand naming", "An accounting technique"], correctIndex: 0, explanation: "A/B testing shows two versions to different users and measures which converts better — scientific marketing.", topic: "Digital Marketing" },
    { id: 7, question: "In Figma, what is a 'component'?", options: ["A page in the app", "A reusable design element used across multiple frames", "A color palette", "An image file"], correctIndex: 1, explanation: "Figma components are like templates — change the master component and all instances update automatically. Essential for design systems.", topic: "UX Design" },
    { id: 8, question: "What does 'kerning' mean in typography?", options: ["Making text bold", "Adjusting space between specific character pairs", "Choosing font size", "Line height adjustment"], correctIndex: 1, explanation: "Kerning adjusts the space between pairs of letters for better visual harmony. Bad kerning makes 'fl' look like 'A' — true story.", topic: "Typography" },
    { id: 9, question: "What is the 'Golden Ratio' in design?", options: ["A color formula", "An approximately 1:1.618 proportion found in nature used for beautiful compositions", "A pricing strategy", "A font size rule"], correctIndex: 1, explanation: "The golden ratio (φ = 1.618) appears in nature and creates naturally pleasing proportions. Used by Da Vinci, modern logos.", topic: "Art Fundamentals" },
    { id: 10, question: "What is 'color psychology' used for in branding?", options: ["Painting buildings", "Understanding how colors influence emotions and buying decisions", "Selecting office furniture", "Printing techniques"], correctIndex: 1, explanation: "Blue = trust (banks), Red = urgency (sale!), Green = health. Smart brands weaponize color psychology in identity design.", topic: "Branding" },
    { id: 11, question: "What does 'wireframing' mean in UX design?", options: ["Drawing electrical diagrams", "Creating low-fidelity structural blueprints of a digital interface", "Animating characters", "Writing code"], correctIndex: 1, explanation: "Wireframes are skeletons of interfaces — they show layout and flow without colors or final visuals. They save massive rework.", topic: "UX Design" },
    { id: 12, question: "What is 'brand identity'?", options: ["A company's financial value", "The visual and tonal elements that make a brand recognizable", "Physical store design only", "A logo only"], correctIndex: 1, explanation: "Brand identity = logo + colors + fonts + tone of voice + imagery + values. Think Nike's swoosh + 'Just Do It' — instantly recognizable.", topic: "Branding" },
    { id: 13, question: "What is 'negative space' in art?", options: ["Dark paintings", "Space around and between subjects used as a design element", "Empty canvas", "Erased marks"], correctIndex: 1, explanation: "Negative space (white space) lets artwork breathe and can create hidden shapes. Apple's minimalist design masters this.", topic: "Art Fundamentals" },
    { id: 14, question: "What is the purpose of a 'mood board'?", options: ["Tracking project tasks", "Collecting visual references to establish creative direction", "Budget planning", "Client invoicing"], correctIndex: 1, explanation: "Mood boards collect inspirational images, colors, textures, and fonts to align a creative team's vision before production.", topic: "Creative Process" },
    { id: 15, question: "What is 'flat design' in UI?", options: ["Designing for flat-screen only", "A minimalist style using simple 2D elements, bold colors, without shadows/gradients", "Black and white only design", "Design using rulers"], correctIndex: 1, explanation: "Flat design (pioneered by Microsoft Metro, Apple iOS 7) strips away 3D effects for clean, fast-loading, accessible interfaces.", topic: "UI Design" },
  ],
};

// ─── Level 3: Elite Scenario Challenges ─────────────────────────────────────

export interface ScenarioQuestion {
  id: number;
  scenario: string;
  context: string;
  question: string;
  options: { text: string; score: number; analysis: string }[];
  domain: Domain;
}

export const SCENARIO_QUESTIONS: Record<Domain, ScenarioQuestion[]> = {
  tech: [
    {
      id: 1,
      domain: "tech",
      scenario: "🚨 Production Crisis",
      context: "You're the lead engineer at a fintech startup. Your payment gateway suddenly fails at 2 AM during peak hours. 50,000 transactions are stuck. Your CEO is calling. The team is panicking.",
      question: "What is your FIRST action?",
      options: [
        { text: "Immediately push a hotfix to production without testing", score: 1, analysis: "This is dangerous — pushing untested code could worsen the outage and lose more transactions." },
        { text: "Roll back to the last stable version, set up a status page, then systematically debug", score: 5, analysis: "This is the correct senior engineer approach — minimize damage first, communicate transparently, then fix." },
        { text: "Blame the junior developer who last deployed and demand answers", score: 0, analysis: "Blamestorming wastes critical minutes. Great engineers focus on solutions, not blame, during incidents." },
        { text: "Take your time analyzing without communicating — get it right before telling anyone", score: 2, analysis: "Silent debugging during a major outage is wrong — stakeholders need regular updates even if you have no answer yet." },
      ],
    },
    {
      id: 2,
      domain: "tech",
      scenario: "🤖 AI Ethics Dilemma",
      context: "You built an AI model to predict loan defaults. Testing reveals your model is 94% accurate overall — but it unfairly rejects applications from women and lower-income groups at 3x the rate of men.",
      question: "What do you do?",
      options: [
        { text: "Deploy it anyway — 94% accuracy is excellent business performance", score: 0, analysis: "This would violate ethical AI principles, likely break financial discrimination laws, and cause real harm." },
        { text: "Pause deployment, investigate and fix the bias using fairness-aware ML techniques before launch", score: 5, analysis: "Correct. Bias in AI is a critical issue. You must audit, fix, and document before deploying any high-stakes model." },
        { text: "Report the finding to your manager and let them decide", score: 3, analysis: "Escalating is right, but a great engineer also comes with analysis and solutions, not just problems." },
        { text: "Only test it on male applicants to avoid the disparity showing up", score: 0, analysis: "This is unethical and illegal — deliberately hiding discriminatory AI behavior." },
      ],
    },
    {
      id: 3,
      domain: "tech",
      scenario: "💰 Tech Negotiation",
      context: "You receive two job offers: Company A offers ₹25 LPA with exciting AI work. Company B offers ₹35 LPA at a stable legacy BFSI firm with outdated technology stack. You care about long-term career growth.",
      question: "How do you decide?",
      options: [
        { text: "Always take the higher salary — ₹10L more per year is ₹50L extra in 5 years", score: 2, analysis: "Salary matters but technical stagnation at a legacy firm can make you unemployable in cutting-edge roles." },
        { text: "Evaluate learning velocity, tech stack relevance, team quality, AND negotiate salary at Company A first", score: 5, analysis: "Smart career choice. Negotiate with Company A — you have a ₹35L anchor. If they don't match, then compare comprehensively." },
        { text: "Choose Company A purely for passion — money doesn't matter", score: 2, analysis: "Ignoring compensation entirely is also unwise — financial security is important for sustained performance." },
        { text: "Ask both companies to match each other's offers and wait for a bidding war", score: 1, analysis: "This aggressive tactic can backfire and result in both offers being withdrawn." },
      ],
    },
  ],
  healthcare: [
    {
      id: 1,
      domain: "healthcare",
      scenario: "🏥 Hospital Crisis",
      context: "You are the Hospital Administrator. A fire breaks out in the ICU at 11 PM. Power is failing intermittently. 12 critical patients are on life support. You have 3 minutes before backup generators fully activate.",
      question: "What is your immediate priority?",
      options: [
        { text: "Call the fire department first — they are the professionals", score: 2, analysis: "Fire department must be called simultaneously, but your first priority is patient safety protocols that only you can activate." },
        { text: "Activate evacuation protocol, alert ARDS team, ensure manual ventilation backup for ICU patients", score: 5, analysis: "Correct. Code Red protocol → Patient evacuation → Manual backup for life support → Delegate fire control → Communicate." },
        { text: "Run to the ICU personally to assess damage before doing anything", score: 1, analysis: "A hospital administrator's power is in coordination and command, not first-response. Your action from command saves more lives." },
        { text: "Call the hospital's media team to prevent negative press", score: 0, analysis: "PR during an active patient safety crisis is deeply wrong. Lives first, always." },
      ],
    },
    {
      id: 2,
      domain: "healthcare",
      scenario: "⚖️ Ethical Dilemma",
      context: "A critically ill 70-year-old patient has a living will saying 'no resuscitation'. His family is begging you to revive him. He has a 20% chance of survival. The patient is currently unconscious.",
      question: "What do you do as the administrator?",
      options: [
        { text: "Honor the patient's advance directive — it is their autonomous legal right", score: 5, analysis: "A valid living will (Advance Directive) is a legally binding document in India (SC judgment 2018). The patient's own wishes override family requests." },
        { text: "Let the family decide — they know him best", score: 1, analysis: "While family emotion is valid, overriding a patient's documented autonomous wish is ethically and legally incorrect." },
        { text: "Attempt resuscitation to avoid legal risk from the grieving family", score: 2, analysis: "Violating a valid advance directive introduces greater legal risk. The courts have consistently upheld patient autonomy." },
        { text: "Form an ethics committee immediately and delay all decisions", score: 3, analysis: "An ethics committee is appropriate in genuinely ambiguous cases — but a clear, valid advance directive isn't ambiguous." },
      ],
    },
    {
      id: 3,
      domain: "healthcare",
      scenario: "📊 Hospital Turnaround",
      context: "You've just been appointed as the new CEO of a hospital with 30% bed occupancy, ₹2Cr monthly losses, and 60% negative patient reviews citing poor cleanliness and long wait times.",
      question: "What is your 90-day priority?",
      options: [
        { text: "Immediately cut costs by laying off 30% of nursing staff", score: 0, analysis: "Reducing nursing staff worsens patient care, increases reviews, and accelerates the decline." },
        { text: "Fix patient experience (cleanliness, wait times), get NABH audit, launch doctor referral program", score: 5, analysis: "Right. Fix the visible problems first (quick wins), earn quality accreditation, then grow referral network. Revenue follows quality." },
        { text: "Launch an expensive marketing campaign to improve public perception", score: 1, analysis: "Marketing a bad experience is dangerous — it accelerates negative reviews and erodes trust faster." },
        { text: "Add more specialist departments without fixing existing problems", score: 2, analysis: "Expansion without fixing fundamentals creates more channels for failure and dilutes limited resources." },
      ],
    },
  ],
  business: [
    {
      id: 1,
      domain: "business",
      scenario: "💼 Startup Investment Decision",
      context: "You're an analyst at a VC firm. A founder pitches a food-delivery startup targeting tier-2 cities — ₹10Cr seed ask for 15% equity (₹67Cr valuation). They have ₹80L ARR, 40% MoM growth, but negative unit economics.",
      question: "What is your investment recommendation?",
      options: [
        { text: "Invest immediately — 40% MoM growth is exceptional, ARR will fix unit economics", score: 3, analysis: "Growth is great, but investing at ₹67Cr valuation with negative unit economics is risky without a clear path to profitability." },
        { text: "Pass entirely — negative unit economics is an instant red flag", score: 2, analysis: "Many great companies (Amazon, Zomato) had negative unit economics at seed stage. Instant rejection may miss winners." },
        { text: "Express interest, do deep dive on CAC, LTV, contribution margin trend, define milestone triggers for investment", score: 5, analysis: "Excellent analyst behavior. Never invest or reject without data. CAC:LTV ratio, contribution margin trend, and competitive moat are critical." },
        { text: "Negotiate valuation down to ₹30Cr by threatening to walk", score: 1, analysis: "Aggressive valuation-cutting without due diligence signals inexperience. Good founders walk away from aggressive VCs." },
      ],
    },
    {
      id: 2,
      domain: "business",
      scenario: "📉 Marketing Crisis",
      context: "You are the Marketing Head at a D2C beauty brand. A high-profile influencer you paid ₹30L is publicly accused of fraud. She posts your sponsored post during the scandal. Within hours, your brand hashtag trends negatively.",
      question: "What is your crisis response?",
      options: [
        { text: "Delete all social media posts and go silent for 2 weeks", score: 1, analysis: "Disappearing during a crisis looks like guilt and fuels speculation. Silence is interpreted as complicity." },
        { text: "Publicly attack the influencer to distance your brand", score: 0, analysis: "Public attacks escalate the controversy and make your brand look desperate. This is a PR disaster multiplier." },
        { text: "Issue a calm, transparent statement, pause the campaign, engage genuinely, and redirect to brand values", score: 5, analysis: "Crisis PR 101: Be fast, be honest, control the narrative, show values. Brands that handle crises well often emerge stronger." },
        { text: "Do nothing — social media controversies blow over in 24 hours", score: 1, analysis: "While some controversies do fade, inaction during a trending negative hashtag can permanently damage brand sentiment." },
      ],
    },
    {
      id: 3,
      domain: "business",
      scenario: "🏦 Financial Strategy",
      context: "You are CFO of a profitable bootstrapped SaaS company (₹5Cr ARR, 70% margins). Two board members want to raise Series A VC funding to scale. Two others want to stay bootstrapped. The CEO asks your recommendation.",
      question: "What do you recommend?",
      options: [
        { text: "Raise VC — more capital always means faster growth", score: 2, analysis: "VC capital dilutes equity and introduces pressure for hyper-growth that may not suit all businesses." },
        { text: "Stay bootstrapped forever — VCs destroy company culture", score: 2, analysis: "Overgeneralizing. VC can accelerate growth when market timing demands speed. Context matters." },
        { text: "Model both scenarios with 3-year projections, assess market window, competitive intensity, then recommend based on data", score: 5, analysis: "A great CFO is a data-driven strategic partner. Model the scenarios, evaluate the market BEFORE advising the CEO." },
        { text: "Let the two board factions fight it out — as CFO, it's not your call", score: 0, analysis: "The CFO's job is precisely to provide financial clarity on strategic decisions. Abstaining abdicates your core responsibility." },
      ],
    },
  ],
  creative: [
    {
      id: 1,
      domain: "creative",
      scenario: "🎨 Client Conflict",
      context: "You're a lead UX designer. After 3 months of research-backed work, you present a new app architecture to the client. The client's CEO (with no design background) says 'I don't like the blue. Make it pink. Also add 15 more buttons on the home screen.'",
      question: "How do you respond?",
      options: [
        { text: "Immediately comply — the client is always right and is paying you", score: 1, analysis: "Compliance without pushback makes you an order-taker, not a strategic design partner. It also leads to bad products." },
        { text: "Refuse completely — your research is correct and the CEO doesn't understand design", score: 1, analysis: "Dismissing client authority creates conflict. Great designers educate, don't dominate." },
        { text: "Walk through the research rationale, show data, propose A/B testing pink vs. blue, acknowledge CEO input as valuable — but educate on cognitive load with 15 buttons", score: 5, analysis: "This is senior designer behavior. Use data to have the conversation. Acknowledge input, educate diplomatically, propose testing." },
        { text: "Ask your manager to handle the client — it's too stressful", score: 0, analysis: "Escalating every difficult client conversation without attempting resolution is not a sign of growth." },
      ],
    },
    {
      id: 2,
      domain: "creative",
      scenario: "📢 Brand Strategy Challenge",
      context: "You're the Creative Director for a new startup that makes eco-friendly, chemical-free home cleaning products. Target audience: urban parents aged 28–40. Budget: ₹15 lakhs. Platform choice: Instagram or YouTube. Launch in 45 days.",
      question: "What is your launch strategy?",
      options: [
        { text: "Split budget equally between Instagram and YouTube", score: 3, analysis: "Split testing is smart, but without a hypothesis it can dilute impact. Need clearer channel strategy." },
        { text: "Focus 80% on Instagram (Reels + micro-influencers in parenting/wellness niche) + 20% on content creation, zero paid ads on YouTube initially", score: 5, analysis: "Smart. Urban parents aged 28–40 are highly active on Instagram. Micro-influencers (50K–200K) have higher trust than celebrities. Reels drive discovery." },
        { text: "Spend all ₹15L on one mega-influencer celebrity endorsement", score: 1, analysis: "Celebrity influencers have low engagement rates and authenticity. For a trust product (cleaning chemicals for kids), peer recommendations work better." },
        { text: "Use only organic content — paid marketing is wasteful", score: 2, analysis: "Organic-only at launch for a new brand is extremely slow. Seeding with targeted paid amplification dramatically accelerates discovery." },
      ],
    },
    {
      id: 3,
      domain: "creative",
      scenario: "🎬 Portfolio Pressure",
      context: "You're a freelance illustrator who has been working with one major client for 2 years. They suddenly cut your contract. Your portfolio is entirely work done for them (confidential). You have 6 weeks of runway.",
      question: "What's your comeback plan?",
      options: [
        { text: "Post the confidential client work anyway — your career needs it more than their secrets", score: 0, analysis: "Violating NDA/confidentiality destroys trust, is legally actionable, and will follow you forever. Never do this." },
        { text: "Create 5 high-quality personal projects in 2 weeks, post daily process content on Instagram/Behance, do 10 outreach emails per day to potential clients", score: 5, analysis: "This is the right aggressive-but-ethical hustle. Personal projects show unbounded creative freedom. Process content builds following. Direct outreach fills pipeline." },
        { text: "Take a break — 6 weeks is enough time to recover emotionally first", score: 1, analysis: "Emotional recovery matters, but 6 weeks without action while freelancing can create a snowball financial problem." },
        { text: "Apply only to full-time jobs and abandon freelancing", score: 2, analysis: "Pivoting entirely due to one setback abandons the autonomy and compounding reputation you've built. A hybrid approach is smarter." },
      ],
    },
  ],
};
