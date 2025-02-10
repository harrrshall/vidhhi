import { motion } from "framer-motion"

interface NavigationProps {
  currentIndex: number
  setIndex: (index: number) => void
  titles: string[]
}

export default function Navigation({ currentIndex, setIndex, titles }: NavigationProps) {
  return (
    <nav className="fixed bottom-4 left-0 right-0 flex flex-col items-center z-50 px-4">
      <div className="bg-white/90 rounded-2xl px-4 py-3 flex flex-wrap gap-2 shadow-sm max-w-md mx-auto">
        {titles.map((title, index) => (
          <motion.button
            key={index}
            className={`text-sm px-4 py-1.5 rounded-full transition-colors ${
              currentIndex === index 
                ? "bg-pink-400 text-white" 
                : "hover:bg-pink-50 text-pink-400"
            }`}
            onClick={() => setIndex(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {title}
          </motion.button>
        ))}
      </div>
    </nav>
  )
}
