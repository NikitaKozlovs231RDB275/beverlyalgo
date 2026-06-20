'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

import { Section } from '@/components/ui/section';
import { GlowCard } from '@/components/ui/spotlight-card';

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const steps = [
  {
    number: '01',
    image: '/step1.png',
    alt: 'Choose a plan and enter your TradingView username at checkout',
    description:
      'Choose your plan, complete checkout, and enter your TradingView username.',
  },
  {
    number: '02',
    image: '/step2.png',
    alt: 'Accept the TradingView invite and load the indicator',
    description:
      'Accept the automated invite in TradingView, then click the indicator to load it up.',
  },
  {
    number: '03',
    image: '/step3.jpg',
    alt: 'Real-time signals painted on your TradingView chart',
    description: 'Trade.',
    isPayoff: true,
  },
];

export default function QuickStartGuide() {
  return (
    <Section className="pt-20 sm:pt-32 md:pt-44">
      <div className="container mx-auto max-w-5xl px-4">

        {/* Section header */}
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h2
            variants={headingVariants}
            className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-4xl font-semibold text-transparent drop-shadow-[0_0_24px_var(--brand-foreground)] sm:text-5xl md:text-6xl pb-2"
          >
            Quick start guide
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="text-muted-foreground mx-auto max-w-md text-base sm:text-lg"
          >
            Only 3 steps to unlock your trading potential
          </motion.p>
        </motion.div>

        {/* Step columns */}
        <motion.div
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              {/* Step label above card */}
              <div className="flex items-center gap-3">
                <span className="text-brand text-[0.65rem] font-bold tracking-[0.35em] uppercase">
                  STEP {step.number}
                </span>
                <span className="from-brand/40 to-transparent h-px flex-1 bg-gradient-to-r" />
              </div>

              {/* Glow card */}
              <GlowCard glowColor="purple" customSize className="h-80 w-full p-0 gap-0 overflow-hidden">
                <div className="relative h-full w-full">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              </GlowCard>

              {/* Description below card */}
              {step.isPayoff ? (
                <p className="from-foreground to-brand bg-linear-to-r bg-clip-text text-lg font-semibold text-transparent">
                  {step.description}
                </p>
              ) : (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </Section>
  );
}
