import type { Project, Experience } from '../../domain/entities/PortfolioData';

export interface BrandLogo {
  name: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconType: 'design' | 'dev' | 'graphic' | 'branding';
}

// Expanded centralized data source for easy user edits
export const profileData = {
  name: 'Sachin Mishra',
  roleTitle: 'web & mobile developer.',
  statusText: 'Available for work',
  experienceOverview: 'I have 5+ years of experience working on useful and beautiful digital products together with startups and brands.',
  locationText: 'Delhi, India',
  contactEmail: 'msachinmishra8@gmail.com',
  
  // Mission section details
  missionText: 'My mission is to assist startups and enterprises in creating an emotional bond between their products and satisfied, engaged customers.',
  
  // Services header
  servicesHeader: 'How Can I Assist You?',
  
  // Projects header
  projectsHeader: 'Selected work',
  
  // Experience header
  experienceHeader: 'Wanna see my experience?',
  
  // Contact header
  contactHeader: 'Contact with me to sizzle your project',
  contactSub: 'Feel free to contact me if you have any questions. I\'m available for new projects or just for chatting.',
  
  // Footer text
  footerTitle: 'Let\'s connect and chat',
};

// Client logos for the mission banner
export const brandLogosData: BrandLogo[] = [
  { name: 'Jeep' },
  { name: 'amazon' },
  { name: 'bitcoin' },
  { name: 'HubSpot' },
  { name: 'stripe' },
  { name: 'Google' }
];

// Services items matching the video (01, 02, 03, 04)
export const servicesData: ServiceItem[] = [
  {
    id: '01',
    title: 'UI Design',
    description: 'We create intuitive, visually appealing interfaces that enhance user experience and navigation, ensuring your app is both beautiful and functional across all devices.',
    iconType: 'design'
  },
  {
    id: '02',
    title: 'Development',
    description: 'Our team builds reliable, scalable web solutions, delivering clean code that powers websites and mobile apps with top-notch performance and security.',
    iconType: 'dev'
  },
  {
    id: '03',
    title: 'Store Deployment',
    description: 'Handling the complete App Store and Google Play Store submission process. We manage compliance, review cycles, target SDK updates, and assets to guarantee publication approval.',
    iconType: 'graphic'
  },
  {
    id: '04',
    title: 'App Maintenance',
    description: 'Post-launch support to keep your apps stable and secure. We integrate crash tracking (Crashlytics), performance telemetry, and deliver regular feature updates.',
    iconType: 'branding'
  }
];

