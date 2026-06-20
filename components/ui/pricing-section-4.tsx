"use client";

import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "PRO™",
    description:
      "The most popular plan for serious traders. The full BeverlyAlgo experience.",
    price: 49,
    yearlyPrice: 399,
    buttonText: "Get started",
    buttonVariant: "default" as const,
    popular: true,
    buttonHref: "https://buy.stripe.com/4gMcMYeZkeoI5Pibz26wE04",
    yearlyButtonHref: "https://buy.stripe.com/14AaEQ9F080ka5y1Ys6wE05",
    includes: [
      "PRO™ includes:",
      "Advanced AI signal suite",
      "Multi-timeframe analysis",
      "Custom indicator settings",
      "Priority support",
      "Private strategy guides",
      "Settings for every trading style",
      "Early feature access",
    ],
  },
  {
    name: "Team",
    description:
      "For professional traders and small trading groups needing advanced access.",
    price: 99,
    yearlyPrice: 799,
    buttonText: "Get started",
    buttonVariant: "outline" as const,
    buttonHref: "https://buy.stripe.com/5kQ6oAaJ4cgA0uY7iM6wE06",
    yearlyButtonHref: "https://buy.stripe.com/dRm8wI9F0cgAdhK1Ys6wE07",
    includes: [
      "Everything in PRO, plus:",
      "Up to 5 team members",
      "Shared settings & alerts",
      "Dedicated account manager",
      "Custom onboarding session",
      "Advanced analytics",
      "Team collaboration tools",
      "SLA priority support",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
        <button
          type="button"
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
            selected === "0" ? "text-white" : "text-gray-400"
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId="pricing-switch"
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        <button
          type="button"
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
            selected === "1" ? "text-white" : "text-gray-400"
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId="pricing-switch"
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Yearly
            <span className="text-xs text-blue-400 font-semibold hidden sm:inline">
              save 33%
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection4() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.25,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      className="min-h-screen mx-auto relative overflow-x-hidden"
      ref={pricingRef}
    >
      {/* Sparkles background — grid comes from body via globals.css */}
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
      >
        <SparklesComp
          density={1200}
          direction="bottom"
          speed={0.8}
          color="#FFFFFF"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      {/* Blue glow ellipse */}
      <TimelineContent
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute left-0 top-[-114px] w-full h-[60vh] pointer-events-none z-0 overflow-hidden"
      >
        <div
          className="absolute left-[-30%] right-[-30%] top-0 h-[800px] rounded-full"
          style={{
            border: "150px solid rgba(49,49,245,0.4)",
            filter: "blur(80px)",
            WebkitFilter: "blur(80px)",
          }}
        />
      </TimelineContent>

      {/* Heading + switch */}
      <article className="text-center mb-6 pt-32 max-w-3xl mx-auto space-y-4 relative z-30 px-6">
        <h2 className="text-4xl font-medium text-white">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.12}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Accelerate your trading potential, today.
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-gray-400 text-base"
        >
          Trusted by traders worldwide. Lifetime access, no recurring fees. Get started with the plan that fits you.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      {/* Radial blue overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 80% at 50% 30%, #1a4fcc 0%, transparent 100%)",
          opacity: 0.25,
          mixBlendMode: "screen",
        }}
      />

      {/* Pricing cards */}
      <div className="grid md:grid-cols-2 max-w-3xl gap-4 py-6 mx-auto px-4">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={cn(
                "relative text-white border-neutral-800 h-full",
                plan.popular
                  ? "bg-gradient-to-b from-neutral-800 to-neutral-900 shadow-[0px_-8px_120px_0px_rgba(37,99,235,0.5)] z-20"
                  : "bg-gradient-to-b from-neutral-900 to-neutral-950 z-10"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full border border-blue-400 shadow-lg shadow-blue-900/50">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-left pt-8">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    $
                    <NumberFlow
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl font-bold"
                    />
                  </span>
                  <span className="text-gray-400 text-sm">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <a
                  href={isYearly ? plan.yearlyButtonHref : plan.buttonHref}
                  className={cn(
                    "w-full mb-6 p-3.5 text-base font-semibold rounded-xl text-center block transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
                    plan.popular
                      ? "bg-gradient-to-b from-blue-500 to-blue-700 shadow-lg shadow-blue-900/50 border border-blue-400/50 text-white"
                      : "bg-gradient-to-b from-neutral-700 to-neutral-900 shadow-lg shadow-neutral-950 border border-neutral-700 text-white"
                  )}
                >
                  {plan.buttonText}
                </a>

                <div className="space-y-3 pt-4 border-t border-neutral-700/60">
                  <h4 className="font-semibold text-sm text-white mb-3">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2.5">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2.5"
                      >
                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>

      {/* Bottom note */}
      <TimelineContent
        as="p"
        animationNum={6}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="text-center text-xs text-gray-600 pb-16 px-4"
      >
        All plans include lifetime access to purchased tier. Prices in USD.
        Cancel anytime for monthly plans.
      </TimelineContent>
    </div>
  );
}
