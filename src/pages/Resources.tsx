import { motion } from 'framer-motion'
import { ExternalLink, Phone, Globe, BookOpen, Users, Shield, Heart, AlertTriangle } from 'lucide-react'

const Resources = () => {
  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 free and confidential support for people in distress',
      available: '24/7',
      icon: Phone,
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free 24/7 crisis counseling via text message',
      available: '24/7',
      icon: Phone,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Emergency Services',
      phone: '911',
      description: 'For immediate life-threatening emergencies',
      available: '24/7',
      icon: AlertTriangle,
      color: 'from-red-600 to-red-700'
    }
  ]

  const mentalHealthResources = [
    {
      name: 'Psychology Today',
      description: 'Find therapists, psychiatrists, and treatment centers',
      url: 'https://www.psychologytoday.com',
      category: 'Therapy Directory',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'MentalHealth.gov',
      description: 'Official U.S. government information on mental health',
      url: 'https://www.mentalhealth.gov',
      category: 'Government Resource',
      icon: Shield,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'NIMH',
      description: 'National Institute of Mental Health resources and research',
      url: 'https://www.nimh.nih.gov',
      category: 'Research & Education',
      icon: BookOpen,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Mental Health America',
      description: 'Advocacy, education, and support for mental health',
      url: 'https://www.mhanational.org',
      category: 'Advocacy',
      icon: Heart,
      color: 'from-pink-500 to-pink-600'
    }
  ]

  const selfHelpResources = [
    {
      title: 'Understanding Anxiety',
      description: 'Learn about anxiety disorders, symptoms, and coping strategies',
      topics: ['Symptoms', 'Causes', 'Treatment', 'Self-help']
    },
    {
      title: 'Managing Depression',
      description: 'Information about depression and ways to manage symptoms',
      topics: ['Signs & Symptoms', 'Treatment Options', 'Lifestyle Changes', 'Support']
    },
    {
      title: 'Stress Management',
      description: 'Techniques and strategies for managing stress effectively',
      topics: ['Relaxation Techniques', 'Time Management', 'Healthy Habits', 'Mindfulness']
    },
    {
      title: 'Building Resilience',
      description: 'Develop emotional strength and bounce back from challenges',
      topics: ['Mindset', 'Coping Skills', 'Social Support', 'Growth Mindset']
    }
  ]

  const wellnessTips = [
    {
      tip: 'Practice daily gratitude by writing down three things you are thankful for',
      category: 'Mindfulness'
    },
    {
      tip: 'Get 7-9 hours of quality sleep each night for better mental health',
      category: 'Sleep'
    },
    {
      tip: 'Exercise regularly - even 30 minutes of walking can boost your mood',
      category: 'Physical Health'
    },
    {
      tip: 'Stay connected with friends and family - social support is crucial',
      category: 'Relationships'
    },
    {
      tip: 'Limit screen time and take regular breaks from social media',
      category: 'Digital Wellness'
    },
    {
      tip: 'Learn to say no and set healthy boundaries in your relationships',
      category: 'Self-Care'
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
        <h1 className="text-3xl font-bold gradient-text mb-4">Mental Health Resources</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find professional help, educational resources, and tools to support your mental wellness journey.
        </p>
      </motion.div>

      {/* Crisis Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Crisis Support</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {crisisResources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <motion.div
                key={resource.name}
                className="card border-l-4 border-red-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${resource.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{resource.name}</h3>
                    <p className="text-lg font-bold text-red-600 mb-2">{resource.phone}</p>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {resource.available}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Mental Health Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Professional Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {mentalHealthResources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <motion.a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${resource.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                        {resource.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {resource.category}
                    </span>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </motion.div>

      {/* Self-Help Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Self-Help Topics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {selfHelpResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
              <div className="flex flex-wrap gap-2">
                {resource.topics.map((topic) => (
                  <span
                    key={topic}
                    className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Wellness Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Daily Wellness Tips</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wellnessTips.map((tip, index) => (
            <motion.div
              key={tip.tip}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <p className="text-gray-700 mb-3">{tip.tip}</p>
              <span className="inline-block bg-secondary-100 text-secondary-700 text-xs px-2 py-1 rounded-full">
                {tip.category}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Important Notice */}
      <motion.div 
        className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Important Information</h3>
            <p className="text-sm text-yellow-700 mb-3">
              This app is not a substitute for professional mental health care. If you are experiencing 
              severe symptoms or thoughts of self-harm, please contact a mental health professional 
              or emergency services immediately.
            </p>
            <p className="text-sm text-yellow-700">
              The resources provided are for informational purposes only. Always consult with qualified 
              healthcare providers for diagnosis and treatment.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Resources 