// Selected work list matching the grid in the video
export const selectedWorkData: Project[] = [
  {
    id: '1',
    title: 'BUSLY (LIVE ON PLAYSTORE)',
    description: 'A production school-bus tracking system integrated with custom GPS IoT hardware. Features real-time bidirectional WebSocket synchronization, live location maps, and high-performance cross-platform apps.',
    category: 'MOBILE APP (IOT)',
    tags: ['FLUTTER', 'GETX', 'NODE.JS', 'POSTGRESQL', 'WEBSOCKETS', 'GOOGLE MAPS'],
    imageUrl: 'project-busly/main image.png',
    projectUrl: 'https://play.google.com/store/apps/details?id=com.malvi.busly&pcampaignid=web_share',
    gitUrl: '2025',
    logoUrl: 'project-busly/logo.png',
    hardwareUrl: 'project-busly/Hardware.png',
    timeline: '3 Months',
    architectureTree: `System Ecosystem:
├── Super-Admin Panel (Multi-School Central Control)
│   ├── School Onboarding & Licensing
│   └── System-wide Telemetry Metrics
├── School Admin Dashboard (Vehicle & Route Operations Manager)
│   ├── Fleet Routing & Live Allocation
│   ├── Driver Behavior Log (Over-speeding alerts)
│   └── Real-time TCP GPS Packet Processing
└── Mobile Parent App (Reactive Student Tracking)
    ├── Live Location Tracking & Speedometer
    ├── Dynamic ETA & Proximity Alarms
    └── GetX Powered Reactive State Engine`,
    longDescription: 'A production-grade, highly scalable school bus tracking and management ecosystem. It integrates real-time IoT GPS tracking units with custom Flutter applications for schools, drivers, and parents. The system empowers parents by providing instant peace of mind: they can trace the exact live location of their child\'s bus on Google Maps, monitor real-time speed, view Estimated Time of Arrival (ETA) updates, and receive automated instant push notifications for pickup, drop-off, and geofencing boundary crossings. By connecting hardware directly to the cloud, Busly ensures parents always know exactly when their child gets on and off the bus.',
    features: [
      'End-to-end integration with custom GPS IoT tracking hardware via custom TCP network layer.',
      'Parent-Centric Live Maps: High-frequency real-time updates displaying live bus routes, vehicle speeds, and interactive Google Maps overlays.',
      'Automated ETA & Smart Geofencing: Parent notifications trigger instantly when the bus enters/exits neighborhood safety boundaries or school zones, minimizing waiting times at stops.',
      'Advanced State Management with GetX: Integrated senior-grade GetX reactive state management to decouple business logic from views, optimize rendering paths, and maintain high performance during frequent coordinate updates.',
      'Driver Telemetry & Notifications: Real-time driver logs, speed limit violation monitoring, and direct push alerts managed via Node.js WebSockets and a PostgreSQL DB.'
    ],
    screenshots: [
      'project-busly/image.png',
      'project-busly/image copy.png',
      'project-busly/image copy 2.png',
      'project-busly/image copy 3.png',
      'project-busly/image copy 4.png',
      'project-busly/image copy 5.png'
    ]
  },
  {
    id: '2',
    title: 'CAPTION.IO',
    description: 'An AI-powered automated caption generator built for short-form video creators. Leverages native-level engine bindings for high-fidelity audio/video rendering, multithreaded processing, and AdSense monetization.',
    category: 'SAAS VIDEO TECH',
    tags: ['FLUTTER', 'GETX', 'PLATFORM CHANNELS', 'NATIVE ANDROID/IOS', 'C++', 'ADSENSE'],
    imageUrl: 'projet_caption/Main.png',
    projectUrl: '#',
    gitUrl: '2026',
    logoUrl: 'projet_caption/logo.jpeg',
    timeline: '1 Week',
    colorTheme: 'monochrome',
    longDescription: 'An advanced, high-performance automated caption generator built specifically to empower short-form creators. Developed and delivered within an extremely fast 1-week timeline, the solution leverages native Platform Channels to interface directly with low-level C++ rendering pipelines on Android/iOS from a responsive Flutter frontend managed by reactive GetX state. While most caption generators in the market require expensive monthly subscriptions, Caption.IO is completely free (unpaid), enabling indie creators and beginners to easily generate high-fidelity, stylistically animated subtitles without budget constraints.',
    features: [
      'Rapid 1-Week Delivery: Fully engineered, optimized, and deployed in a single week to address a critical creator market window.',
      'Flutter Platform Channels & GetX: Seamless communication between the Flutter UI layer and native mobile shells for high-performance audio/video calculations, structured with GetX reactive architectures.',
      '100% Free & Unlimited: Built to democratize content creation, allowing small creators to burn subtitles without paying for premium subscriptions.',
      'Easy One-Tap Subtitle Generation: Powered by native-level engine bindings that align audio speech-to-text to animated text layouts automatically.',
      'High-Quality 4K Export: Export rendering runs locally on the device at 60fps for crisp video outputs.'
    ],
    screenshots: [
      'projet_caption/image.png',
      'projet_caption/image copy.png',
      'projet_caption/image copy 2.png',
      'projet_caption/image copy 3.png',
      'projet_caption/image copy 4.png'
    ]
  },
  {
    id: '3',
    title: 'COUNTRON WEB & APP',
    description: 'A dual-platform environmental telemetry application developed for Countronics. Connects to Airveda PM2.5 sensors via low-latency WiFi sockets to configure network settings and log real-time data.',
    category: 'HARDWARE & TELEMETRY',
    tags: ['FLUTTER', 'PHP API', 'MYSQL', 'WIFI SOCKETS', 'TELEMETRY'],
    imageUrl: 'project_countron/main.png',
    projectUrl: 'https://www.aquare.co.in/mobileAPI/countron/#/login',
    projectUrlLabel: 'Visit Web Console',
    appStatus: 'Delivered to Client',
    gitUrl: '2025',
    logoUrl: 'project_countron/logo.png',
    hardwareUrl: 'project_countron/hardware.png',
    timeline: '4 Months',
    colorTheme: 'blue',
    architectureTree: `Countron Telemetry System:
├── Airveda PM2510P Sensor Hardware
│   ├── ESP8266 WiFi Socket Controller
│   └── Calibration Registers & Offset Adjustments
├── PHP REST API Backend Gateway
│   ├── JWT Authentication & Device Mapping
│   ├── Telemetry Log Queue & MySQL Database
│   └── Export Engine (Dynamically generating PDF/CSV)
└── Dual-Platform Client Dashboards
    ├── Flutter Mobile App (WiFi sockets calibration dashboard)
    └── Responsive React Web Console (Historical comparison graphs)`,
    longDescription: 'An industrial-grade environmental monitoring and telemetry ecosystem designed for Countronics. It connects directly with the Airveda PM2510P PM 2.5 Portable Air Quality Monitor via bidirectional WiFi socket connections. Users can configure device network parameters, set alert limits, calibrate sensor thresholds, and stream real-time air quality metrics (PM2.5, PM10, temperature, and humidity) straight to interactive dashboards powered by a high-performance PHP API backend and a MySQL database.',
    features: [
      'WiFi Socket Configuration: Developed socket interfaces allowing clients to easily sync local WiFi configurations and network credentials directly with the Airveda hardware.',
      'Real-time Telemetry Processing: Designed high-frequency data streams capturing PM2.5, PM10, temperature, and humidity sensor readings every second.',
      'Dual Platform Dashboards: Unified Flutter mobile client and a responsive web telemetry panel displaying interactive chart comparisons and history logs.',
      'Custom PHP API Layer: Built secure REST endpoints managing user sessions, device tokens, system calibration records, and telemetry log exports.'
    ],
    screenshots: [
      'project_countron/image.png',
      'project_countron/image copy.png',
      'project_countron/image copy 2.png',
      'project_countron/image copy 3.png',
      'project_countron/image copy 4.png',
      'project_countron/image copy 5.png',
      'project_countron/image copy 6.png',
      'project_countron/image copy 7.png',
      'project_countron/image copy 8.png'
    ]
  },
  {
    id: '4',
    title: 'AYURSUTRA (SIH HACKATHON)',
    description: 'A Panchakarma Patient Management & Therapy Scheduling system built for the Smart India Hackathon (SIH), reaching the top 50 in internal college selection. Integrates automated scheduling, precaution alerts, Razorpay, and Firebase messaging.',
    category: 'MEDTECH / HEALTHCARE',
    tags: ['FLUTTER', 'FIREBASE', 'RAZORPAY', 'AI CHATBOT', 'SCHEDULING', 'MEDTECH'],
    imageUrl: 'project_ayu/main.png',
    projectUrl: '#',
    projectUrlLabel: 'Hackathon Submission',
    appStatus: 'SIH Selection (Top 50)',
    gitUrl: '2026',
    logoUrl: 'project_ayu/logo.png',
    timeline: '2 Weeks',
    colorTheme: 'teal',
    architectureTree: `AyurSutra Platform:
├── Flutter Client Application (Mobile & Web)
│   ├── Automated Therapy Scheduler & Calendar
│   ├── Pre- & Post-Procedure Precaution Prompts
│   ├── Real-Time Chat & AI Chatbot Interface
│   └── Integrated Razorpay Payment Gateway
└── Firebase Cloud Backend Gateway
    ├── Firestore Database (Patient records & therapy templates)
    ├── Firebase Cloud Messaging (Precautions & session reminders)
    └── Real-time Chat Messaging Channel`,
    longDescription: 'AyurSutra is a dedicated patient management and therapy scheduling system designed for Panchakarma (Ayurvedic detoxification and rejuvenation) centers. Developed for the Smart India Hackathon (SIH 2026) and recognized in the top 50 team entries, it modernizes traditional practice protocols with automated digital flows. The solution automates session planning, implements customizable notifications (in-app, SMS, email) for crucial pre- and post-procedure guidelines, and empowers patients with visual tracking tools, integrated recovery milestones, and real-time support.',
    features: [
      'Automated Therapy Scheduler: Smart, collision-free scheduling system enabling patients and practitioners to schedule, modify, and manage therapy sessions dynamically.',
      'Precautions Notification Engine: Triggers automated reminders and instructions via customizable notification channels to keep patients informed before and after procedures.',
      'Integrated AI Chatbot & Messaging: Direct patient-practitioner real-time messaging powered by Firebase, coupled with an AI chatbot for instant query resolution.',
      'Razorpay Payment Gateway: Secure checkout integration allowing patients to easily pay for wellness packages and therapy bookings directly in-app.',
      'Real-Time Progress Visualization: Interactive progress tracking with visual tools showing therapy milestones, recovery tracking, and feedback loops.'
    ],
    screenshots: [
      'project_ayu/1.jpg',
      'project_ayu/2.jpg',
      'project_ayu/3.jpg',
      'project_ayu/4.jpg',
      'project_ayu/5.jpg',
      'project_ayu/6.jpg',
      'project_ayu/7.jpg',
      'project_ayu/8.jpg',
      'project_ayu/9.jpg'
    ]
  },
  {
    id: '5',
    title: 'LOCAL COMPLIANCE RAG ENGINE',
    description: 'A high-performance, 100% local compliance Q&A engine built to answer regulatory questions privately. Parses PDFs, indexes embeddings in FAISS, and performs offline inference using LangChain and Ollama.',
    category: 'AI & BACKEND ENGINEERING',
    tags: ['PYTHON', 'FASTAPI', 'LANGCHAIN', 'FAISS', 'OLLAMA', 'RAG'],
    imageUrl: 'projext_RAG/Main.png',
    projectUrl: '#',
    projectUrlLabel: 'API Documentation',
    appStatus: 'Completed Backend',
    gitUrl: '2026',
    logoUrl: 'projext_RAG/logo.png',
    timeline: '1 Week',
    colorTheme: 'blue',
    extraSectionTitle: 'Local Directory Structure',
    extraSectionSub: 'Workspace & Training Data Layout',
    extraSectionDesc: 'The compliance engine operates locally by parsing files placed directly in the knowledge/ folder, indexing embeddings under faiss_local_db/, and loading source code in app.py and main.py.',
    extraSectionUrl: 'projext_RAG/folder_struct.png',
    architectureTree: `Local RAG Pipeline:
├── Document Ingest (PDFs in /knowledge)
│   └── PyPDF Loader & Recursive Character Text Splitter
├── Embeddings & Indexing (FAISS)
│   ├── Nomic Embeddings (Batched at size 30 for safety)
│   └── FAISS Local Vector Database Serialization
└── User Query Endpoint (FastAPI REST API)
    ├── Context Synthesis (Similarity search retrieves top 3 chunks)
    └── Ollama Inference Layer (Strict prompt constraints on Qwen 2.5)`,
    longDescription: 'A secure, enterprise-grade regulatory compliance query system built to run completely locally on consumer hardware. Leveraging a local Retrieval-Augmented Generation (RAG) architecture, it ingests compliance manuals (PDFs) from a local knowledge directory, chunks documents dynamically with semantic overlap, embeds them in optimized batches using Nomic Embeddings, and indexes them in a local FAISS database. Inference is completed entirely offline via Ollama running a lightweight Qwen 2.5 model, guaranteeing zero data leakage and strict compliance alignment.',
    features: [
      '100% Local Execution: Ensures ultimate data privacy and security by processing files, embeddings, vector indexing, and inference entirely offline on-device.',
      'Robust Ingestion & Chunking: Automatically loads regulatory documents, splitting text chunks dynamically with precise overlap parameters to preserve context.',
      'Batched Embeddings Optimization: Processes document vectors in controlled batches of 30 to prevent system overhead and Ollama runner crashes during indexing.',
      'Strict System Prompt Q&A: Enforces system constraints preventing the LLM from hallucinating, forcing responses to be strictly grounded on the retrieved context.',
      'FastAPI Query API: Exposes a high-performance HTTP REST interface with startup model verification checks for easy front-end integration.'
    ],
    screenshots: [
      'projext_RAG/image.png',
      'projext_RAG/image copy.png',
      'projext_RAG/image copy 2.png'
    ]
  }
];

