import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Sparkles, BookOpen, Info, AlertTriangle, User, LogOut, Users } from 'lucide-react'

interface NavbarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  user?: any
  onLogout?: () => void
}

const Navbar = ({ currentPage, setCurrentPage, user, onLogout }: NavbarProps) => {
  const location = useLocation()

  const navItems = [
    { path: '/', name: 'Home', icon: Heart, label: 'home' },
    { path: '/chat', name: 'Chat', icon: MessageCircle, label: 'chat' },
    { path: '/wellness-tools', name: 'Tools', icon: Sparkles, label: 'wellness' },
    { path: '/journal', name: 'Journal', icon: BookOpen, label: 'journal' },
    { path: '/resources', name: 'Resources', icon: Info, label: 'resources' },
    { path: '/crisis-support', name: 'Crisis', icon: AlertTriangle, label: 'crisis' },
  ]

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            onClick={() => setCurrentPage('home')}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center"
            >
              <Heart className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">HeartSpace</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setCurrentPage(item.label)}
                  className="relative group"
                >
                  <motion.div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                  
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/peer-support-application"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
            >
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Become a Supporter</span>
            </Link>
            
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {user?.name || 'User'}
              </span>
              {user?.country && (
                <span className="text-xs text-gray-500">({user.country})</span>
              )}
            </div>
            
            {onLogout && (
              <motion.button
                onClick={onLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setCurrentPage(item.label)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar 