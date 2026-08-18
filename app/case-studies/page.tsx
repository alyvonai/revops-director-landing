import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { caseStudyScenarios } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See illustrative scenarios of how agencies, SaaS teams, and professional services firms deploy Alyvon's AI workforce.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Section className="text-center">
        <SectionHeading
          eyebrow="Case Studies"
          title="What deploying Alyvon looks like."
          description="Alyvon is early — these are illustrative scenarios showing how teams like yours could put departments to work, not published customer results."
        />
      </Section>

      <Section surface="surface">
        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudyScenarios.map((scenario) => (
            <Card key={scenario.archetype} className="flex flex-col">
              <Badge>Illustrative scenario</Badge>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                {scenario.archetype}
              </h3>
              <p className="mt-1 text-sm text-muted">{scenario.companyProfile}</p>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Challenge</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{scenario.challenge}</p>
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Approach</p>
                <ul className="mt-1 space-y-1.5 text-sm leading-relaxed text-ink/80">
                  {scenario.approach.map((step) => (
                    <li key={step} className="flex gap-2">
                      <span className="text-accent">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">What could change</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{scenario.outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <SectionHeading
          title="Want a scenario mapped to your business?"
          description="Tell us about your team and we'll walk through which departments would carry the most weight first."
        />
        <div className="mt-8">
          <Button href="/contact">Talk with us</Button>
        </div>
      </Section>
    </>
  );
}
