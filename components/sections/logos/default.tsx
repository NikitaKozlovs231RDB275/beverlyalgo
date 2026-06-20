import Image from "next/image";
import { ReactNode } from "react";

import { Section } from "../../ui/section";
import { Badge } from "../../ui/badge";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

interface LogosProps {
  title?: string;
  description?: string;
  badge?: ReactNode | false;
  className?: string;
}

export default function Logos({
  title = "Results speak for themselves",
  description = "BeverlyAlgo is built for traders who value clarity, precision, and consistency. Our TradingView indicator is trusted by traders across crypto and stock markets to support well-informed decisions in real time.",
  badge = (
    <Badge variant="outline" className="border-brand/30 text-brand">
      Last updated: 18 Feb 2026
    </Badge>
  ),
  className,
}: LogosProps) {
  return (
    <Section className={`relative overflow-hidden bg-black ${className ?? ""}`}>
      {/* Animated gradient background */}
      <BackgroundGradientAnimation containerClassName="absolute inset-0 z-0" />

      {/* Top vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-black via-black/60 to-transparent"
      />

      {/* Bottom vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-t from-black via-black/60 to-transparent"
      />

      {/* Content */}
      <div className="relative z-[3] max-w-container mx-auto flex flex-col items-center gap-10 text-center px-4">

        {/* Header */}
        <div className="flex flex-col items-center gap-6 max-w-3xl">
          {badge !== false && badge}

          <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
            {title}
          </h2>

          {description && (
            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Image */}
        <div className="w-full max-w-5xl">
          <Image
            src="/results.png"
            alt="BeverlyAlgo results preview"
            width={1248}
            height={765}
            className="w-full h-auto rounded-2xl shadow-xl"
            priority
          />
        </div>

      </div>
    </Section>
  );
}
