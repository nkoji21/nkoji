import Image from "next/image";
import { BrandX } from "@/components/icons/brand";
import type { LinkCardData } from "@/lib/blog/remark-link-card";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** X の投稿は本文が主役なので、引用として見せる */
function QuoteCard({ url, card }: { url: string; card: LinkCardData }) {
  const { author, quote, date } = card;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose block rounded-2xl border border-line bg-surface p-5 transition-colors duration-fast ease-out hover:bg-surface-hover"
    >
      <div className="flex items-center gap-3">
        {author?.avatar && (
          <Image
            src={author.avatar}
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full"
          />
        )}
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate font-bold text-foreground-strong text-sm">
            {author?.name}
          </p>
          {author?.handle && (
            <p className="truncate text-xs">@{author.handle}</p>
          )}
        </div>
        <BrandX className="size-4 shrink-0" />
      </div>

      {quote && (
        <p className="mt-3 whitespace-pre-line text-foreground-strong text-sm leading-relaxed">
          {quote}
        </p>
      )}

      {date && <p className="mt-3 text-xs">{date}</p>}
    </a>
  );
}

/** 一般の URL は OGP 風のカード */
function SiteCard({ url, card }: { url: string; card: LinkCardData }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose flex overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-fast ease-out hover:bg-surface-hover"
    >
      <div className="min-w-0 flex-1 p-5">
        <p className="line-clamp-2 font-bold text-foreground-strong text-sm">
          {card.title}
        </p>
        {card.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed">
            {card.description}
          </p>
        )}
        <p className="mt-3 text-xs">{card.site ?? hostOf(url)}</p>
      </div>

      {card.image && (
        <div className="relative hidden w-45 shrink-0 sm:block">
          <Image
            src={card.image}
            alt=""
            fill
            sizes="11.25rem"
            className="object-cover"
          />
        </div>
      )}
    </a>
  );
}

export function LinkCard({ url, card }: { url: string; card: string }) {
  const data: LinkCardData = JSON.parse(card);

  return data.quote ? (
    <QuoteCard url={url} card={data} />
  ) : (
    <SiteCard url={url} card={data} />
  );
}
