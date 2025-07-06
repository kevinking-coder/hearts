import { motion } from 'framer-motion'
import { Phone, AlertTriangle, Heart, Shield, Clock, Users, ExternalLink } from 'lucide-react'

const CrisisSupport = () => {
  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: 'Free, confidential support available 24/7',
      available: '24/7',
      icon: Phone,
      color: 'from-red-500 to-red-600',
      urgent: true
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free crisis counseling via text message',
      available: '24/7',
      icon: Phone,
      color: 'from-blue-500 to-blue-600',
      urgent: true
    },
    {
      name: 'Emergency Services',
      phone: '911',
      description: 'For immediate life-threatening emergencies',
      available: '24/7',
      icon: AlertTriangle,
      color: 'from-red-600 to-red-700',
      urgent: true
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-HELP (4357)',
      description: 'Treatment referral and information service',
      available: '24/7',
      icon: Users,
      color: 'from-green-500 to-green-600',
      urgent: false
    }
  ]

  const immediateActions = [
    {
      title: 'You Are Not Alone',
      description: 'Reach out to someone you trust - a friend, family member, or mental health professional.',
      icon: Heart,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Remove Harmful Objects',
      description: 'If you have thoughts of self-harm, remove or secure any dangerous items in your environment.',
      icon: Shield,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Stay Connected',
      description: 'Don\'t isolate yourself. Stay in contact with supportive people in your life.',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Seek Professional Help',
      description: 'Contact a mental health professional, crisis hotline, or go to the nearest emergency room.',
      icon: Clock,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const warningSigns = [
    'Talking about wanting to die or kill oneself',
    'Looking for ways to kill oneself',
    'Talking about feeling hopeless or having no reason to live',
    'Talking about feeling trapped or in unbearable pain',
    'Talking about being a burden to others',
    'Increasing use of alcohol or drugs',
    'Acting anxious, agitated, or reckless',
    'Sleeping too little or too much',
    'Withdrawing or feeling isolated',
    'Showing rage or talking about seeking revenge',
    'Extreme mood swings'
  ]

  const copingStrategies = [
    {
      title: 'Grounding Techniques',
      description: 'Focus on your immediate surroundings to stay present',
      steps: [
        'Name 5 things you can see',
        'Name 4 things you can touch',
        'Name 3 things you can hear',
        'Name 2 things you can smell',
        'Name 1 thing you can taste'
      ]
    },
    {
      title: 'Deep Breathing',
      description: 'Slow, controlled breathing to calm your nervous system',
      steps: [
        'Breathe in slowly for 4 counts',
        'Hold your breath for 4 counts',
        'Breathe out slowly for 4 counts',
        'Repeat until you feel calmer'
      ]
    },
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Systematically tense and relax muscle groups',
      steps: [
        'Start with your toes',
        'Tense the muscles for 5 seconds',
        'Release and feel the relaxation',
        'Move up to your legs, stomach, arms, and face'
      ]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Emergency Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <motion.div
            className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center urgent-pulse"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-10 h-10 text-white" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl font-bold text-red-600 mb-4">Crisis Support</h1>
        <p className="text-xl text-gray-700 mb-6">
          If you're in immediate danger or having thoughts of self-harm, help is available 24/7.
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Need Immediate Help?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-red-700 mb-2">Call or Text</p>
              <a 
                href="tel:988" 
                className="text-3xl font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                988
              </a>
              <p className="text-sm text-red-600">National Suicide Prevention Lifeline</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-red-700 mb-2">Emergency</p>
              <a 
                href="tel:911" 
                className="text-3xl font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                911
              </a>
              <p className="text-sm text-red-600">For life-threatening emergencies</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Emergency Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Emergency Contacts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon
            return (
              <motion.div
                key={contact.name}
                className={`card ${contact.urgent ? 'border-l-4 border-red-500' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{contact.name}</h3>
                    <a 
                      href={contact.phone.includes('Text') ? undefined : `tel:${contact.phone.replace(/\D/g, '')}`}
                      className="text-lg font-bold text-red-600 hover:text-red-700 transition-colors"
                    >
                      {contact.phone}
                    </a>
                    <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {contact.available}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Immediate Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">What You Can Do Right Now</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {immediateActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.title}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Warning Signs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Warning Signs to Watch For</h2>
        <div className="card">
          <p className="text-gray-700 mb-4">
            If you or someone you know is experiencing these signs, reach out for help immediately:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {warningSigns.map((sign, index) => (
              <motion.div
                key={sign}
                className="flex items-start space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{sign}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Coping Strategies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Coping Strategies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {copingStrategies.map((strategy, index) => (
            <motion.div
              key={strategy.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <h3 className="font-semibold text-gray-800 mb-2">{strategy.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
              <ol className="text-sm text-gray-700 space-y-1">
                {strategy.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start space-x-2">
                    <span className="text-primary-600 font-medium">{stepIndex + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Important Notice */}
      <motion.div 
        className="bg-red-50 border border-red-200 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-800 mb-2">Remember</h3>
            <p className="text-sm text-red-700 mb-2">
              • You are not alone in this struggle
            </p>
            <p className="text-sm text-red-700 mb-2">
              • Your feelings are valid and temporary
            </p>
            <p className="text-sm text-red-700 mb-2">
              • Professional help is available and effective
            </p>
            <p className="text-sm text-red-700">
              • Reaching out for help is a sign of strength, not weakness
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CrisisSupport 