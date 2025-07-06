import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Globe, Heart, CheckCircle, ArrowRight, ArrowLeft, Users, Clock, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ApplicationForm {
  name: string
  email: string
  country: string
  age: string
  experience: string
  motivation: string
  availability: string
}

interface TrainingQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const PeerSupportApplication = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    email: '',
    country: '',
    age: '',
    experience: '',
    motivation: '',
    availability: ''
  })
  const [answers, setAnswers] = useState<number[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'India', 'Brazil', 'Mexico',
    'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Morocco', 'Ghana', 'Uganda', 'Tanzania', 'Ethiopia', 'Rwanda',
    'China', 'South Korea', 'Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Pakistan', 'Bangladesh',
    'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay', 'Guyana',
    'Russia', 'Ukraine', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria', 'Serbia', 'Croatia', 'Slovenia',
    'Spain', 'Italy', 'Portugal', 'Greece', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway',
    'Denmark', 'Finland', 'Iceland', 'Ireland', 'New Zealand', 'Israel', 'Turkey', 'Iran', 'Iraq', 'Saudi Arabia'
  ]

  const trainingQuestions: TrainingQuestion[] = [
    {
      id: 1,
      question: "What is the most important quality for a peer supporter?",
      options: [
        "Having professional mental health training",
        "Being able to give advice and solutions",
        "Active listening and empathy",
        "Having experienced the same problems"
      ],
      correctAnswer: 2,
      explanation: "Active listening and empathy are the foundation of peer support. While personal experience can be valuable, the ability to listen without judgment and show genuine care is most important."
    },
    {
      id: 2,
      question: "When someone shares thoughts of self-harm, what should you do first?",
      options: [
        "Keep it confidential and continue listening",
        "Immediately call emergency services",
        "Ask them to promise not to harm themselves",
        "Encourage them to talk more about their feelings"
      ],
      correctAnswer: 1,
      explanation: "Safety is always the priority. If someone is in immediate danger, call emergency services (911) or crisis hotlines (988) right away."
    },
    {
      id: 3,
      question: "What should you avoid doing as a peer supporter?",
      options: [
        "Sharing your own experiences",
        "Giving medical or professional advice",
        "Setting boundaries for the conversation",
        "Taking breaks when needed"
      ],
      correctAnswer: 1,
      explanation: "Peer supporters should never give medical or professional advice. They should encourage people to seek professional help when needed."
    },
    {
      id: 4,
      question: "How should you respond when someone is crying?",
      options: [
        "Tell them to stop crying and be strong",
        "Offer tissues and continue listening",
        "Change the subject to something happier",
        "Give them space to cry alone"
      ],
      correctAnswer: 1,
      explanation: "Crying is a natural emotional response. Offer tissues if available and continue to listen and support them without judgment."
    },
    {
      id: 5,
      question: "What is the best way to end a support conversation?",
      options: [
        "Suddenly stop when you're tired",
        "Summarize what was discussed and check if they're okay",
        "Tell them you have to go immediately",
        "Promise to solve their problems"
      ],
      correctAnswer: 1,
      explanation: "Always end conversations thoughtfully by summarizing key points and ensuring the person feels heard and supported."
    }
  ]

  const handleInputChange = (field: keyof ApplicationForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < trainingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer === trainingQuestions[index].correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / trainingQuestions.length) * 100)
  }

  const handleSubmitApplication = () => {
    const score = calculateScore()
    const application = {
      ...formData,
      trainingScore: score,
      submittedAt: new Date().toISOString(),
      status: score >= 80 ? 'approved' : 'needs_retraining'
    }
    
    localStorage.setItem('peerSupportApplication', JSON.stringify(application))
    navigate('/peer-support-success')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold gradient-text mb-2">Become a Peer Supporter</h2>
              <p className="text-gray-600">Join our global community of compassionate listeners</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Help Others</h3>
                <p className="text-sm text-gray-600">Support people in their difficult moments</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Flexible Hours</h3>
                <p className="text-sm text-gray-600">Volunteer when it works for you</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Make Impact</h3>
                <p className="text-sm text-gray-600">Be part of a global support network</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="input-field pl-10"
                    required
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range *
                </label>
                <select
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select your age range</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46-55">46-55</option>
                  <option value="56+">56+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="Describe any relevant experience (counseling, volunteering, personal experience with mental health, etc.)"
                  className="input-field"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to become a peer supporter? *
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="Tell us about your motivation and what you hope to contribute"
                  className="input-field"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability *
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select your availability</option>
                  <option value="1-2 hours/week">1-2 hours per week</option>
                  <option value="3-5 hours/week">3-5 hours per week</option>
                  <option value="6-10 hours/week">6-10 hours per week</option>
                  <option value="10+ hours/week">10+ hours per week</option>
                </select>
              </div>
            </div>

            <motion.button
              onClick={() => setCurrentStep(2)}
              disabled={!formData.name || !formData.email || !formData.country || !formData.age || !formData.motivation || !formData.availability}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue to Training
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </motion.button>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {!showResults ? (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold gradient-text mb-2">Peer Support Training</h2>
                  <p className="text-gray-600">Complete this short training to become a peer supporter</p>
                  <div className="mt-4 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / trainingQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Question {currentQuestion + 1} of {trainingQuestions.length}
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {trainingQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {trainingQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                          answers[currentQuestion] === index
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 inline" />
                      Previous
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      disabled={answers[currentQuestion] === undefined}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {currentQuestion === trainingQuestions.length - 1 ? 'Finish' : 'Next'}
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  {calculateScore() >= 80 ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  ) : (
                    <Heart className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  )}
                  <h2 className="text-2xl font-bold gradient-text mb-2">
                    Training Complete!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    You scored {calculateScore()}% on the training assessment
                  </p>
                </div>

                {calculateScore() >= 80 ? (
                  <div className="card bg-green-50 border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Congratulations!</h3>
                    <p className="text-green-700 mb-4">
                      You've successfully completed the peer support training. You're ready to start helping others!
                    </p>
                    <motion.button
                      onClick={handleSubmitApplication}
                      className="btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit Application
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </motion.button>
                  </div>
                ) : (
                  <div className="card bg-orange-50 border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Almost There!</h3>
                    <p className="text-orange-700 mb-4">
                      You need to score at least 80% to become a peer supporter. Would you like to retake the training?
                    </p>
                    <div className="space-x-4">
                      <button
                        onClick={() => {
                          setAnswers([])
                          setCurrentQuestion(0)
                          setShowResults(false)
                        }}
                        className="btn-secondary"
                      >
                        Retake Training
                      </button>
                      <button
                        onClick={() => navigate('/')}
                        className="btn-primary"
                      >
                        Return Home
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderStep()}
    </div>
  )
}

export default PeerSupportApplication 