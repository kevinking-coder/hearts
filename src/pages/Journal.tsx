import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Save, Trash2, Calendar, Heart, Edit3, Lock } from 'lucide-react'
import { format } from 'date-fns'

interface JournalEntry {
  id: string
  title: string
  content: string
  mood: 'happy' | 'sad' | 'anxious' | 'angry' | 'neutral' | 'excited'
  timestamp: Date
  tags: string[]
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState<JournalEntry['mood']>('neutral')
  const [tags, setTags] = useState('')

  const moods = [
    { value: 'happy', label: 'Happy', emoji: '😊', color: 'bg-green-100 text-green-800' },
    { value: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-100 text-blue-800' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'angry', label: 'Angry', emoji: '😠', color: 'bg-red-100 text-red-800' },
    { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'bg-gray-100 text-gray-800' },
    { value: 'excited', label: 'Excited', emoji: '🤩', color: 'bg-purple-100 text-purple-800' }
  ]

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('journal-entries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      })))
    }
  }, [])

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(entries))
  }, [entries])

  const handleNewEntry = () => {
    setCurrentEntry(null)
    setIsEditing(true)
    setTitle('')
    setContent('')
    setMood('neutral')
    setTags('')
  }

  const handleEditEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry)
    setIsEditing(true)
    setTitle(entry.title)
    setContent(entry.content)
    setMood(entry.mood)
    setTags(entry.tags.join(', '))
  }

  const handleSaveEntry = () => {
    if (!title.trim() || !content.trim()) return

    const newEntry: JournalEntry = {
      id: currentEntry?.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      mood,
      timestamp: currentEntry?.timestamp || new Date(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    if (currentEntry) {
      setEntries(prev => prev.map(entry => entry.id === currentEntry.id ? newEntry : entry))
    } else {
      setEntries(prev => [newEntry, ...prev])
    }

    setIsEditing(false)
    setCurrentEntry(null)
    setTitle('')
    setContent('')
    setMood('neutral')
    setTags('')
  }

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      setEntries(prev => prev.filter(entry => entry.id !== id))
      if (currentEntry?.id === id) {
        setIsEditing(false)
        setCurrentEntry(null)
      }
    }
  }

  const getMoodEmoji = (moodValue: string) => {
    return moods.find(m => m.value === moodValue)?.emoji || '😐'
  }

  const getMoodColor = (moodValue: string) => {
    return moods.find(m => m.value === moodValue)?.color || 'bg-gray-100 text-gray-800'
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
        <h1 className="text-3xl font-bold gradient-text mb-4">Private Journal</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Express your thoughts, track your emotions, and reflect on your journey. Your journal is completely private and secure.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Journal Entries List */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Your Entries</h2>
              <motion.button
                onClick={handleNewEntry}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </motion.button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {entries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No journal entries yet.</p>
                  <p className="text-sm">Start writing to track your journey.</p>
                </div>
              ) : (
                entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      currentEntry?.id === entry.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleEditEntry(entry)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 truncate">{entry.title}</h3>
                      <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{entry.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(entry.timestamp, 'MMM d, yyyy')}
                      </div>
                      {entry.tags.length > 0 && (
                        <span className="text-primary-600">{entry.tags.length} tags</span>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Journal Editor */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card">
            {isEditing ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {currentEntry ? 'Edit Entry' : 'New Entry'}
                  </h2>
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={handleSaveEntry}
                      disabled={!title.trim() || !content.trim()}
                      className={`px-4 py-2 rounded-lg text-white font-medium ${
                        title.trim() && content.trim()
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                      whileHover={title.trim() && content.trim() ? { scale: 1.05 } : {}}
                      whileTap={title.trim() && content.trim() ? { scale: 0.95 } : {}}
                    >
                      <Save className="w-4 h-4 mr-2 inline" />
                      Save
                    </motion.button>
                    {currentEntry && (
                      <motion.button
                        onClick={() => handleDeleteEntry(currentEntry.id)}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-4 h-4 mr-2 inline" />
                        Delete
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Title Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your entry a title..."
                    className="input-field"
                  />
                </div>

                {/* Mood Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How are you feeling?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {moods.map((moodOption) => (
                      <button
                        key={moodOption.value}
                        onClick={() => setMood(moodOption.value as JournalEntry['mood'])}
                        className={`p-3 rounded-lg border transition-all duration-200 ${
                          mood === moodOption.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{moodOption.emoji}</div>
                        <div className="text-xs font-medium">{moodOption.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Thoughts
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write about your day, your feelings, or anything on your mind..."
                    className="input-field"
                    rows={12}
                  />
                </div>

                {/* Tags Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g., anxiety, gratitude, work, family"
                    className="input-field"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Edit3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {entries.length === 0 ? 'Start Your Journal' : 'Select an Entry'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {entries.length === 0 
                    ? 'Begin your emotional wellness journey by writing your first entry.'
                    : 'Choose an entry from the list to read or edit.'
                  }
                </p>
                {entries.length === 0 && (
                  <motion.button
                    onClick={handleNewEntry}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Write Your First Entry
                  </motion.button>
                )}
              </div>
            )}
          </div>

          {/* Privacy Notice */}
          <motion.div 
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-start space-x-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Your Privacy is Protected</h3>
                <p className="text-sm text-blue-700">
                  All journal entries are stored locally on your device and are completely private. 
                  We cannot access your personal thoughts and feelings.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Journal 