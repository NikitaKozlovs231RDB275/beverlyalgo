import Link from "next/link";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

export default function FAQ({
  title = "Questions and Answers",
  items = [
    {
      question:
        "What platforms does BeverlyAlgo work on?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            BeverlyAlgo is a custom indicator built for TradingView, which supports both desktop and mobile platforms. 
            You can use it to analyze crypto, stocks, indices, and more across any chart TradingView supports. 
          </p>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            No TradingView subscription required.
          </p>
        </>
      ),
    },
    {
      question: "Can I use BeverlyAlgo for both crypto and stock trading?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[600px]">
            Yes. BeverlyAlgo is optimized for a wide range of markets, including cryptocurrencies, stocks, ETFs, and indices. 
          </p>
          <p className="text-muted-foreground mb-4 max-w-[600px]">
            It adapts well to different timeframes and asset classes.
          </p>
        </>
      ),
    },
    {
      question:
        "What’s included with my purchase?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Your purchase includes full access to the BeverlyAlgo indicator on TradingView, ongoing updates, setup support, 
            and access to private user resources such as tutorials and best-practice guides.
          </p>
        </>
      ),
    },
    {
      question: 'Can I lose money using BeverlyAlgo?',
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Absolutely.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Losses are a natural part of trading. No tool can eliminate risk. 
            BeverlyAlgo is designed to support your analysis and improve decision-making, but it does not guarantee profits. 
            Markets are unpredictable, and outcomes depend on your strategy, discipline, and risk management.
          </p>
        </>
      ),
    },
    {
      question: "Do I need trading experience to use BeverlyAlgo?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[580px]">
          While the interface is user-friendly, trading experience is recommended. BeverlyAlgo is an analysis tool, not a trading course or autopilot system. 
          Understanding market structure, risk management, and trading psychology will help you get the most value from it.
        </p>
      ),
    },
    {
      question: "Is this a fully automated trading bot?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
          No, BeverlyAlgo is not an automated trading bot. It is a visual indicator and analysis tool that helps you make informed trading decisions. 
          You remain in full control of when and how you execute trades.
          </p>
        </>
      ),
    },
  ],
  className,
}: FAQProps) {
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
      <div className="relative z-[3] max-w-container mx-auto flex flex-col items-center gap-8">
        <h2 className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-center text-3xl font-semibold text-transparent drop-shadow-[0_0_24px_var(--brand-foreground)] sm:text-5xl pb-2">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
