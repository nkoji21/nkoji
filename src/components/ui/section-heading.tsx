export function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-bold text-accent text-xs tracking-[0.16em]">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl text-foreground-strong">
        {children}
      </h2>
    </div>
  );
}
