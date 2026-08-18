import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { pricingTiers, proofPoints } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, deliverable-based pricing for Alyvon's AI workforce. Start with a 14-day free trial — no credit card required.",
};

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Every plan starts with a 14-day free trial — no credit card required to start, and you can cancel anytime with no contracts. You'll get a feel for real deliverable output before paying anything.",
  },
  {
    question: "What counts as a deliverable?",
    answer:
      "A deliverable is a completed piece of output from a department — a document, a piece of content, a report, a code change, or similar. Each plan includes a monthly deliverable allowance, with overage billed per additional deliverable at your plan's rate.",
  },
  {
    question: "What's the Creative Add-on?",
    answer:
      "The Creative Add-on unlocks expanded creative capabilities — additional creative departments and higher-fidelity asset production — on top of the Growth and Scale plans.",
  },
  {
    question: "Can I bring my own Anthropic API key?",
    answer:
      "BYOK (Bring Your Own Anthropic API Key) is available exclusively on the Enterprise plan, alongside custom governance and negotiated volume.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can upgrade as your deliverable volume or department needs grow, or talk to Sales about an Enterprise plan built around your committed volume.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="text-center">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing, real deliverables."
          description={`Every plan includes a ${proofPoints.trialDays}-day free trial — no credit card required, cancel anytime, no contracts.`}
        />
      </Section>

      <Section surface="surface">
        <div className="grid gap-6 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col ${
                tier.featured ? "border-accent shadow-[0_0_0_2px_#DE4B12]" : ""
              }`}
            >
              {tier.featured && (
                <div className="mb-4">
                  <Badge>Most popular</Badge>
                </div>
              )}
              <h3 className="text-xl font-semibold text-ink">{tier.name}</h3>
              <p className="mt-2 text-sm text-muted">{tier.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-ink">{tier.price}</span>
                {tier.priceSuffix && (
                  <span className="text-sm text-muted">{tier.priceSuffix}</span>
                )}
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-ink/80">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                href={tier.ctaHref}
                variant={tier.featured ? "primary" : "ghost"}
                className="mt-8 w-full"
              >
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="FAQ"
          title="Pricing questions, answered."
          align="left"
        />
        <div className="mt-8">
          <FAQAccordion items={faqs} />
        </div>
      </Section>

      <Section surface="altsurface" className="text-center">
        <SectionHeading
          title="Still not sure which plan fits?"
          description="Talk with Sales and we'll help you size the right plan for your department mix and deliverable volume."
        />
        <div className="mt-8">
          <Button href="/contact">Talk with Sales</Button>
        </div>
      </Section>
    </>
  );
}
