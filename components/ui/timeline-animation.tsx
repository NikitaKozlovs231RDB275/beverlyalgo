"use client"

import { motion, useInView, type Variants } from "motion/react"
import React, { useRef } from "react"

import { cn } from "@/lib/utils"

// Explicit lookup avoids `motion[tag]` indexing issues
const motionElements = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  ul: motion.ul,
  li: motion.li,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const

type SupportedTag = keyof typeof motionElements

interface TimelineContentProps {
  children?: React.ReactNode
  animationNum?: number
  timelineRef?: React.RefObject<HTMLElement | null>
  customVariants?: Variants
  className?: string
  as?: SupportedTag
}

export function TimelineContent({
  children,
  animationNum = 0,
  customVariants,
  className,
  as,
}: TimelineContentProps) {
  const ownRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ownRef, { once: true, amount: 0.05 })

  const defaultVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hidden: { y: -20, opacity: 0, filter: "blur(10px)" },
  }

  const variants = customVariants ?? defaultVariants
  const MotionTag = (motionElements[(as as SupportedTag) ?? "div"] ??
    motion.div) as typeof motion.div

  return (
    <MotionTag
      ref={ownRef}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}
