import Link from "next/link";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { SiteControls } from "@/components/layout/site-controls";

export function SiteHeader() {
  return (
    <header className="mx-auto hidden w-full max-w-300 items-center justify-between px-5 md:flex">
      <nav>
        <ul className="-mx-3.5 flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-block rounded-xl px-3.5 py-1.5 text-foreground transition-colors duration-fast ease-out hover:bg-background-hover hover:text-foreground-strong"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <SiteControls />
    </header>
  );
}
