import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Solutions from './pages/Solutions'
import SolutionDetail from './pages/SolutionDetail'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import DesignPro from './pages/DesignPro'

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

Layout.propTypes = { children: PropTypes.node }
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function LayoutRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <Routes>
        {/* Kaldilabs — main home */}
        <Route path="/" element={<Home />} />
        <Route path="/kaldilabs" element={<Home />} />

        {/* DesignPro — standalone, no Navbar/Footer */}
        <Route path="/designpro" element={<DesignPro />} />

        {/* Kaldilabs sub-routes — wrapped in shared Layout */}
        <Route element={<LayoutRoute />}>
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<SolutionDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
