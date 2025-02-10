import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stethoscope, Music, Cpu, Plane, Home } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Before You",
    icon: Cpu,
    color: "from-gray-400 to-gray-600",
    bgColor: "from-gray-100 to-gray-200",
    description: "All I knew was the daily grind. Wake up, work hard, crash at night. No fun, no chill—just me and my boring routine. Life was all about the hustle."
  },
  {
    id: 2,
    title: "The Change",
    icon: Heart,
    color: "from-pink-400 to-pink-600",
    bgColor: "from-pink-100 to-pink-200",
    description: "Then you showed up, and everything changed. You brought this energy that completely transformed my world. Suddenly, life wasn't just about work anymore."
  },
  {
    id: 3,
    title: "Our Song",
    icon: Music,
    color: "from-purple-400 to-purple-600",
    bgColor: "from-purple-100 to-purple-200",
    description: "Remember that random playlist that came on when we were together? Now I can't hear that song without thinking of you. It's become our song, even if you don't know it yet."
  },
  {
    id: 4,
    title: "Daily Joy",
    icon: Stethoscope,
    color: "from-blue-400 to-blue-600",
    bgColor: "from-blue-100 to-blue-200",
    description: "Now, seeing your name on my phone makes me smile like an idiot. You're this happy little break I never knew I needed. You've become my daily dose of happiness."
  },
  {
    id: 5,
    title: "New Perspective",
    icon: Plane,
    color: "from-indigo-400 to-indigo-600",
    bgColor: "from-indigo-100 to-indigo-200",
    description: "I'm catching myself smiling randomly, just thinking about things you've said. You've got me noticing all these small, cute things I never cared about before."
  },
  {
    id: 6,
    title: "Right Now",
    icon: Home,
    color: "from-violet-400 to-violet-600",
    bgColor: "from-violet-100 to-violet-200",
    description: "I don't know where this is going, but I'm here for it. You're funny, smart, and just...you. You're kinda everything right now, and I feel lucky as hell."
  }
];

export default function StoryCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (currentIndex + newDirection < 0) {
      setCurrentIndex(events.length - 1);
    } else if (currentIndex + newDirection >= events.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + newDirection);
    }
    setDirection(newDirection);
  };

  const currentEvent = events[currentIndex];
  const Icon = currentEvent.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Our Love Story
        </h1>
        <p className="text-gray-600 mt-2">Swipe to explore our journey</p>
      </motion.div>

      {/* Card Section */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md aspect-[3/4]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full"
            >
              <div className={`w-full h-full rounded-3xl p-6 shadow-xl
                bg-gradient-to-br ${currentEvent.bgColor}
                flex flex-col items-center justify-between
                transform transition-transform`}
              >
                {/* Icon Header */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentEvent.color}
                  flex items-center justify-center shadow-lg mb-6`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <h2 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${currentEvent.color} 
                    bg-clip-text text-transparent`}>
                    {currentEvent.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {currentEvent.description}
                  </p>
                </div>

                {/* Progress Dots */}
                <div className="flex gap-2 mt-6">
                  {events.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentIndex 
                          ? `bg-gradient-to-r ${currentEvent.color}`
                          : 'bg-gray-300'
                      }`}
                      animate={{
                        scale: index === currentIndex ? [1, 1.2, 1] : 1
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: index === currentIndex ? Infinity : 0,
                        repeatDelay: 1
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 p-6">
        <button
          onClick={() => paginate(-1)}
          className="px-6 py-3 rounded-full bg-white shadow-md text-pink-600 font-semibold
            hover:shadow-lg transition-shadow"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(1)}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500
            text-white font-semibold shadow-md hover:shadow-lg transition-shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
}
