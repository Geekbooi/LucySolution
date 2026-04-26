import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X, Search, Pen, Rocket, GraduationCap, Headphones } from 'lucide-react'
import ShinyText from '../components/ShinyText'

const NAV_LINKS = ['Curriculum', 'Instructors', 'Alumni', 'Pricing', 'Blog']

const INFO_ITEMS = [
  { icon: GraduationCap, label: '12-Week Program',   sub: 'Live + async learning' },
  { icon: Pen,           label: '100+ Projects',     sub: 'Portfolio-ready work'  },
  { icon: Rocket,        label: 'Job Guarantee',     sub: 'Or your money back'    },
  { icon: Headphones,    label: '1-on-1 Mentorship', sub: 'Weekly office hours'   },
]

const EASE = [0.16, 1, 0.3, 1]

export default function DesignPro() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-[Inter,sans-serif]">

      {/* ── Video background ──────────────────────────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d2xamzlzrdbftt.cloudfront.net/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-6">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#64CEFB] to-[#3b82f6] flex items-center justify-center text-white font-black text-sm select-none">
            D
          </div>
          <span className="text-white font-bold text-lg tracking-tight">DesignPro</span>
        </motion.div>

        {/* Desktop pill nav */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full border border-gray-700 bg-black/30 backdrop-blur-md"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="px-4 py-1.5 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {link}
            </a>
          ))}
        </motion.div>

        {/* Desktop right actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="hidden md:flex items-center gap-3"
        >
          <button className="p-2 text-white/60 hover:text-white transition-colors">
            <Search size={18} />
          </button>
          <a
            href="#"
            className="px-5 py-2 rounded-full text-sm font-semibold text-black bg-white hover:bg-white/90 transition-colors"
          >
            Log in
          </a>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors z-30"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute inset-x-0 top-0 z-10 bg-black/90 backdrop-blur-xl pt-20 pb-8 px-6 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/80 hover:text-white text-lg font-medium py-1 border-b border-white/08 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="#"
              className="mt-4 px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-white text-center"
            >
              Log in
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Info strip ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        className="relative z-10 mt-6 mx-6 md:mx-12 grid grid-cols-2 md:grid-cols-4 gap-2"
      >
        {INFO_ITEMS.map(({ icon: Icon, label, sub }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.07 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-[#64CEFB]/[0.15] flex items-center justify-center shrink-0">
              <Icon size={15} className="text-[#64CEFB]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-tight">{label}</p>
              <p className="text-[10px] text-white/42 mt-0.5">{sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Hero content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 mt-12 md:mt-16">

        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#64CEFB]/30 bg-[#64CEFB]/[0.08] mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#64CEFB] animate-pulse" />
          <span className="text-xs font-semibold text-[#64CEFB] tracking-wide uppercase">Now accepting applications</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.55 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.02] tracking-tight mb-4"
        >
          <span className="block text-white">Become</span>
          <span className="block">
            <ShinyText text="Product Leader." className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black" />
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.68 }}
          className="max-w-md text-base md:text-lg text-white/55 leading-relaxed mb-10"
        >
          Master UX research, product strategy, and design systems used by teams at top-tier companies — in 12 weeks.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.8 }}
          className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-black bg-white hover:bg-white/90 transition-colors text-sm md:text-base shadow-[0_8px_32px_rgba(255,255,255,0.18)]"
        >
          Apply for Next Enrollment
          <ArrowRight
            size={17}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </motion.a>

        {/* Social proof nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.0 }}
          className="mt-5 text-xs text-white/28"
        >
          Joined by 2,400+ designers from Airbnb, Spotify, Google &amp; more
        </motion.p>
      </div>
    </div>
  )
}
