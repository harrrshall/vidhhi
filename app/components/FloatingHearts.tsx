"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const Heart = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute text-4xl"
    initial={{ y: "100%", x: Math.random() * 100 + "%", opacity: 0 }}
    animate={{
      y: "-100%",
      opacity: [0, 1, 1, 0],
      x: `calc(${Math.random() * 100}% + ${(Math.random() - 0.5) * 50}px)`,
    }}
    transition={{ duration: 10, delay, ease: "linear", times: [0, 0.1, 0.9, 1] }}
  >
    ❤️
  </motion.div>
)

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, Date.now()])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((key) => (
        <Heart key={key} delay={0} />
      ))}
    </div>
  )
}

