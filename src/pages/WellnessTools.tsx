import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Timer, Wind, Music, Sun, Moon, Heart } from 'lucide-react'

const WellnessTools = () => {
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [breathingTime, setBreathingTime] = useState(4)
  const [isBreathingActive, setIsBreathingActive] = useState(false)
  const [meditationTime, setMeditationTime] = useState(300) // 5 minutes
  const [isMeditating, setIsMeditating] = useState(false)
  const [currentMeditationTime, setCurrentMeditationTime] = useState(meditationTime)

  // Breathing exercise
  useEffect(() => {
    if (!isBreathingActive) return

    const phases = [
      { phase: 'inhale' as const, duration: breathingTime * 1000 },
      { phase: 'hold' as const, duration: breathingTime * 1000 },
      { phase: 'exhale' as const, duration: breathingTime * 1000 }
    ]

    let currentPhaseIndex = 0
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const totalCycleTime = phases.reduce((sum, p) => sum + p.duration, 0)
      const cycleTime = elapsed % totalCycleTime

      let accumulatedTime = 0
      for (let i = 0; i < phases.length; i++) {
        accumulatedTime += phases[i].duration
        if (cycleTime < accumulatedTime) {
          setBreathingPhase(phases[i].phase)
          break
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isBreathingActive, breathingTime])

  // Meditation timer
  useEffect(() => {
    if (!isMeditating) return

    const interval = setInterval(() => {
      setCurrentMeditationTime(prev => {
        if (prev <= 1) {
          setIsMeditating(false)
          return meditationTime
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isMeditating, meditationTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const breathingInstructions = {
    inhale: 'Breathe in slowly and deeply',
    hold: 'Hold your breath',
    exhale: 'Breathe out slowly and completely'
  }

  const quickReliefTechniques = [
    {
      title: '5-4-3-2-1 Grounding',
      description: 'Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
      icon: Sun,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and relax each muscle group from your toes to your head.',
      icon: Wind,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'Loving-Kindness Meditation',
      description: 'Send positive thoughts to yourself and others.',
      icon: Heart,
      color: 'from-pink-400 to-rose-500'
    },
    {
      title: 'Body Scan',
      description: 'Focus your attention on each part of your body, noticing sensations.',
      icon: Moon,
      color: 'from-purple-400 to-indigo-500'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-4">Wellness Tools</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Take a moment to breathe, meditate, and find your center. These tools are here to help you feel more grounded and peaceful.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Breathing Exercise */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Breathing Exercise</h2>
            
            {/* Breathing Circle */}
            <motion.div
              className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
                breathingPhase === 'inhale' ? 'bg-primary-500' : 
                breathingPhase === 'hold' ? 'bg-secondary-500' : 'bg-warm-500'
              }`}
              animate={{
                scale: breathingPhase === 'inhale' ? [1, 1.3, 1] : 
                       breathingPhase === 'hold' ? 1.3 : [1.3, 1, 1],
              }}
              transition={{
                duration: breathingTime,
                repeat: isBreathingActive ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <Wind className="w-8 h-8 text-white" />
            </motion.div>

            <p className="text-lg font-medium mb-4 text-gray-700">
              {breathingInstructions[breathingPhase]}
            </p>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <motion.button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className={`p-3 rounded-xl ${
                  isBreathingActive 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isBreathingActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </motion.button>
              
              <button
                onClick={() => {
                  setIsBreathingActive(false)
                  setBreathingPhase('inhale')
                }}
                className="p-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Breathing Time Control */}
            <div className="flex items-center justify-center space-x-4">
              <label className="text-sm text-gray-600">Breathing Time:</label>
              <select
                value={breathingTime}
                onChange={(e) => setBreathingTime(Number(e.target.value))}
                className="input-field w-20 text-center"
              >
                <option value={3}>3s</option>
                <option value={4}>4s</option>
                <option value={5}>5s</option>
                <option value={6}>6s</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Meditation Timer */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Meditation Timer</h2>
            
            {/* Timer Display */}
            <div className="text-6xl font-bold mb-6 text-gray-800">
              {formatTime(currentMeditationTime)}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <motion.button
                onClick={() => setIsMeditating(!isMeditating)}
                className={`p-3 rounded-xl ${
                  isMeditating 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMeditating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </motion.button>
              
              <button
                onClick={() => {
                  setIsMeditating(false)
                  setCurrentMeditationTime(meditationTime)
                }}
                className="p-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Time Presets */}
            <div className="flex justify-center space-x-2">
              {[300, 600, 900, 1800].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setMeditationTime(time)
                    setCurrentMeditationTime(time)
                  }}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    meditationTime === time
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {time / 60}m
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Relief Techniques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-center mb-8 gradient-text">
          Quick Relief Techniques
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickReliefTechniques.map((technique, index) => {
            const Icon = technique.icon
            return (
              <motion.div
                key={technique.title}
                className="card cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${technique.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{technique.title}</h3>
                <p className="text-gray-600 text-sm">{technique.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

export default WellnessTools 