import kendrewGradAvatar from '../assets/images/kendrew_grad_avatar_1792420717296.jpg';
import libconnectImg from '../assets/images/libconnect_preview_1792415713348.jpg';
import anseafoodsImg from '../assets/images/anseafoods_preview_1792415732871.jpg';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  projectType: string;
  description: string;
  contribution: string;
  role: string;
  year: string;
  stack: string[];
  features: string[];
  image: string;
  githubUrl: string;
  collaborator?: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location?: string;
  type?: string;
  bullets: string[];
}

export interface EducationItem {
  level: string;
  period?: string;
  school: string;
  degree: string;
  honors?: string;
}

export const KENDREW_PROFILE = {
  name: "KENDREW GONZAGA",
  role: "Software Developer & IT Support Specialist",
  location: "Cebu City, Philippines",
  phone: "+639155413683",
  email: "kendz.dev@gmail.com",
  github: "https://github.com/Kendz16",
  summary:
    "BS IT Graduate with hands-on experience in IT Support and Application Development. Provided technical troubleshooting for systems, networks, and databases in BPO and hotel environments. Developed projects using JavaScript, Node.js, and MERN stack, including an ATM Console Simulator and web applications during OJT. Skilled in problem-solving, system maintenance, data entry, and client assistance. Known for accuracy, attention to detail, and strong communication in fast-paced environments. Eager to apply transferable skills while continuously expanding professional knowledge and capabilities.",
  intro:
    "Hi, I'm Kendrew Gonzaga! A BS IT Graduate from Universidad De Zamboanga based in Cebu City. I have hands-on experience in software development (MERN stack, JavaScript, React, Node.js) and IT technical troubleshooting. Dependable, eager to learn, and ready to contribute to development and IT teams.",
  avatar: kendrewGradAvatar,
  facebook: "https://www.facebook.com/kendrew.gonzaga",
  instagram: "https://www.instagram.com/kendrew03_16/",
  
  coreSkills: {
    technicalSupport: [
      "System Troubleshooting",
      "Network & Database Support",
      "IT Helpdesk & User Assistance",
      "System Installation & Maintenance",
      "Data Entry & Records Management",
      "BPO & Hotel Industry Support",
      "Technical Documentation"
    ],
    softwareDevelopment: [
      "JavaScript / ES6+ Development",
      "Node.js / Express.js",
      "React.js Frontend Development",
      "MERN Stack Application Building",
      "REST API Development & Testing",
      "Git / GitHub Version Control",
      "Debugging & Problem Solving"
    ]
  },

  technicalSkills: {
    itSupport: [
      "Windows 10/11 Troubleshooting",
      "Network Diagnostics: IP, DNS, Ping, LAN",
      "Microsoft Office: Word, Excel, PowerPoint",
      "Remote Desktop Tools: AnyDesk, TeamViewer"
    ],
    softwareDev: [
      "JavaScript, Node.js, React.js",
      "MongoDB, MySQL, Mongoose",
      "HTML5, CSS3, Tailwind CSS",
      "Git / GitHub, VS Code, Postman"
    ]
  },

  experiences: [
    {
      role: "Site / Order Center Assistant (Remote)",
      company: "MyShop Technologies",
      period: "March 2026 – October 2026",
      type: "Remote",
      bullets: [
        "Managed online orders and supported restaurant clients via SASS SaaS platform.",
        "Ensured accurate order processing, client data entry, and system troubleshooting."
      ]
    },
    {
      role: "Admin Virtual Assistant (Remote)",
      company: "Assisted Business Solutions Inc.",
      period: "August 2025 – March 2026",
      type: "Remote",
      bullets: [
        "Processed tenant accounts remotely for US-based PMCs using SASS CRM, ensuring accurate QA and activation for final move-out charge collections.",
        "Analyzed lease agreements and Property Management System (PMS) data to verify charges, validate tenant balances, and prevent billing errors.",
        "Qualified and activated accounts with 100% compliance to state and federal collection regulations to mitigate legal risk for clients.",
        "Collaborated with Property Management Companies to resolve account discrepancies and support efficient debt recovery processes.",
        "Maintained high data accuracy and audit-ready documentation for all activated and processed accounts."
      ]
    },
    {
      role: "IT Support Specialist",
      company: "Elga Business Solutions Inc.",
      period: "February 2025 – August 2025",
      type: "On-site / Hybrid",
      bullets: [
        "Resolved 30+ system issues weekly for international clients via AnyDesk/TeamViewer, maintaining <5min avg downtime.",
        "Troubleshot hardware, software, and network connectivity issues to ensure smooth operations.",
        "Documented troubleshooting steps and assisted in server/database maintenance for continuous improvement.",
        "Escalated critical server and network incidents to L2/L3 engineers with detailed root cause analysis.",
        "Enforced IT security protocols during remote sessions, including VPN checks and endpoint verification, to protect client data."
      ]
    },
    {
      role: "IT Internship",
      company: "LM Metro Hotel",
      period: "May 2024 – July 2024",
      type: "On-site Internship",
      bullets: [
        "Configured LAN cables, CCTV systems, and hotel servers/databases.",
        "Troubleshot connectivity and software issues across front desk, housekeeping, F&B departments.",
        "Installed telephone and network systems, ensuring secure and reliable network connectivity."
      ]
    },
    {
      role: "Programmer Apprentice",
      company: "Freelance Projects",
      period: "September 2023 – March 2024",
      type: "Apprenticeship",
      bullets: [
        "Assisted in developing web applications using MERN stack: MongoDB, Express, React, Node.js.",
        "Troubleshot and maintained code for projects like Lib-connect + A & N Sea Food Manufacturing website.",
        "Collaborated with DevOps/Full Stack mentor on project setup, database connectivity, and bug fixes.",
        "Gained hands-on experience in Git, client requirements, and agile delivery process."
      ]
    }
  ],

  education: [
    {
      level: "COLLEGE",
      period: "2021 – 2024",
      school: "Universidad De Zamboanga",
      degree: "Bachelor of Information Technology"
    },
    {
      level: "SENIOR HIGH SCHOOL",
      period: "2018 – 2020",
      school: "Baliwasan Senior High School - Stand Alone",
      degree: "Information and Communication Technology",
      honors: "With Honors"
    },
    {
      level: "JUNIOR HIGH SCHOOL",
      school: "Zamboanga National High School West",
      degree: "Information and Communication Technology"
    }
  ],

  certifications: [
    "ICT NCII Passer",
    "Diploma",
    "Certificate of Graduation"
  ],

  socials: [
    { name: "GitHub", url: "https://github.com/Kendz16", handle: "Kendz16" },
    { name: "Facebook", url: "https://www.facebook.com/kendrew.gonzaga", handle: "kendrew.gonzaga" },
    { name: "Instagram", url: "https://www.instagram.com/kendrew03_16/", handle: "@kendrew03_16" },
    { name: "Email", url: "mailto:kendz.dev@gmail.com", handle: "kendz.dev@gmail.com" }
  ]
};

