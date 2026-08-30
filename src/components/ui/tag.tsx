export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-xl border border-line px-3 py-1 text-accent text-xs">
      {children}
    </span>
  );
}
