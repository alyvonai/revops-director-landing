import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StatPill } from "@/components/ui/StatPill";
import { Button } from "@/components/ui/Button";
import { integrationCategories, proofPoints } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Alyvon connects to the tools you already run through the Model Context Protocol (MCP) — 1,000+ integrations across CRM, communication, docs, data, dev, and finance.",
};

export default function IntegrationsPage() {
  return (
    <>
      <Section className="text-center">
        <SectionHeading
          eyebrow="Integrations"
          title="Works inside the tools you already run."
          description="Departments connect to your stack through the Model Context Protocol (MCP) instead of asking you to move work into a new dashboard."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatPill value={proofPoints.integrationCount} label="MCP integrations" />
          <StatPill value={`${proofPoints.departmentCount}`} label="departments" />
          <StatPill value={`${proofPoints.specialistCount}`} label="specialists" />
        </div>
      </Section>

      <Section surface="surface">
        <SectionHeading
          eyebrow="Catalogue"
          title="A connector for nearly every system of record."
          description="A sample of what's connected today — new integrations are added continuously as the MCP ecosystem grows."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrationCategories.map((group) => (
            <Card key={group.category}>
              <h3 className="text-lg font-semibold text-ink">{group.category}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-ink">Built on the Model Context Protocol</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              MCP is an open protocol for connecting AI systems to external tools and data. Because
              Alyvon is built on it, departments read and write directly in the systems your team
              already uses — no manual export/import step, and no data silo unique to Alyvon.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-ink">Don't see your tool?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The MCP ecosystem is growing quickly and new connectors ship regularly. Tell us what
              you run and we'll let you know what's available or in progress for your stack.
            </p>
          </Card>
        </div>
      </Section>

      <Section surface="altsurface" className="text-center">
        <SectionHeading
          title="Connect your stack in your trial."
          description={`Start a ${proofPoints.trialDays}-day free trial and connect the tools your team already runs.`}
        />
        <div className="mt-8">
          <Button href="/contact">Start free trial</Button>
        </div>
      </Section>
    </>
  );
}
