import Link from "next/link";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { primaryNav, siteConfig } from "@/lib/site-data";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden text-sm font-medium text-ink/80 hover:text-accent sm:block"
          >
            Log in
          </Link>
          <Button href="/contact" className="!px-5 !py-2.5 text-sm">
            Start free trial
          </Button>
        </div>
      </Container>
    </header>
  );
}
