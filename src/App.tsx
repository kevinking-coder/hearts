import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Chat from './pages/Chat'
import WellnessTools from './pages/WellnessTools'
import Journal from './pages/Journal'
import Resources from './pages/Resources'
import CrisisSupport from './pages/CrisisSupport'
import Auth from './pages/Auth'
import PeerSupportApplication from './pages/PeerSupportApplication'
import PeerSupportSuccess from './pages/PeerSupportSuccess'
import { useState, useEffect } from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setIsAuthenticated(userData.isAuthenticated)
      setUser(userData)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
  }

  if (!isAuthenticated) {
    return <Auth />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
      
      <main className="pt-20 pb-8">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Chat />
                </motion.div>
              } 
            />
            <Route 
              path="/wellness-tools" 
              element={
                <motion.div
                  key="wellness"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WellnessTools />
                </motion.div>
              } 
            />
            <Route 
              path="/journal" 
              element={
                <motion.div
                  key="journal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Journal />
                </motion.div>
              } 
            />
            <Route 
              path="/resources" 
              element={
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Resources />
                </motion.div>
              } 
            />
            <Route 
              path="/crisis-support" 
              element={
                <motion.div
                  key="crisis"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CrisisSupport />
                </motion.div>
              } 
            />
            <Route 
              path="/peer-support-application" 
              element={
                <motion.div
                  key="peer-application"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PeerSupportApplication />
                </motion.div>
              } 
            />
            <Route 
              path="/peer-support-success" 
              element={
                <motion.div
                  key="peer-success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PeerSupportSuccess />
                </motion.div>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App 