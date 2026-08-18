import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig, proofPoints } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a free trial, ask a question, or talk with sales about Alyvon's AI workforce.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="text-center">
        <SectionHeading
          eyebrow="Contact"
          title="Tell us what you're trying to get done."
          description={`Whether you want to start a ${proofPoints.trialDays}-day free trial or just have a question, a real person reads every message.`}
        />
      </Section>

      <Section surface="surface">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Card>
              <ContactForm />
            </Card>
          </div>
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <h3 className="text-lg font-semibold text-ink">Prefer email?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                General questions:{" "}
                <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent underline">
                  {siteConfig.supportEmail}
                </a>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Sales and Enterprise:{" "}
                <a href={`mailto:${siteConfig.salesEmail}`} className="text-accent underline">
                  {siteConfig.salesEmail}
                </a>
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-ink">No credit card required</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Every plan starts with a {proofPoints.trialDays}-day free trial. Cancel anytime,
                no contracts.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
