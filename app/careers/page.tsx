import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Alyvon is a small, early team. There are no open roles listed right now, but we'd like to hear from people who want to help build this.",
};

export default function CareersPage() {
  return (
    <>
      <Section className="text-center">
        <SectionHeading
          eyebrow="Careers"
          title="No open roles right now — but we're always meeting people."
          description="Alyvon is a small, early-stage team. We don't have a list of open positions today, and we'd rather tell you that directly than post a role that isn't real."
        />
      </Section>

      <Section surface="surface">
        <div className="mx-auto max-w-2xl">
          <Card>
            <h3 className="text-lg font-semibold text-ink">Want to be first in line when that changes?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              As we grow, we'll hire for the roles that match where the product and the team
              actually are — not before. If you'd like to introduce yourself in the meantime, tell
              us a bit about what you do and what you're looking for. We read every message
              ourselves and will reach out if something opens up that fits.
            </p>
            <div className="mt-6">
              <Button href="/contact">Introduce yourself</Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="What we look for"
          title="When we do hire, here's the kind of person we're looking for"
          description="This isn't a job posting — it's a preview of what matters to us, so you know if it's worth reaching out."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="text-lg font-semibold text-ink">Comfortable with ambiguity</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Early-stage means the roadmap changes as we learn. We look for people who can make
              good calls with incomplete information.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-ink">Ownership over a narrow lane</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              A small team means everyone touches more than one part of the problem. We value
              people who pick things up rather than wait to be assigned.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-ink">Care about the details customers feel</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Whether it's copy, a deliverable, or a support reply — we want people who notice the
              details that make something feel finished.
            </p>
          </Card>
        </div>
      </Section>

      <Section surface="altsurface" className="text-center">
        <SectionHeading
          title="Not a fit today, but curious about Alyvon?"
          description="Take a look at what the product actually does."
        />
        <div className="mt-8">
          <Button href="/features">See Features</Button>
        </div>
      </Section>
    </>
  );
}
