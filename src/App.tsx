import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import { useReveal } from './useReveal'

// Scroll to the #hash target after navigation, or to the top for a new page
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
}

function App() {
  const { pathname } = useLocation()
  useReveal(pathname)
  useScrollOnNavigate()

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Old addresses from when Vision and Mission were separate pages */}
          <Route path="/about/our-vision" element={<Navigate to="/about#our-vision" replace />} />
          <Route path="/about/our-mission" element={<Navigate to="/about#our-mission" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
