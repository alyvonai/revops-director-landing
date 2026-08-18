export function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-card border border-border bg-background px-6 py-5 text-center shadow-card">
      <div className="text-3xl font-semibold text-accent">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
