import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { proofPoints } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Alyvon is building an AI workforce so growing teams can take on more work without the lead time and cost of a growing headcount.",
};

const values = [
  {
    title: "A brief in, a finished deliverable out",
    description:
      "We measure Alyvon against what a good hire or a good agency actually delivers — not a dashboard of suggestions you still have to execute yourself.",
  },
  {
    title: "A human stays in control",
    description:
      "Speed doesn't mean removing judgment. Every external action — a send, a publish, a message — waits for a person to approve it.",
  },
  {
    title: "Built where the work already happens",
    description:
      "We'd rather connect to the CRM, docs, and tools you already run than ask you to move your team into a new system.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="text-center">
        <SectionHeading
          eyebrow="About"
          title="We're building the workforce a growing team can't hire fast enough."
          description="Alyvon is a small, senior team of operators and engineers who've felt the same problem first-hand: real work waiting on headcount that takes months to add and a budget that doesn't stretch to an agency retainer."
        />
      </Section>

      <Section surface="surface">
        <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          <p>
            We started Alyvon because the gap between "we know what needs to get done" and
            "we have someone who can do it" is where most growing teams lose momentum. Hiring is
            slow and expensive. Agencies are expensive and slow to ramp. Meanwhile the work — the
            campaign, the report, the proposal, the pipeline review — is due this week.
          </p>
          <p>
            Alyvon is our answer: {proofPoints.specialistCount} specialists across{" "}
            {proofPoints.departmentCount} departments, connected to the tools you already run
            through {proofPoints.integrationCount} MCP integrations, built to take a brief and
            come back with a deliverable you can actually use — with a person still approving
            anything that goes external.
          </p>
          <p>
            We're early. This site doesn't have a long roster of case studies or a decade of
            history yet, and we'd rather say that plainly than dress it up. What we do have is a
            product we use ourselves, a growing set of teams putting it to work, and a lot left to
            build.
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="What we optimize for" title="How we build" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title}>
              <h3 className="text-lg font-semibold text-ink">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section surface="altsurface" className="text-center">
        <SectionHeading
          title="Want to talk to the team building this?"
          description="We read every message that comes through the contact page ourselves."
        />
        <div className="mt-8">
          <Button href="/contact">Get in touch</Button>
        </div>
      </Section>
    </>
  );
}
