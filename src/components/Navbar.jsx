import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ArrowRight, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'Solutions',
    path: '/solutions',
    children: [
      { label: 'ERP Systems',         path: '/solutions/erp-systems',         desc: 'Unified business operations' },
      { label: 'HR Management',       path: '/solutions/hr-management',       desc: 'People & performance tools' },
      { label: 'Cost Management',     path: '/solutions/cost-management',     desc: 'Spend & budget control' },
      { label: 'School Management',   path: '/solutions/school-management',   desc: 'Education platforms' },
      { label: 'Project Management',  path: '/solutions/project-management',  desc: 'Task & delivery tracking' },
      { label: 'Custom Web Apps',     path: '/solutions/custom-web-apps',     desc: 'Tailored digital solutions' },
    ],
  },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Software Development', path: '/services/software-development', desc: 'End-to-end product engineering' },
      { label: 'Training & Consultancy', path: '/services/training-consultancy', desc: 'Upskill your team' },
      { label: 'Support & Maintenance', path: '/services/support-maintenance', desc: 'Ongoing care & reliability' },
    ],
  },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About',   path: '/about' },
]

function DropdownMenu({ items, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96, transition: { duration: 0.12 } }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[280px] rounded-2xl overflow-hidden z-50"
      style={{
        background: 'rgba(12,12,16,0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06) inset',
      }}
    >
      <div className="p-2">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className="group flex items-start gap-3 px-3.5 py-3 rounded-xl
                       hover:bg-white/[0.06] transition-all duration-150 cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors leading-tight">
                {item.label}
              </div>
              {item.desc && (
                <div className="text-xs text-white/38 mt-0.5 group-hover:text-white/55 transition-colors">
                  {item.desc}
                </div>
              )}
            </div>
            <ArrowRight size={13} className="text-white/20 group-hover:text-blue-400 mt-0.5 shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

DropdownMenu.propTypes = {
  items:   PropTypes.arrayOf(PropTypes.shape({ path: PropTypes.string, label: PropTypes.string, desc: PropTypes.string })).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const timeoutRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null) }, [location])

  const handleMouseEnter = (label) => {
    clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 130)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'shadow-2xl shadow-black/50' : ''
      }`}
      style={scrolled ? {
        background: 'rgba(5,5,6,0.88)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      } : {}}
    >
      {/* Scroll progress bar */}
      {scrolled && (
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent pointer-events-none"
          style={{ width: `${scrollProgress}%`, transition: 'width 0.1s linear' }}
        />
      )}
      <nav className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center
                          shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow duration-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8l3-3 3 3 3-3 3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12l3-3 3 3 3-3 3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
            </svg>
          </div>
          <span className="font-extrabold text-[17px] tracking-tight text-white">Kaldilabs</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-0.5" role="list">
          {navItems.map((item) => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path)

            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                onMouseLeave={item.children ? handleMouseLeave : undefined}
              >
                {item.children ? (
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-[13.5px] font-semibold transition-all duration-150
                      ${isActive
                        ? 'text-white bg-white/[0.08]'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`opacity-60 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180 opacity-100' : ''}`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg text-[13.5px] font-semibold transition-all duration-150
                      ${isActive
                        ? 'text-white bg-white/[0.08]'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                      }`}
                  >
                    {item.label}
                  </Link>
                )}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <DropdownMenu items={item.children} onClose={() => setActiveDropdown(null)} />
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Command palette trigger */}
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                       bg-white/[0.04] border border-white/8 text-white/40
                       hover:text-white/65 hover:bg-white/[0.07] transition-all duration-200"
            aria-label="Search"
          >
            <Search size={14} />
            <span className="text-xs hidden lg:block">Search</span>
            <kbd className="hidden lg:inline ml-1 px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/8 text-[10px] font-mono text-white/28">⌘K</kbd>
          </button>
          <Link
            to="/contact"
            className="btn-primary py-2.5 px-5 text-[13.5px]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-white/65 hover:text-white hover:bg-white/[0.06]
                     transition-all duration-150 focus-ring"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(7,7,10,0.97)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <div className="max-w-7xl mx-auto px-5 py-4 space-y-0.5">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold
                               text-white/70 hover:text-white hover:bg-white/[0.05] transition-all"
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} className="opacity-40" />}
                  </Link>
                  {item.children && (
                    <div className="ml-4 space-y-0.5 border-l border-white/[0.07] pl-4 mb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2.5 rounded-lg text-sm text-white/45
                                     hover:text-white/80 hover:bg-white/[0.04] transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 pb-1">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
