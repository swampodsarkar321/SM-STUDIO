import {
  Bot,
  Gamepad2,
  Globe,
  LayoutDashboard,
  PenTool,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  id: string
  icon: LucideIcon
  title: string
  text: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    id: 'website',
    icon: Globe,
    title: 'Website Development',
    text: 'Business sites, landing pages, portfolios and product catalogs that look sharp and load fast on every screen.',
    deliverables: [
      'Responsive layout',
      'On-page SEO basics',
      'Contact and WhatsApp CTA',
      'Speed-optimised build',
    ],
  },
  {
    id: 'webapp',
    icon: LayoutDashboard,
    title: 'Web Applications',
    text: 'Dashboards, inventory tools, invoice generators and booking systems built around how your team actually works.',
    deliverables: [
      'Scope and feature map',
      'Role-based screens',
      'Sample data prototype',
      'Testing checklist',
    ],
  },
  {
    id: 'bots',
    icon: Bot,
    title: 'Automation & Bots',
    text: 'Workflow automation, Telegram and Discord bots, and messaging integrations that remove repetitive manual work.',
    deliverables: [
      'Workflow audit',
      'Bot commands and flows',
      'Error handling',
      'Deployment notes',
    ],
  },
  {
    id: 'android',
    icon: Smartphone,
    title: 'Android App Development',
    text: 'Utility apps, business apps and MVPs. Scope is confirmed in writing before any work begins.',
    deliverables: [
      'MVP feature list',
      'Installable build',
      'Basic app screens',
      'Handover documentation',
    ],
  },
  {
    id: 'games',
    icon: Gamepad2,
    title: 'Game Development',
    text: 'Browser games, mini-games and interactive prototypes that are easy to share and fun to use.',
    deliverables: [
      'Game concept',
      'Playable prototype',
      'Score or progress logic',
      'Browser build',
    ],
  },
  {
    id: 'uiux',
    icon: PenTool,
    title: 'UI/UX & Redesign',
    text: 'Mobile-first redesigns and usability improvements for existing products that need a clearer, calmer interface.',
    deliverables: ['UX review', 'Wireframes', 'Visual redesign', 'Developer-ready specs'],
  },
]

export type Plan = {
  id: string
  price: string
  tagline: string
  items: string[]
  featured?: boolean
}

export const plans: Plan[] = [
  {
    id: 'Starter Landing Page',
    price: '৳1,500',
    tagline: 'A focused page for one offer or campaign.',
    items: [
      'One responsive landing page',
      'Headline, sections and CTA copy layout',
      'Basic on-page SEO',
      'WhatsApp or email contact CTA',
      'One revision round',
    ],
  },
  {
    id: 'Business Website',
    price: '৳3,000',
    tagline: 'A complete site for a small business.',
    featured: true,
    items: [
      'Up to five pages or sections',
      'Product or service showcase',
      'Contact form UI',
      'Mobile-first layout',
      'Basic SEO and sitemap',
      'Two revision rounds',
    ],
  },
  {
    id: 'Custom Web Application',
    price: '৳5,000+',
    tagline: 'A tailored tool for your workflow.',
    items: [
      'Custom feature planning',
      'Dashboard or workflow UI',
      'Scope-based implementation',
      'Testing and delivery plan',
      'Handover documentation',
      'Optional ongoing support',
    ],
  },
]

export type Project = {
  id: string
  name: string
  cat: string
  kind: string
  text: string
  tech: string[]
  features: string[]
  demo?: string
  accent: string
}

