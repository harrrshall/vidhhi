import { motion } from "framer-motion"

export default function About() {
  return (
    <section className="h-full flex flex-col items-center justify-center px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Love Story
      </motion.h2>
      <motion.p
        className="text-lg text-purple-700 leading-relaxed max-w-2xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Replace this text with your heartfelt message */}
        &quot;Sweetheart, I promise that when success finally comes my way, the very first thing I&apos;ll do is marry you! Imagine us laughing through every twist and turn of life, hand in hand. You&apos;re my dream come true, and I can&apos;t wait to start our forever adventure together!&quot;        </motion.p>
    </section>
  )
}

