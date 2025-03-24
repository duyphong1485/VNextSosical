import React, { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  duration?: number
  type?: 'error' | 'success'
}

const Toast: React.FC<ToastProps> = ({ message, duration = 5000, type = 'error' }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  const backgroundColor = type === 'success' ? '#4CAF50' : '#e2720a'

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor,
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '4px',
        zIndex: 9999,
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
      }}
    >
      {message}
    </div>
  )
}

export default Toast
