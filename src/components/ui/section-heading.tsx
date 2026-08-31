export function SectionHeading({
  eyebrow,
  as: Heading = "h2",
  children,
}: {
  eyebrow: string;
  as?: "h1" | "h2";
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-bold text-accent text-xs tracking-[0.16em]">
        {eyebrow}
      </p>
      <Heading className="font-display text-2xl text-foreground-strong">
        {children}
      </Heading>
    </div>
  );
}
