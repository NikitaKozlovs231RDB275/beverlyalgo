"use client"

import { AnimatePresence, motion, type Variants } from "framer-motion"
import React, { type ElementType } from "react"

type TextEffectProps = {
  children: string
  per?: "word" | "char" | "line"
  as?: ElementType
  variants?: { container?: Variants; item?: Variants }
  className?: string
  preset?: "blur" | "shake" | "scale" | "fade" | "slide"
  delay?: number
  trigger?: boolean
  onAnimationComplete?: () => void
  speedReveal?: number
  speedSegment?: number
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const presetVariants: Record<"blur" | "shake" | "scale" | "fade" | "slide", { container: Variants; item: Variants }> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(12px)" },
    },
  },
  shake: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 0 },
      visible: { x: [-5, 5, -5, 5, 0] },
      exit: { x: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: defaultItemVariants,
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
}

export function TextEffect({
  children,
  per = "word",
  as: Tag = "p",
  variants,
  className,
  preset,
  delay = 0,
  trigger = true,
  onAnimationComplete,
}: TextEffectProps) {
  const selected = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants }
  const containerVariants = variants?.container ?? selected.container
  const itemVariants = variants?.item ?? selected.item

  const segments =
    per === "char" ? children.split("") :
    per === "line" ? children.split("\n") :
    children.split(" ")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = motion(Tag as any)

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className={className}
          transition={{ delayChildren: delay }}
          onAnimationComplete={onAnimationComplete}
        >
          {segments.map((segment: string, index: number) => (
            <motion.span
              key={`${segment}-${index}`}
              variants={itemVariants}
              className={per === "line" ? "block" : "inline-block whitespace-pre"}
            >
              {segment}
              {per === "word" && index < segments.length - 1 ? " " : null}
            </motion.span>
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  )
}
