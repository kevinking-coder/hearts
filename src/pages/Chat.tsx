import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, MessageCircle, Shield, Clock, Heart, Bot, Users, AlertTriangle, BookOpen, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai' | 'peer' | 'crisis'
  timestamp: Date
}

type ChatType = 'ai' | 'peer' | 'crisis' | 'self-help'

const Chat = () => {
  const [activeChat, setActiveChat] = useState<ChatType>('ai')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize with welcome message based on chat type
    const welcomeMessages = {
      ai: {
        text: "Hello! I'm your AI mental health companion. I'm here to provide supportive conversations, help you process emotions, and offer coping strategies. How are you feeling today?",
        sender: 'ai' as const
      },
      peer: {
        text: "Welcome to peer support! You'll be connected with trained volunteers who understand what you're going through. What would you like to talk about?",
        sender: 'peer' as const
      },
      crisis: {
        text: "I'm here to help you through this difficult time. If you're in immediate danger, please call 911 or 988. What's happening right now?",
        sender: 'crisis' as const
      },
      'self-help': {
        text: "Welcome to self-help resources! I can guide you through exercises, provide information, and help you find the right tools for your situation.",
        sender: 'ai' as const
      }
    }

    setMessages([{
      id: '1',
      text: welcomeMessages[activeChat].text,
      sender: welcomeMessages[activeChat].sender,
      timestamp: new Date()
    }])
  }, [activeChat])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate response based on chat type
    setTimeout(() => {
      let responseText = ''
      let responseSender: 'ai' | 'peer' | 'crisis' = 'ai'

      switch (activeChat) {
        case 'ai':
          responseSender = 'ai'
          const aiResponses = [
            "I hear you, and I want you to know that your feelings are completely valid. Can you tell me more about what's on your mind?",
            "That sounds really challenging. It's okay to feel this way. What do you think might help you feel a bit better right now?",
            "I appreciate you sharing this with me. You're showing real strength by reaching out. How long have you been feeling this way?",
            "Your feelings matter, and it's completely normal to have difficult moments. What would be most helpful for you right now?",
            "I'm here to listen, and I want you to know you're not alone in this. What's the hardest part about what you're going through?",
            "Thank you for trusting me with this. It takes courage to open up. What do you think you need most right now?",
            "I can sense this is really affecting you. Your emotions are important, and it's okay to not be okay. What would feel supportive to you?",
            "You're doing the right thing by talking about this. Sometimes just sharing can help lighten the load. What's on your heart?"
          ]
          responseText = aiResponses[Math.floor(Math.random() * aiResponses.length)]
          break

        case 'peer':
          responseSender = 'peer'
          const peerResponses = [
            "I've been through something similar, and I want you to know you're not alone. What helped me was...",
            "I understand how overwhelming this can feel. Have you tried talking to someone you trust about this?",
            "It sounds like you're going through a really tough time. I'm here to listen and support you.",
            "I remember feeling that way too. It's okay to not have all the answers right now.",
            "You're showing so much courage by reaching out. That's a huge step forward.",
            "I've found that sometimes just having someone to talk to makes all the difference. I'm here for you.",
            "It's completely normal to feel this way given what you're going through. How are you coping?",
            "I want you to know that your feelings are valid and you deserve support."
          ]
          responseText = peerResponses[Math.floor(Math.random() * peerResponses.length)]
          break

        case 'crisis':
          responseSender = 'crisis'
          const crisisResponses = [
            "I'm here with you right now. You're not alone in this moment. Can you tell me what's happening?",
            "I want you to know that help is available and you don't have to go through this alone.",
            "Your safety is the most important thing right now. Are you in a safe place?",
            "I'm listening, and I care about what happens to you. What do you need right now?",
            "You're showing incredible strength by reaching out. Let's work through this together.",
            "I want you to know that this feeling won't last forever. Help is available.",
            "You matter, and your life has value. Let's talk about what's happening.",
            "I'm here to help you get through this moment. What would be most helpful right now?"
          ]
          responseText = crisisResponses[Math.floor(Math.random() * crisisResponses.length)]
          break

        case 'self-help':
          responseSender = 'ai'
          const selfHelpResponses = [
            "I can help you with some exercises that might be helpful. Would you like to try a breathing exercise?",
            "There are several techniques that might help. Let me guide you through a grounding exercise.",
            "I have some resources that might be useful for your situation. What would you like to focus on?",
            "Let's work on some coping strategies together. What feels most overwhelming right now?",
            "I can show you some mindfulness techniques that might help. Are you interested?",
            "There are different approaches we can try. What sounds most helpful to you?",
            "I have some exercises that might provide relief. Would you like to try one?",
            "Let me help you find the right tools for what you're experiencing."
          ]
          responseText = selfHelpResponses[Math.floor(Math.random() * selfHelpResponses.length)]
          break
      }

      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: responseSender,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, responseMessage])
      setIsTyping(false)
    }, 1500 + Math.random() * 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const chatTypes = [
    {
      type: 'ai' as ChatType,
      title: 'Professional Support (AI)',
      description: 'AI-powered mental health companion',
      icon: Bot,
      color: 'from-blue-500 to-blue-600',
      badge: 'AI'
    },
    {
      type: 'peer' as ChatType,
      title: 'Peer Support',
      description: 'Connect with trained volunteers',
      icon: Users,
      color: 'from-green-500 to-green-600',
      badge: 'Live'
    },
    {
      type: 'crisis' as ChatType,
      title: 'Crisis Support',
      description: 'Immediate help and resources',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      badge: 'Urgent'
    },
    {
      type: 'self-help' as ChatType,
      title: 'Self-Help Resources',
      description: 'Tools and exercises',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      badge: 'Tools'
    }
  ]

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'ai': return <Bot className="w-4 h-4" />
      case 'peer': return <Users className="w-4 h-4" />
      case 'crisis': return <AlertTriangle className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'ai': return 'bg-blue-500'
      case 'peer': return 'bg-green-500'
      case 'crisis': return 'bg-red-500'
      default: return 'bg-primary-500'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold gradient-text mb-4">Support Chat</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the type of support that's right for you. All conversations are anonymous and secure.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        {/* Chat Type Selection */}
        {chatTypes.map((chatType) => {
          const Icon = chatType.icon
          const isActive = activeChat === chatType.type
          
          return (
            <motion.button
              key={chatType.type}
              onClick={() => setActiveChat(chatType.type)}
              className={`card text-center cursor-pointer transition-all duration-200 ${
                isActive 
                  ? 'ring-2 ring-primary-500 bg-primary-50' 
                  : 'hover:bg-gray-50'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${chatType.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{chatType.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{chatType.description}</p>
              <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                chatType.badge === 'Urgent' ? 'bg-red-100 text-red-700' :
                chatType.badge === 'Live' ? 'bg-green-100 text-green-700' :
                chatType.badge === 'AI' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {chatType.badge}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Chat Container */}
      <motion.div 
        className="card h-96 lg:h-[500px] flex flex-col"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Chat Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {(() => {
                const activeChatType = chatTypes.find(ct => ct.type === activeChat)
                const Icon = activeChatType?.icon || Bot
                return (
                  <div className={`w-8 h-8 bg-gradient-to-r ${activeChatType?.color || 'from-blue-500 to-blue-600'} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                )
              })()}
              <div>
                <h3 className="font-semibold text-gray-800">
                  {chatTypes.find(ct => ct.type === activeChat)?.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {activeChat === 'peer' ? 'Connecting to peer supporter...' :
                   activeChat === 'crisis' ? 'Crisis support available 24/7' :
                   activeChat === 'self-help' ? 'Self-help tools and resources' :
                   'AI companion ready to help'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Anonymous</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getSenderColor(message.sender)}`}>
                    {getSenderIcon(message.sender)}
                  </div>
                  
                  <div className={`${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-support'}`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2">
                  <div className={`w-8 h-8 ${getSenderColor(activeChat === 'ai' ? 'ai' : activeChat === 'peer' ? 'peer' : 'crisis')} rounded-full flex items-center justify-center`}>
                    {getSenderIcon(activeChat === 'ai' ? 'ai' : activeChat === 'peer' ? 'peer' : 'crisis')}
                  </div>
                  <div className="chat-bubble-support">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${activeChat === 'ai' ? 'AI companion' : activeChat === 'peer' ? 'peer supporter' : activeChat === 'crisis' ? 'crisis support' : 'self-help assistant'}...`}
              className="flex-1 input-field resize-none"
              rows={2}
              disabled={isTyping}
            />
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className={`p-3 rounded-xl transition-all duration-200 ${
                inputText.trim() && !isTyping
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={inputText.trim() && !isTyping ? { scale: 1.05 } : {}}
              whileTap={inputText.trim() && !isTyping ? { scale: 0.95 } : {}}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </motion.div>

      {/* Safety Notice */}
      <motion.div 
        className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-1">Important Safety Notice</h3>
            <p className="text-sm text-yellow-700">
              If you're experiencing thoughts of self-harm or are in immediate danger, 
              please call emergency services (911) or the National Suicide Prevention Lifeline (988) immediately.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Chat 