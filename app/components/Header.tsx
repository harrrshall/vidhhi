"use client"

import { motion } from "framer-motion"

export default function Header() {
  return (
    <header className="h-full flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/header-bg.jpg')" }} />
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4 shadow-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          For Viddhi 
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-white shadow-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          
        </motion.p>
      </div>
    </header>
  )
}