// Experience list matching the cards in the video
export const experiencesData: Experience[] = [
  {
    role: 'Full-time UI designer at Google',
    company: 'Google',
    period: '2016-2019',
    description: []
  },
  {
    role: 'Part-time Developer designer at Grammarly',
    company: 'Grammarly',
    period: '2016-2019',
    description: []
  },
  {
    role: 'Full-time UI designer at Airbnb',
    company: 'Airbnb',
    period: '2016-2019',
    description: []
  }
];

export interface TestimonialItem {
  id: string;
  brandName: string;
  name: string;
  quote: string;
  role: string;
  brandLogo: string;
  avatarUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: '1',
    brandName: 'Moneyshine infocom Pvt Ltd',
    name: 'Vishal Jain',
    role: 'Director',
    quote: "Sachin's expertise in development and UI design has been game-changing for Moneyshine. He communicates extremely well and delivers top-notch code that is easy to scale.",
    brandLogo: 'Testimonial/moneyshine.png',
    avatarUrl: 'Testimonial/person_moneyshine.png'
  },
  {
    id: '2',
    brandName: 'Countronics',
    name: 'Prashant Gupta',
    role: 'Director',
    quote: "Sachin delivered an exceptional telemetry platform. From ESP8266 WiFi integration to the final Flutter app, his full-stack expertise helped us ship ahead of schedule.",
    brandLogo: 'Testimonial/countronics.png',
    avatarUrl: 'Testimonial/person_countr.png'
  }
];

