import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StatPill } from "@/components/ui/StatPill";
import { Button } from "@/components/ui/Button";
import { departmentCatalog, proofPoints } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Features",
  description:
    "See how Alyvon's AI workforce turns briefs into finished deliverables across 16 departments, with human approval on every send.",
};

const capabilities = [
  {
    title: "A department for every function",
    description: `${proofPoints.specialistCount} specialists across ${proofPoints.departmentCount} departments — RevOps, Marketing, Sales, Design, Engineering, Finance, and more — each with its own tools and working style, ready to pick up work the moment you hand it off.`,
  },
  {
    title: "Brief in, deliverable out",
    description:
      "Hand a department a brief the way you'd brief a new hire. It comes back with a finished deliverable — a document, an asset, a report, a code change — not a list of suggestions for you to execute.",
  },
  {
    title: `${proofPoints.integrationCount} MCP integrations`,
    description:
      "Departments work inside the tools you already run — CRM, docs, spreadsheets, code, communication — connected through the Model Context Protocol, not a walled-garden dashboard you have to copy data out of.",
  },
  {
    title: "Human approval before anything external",
    description:
      "Every send or publish action — an email, a Slack message, a public post — sits behind a human approval gate. Nothing reaches a customer, a channel, or the public without a person signing off first.",
  },
  {
    title: "Departments that work together",
    description:
      "A RevOps report can pull data Finance already validated. A Marketing campaign can hand assets to Design for polish. Departments share context instead of operating as disconnected point tools.",
  },
  {
    title: "Scales with deliverable volume, not headcount",
    description:
      "Add departments and deliverable capacity as work grows, without the lead time, onboarding cost, or fixed overhead of a new hire.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Section className="text-center">
        <SectionHeading
          eyebrow="Features"
          title="One workforce, sixteen departments."
          description="Alyvon replaces the slow parts of hiring and agencies with an AI workforce that takes a brief and comes back with a finished deliverable."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatPill value={`${proofPoints.specialistCount}`} label="specialists" />
          <StatPill value={`${proofPoints.departmentCount}`} label="departments" />
          <StatPill value={proofPoints.integrationCount} label="MCP integrations" />
        </div>
      </Section>

      <Section surface="surface">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <Card key={capability.title}>
              <h3 className="text-lg font-semibold text-ink">{capability.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {capability.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Departments"
          title="Every department, ready when you need it."
          description="Not every plan includes every department — see Pricing for what's included at each tier."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {departmentCatalog.map((department) => (
            <span
              key={department}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-ink"
            >
              {department}
            </span>
          ))}
        </div>
      </Section>

      <Section surface="altsurface" className="text-center">
        <SectionHeading
          title="See it work on your own brief."
          description={`Start a ${proofPoints.trialDays}-day free trial and hand a real brief to a department today.`}
        />
        <div className="mt-8">
          <Button href="/contact">Start free trial</Button>
        </div>
      </Section>
    </>
  );
}
