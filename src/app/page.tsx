import { ProtectedImage } from "@/components/ProtectedImage";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-8 md:gap-24 px-4 -mt-8 md:mt-0">
      <h1 className="font-heading text-4xl md:text-6xl translate-y-0 md:translate-y-2 animate-slide-up animation-delay-text order-2 md:order-1">
        nkoji
      </h1>
      <ProtectedImage
        src="/na.webp"
        alt="nkoji"
        width={256}
        height={256}
        className="w-64 h-64 md:w-64 md:h-64 rounded-full animate-slide-up-bounce animation-delay-300 order-1 md:order-2"
      />
    </div>
  );
}
