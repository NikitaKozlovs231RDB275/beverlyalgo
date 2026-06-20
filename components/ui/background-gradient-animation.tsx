"use client";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface BackgroundGradientAnimationProps {
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const BackgroundGradientAnimation = ({
  firstColor = "131, 80, 232",
  secondColor = "185, 55, 255",
  thirdColor = "65, 20, 215",
  fourthColor = "220, 100, 255",
  fifthColor = "95, 0, 230",
  size = "80%",
  blendingValue = "screen",
  children,
  className,
  containerClassName,
}: BackgroundGradientAnimationProps) => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  const orbs: Array<{
    color: string;
    animClass: string;
    opacity: number;
    origin: string;
  }> = [
    {
      color: firstColor,
      animClass: "animate-first",
      opacity: 0.52,
      origin: "center center",
    },
    {
      color: secondColor,
      animClass: "animate-second",
      opacity: 0.45,
      origin: "calc(50% - 400px) center",
    },
    {
      color: thirdColor,
      animClass: "animate-third",
      opacity: 0.40,
      origin: "calc(50% + 400px) center",
    },
    {
      color: fourthColor,
      animClass: "animate-fourth",
      opacity: 0.36,
      origin: "calc(50% - 200px) center",
    },
    {
      color: fifthColor,
      animClass: "animate-fifth",
      opacity: 0.44,
      origin: "calc(50% - 800px) calc(50% + 800px)",
    },
  ];

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Blurry orbs — no mouse interaction */}
      <div
        aria-hidden="true"
        className={cn("absolute inset-0", isSafari ? "blur-[30px]" : "blur-[55px]")}
      >
        {orbs.map((orb, i) => (
          <div
            key={i}
            className={cn("absolute", orb.animClass)}
            style={{
              background: `radial-gradient(circle at center, rgba(${orb.color}, 0.85) 0%, rgba(${orb.color}, 0) 55%) no-repeat`,
              mixBlendMode: blendingValue as React.CSSProperties["mixBlendMode"],
              width: size,
              height: size,
              top: `calc(50% - ${size} / 2)`,
              left: `calc(50% - ${size} / 2)`,
              transformOrigin: orb.origin,
              opacity: orb.opacity,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {children && (
        <div className={cn("relative z-10", className)}>{children}</div>
      )}
    </div>
  );
};
