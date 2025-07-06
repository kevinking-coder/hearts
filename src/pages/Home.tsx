import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Sparkles, BookOpen, AlertTriangle, ArrowRight, Shield, Users, Clock, Globe } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Anonymous Chat',
      description: 'Connect with trained listeners in a safe, anonymous environment',
      path: '/chat',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Sparkles,
      title: 'Wellness Tools',
      description: 'Access breathing exercises, meditation, and stress relief techniques',
      path: '/wellness-tools',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: BookOpen,
      title: 'Private Journal',
      description: 'Express your thoughts and track your emotional journey',
      path: '/journal',
      color: 'from-warm-500 to-warm-600'
    },
    {
      icon: AlertTriangle,
      title: 'Crisis Support',
      description: 'Immediate help and resources for urgent situations',
      path: '/crisis-support',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Become a Supporter',
      description: 'Join our global community and help others in need',
      path: '/peer-support-application',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: '100% Anonymous',
      description: 'Your privacy is our top priority. No personal information required.'
    },
    {
      icon: Users,
      title: 'Trained Listeners',
      description: 'Connect with compassionate volunteers who are here to listen.'
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Support is available whenever you need it, day or night.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div 
        className="text-center py-16 lg:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
          <span className="gradient-text">You're Not Alone</span>
        </h1>
        
        <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A safe, anonymous space for emotional support, wellness tools, and compassionate listening.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/chat">
            <motion.button 
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Talking
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </motion.button>
          </Link>
          
          <Link to="/wellness-tools">
            <motion.button 
              className="btn-secondary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Tools
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Link key={feature.title} to={feature.path}>
              <motion.div 
                className="card group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            </Link>
          )
        })}
      </motion.div>

      {/* Benefits Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-12 gradient-text">Why Choose HeartSpace?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <motion.div 
                key={benefit.title}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* International Support Section */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Global Support Network</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our community spans across continents, providing support to people from all walks of life, 
            cultures, and backgrounds. No matter where you are, help is just a click away.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">24/7 Global Coverage</h3>
            <p className="text-gray-600 text-sm">
              Support available in multiple time zones, ensuring someone is always there when you need them.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Cultural Sensitivity</h3>
            <p className="text-gray-600 text-sm">
              Our supporters understand diverse cultural perspectives and provide culturally appropriate care.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Multilingual Support</h3>
            <p className="text-gray-600 text-sm">
              Connect with supporters who speak your language and understand your cultural context.
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="card text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-4">Ready to Feel Better?</h2>
        <p className="text-lg mb-6 opacity-90">
          Take the first step towards emotional wellness. We're here to support you.
        </p>
        <Link to="/chat">
          <motion.button 
            className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default Home 