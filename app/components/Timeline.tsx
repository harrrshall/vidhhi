import React, { useState } from 'react';
import { Heart, Stethoscope, Music, Cpu, Plane, Home } from 'lucide-react';

interface TimelineEvent {
  date: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "Before You",
    description: "All I knew was the daily grind. Wake up, work hard, crash at night. No fun, no chill—just me and my boring routine. Life was all about the hustle.",
    icon: Cpu,
    color: "text-gray-600"
  },
  {
    date: "The Change",
    description: "Then you showed up, and everything changed. You brought this energy that completely transformed my world. Suddenly, life wasn't just about work anymore.",
    icon: Heart,
    color: "text-pink-600"
  },
  {
    date: "Our Song",
    description: "Remember that random playlist that came on when we were together? Now I can't hear that song without thinking of you. It's become our song, even if you don't know it yet. Every time it plays, I smile like an idiot.",
    icon: Music,
    color: "text-green-500"
  },
  {
    date: "Daily Joy",
    description: "Now, seeing your name on my phone makes me smile like an idiot. You're this happy little break I never knew I needed. You've become my daily dose of happiness.",
    icon: Stethoscope,
    color: "text-blue-500"
  },
  {
    date: "New Perspective",
    description: "I'm catching myself smiling randomly, just thinking about things you've said. You've got me noticing all these small, cute things I never cared about before.",
    icon: Plane,
    color: "text-green-500"
  },
  {
    date: "Right Now",
    description: "I don't know where this is going, but I'm here for it. You're funny, smart, and just...you. You're kinda everything right now, and I feel lucky as hell.",
    icon: Home,
    color: "text-purple-500"
  },
];

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8 sm:mb-16">
          Our Love Story
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-pink-200 to-purple-200" />

          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            return (
              <div
                key={index}
                className={`mb-8 sm:mb-12 flex ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } items-center justify-center gap-4 sm:gap-8 group`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 ${
                      selectedEvent === index ? 'ring-2 ring-pink-400' : ''
                    }`}
                    onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                  >
                    <div className={`flex items-center gap-2 sm:gap-3 mb-2 ${
                      index % 2 === 0 ? 'justify-end' : 'justify-start'
                    }`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${event.color}`} />
                      <h3 className={`text-base sm:text-xl font-semibold ${event.color}`}>
                        {event.date}
                      </h3>
                    </div>
                    <p className={`text-sm sm:text-base text-gray-600 transition-all duration-300 ${
                      selectedEvent === index 
                        ? 'opacity-100 max-h-96 overflow-y-auto' 
                        : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${event.color} bg-white shadow-lg border-4 border-pink-100`}>
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>

                <div className="w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}