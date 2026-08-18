import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

// Note: the full marketing homepage lives outside the scope of this change
// (this PR adds the 8 new marketing pages: Pricing, Features, Case Studies,
// Integrations, Security, About, Careers, Contact). This is a minimal
// placeholder so the site has a working root route and the new pages are
// reachable via the nav — it uses the same design system as every other page.
export default function HomePage() {
  return (
    <Section className="text-center">
      <SectionHeading
        eyebrow="Alyvon"
        title="Your AI workforce, department by department."
        description="102 specialists across 16 departments, ready to pick up delivery work today — at a fraction of the cost of a hire."
      />
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href="/features">Explore features</Button>
        <Button href="/pricing" variant="ghost">
          View pricing
        </Button>
      </div>
    </Section>
  );
}
