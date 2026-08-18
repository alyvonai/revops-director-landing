import Link from "next/link";
import { Container } from "../ui/Container";
import { footerNav, siteConfig } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="text-lg font-semibold text-ink">{siteConfig.name}</div>
            <p className="mt-2 max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
          </div>
          {footerNav.map((group) => (
            <div key={group.title}>
              <div className="text-sm font-semibold text-ink">{group.title}</div>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-accent">
            {siteConfig.supportEmail}
          </a>
        </div>
      </Container>
    </footer>
  );
}
