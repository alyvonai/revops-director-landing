import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Alyvon protects your data: encryption, least-privilege access, and a human approval gate before anything reaches a customer or the public.",
};

const principles = [
  {
    title: "Encryption in transit and at rest",
    description:
      "Data moving between your tools, Alyvon, and model providers is encrypted in transit. Stored data is encrypted at rest.",
  },
  {
    title: "Least-privilege access",
    description:
      "Integrations are scoped to what a department actually needs to do its job — not broad, standing access to every system you connect.",
  },
  {
    title: "Human approval before anything external",
    description:
      "No email send, message, publish, or public-facing action leaves Alyvon without a person approving it first. Departments draft and prepare — a human decides what goes out.",
  },
  {
    title: "Your API key stays yours (Enterprise)",
    description:
      "Enterprise customers can bring their own Anthropic API key (BYOK), keeping model usage under their own account and billing relationship.",
  },
];

const faqItems = [
  {
    question: "Where is my data stored?",
    answer:
      "Customer data is stored with encryption at rest and is used only to deliver the service to that customer — it is not used to train models for other customers.",
  },
  {
    question: "Can Alyvon send emails or messages without a human seeing them first?",
    answer:
      "No. Any action that sends, publishes, or otherwise reaches an external party or channel requires human approval before it happens.",
  },
  {
    question: "Do you support single sign-on or granular permissions?",
    answer:
      "Enterprise plans support custom governance and approval workflows. Talk with sales about your specific access-control requirements.",
  },
  {
    question: "Can we bring our own model API key?",
    answer:
      "Yes — Bring Your Own Anthropic API Key (BYOK) is available on the Enterprise plan.",
  },
  {
    question: "Do you have a compliance certification we can review?",
    answer:
      "We don't have a specific certification to publish today. If a formal compliance review is a requirement for your organization, tell us in a demo and we'll walk through what we can share.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <Section className="text-center">
        <SectionHeading
          eyebrow="Security"
          title="Built with a human decision on every external action."
          description="Alyvon is designed so your data stays protected and nothing reaches a customer, a channel, or the public without a person approving it first."
        />
      </Section>

      <Section surface="surface">
        <div className="grid gap-6 md:grid-cols-2">
          {principles.map((principle) => (
            <Card key={principle.title}>
              <h3 className="text-lg font-semibold text-ink">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{principle.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Common security questions" />
        <div className="mt-10">
          <FAQAccordion items={faqItems} />
        </div>
      </Section>

      <Section surface="altsurface" className="text-center">
        <SectionHeading
          title="Have a security questionnaire to review?"
          description="Send it over and we'll walk through it together."
        />
        <div className="mt-8">
          <Button href="/contact">Talk with us</Button>
        </div>
      </Section>
    </>
  );
}
