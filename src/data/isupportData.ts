export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'vat' | 'business' | 'education' | 'utility';
  description: string;
  icon: string;
  color: string;
  status: 'Live' | 'Beta' | 'Enterprise';
  url: string;
  isFree?: boolean;
  features: string[];
  specs: { label: string; val: string }[];
  highlightMetric: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  points: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const productsData: Product[] = [
  {
    id: 'idp',
    name: 'IDP',
    tagline: 'Importer Data Processor & VAT Return Automation Engine',
    category: 'vat',
    description: 'Premier enterprise VAT automation ERP built strictly complying with NBR standards. Processes Mushak 6.1, 6.2, and 6.2.1 ledgers, multi-firm tenant access, and automated monthly return submissions.',
    icon: 'bi-file-earmark-spreadsheet',
    color: '#00d2ff',
    status: 'Live',
    url: 'https://idp.isupportbd.com',
    highlightMetric: '100K+ Invoices Processed',
    features: [
      'Mushak 6.1, 6.2 & 6.2.1 Books Generator',
      'Batch Excel / CSV Purchases & Sales Uploader',
      'Submissions Tracker & ACK Number Filing',
      'Multi-Tenant Firm & Client Management'
    ],
    specs: [
      { label: 'Architecture', val: 'TypeScript + Drizzle ORM + Hono' },
      { label: 'Compliance', val: 'NBR Statutory Format 2012 Act' },
      { label: 'Throughput', val: 'Sub-second 50k Excel rows parsing' }
    ]
  },
  {
    id: 'analyser',
    name: 'Analyser',
    tagline: 'VAT Return Audit, Non-Filer Tracker & Financial Analysis',
    category: 'vat',
    description: 'High-precision audit and ledger reconciliation platform. Verifies BIN statuses in real-time, pinpoints non-filing gaps, and generates discrepancy audit reports for tax consultants.',
    icon: 'bi-bar-chart-line-fill',
    color: '#38bdf8',
    status: 'Live',
    url: 'https://analyser.isupportbd.com',
    highlightMetric: '99.9% Audit Accuracy',
    features: [
      'Live BIN Status & Return History Checking',
      'Non-Filer Gap Identifier & Penalty Estimator',
      'Cross-Ledger Discrepancy Diagnostics',
      'Automated PDF & Excel Audit Export'
    ],
    specs: [
      { label: 'Database', val: 'PostgreSQL Relational Cluster' },
      { label: 'Data Source', val: 'Real-time NBR e-VAT Validation' },
      { label: 'Auditing', val: 'Zero-tolerance mismatch detection' }
    ]
  },
  {
    id: 'zerovat',
    name: 'ZeroVAT',
    tagline: 'Zero-Friction NBR VAT Return & Digital Compliance Platform',
    category: 'vat',
    description: 'Next-generation VAT automation system built for zero-friction monthly tax returns, automated purchase/sales book compilation, e-VAT portal sync, and effortless audit-ready compliance.',
    icon: 'bi-shield-check',
    color: '#10b981',
    status: 'Live',
    url: '#',
    highlightMetric: 'Zero-Error Filing',
    features: [
      'Automated Monthly Mushak 9.1 Return Generation',
      'Real-Time Purchase & Sales Book Reconciliation',
      'Direct NBR e-VAT Portal Sync & Export',
      'Zero-Error Discrepancy & Gap Identification'
    ],
    specs: [
      { label: 'Architecture', val: 'TypeScript + PostgreSQL + Hono' },
      { label: 'Compliance', val: 'NBR Statutory VAT & SD Act 2012' },
      { label: 'Speed', val: 'Instant 1-Click Return Compilation' }
    ]
  },
  {
    id: 'baybosayee',
    name: 'Baybosayee POS',
    tagline: 'Modern Multi-Branch Retail POS & Inventory Cloud',
    category: 'business',
    description: 'Comprehensive business Point of Sale (POS) and inventory tracking platform. Designed for fast retail checkouts, wholesale invoicing, barcode generation, multi-warehouse stock sync, and daily profit/loss analytics.',
    icon: 'bi-shop-window',
    color: '#f59e0b',
    status: 'Live',
    url: '#',
    highlightMetric: '0.1s Fast Checkout',
    features: [
      'Rapid Touch POS & Thermal Receipt Printing',
      'Real-Time Multi-Branch Inventory Sync',
      'Customer Due, Ledger & Supplier Accounts',
      'Integrated Barcode Generator & Scanner'
    ],
    specs: [
      { label: 'POS Engine', val: 'Offline-first Reactive Store' },
      { label: 'Scalability', val: 'Unlimited Store Outlets' },
      { label: 'Hardware', val: 'Thermal, Cash Drawer & Scanner' }
    ]
  },
  {
    id: 'shailik',
    name: 'Shailik',
    tagline: 'Fashion, Boutique & Garments Apparel Retail ERP & POS',
    category: 'business',
    description: 'Specialized Fashion & Clothing ERP designed for boutique houses, apparel showrooms, and garment retailers. Features multi-size/color matrix, custom tailoring tracking, barcode tagging, seasonal discount campaigns, and multi-branch stock sync.',
    icon: 'bi-scissors',
    color: '#06b6d4',
    status: 'Live',
    url: '#',
    highlightMetric: 'Apparel Size-Color Matrix',
    features: [
      'Multi-Variant Size, Color & Fabric Grid',
      'Barcode, Price Tag & Fabric Label Printing',
      'Tailoring & Custom Stitching Order Tracker',
      'Seasonal Sales Campaigns & Combo Offer Billing'
    ],
    specs: [
      { label: 'Speciality', val: 'Garments & Fashion Retail' },
      { label: 'Variants', val: 'Size, Color, Brand & Material' },
      { label: 'Hardware', val: 'Barcode Scanner & Thermal Printer' }
    ]
  },
  {
    id: 'vat-calculator',
    name: 'VAT Calculator',
    tagline: 'Statutory NBR VAT, SD & Tax-to-Value Calculation Engine',
    category: 'vat',
    description: 'Interactive statutory VAT calculator supporting Exclusive, Inclusive, and Tax-to-Value calculation modes, Supplementary Duty (SD), and NBR standard rates.',
    icon: 'bi-calculator-fill',
    color: '#ec4899',
    status: 'Live',
    url: '/vat-calculator',
    isFree: true,
    highlightMetric: 'Instant & 100% Free',
    features: [
      'Exclusive, Inclusive & Tax-to-Value Modes',
      'Standard 15% & Truncated Rates (5%, 7.5%, 10%)',
      'Supplementary Duty (SD) Assessment',
      'Instant Copy & Statutory Formula Breakdown'
    ],
    specs: [
      { label: 'Engine', val: 'Client-Side Real-Time Math Engine' },
      { label: 'Rates', val: '2025-2026 Bangladesh VAT SROs' },
      { label: 'Cost', val: 'Free Public Web Utility' }
    ]
  },
  {
    id: 'bidyapeet',
    name: 'Bidyapeet',
    tagline: 'Modern Academic Management & Student Information System',
    category: 'education',
    description: 'End-to-end digital school and college administration suite. Handles online admissions, student attendance, digital report cards, tuition fee collections via mobile banking, and teacher portals.',
    icon: 'bi-mortarboard-fill',
    color: '#3b82f6',
    status: 'Beta',
    url: '#',
    highlightMetric: 'All-in-One Campus',
    features: [
      'Online Admission & Student Dossiers',
      'Automated Tuition Fee SMS & bKash Collection',
      'Exam Marksheet & Grade Sheet Generator',
      'Teacher, Staff & Payroll Management'
    ],
    specs: [
      { label: 'Access', val: 'Parent, Student & Admin Portals' },
      { label: 'Payments', val: 'Direct bKash/Nagad Auto-Reconciliation' },
      { label: 'Reports', val: 'NBR compliant accounting ledger' }
    ]
  },
  {
    id: 'mosque',
    name: 'Masjid',
    tagline: 'Islamic Centre Accounting & Donation Tracking System',
    category: 'utility',
    description: 'Dedicated financial and community management system for Mosques and Waqf organizations. Tracks Friday collections, donor registers, construction funds, and utility expenses with full transparency.',
    icon: 'bi-moon-stars-fill',
    color: '#059669',
    status: 'Beta',
    url: '#',
    highlightMetric: '100% Transparent',
    features: [
      'Friday Collection & General Donation Tracker',
      'Donor Management with Instant SMS Receipts',
      'Monthly Expense & Staff Payroll',
      'Annual Income-Expense Audit Summary'
    ],
    specs: [
      { label: 'Reporting', val: 'Public Display & PDF Financials' },
      { label: 'Transparency', val: 'Multi-Signature Audits' },
      { label: 'Accessibility', val: 'Clean English User Interface' }
    ]
  },
  {
    id: 'password-manager',
    name: 'Password Vault',
    tagline: 'Encrypted Credential & VAT Portal Vault for Firms',
    category: 'utility',
    description: 'Enterprise credential vault specifically customized for tax firms and consultants managing hundreds of client NBR portal passwords, custom tokens, and confidential keys.',
    icon: 'bi-shield-lock-fill',
    color: '#6366f1',
    status: 'Live',
    url: '#',
    highlightMetric: 'AES-256 GCM Encrypted',
    features: [
      'Zero-Knowledge Client-Side Encryption',
      'Firm Client Portal Auto-Fill Access',
      'Team Role-Based Credential Sharing',
      'Audit Logs on Every Password Reveal'
    ],
    specs: [
      { label: 'Encryption', val: 'AES-256 Bit GCM' },
      { label: 'Key Storage', val: 'Hardware Security Module Compatible' },
      { label: 'Compliance', val: 'Strict Zero-Knowledge Protocol' }
    ]
  }
];

