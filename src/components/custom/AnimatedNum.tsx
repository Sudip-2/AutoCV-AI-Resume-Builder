"use client";

import { animate, motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface NumProps {
  number: number;
}

export default function HTMLContent({ number }: NumProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, number, { duration: 5 });
      return () => controls.stop();
    }
  }, [isInView, number]);

  return (
    <motion.span ref={ref} className="text-base">
      {rounded}
    </motion.span>
  );
}
