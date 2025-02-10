import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Play, Pause, Volume2, VolumeX, Repeat, SkipBack } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  // Player states.
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(20).fill(0));

  // Refs for audio and progress bar elements.
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Wrap updateProgress in useCallback to keep its identity stable.
  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isPlaying) {
      // Start the progress update loop.
      animationRef.current = requestAnimationFrame(updateProgress);

      // Animate the visualizer bars.
      interval = setInterval(() => {
        setBars((prevBars) =>
          prevBars.map(() => Math.random() * 50 + 10)
        );
      }, 100);
    } else {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, updateProgress]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  const restartSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        togglePlay();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <audio
          ref={audioRef}
          src="/song.mp3"
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
          }}
        />

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-pink-600 mb-2">Die with Dream</h2>
          <p className="text-gray-500">for you Song</p>
        </div>

        {/* Visualizer */}
        <div className="flex justify-center items-end h-24 mb-8 gap-1">
          {bars.map((height, index) => (
            <div
              key={index}
              className="w-2 bg-gradient-to-t from-pink-500 to-pink-300 rounded-t"
              style={{
                height: `${height}%`,
                transition: 'height 0.1s ease',
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div
            ref={progressBarRef}
            className="h-2 bg-gray-200 rounded-full cursor-pointer relative"
            onClick={handleProgressBarClick}
          >
            <div
              className="absolute top-0 left-0 h-full bg-pink-500 rounded-full"
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={restartSong}
            className="p-2 hover:bg-pink-50 rounded-full transition-colors"
          >
            <SkipBack className="w-6 h-6 text-pink-600" />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 flex items-center justify-center bg-pink-600 hover:bg-pink-700 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </button>

          <button
            onClick={toggleLoop}
            className={`p-2 rounded-full transition-colors ${
              isLooping ? 'bg-pink-100 text-pink-600' : 'hover:bg-pink-50'
            }`}
          >
            <Repeat className="w-6 h-6" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-pink-50 rounded-full"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-gray-500" />
            ) : (
              <Volume2 className="w-6 h-6 text-gray-500" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
          />
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-colors ${
              isLiked ? 'text-pink-600' : 'text-gray-400 hover:text-pink-600'
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
