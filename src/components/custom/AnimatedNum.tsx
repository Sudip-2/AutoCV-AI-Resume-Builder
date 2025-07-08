"use client";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
interface NumProps {
  number: number;
}
export default function HTMLContent({ number }: NumProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  useEffect(() => {
    const controls = animate(count, number, { duration: 5 });
    return () => controls.stop();
  }, [rounded, number]);
  return <motion.span className="text-base">{rounded}</motion.span>;
}
