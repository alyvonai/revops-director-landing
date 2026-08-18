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
