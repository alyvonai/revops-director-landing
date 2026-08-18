import { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  surface?: "background" | "surface" | "altsurface";
  id?: string;
};

const surfaceClass: Record<NonNullable<SectionProps["surface"]>, string> = {
  background: "bg-background",
  surface: "bg-surface",
  altsurface: "bg-altsurface",
};

export function Section({
  children,
  className = "",
  surface = "background",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`${surfaceClass[surface]} py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