export const servicesData: Service[] = [
  {
    id: 'vat-consultancy',
    title: 'NBR VAT Software & Automation',
    description: 'End-to-end VAT digitisation and compliance engineering for large enterprises, manufacturers, and audit firms.',
    icon: 'bi-patch-check-fill',
    color: '#00d2ff',
    points: [
      'Mushak 6.1, 6.2, 6.2.1 Books of Accounts',
      'Submissions, VDS, & Rebate Diagnostics',
      'Legacy Accounting to e-VAT Integration'
    ]
  },
  {
    id: 'custom-erp',
    title: 'Custom Enterprise Software & ERP',
    description: 'Custom-tailored business systems built with ultra-fast TypeScript architectures, high concurrency, and resilient reliability.',
    icon: 'bi-cpu-fill',
    color: '#3b82f6',
    points: [
      'Multi-Branch POS & Warehouse Inventory',
      'Custom Workflow Automation & APIs',
      'Relational Schema Architecture (PostgreSQL)'
    ]
  },
  {
    id: 'retail-pos',
    title: 'Retail POS & Multi-Branch Systems',
    description: 'Seamless point of sale, barcode generation, inventory tracking, thermal printing, and centralized multi-outlet cloud sync.',
    icon: 'bi-shop-window',
    color: '#f59e0b',
    points: [
      'Ultra-Fast Offline-First POS Checkout',
      'Real-Time Multi-Outlet Inventory Sync',
      'Customer Due, Supplier Ledger & SMS Invoicing'
    ]
  },
  {
    id: 'inhouse-servers',
    title: 'In-House Dedicated Physical Servers & Hosting',
    description: 'Self-hosted on proprietary private server machines with automated encrypted backups, full data sovereignty, and 99.99% reliability.',
    icon: 'bi-hdd-rack-fill',
    color: '#10b981',
    points: [
      'In-House Private Dedicated Server Machines',
      '100% Data Sovereignty & Hardware Control',
      'Automated Daily Encrypted Backups & Disaster Recovery'
    ]
  }
];