export const faqData: FaqItem[] = [
  {
    id: '1',
    question: 'What services do you offer for mobile & web apps?',
    answer: 'I provide full-stack services including high-performance mobile apps (React Native, Swift, Ionic, Capacitor, and Flutter), frontend web development (React & Next.js), backend systems (Node.js & FastAPI), IoT telemetry configurations, and AI RAG engine integrations.'
  },
  {
    id: '2',
    question: 'Do you handle App Store and Google Play Store deployment?',
    answer: 'Yes, absolutely! I manage the entire deployment process, including Apple and Google developer account setup, metadata configuration, policy setup, target SDK compliance, and navigating review cycles to get your app approved.'
  },
  {
    id: '3',
    question: 'How do you handle post-launch maintenance?',
    answer: 'I integrate error and crash reporting platforms like Firebase Crashlytics to monitor stability in real-time. I also offer regular package updates, feature iterations, and OS version compatibility patches.'
  },
  {
    id: '4',
    question: 'How long does it typically take to complete a project?',
    answer: 'Timelines depend on the app\'s complexity. A landing page or MVP takes 1-2 weeks, while a full dual-platform mobile app with backend database sync or IoT integration ranges from 4-8 weeks.'
  },
  {
    id: '5',
    question: 'How do we start a project together?',
    answer: 'You can click \'Get Started Now\' to open the contact modal, specify your estimated budget and timeline, or send an email directly. I\'ll get back to you within 24 hours to schedule a consultation.'
  }
];

export interface SkillCategory {
  categoryName: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    categoryName: 'Frontend & Mobile',
    skills: ['React Native', 'Swift', 'Ionic', 'Capacitor', 'Flutter', 'Dart', 'React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS']
  },
  {
    categoryName: 'Backend & Databases',
    skills: ['Node.js', 'FastAPI', 'Python', 'PHP', 'PostgreSQL', 'MySQL', 'Firebase', 'WebSockets']
  },
  {
    categoryName: 'AI & Systems Engineering',
    skills: ['LangChain', 'Ollama LLMs', 'FAISS Vector DB', 'ESP8266 IoT', 'C++', 'Git / GitHub', 'CI/CD Pipelines']
  }
];
