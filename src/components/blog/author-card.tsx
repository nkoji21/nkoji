import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { SITE_AUTHOR } from "@/lib/site";

export function AuthorCard() {
  return (
    <Link
      href="/about"
      className="flex items-center gap-5 rounded-2xl bg-surface px-7 py-6.5 transition-colors duration-fast ease-out hover:bg-surface-hover"
    >
      <Avatar className="size-21 shrink-0" />
      <div className="flex flex-col gap-1.5">
        <p className="font-bold text-accent">{SITE_AUTHOR.name}</p>
        <p className="text-sm">
          {SITE_AUTHOR.bio.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </Link>
  );
}