export const techStackData = [
  { name: 'Node.js', desc: 'Asynchronous JavaScript Runtime', icon: 'bi-hexagon-fill', color: '#22c55e' },
  { name: 'Express.js', desc: 'Fast REST APIs & Microservices', icon: 'bi-server', color: '#38bdf8' },
  { name: 'MySQL', desc: 'High-Performance Relational Database', icon: 'bi-database-fill', color: '#0ea5e9' },
  { name: 'PostgreSQL', desc: 'Enterprise Relational Cluster', icon: 'bi-database-fill-gear', color: '#3b82f6' },
  { name: 'Vue 3 & Vite', desc: 'Reactive SPA & Micro-Interactions', icon: 'bi-window-stack', color: '#10b981' },
  { name: 'Bun & Hono', desc: 'Ultra-Fast TypeScript Backend', icon: 'bi-lightning-charge-fill', color: '#f59e0b' },
  { name: 'Drizzle ORM', desc: 'Type-Safe Schema & Migrations', icon: 'bi-code-slash', color: '#00d2ff' },
  { name: 'Redis Engine', desc: 'Sub-Millisecond Cache & Queues', icon: 'bi-hdd-network-fill', color: '#ef4444' },
  { name: 'VAT Logic Engine', desc: 'Bangladesh Mushak & Tax Rules', icon: 'bi-calculator-fill', color: '#a855f7' }
];