export const projects: Project[] = [
  {
    id: 'shopstarter',
    name: 'ShopStarter BD',
    cat: 'Websites',
    kind: 'E-commerce website demo',
    text: 'A storefront demo with a filterable catalog, cart, wishlist and a complete sample checkout flow.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    features: [
      'Product catalog',
      'Category filter & sorting',
      'Cart and demo checkout',
      'Wishlist and badges',
      'WhatsApp CTA',
    ],
    demo: '/demo/shopstarter',
    accent: 'from-indigo-500/30 via-violet-500/20 to-cyan-400/20',
  },
  {
    id: 'restaurantpro',
    name: 'RestaurantPro',
    cat: 'Websites',
    kind: 'Restaurant website demo',
    text: "A restaurant site concept with a chef's special, menu, gallery, guest reviews and reservation inquiry.",
    tech: ['React', 'Tailwind'],
    features: [
      'Introduction',
      "Chef's special",
      'Tabbed menu',
      'Food gallery',
      'Guest reviews',
      'Reservation inquiry',
    ],
    demo: '/demo/restaurantpro',
    accent: 'from-amber-500/30 via-orange-500/20 to-rose-500/20',
  },
  {
    id: 'biztrack',
    name: 'BizTrack Lite',
    cat: 'Web Apps',
    kind: 'Business management app demo',
    text: 'A dashboard demo with switchable views, inventory, invoicing and sales summary using sample data only.',
    tech: ['React', 'TypeScript'],
    features: [
      'Switchable dashboard views',
      'Add product flow',
      'Invoice creation',
      'Sales summary',
      'Search, filters and low-stock alerts',
    ],
    demo: '/demo/biztrack',
    accent: 'from-emerald-500/30 via-teal-500/20 to-cyan-400/20',
  },
  {
    id: 'bots',
    name: 'BotLab',
    cat: 'Bots',
    kind: 'Chatbot auto-reply demo',
    text: 'A chatbot concept with working auto-reply flows styled for Telegram, Facebook Messenger and Discord.',
    tech: ['React', 'TypeScript'],
    features: [
      'Telegram / Messenger / Discord views',
      'Keyword auto-replies',
      'Quick replies and commands',
      'Human handoff step',
      'Runs in the browser',
    ],
    demo: '/demo/bots',
    accent: 'from-violet-500/30 via-fuchsia-500/20 to-indigo-400/20',
  },
]

export const filters = ['All Projects', 'Websites', 'Web Apps', 'Bots', 'Android Apps', 'Games']

export const process = [
  {
    step: '01',
    title: 'Discovery & scope',
    text: 'We talk through the goal, audience and must-have features, then agree on a written scope and price.',
  },
  {
    step: '02',
    title: 'Design & prototype',
    text: 'You see the layout and key screens early, so changes happen before development gets expensive.',
  },
  {
    step: '03',
    title: 'Build & test',
    text: 'The product is built in small stages, checked on real phone and desktop sizes, and shared for feedback.',
  },
  {
    step: '04',
    title: 'Launch & support',
    text: 'We deploy, hand over the code and documentation, and stay available for a fixed support window.',
  },
]

export const stats = [
  { value: '6', label: 'Service areas' },
  { value: '4', label: 'Live demos' },
  { value: '24h', label: 'Reply target' },
  { value: '100%', label: 'Custom code' },
]

export type Faq = { q: string; a: string }

export const faqs: Faq[] = [
  {
    q: 'How long does a typical project take?',
    a: 'A landing page usually takes 3–5 working days. A business website takes 1–2 weeks. Web apps and custom tools depend on scope, and you get a timeline before work starts.',
  },
  {
    q: 'How do payments work?',
    a: 'Projects start with a deposit, with the remainder due on delivery. For larger builds the payment is split across milestones. Every amount is agreed in writing first.',
  },
  {
    q: 'Do you work with clients outside Bangladesh?',
    a: 'Yes. Work is remote, communication is in English or Bengali, and we schedule calls to match your timezone.',
  },
  {
    q: 'What is not included in the price?',
    a: 'Domain, hosting, paid APIs, payment gateway fees and major scope changes are excluded unless agreed separately. Each package has a fixed number of revision rounds.',
  },
  {
    q: 'Can you maintain the site after launch?',
    a: 'Yes. Handover includes the source code and notes. Ongoing maintenance is available as an optional monthly arrangement.',
  },
  {
    q: 'How do we start?',
    a: 'Send a short message through the contact page or WhatsApp describing what you need. You will get a reply with questions and a clear next step.',
  },
]

export const tech = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
  'Node.js',
  'REST APIs',
  'Git',
  'Vercel',
]

export const budgets = [
  'Under ৳3,000',
  '৳3,000–৳10,000',
  '৳10,000–৳30,000',
  '৳30,000+',
  'Not sure yet',
]

export const timelines = ['As soon as possible', 'Within 1 month', '1–3 months', 'Flexible']
