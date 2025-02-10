"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const promises = [
  "I promise to love you unconditionally",
  "I vow to be your rock in times of need",
  "I will always be by your side",
  "Our love will grow stronger each day",
  "I promise to make you smile every day",
]

export default function Promise() {
  const [currentPromise, setCurrentPromise] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentPromise((prev) => (prev + 1) % promises.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  return (
    <section className="h-full flex flex-col items-center justify-center px-4 bg-purple-200">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-10 text-center">My Promise to You</h2>
      <div
        className="h-40 flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={currentPromise}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl text-purple-700 text-center cursor-pointer"
            onClick={() => setCurrentPromise((prev) => (prev + 1) % promises.length)}
          >
            {promises[currentPromise]}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="text-center text-sm text-purple-600 mt-4">
        {isHovered ? "Click to see the next promise" : "Touch to pause"}
      </p>
    </section>
  )
}

