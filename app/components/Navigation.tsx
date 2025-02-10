import { motion } from "framer-motion"

interface NavigationProps {
  currentIndex: number
  setIndex: (index: number) => void
  titles: string[]
}

export default function Navigation({ currentIndex, setIndex, titles }: NavigationProps) {
  return (
    <nav className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
      <div className="bg-white bg-opacity-80 rounded-full px-4 py-2 flex space-x-2">
        {titles.map((title, index) => (
          <motion.button
            key={index}
            className={`text-sm px-3 py-1 rounded-full ${
              currentIndex === index ? "bg-pink-500 text-white" : "text-pink-500"
            }`}
            onClick={() => setIndex(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {title}
          </motion.button>
        ))}
      </div>
    </nav>
  )
}

