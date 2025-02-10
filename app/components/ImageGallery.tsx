'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  ArrowLeft,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
}

const mediaItems: MediaItem[] = [
  { type: 'image', src: '/0.jpeg', thumbnail: '/0.jpeg' },
  { type: 'image', src: '/1.jpeg', thumbnail: '/1.jpeg' },
  { type: 'image', src: '/2.jpeg', thumbnail: '/2.jpeg' },
  { type: 'image', src: '/9.jpeg', thumbnail: '/9.jpeg' },
  { type: 'image', src: '/10.jpeg', thumbnail: '/10.jpeg' },
  { type: 'image', src: '/11.jpeg', thumbnail: '/11.jpeg' },
  { type: 'image', src: '/6.jpeg', thumbnail: '/6.jpeg' },
  { type: 'image', src: '/8.jpeg', thumbnail: '/8.jpeg' },
];

const EnhancedGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const openLightbox = (index: number): void => {
    setSelectedItem(mediaItems[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = useCallback((): void => {
    setSelectedItem(null);
    setIsFullscreen(false);
  }, []);

  const navigateGallery = useCallback(
    (direction: number): void => {
      const newIndex = (currentIndex + direction + mediaItems.length) % mediaItems.length;
      setCurrentIndex(newIndex);
      setSelectedItem(mediaItems[newIndex]);
    },
    [currentIndex]
  );

  const toggleFullscreen = useCallback((): void => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      switch (e.key) {
        case 'ArrowLeft':
          navigateGallery(-1);
          break;
        case 'ArrowRight':
          navigateGallery(1);
          break;
        case 'Escape':
          closeLightbox();
          break;
        case 'f':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedItem, navigateGallery, closeLightbox, toggleFullscreen]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-10 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-8 px-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-pink-600 tracking-wide mb-2">
          Our Precious Moments
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Capturing our journey together <span className="text-pink-600">❤️</span>
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-5xl mx-auto px-2">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {mediaItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
              className="relative group"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={item.thumbnail}
                  alt={`Memory ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered === index ? 1 : 0 }}
                  className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity"
                >
                  <button
                    onClick={() => openLightbox(index)}
                    className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
                  >
                    {item.type === 'video' ? (
                      <Play className="w-6 h-6 text-pink-600" />
                    ) : (
                      <Heart className="w-6 h-6 text-pink-600" />
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          >
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center backdrop-blur-md">
              <button
                onClick={closeLightbox}
                className="flex items-center text-white hover:text-pink-400 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 mr-2" />
                <span className="text-sm sm:text-base">Back to Gallery</span>
              </button>
              <div className="flex gap-4">
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-6 h-6" />
                  ) : (
                    <Maximize2 className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={closeLightbox}
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateGallery(-1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={() => navigateGallery(1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Media Display */}
            <div
              className={`max-w-full max-h-full p-2 relative ${
                isFullscreen ? 'w-screen h-screen' : 'w-full h-auto'
              }`}
            >
              {selectedItem.type === 'video' ? (
                <video
                  controls
                  className="w-full h-full object-contain"
                  src={selectedItem.src}
                />
              ) : (
                <div className="relative w-full h-full min-h-[60vh]">
                  <Image
                    src={selectedItem.src}
                    alt="Selected memory"
                    fill
                    className="object-contain"
                    quality={100}
                    priority
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EnhancedGallery;
