import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Users, Clock, Award, Mail, Heart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const PeerSupportSuccess = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold gradient-text mb-4">Application Submitted!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for applying to become a peer supporter. We're excited to have you join our global community!
        </p>
      </motion.div>

      <motion.div 
        className="card bg-green-50 border-green-200 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-xl font-bold text-green-800 mb-4">What Happens Next?</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-800">Email Confirmation</h3>
              <p className="text-green-700">You'll receive a confirmation email within 24 hours with your next steps.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-800">Review Process</h3>
              <p className="text-green-700">Our team will review your application and training results (usually 2-3 business days).</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-800">Onboarding</h3>
              <p className="text-green-700">Once approved, you'll receive access to our peer support platform and guidelines.</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-2 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Peer Supporter Guidelines</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Always prioritize safety and refer to crisis resources when needed</span>
            </li>
            <li className="flex items-start space-x-2">
              <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Listen actively without giving medical or professional advice</span>
            </li>
            <li className="flex items-start space-x-2">
              <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Maintain confidentiality and respect privacy</span>
            </li>
            <li className="flex items-start space-x-2">
              <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Set healthy boundaries and take breaks when needed</span>
            </li>
            <li className="flex items-start space-x-2">
              <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Encourage professional help when appropriate</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support Resources</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">Crisis Resources</h4>
              <p className="text-sm text-blue-700">Always have emergency contacts ready</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800">Supervision</h4>
              <p className="text-sm text-green-700">Regular check-ins with experienced supporters</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800">Training Materials</h4>
              <p className="text-sm text-purple-700">Ongoing education and skill development</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link to="/">
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Home
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default PeerSupportSuccess 