export const KENDREW_PROJECTS: ProjectItem[] = [
  {
    id: "libconnect",
    title: "Lib-Connect — University Library System",
    tagline: "School thesis web application for library management and cataloging",
    projectType: "School Thesis Project (OJT / College)",
    role: "Frontend Developer & Maintainer",
    year: "2024",
    description:
      "A web application built as our school thesis project at Universidad De Zamboanga to modernize campus library operations. Designed and built the frontend interface to streamline book search, catalog browsing, reservation tracking, and borrowing status for students and librarians.",
    contribution:
      "Developed the responsive user interface, troubleshot UI bugs and state issues, handled form validations, and integrated backend API endpoints for catalog queries and borrowing records.",
    stack: ["JavaScript", "React", "HTML5", "CSS3 / Tailwind CSS", "REST APIs", "Git"],
    features: [
      "Interactive book catalog search with category and title filters",
      "Reservation and borrowing status tracker for university students",
      "Clean librarian dashboard view for managing available and loaned books",
      "Mobile-friendly layout designed for student smartphones and library kiosks"
    ],
    image: libconnectImg,
    githubUrl: "https://github.com/Kendz16/libconnect-fe",
  },
  {
    id: "anseafoods",
    title: "A & N Sea Food Manufacturing Website",
    tagline: "Commercial website for a seafood processing & manufacturing business",
    projectType: "Collaborative Project",
    role: "Frontend Developer (Collaboration)",
    year: "2024",
    collaborator: "Collaborated with Fullstack Developer @rio4short16",
    description:
      "A commercial web platform for A & N Seafoods to showcase manufactured seafood products, quality certifications, cold-chain operations, and client wholesale inquiries.",
    contribution:
      "Collaborated alongside a fullstack developer to maintain code, troubleshoot responsiveness issues, fix layout bugs across screen sizes, and refine the product catalog display components.",
    stack: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Git / GitHub"],
    features: [
      "Comprehensive product catalog grid showcasing seafood varieties and specifications",
      "Responsive navigation and layout tested across mobile, tablet, and desktop",
      "Company background, sustainability commitments, and wholesale contact inquiry forms",
      "Code maintenance, bug troubleshooting, and GitHub version control collaboration"
    ],
    image: anseafoodsImg,
    githubUrl: "https://github.com/rio4short16/an-seafoods-v2",
  }
];
