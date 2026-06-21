"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { StardustButton } from "@/components/ui/stardust-button";
import { siteConfig } from "@/config/site";

const NAV_LINKS = [
  { text: "Features", href: "#features" },
  { text: "Pricing", href: "#pricing" },
  { text: "FAQ", href: "#faq" },
];

export const SaaSNavigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between relative">
          <Link href="/" className="text-xl font-semibold text-white tracking-tight">
            BeverlyAlgo
          </Link>

          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                {link.text}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/[0.06] cursor-pointer"
              asChild
            >
              <Link href="#">Sign in</Link>
            </Button>
            <StardustButton href={siteConfig.getStartedUrl} size="sm">
              Get Access
            </StardustButton>
          </div>

          <button
            type="button"
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/[0.06] animate-slide-down">
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.06]">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white hover:bg-white/[0.06] cursor-pointer"
                asChild
              >
                <Link href="#">Sign in</Link>
              </Button>
              <StardustButton href={siteConfig.getStartedUrl} size="sm">
                Get Access
              </StardustButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});
SaaSNavigation.displayName = "SaaSNavigation";

export const SaaSHero = React.memo(() => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start px-6 pt-32 pb-20 md:pt-36 bg-black animate-fade-in">
      {/* Announcement badge */}
      <aside className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm max-w-full">
        <span className="text-xs text-white/40 whitespace-nowrap">
          New version of BeverlyAlgo is out!
        </span>
        <Link
          href={siteConfig.getStartedUrl}
          className="flex items-center gap-1 text-xs text-white/40 hover:text-white/80 transition-colors duration-200 active:scale-95 whitespace-nowrap"
          aria-label="Get started with the new version of BeverlyAlgo"
        >
          Get started
          <ArrowRight size={12} />
        </Link>
      </aside>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-center max-w-3xl leading-tight mb-6 bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent tracking-tight">
        Trade smarter with <br className="hidden sm:block" />
        AI-powered precision
      </h1>

      {/* Subheadline */}
      <p className="text-sm md:text-base text-center text-white/40 max-w-xl mb-10 leading-relaxed">
        Professionally designed AI-based TradingView algorithm that elevates
        your trading experience with an easy-to-use indicator.
      </p>

      {/* CTA */}
      <div className="flex items-center gap-4 relative z-10 mb-16">
        <Button
          size="lg"
          className="rounded-lg bg-gradient-to-b from-white via-white/95 to-white/70 text-black font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          asChild
        >
          <Link href={siteConfig.getStartedUrl}>Get started</Link>
        </Button>
      </div>

      {/* Dashboard mockup */}
      <div className="w-full max-w-5xl relative pb-20">
        {/* Glow effect */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-0"
          style={{
            top: "-20%",
            width: "75%",
            height: "320px",
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.2) 0%, rgba(99,102,241,0.12) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          aria-hidden="true"
        />

        {/* Dashboard image */}
        <div className="relative z-10 rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
          <Image
            src="/dashboard-light.png"
            alt="BeverlyAlgo trading dashboard showing signals, analytics, and market indicators"
            width={1248}
            height={765}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
});
SaaSHero.displayName = "SaaSHero";

export default function SaaSTemplate() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SaaSNavigation />
      <SaaSHero />
    </main>
  );
}
