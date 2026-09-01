import { NAV_ITEMS } from "@/components/layout/nav-items";
import { SiteControls } from "@/components/layout/site-controls";
import { SoundLink } from "@/components/ui/sound-link";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-300 items-center justify-between px-5">
      <nav>
        <ul className="-mx-3.5 flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <SoundLink
                href={href}
                className="inline-block rounded-xl px-3.5 py-1.5 text-foreground transition-[color,background-color,transform] duration-fast ease-out hover:bg-background-hover hover:text-foreground-strong active:scale-97"
              >
                {label}
              </SoundLink>
            </li>
          ))}
        </ul>
      </nav>
      <SiteControls className="-mr-2.5" />
    </header>
  );
}
