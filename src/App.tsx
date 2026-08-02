import { Navigate, Route, Routes } from 'react-router-dom'
import AboutPage from './AboutPage'
import PlatformPage from './PlatformPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlatformPage />} />
      <Route path="/why" element={<AboutPage />} />
      <Route path="/about" element={<Navigate to="/why" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