export const statsOverview = [
  { number: '100K+', label: 'VAT Invoices Processed', icon: 'bi-receipt-cutoff' },
  { number: '500+', label: 'Enterprise & Firm Clients', icon: 'bi-buildings' },
  { number: '0.1s', label: 'Ultra-Fast POS Response', icon: 'bi-lightning-charge-fill' },
  { number: '99.99%', label: 'Infrastructure Uptime', icon: 'bi-activity' },
  { number: '24/7', label: 'Direct Technical Support', icon: 'bi-headset' }
];

export const faqList: FaqItem[] = [
  {
    category: 'VAT & IDP',
    question: 'How does IDP help with NBR VAT return submissions?',
    answer: 'IDP automates your entire monthly VAT process. You can upload purchase invoices in bulk via Excel, and the system automatically compiles Mushak 6.1 (Purchase Register), Mushak 6.2 (Sales Register), and generates exact return schedule calculations ready for e-VAT submission.'
  },
  {
    category: 'POS & Fashion',
    question: 'How does Shailik manage apparel sizes and variants?',
    answer: 'Shailik is specifically engineered for garments, boutique, and fashion retailers with a multi-variant size-color-fabric matrix, custom tailoring tracking, barcode printing, and seasonal campaign discounts.'
  },
  {
    category: 'Retail POS',
    question: 'Can Baybosayee POS work across multiple branch locations?',
    answer: 'Yes! Baybosayee POS is built with centralized cloud synchronization. All your retail branches, warehouses, and cash counters update inventory and sales figures in real time with comprehensive manager oversight.'
  },
  {
    category: 'Custom ERP',
    question: 'Can iSupportBD build bespoke software tailored to our business?',
    answer: 'Yes, all our enterprise architectures are modular and extensible. We engineer custom workflow engines, multi-branch databases, third-party payment gateways, and custom reporting tailored to your specific organizational needs.'
  },
  {
    category: 'Security',
    question: 'How is confidential client data secured in iSupportBD platforms?',
    answer: 'We implement bank-grade AES-256 encryption, role-based access control (RBAC), and strict data isolation. Backups are automated and encrypted, ensuring your corporate and tax records remain 100% confidential and disaster-proof.'
  },
  {
    category: 'Support',
    question: 'How do I get technical assistance or a live product demo?',
    answer: 'You can contact our direct support team anytime via WhatsApp/Mobile at 01719950891 or email at isupportbd.info@gmail.com. We provide free live demonstrations and bespoke onboarding for all products.'
  }
];

export const contactInfo = {
  phone: '01719950891',
  phoneDisplay: '01719950891',
  altPhone: '+8809658069188',
  email: 'isupportbd.info@gmail.com',
  altEmail: 'admin@isupportbd.com',
  website: 'https://isupportbd.com',
  location: 'Dhaka & Chittagong, Bangladesh',
  whatsappUrl: 'https://wa.me/8801719950891',
  workingHours: '24/7 Support Available'
};
