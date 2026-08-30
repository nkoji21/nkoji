import Link from "next/link";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { SiteControls } from "@/components/layout/site-controls";

export function SiteHeader() {
  return (
    <header className="mx-auto hidden w-full max-w-300 items-center justify-between px-5 md:flex">
      <nav>
        <ul className="flex items-center gap-6">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="group relative inline-block pb-1 text-foreground transition-colors duration-fast ease-out hover:text-accent"
              >
                {label}
                <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-base ease-bounce group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <SiteControls />
    </header>
  );
}
