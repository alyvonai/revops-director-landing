// Single source of truth for facts referenced across marketing pages.
// Keep every page importing from here instead of hardcoding numbers/claims,
// so a future correction only has to happen in one place.

export const siteConfig = {
  name: "Alyvon",
  tagline: "Your AI workforce, department by department.",
  supportEmail: "hello@alyvon.ai",
  salesEmail: "sales@alyvon.ai",
};

export const proofPoints = {
  specialistCount: 102,
  departmentCount: 16,
  integrationCount: "1,000+",
  trialDays: 14,
};

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Security", href: "/security" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export type PricingTier = {
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  deliverables: string;
  departments: string;
  seats: string;
  overage: string;
  cta: string;
  ctaHref: string;
  featured?: boolean;
  features: string[];
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$299",
    priceSuffix: "/mo",
    description: "For a single team testing whether an AI workforce can carry real workload.",
    deliverables: "40 deliverables/month",
    departments: "3 departments included",
    seats: "2 seats",
    overage: "$9 per additional deliverable",
    cta: "Start free trial",
    ctaHref: "/contact",
    features: [
      "40 deliverables / month",
      "3 departments included",
      "2 seats",
      "$9 overage per additional deliverable",
      "Core MCP integrations",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$899",
    priceSuffix: "/mo",
    description: "For teams replacing multiple hires across departments at once.",
    deliverables: "150 deliverables/month",
    departments: "8 departments included",
    seats: "8 seats",
    overage: "$7 per additional deliverable",
    cta: "Start free trial",
    ctaHref: "/contact",
    featured: true,
    features: [
      "150 deliverables / month",
      "8 departments included",
      "8 seats",
      "$7 overage per additional deliverable",
      "Full MCP integration library",
      "Creative Add-on available",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    price: "$2,400",
    priceSuffix: "/mo",
    description: "For organizations running most of their delivery function through Alyvon.",
    deliverables: "400 deliverables/month",
    departments: "All 16 departments included",
    seats: "25 seats",
    overage: "$5 per additional deliverable",
    cta: "Start free trial",
    ctaHref: "/contact",
    features: [
      "400 deliverables / month",
      "All 16 departments included",
      "25 seats",
      "$5 overage per additional deliverable",
      "Full MCP integration library",
      "Creative Add-on available",
      "Dedicated onboarding",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with committed volume, custom governance, or BYOK requirements.",
    deliverables: "Volume set with your team",
    departments: "All 16 departments included",
    seats: "Unlimited seats",
    overage: "Negotiated overage",
    cta: "Talk with Sales",
    ctaHref: "/contact",
    features: [
      "Committed volume, set with your team",
      "All 16 departments included",
      "Unlimited seats",
      "Negotiated overage",
      "Bring Your Own Anthropic API Key (BYOK)",
      "Custom governance & approval workflows",
    ],
  },
];

export const departmentCatalog = [
  "RevOps",
  "Marketing",
  "Sales Development",
  "Customer Success",
  "Finance",
  "People Ops",
  "Product",
  "Engineering",
  "Design",
  "Data & Analytics",
  "Legal & Compliance",
  "IT",
  "Support",
  "Content",
  "Research",
  "Executive Ops",
];

// Illustrative scenarios, not real named customers — Alyvon is early-stage and
// does not yet have case studies to publish. Each entry is clearly labeled
// "Illustrative scenario" in the UI. Do not add a real company name/logo here
// without confirming it is a real, consented customer reference.
export type CaseStudyScenario = {
  archetype: string;
  companyProfile: string;
  challenge: string;
  approach: string[];
  outcome: string;
};

export const caseStudyScenarios: CaseStudyScenario[] = [
  {
    archetype: "Agency",
    companyProfile: "Illustrative scenario — 35-person performance marketing agency, USA",
    challenge:
      "New client work kept stalling behind a single overloaded creative team, and hiring a fourth designer wasn't justified by the pipeline yet.",
    approach: [
      "Stood up the Marketing and Design departments to pick up campaign briefs directly from account leads",
      "Connected Slack and Google Drive via MCP so deliverables landed where the team already worked",
      "Kept a human approval gate on every asset before it reached a client",
    ],
    outcome:
      "The agency could say yes to new retainer work without opening a new req, and account leads got first drafts back same-day instead of queuing behind the design backlog.",
  },
  {
    archetype: "SaaS team",
    companyProfile: "Illustrative scenario — 60-person B2B SaaS company, Series A",
    challenge:
      "A lean RevOps function was manually stitching together pipeline reporting from HubSpot and Google Sheets every week, leaving no time for process work.",
    approach: [
      "Deployed the RevOps Director to own recurring pipeline and forecast reporting",
      "Connected HubSpot and Google Sheets via MCP integrations",
      "Used Finance and Data & Analytics departments for ad hoc board-deck requests",
    ],
    outcome:
      "The RevOps lead moved from producing reports to reviewing and acting on them, with recurring reporting running on a schedule instead of a Friday scramble.",
  },
  {
    archetype: "Professional services firm",
    companyProfile: "Illustrative scenario — 80-person consulting firm, USA",
    challenge:
      "Proposal and SOW turnaround was the firm's biggest sales-cycle bottleneck, bottlenecked on one overloaded ops generalist.",
    approach: [
      "Rolled out the Sales Development and Legal & Compliance departments for first-draft proposals and SOWs",
      "Used Notion and Google Docs integrations so drafts landed in the firm's existing knowledge base",
      "Kept partners in the loop with a human approval step before anything went to a prospect",
    ],
    outcome:
      "First drafts moved from days to hours, and the ops generalist shifted from drafting documents to reviewing and closing them out.",
  },
];

export const integrationCategories: { category: string; tools: string[] }[] = [
  {
    category: "CRM & Revenue",
    tools: ["Salesforce", "HubSpot", "Pipedrive", "Close", "Attio"],
  },
  {
    category: "Communication",
    tools: ["Slack", "Gmail", "Outlook", "Zoom", "Intercom"],
  },
  {
    category: "Docs & Knowledge",
    tools: ["Google Docs", "Notion", "Confluence", "SharePoint"],
  },
  {
    category: "Data & Analytics",
    tools: ["Google Sheets", "Supabase", "Snowflake", "PostHog", "Looker"],
  },
  {
    category: "Dev & Infra",
    tools: ["GitHub", "GitLab", "Vercel", "Linear", "Jira"],
  },
  {
    category: "Finance & Ops",
    tools: ["QuickBooks", "NetSuite", "Stripe", "Brex"],
  },
];
