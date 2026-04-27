import { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, X } from 'lucide-react'

const ALL_ITEMS = [
  // Pages
  { label: 'Home',           desc: 'Back to the homepage',              path: '/',        group: 'Pages' },
  { label: 'Solutions',      desc: 'Browse all solutions',              path: '/solutions', group: 'Pages' },
  { label: 'Services',       desc: 'Browse all services',               path: '/services',  group: 'Pages' },
  { label: 'Pricing',        desc: 'Plans & pricing',                   path: '/pricing',   group: 'Pages' },
  { label: 'About',          desc: 'About Lucy Solution',               path: '/about',     group: 'Pages' },
  { label: 'Contact',        desc: 'Get in touch',                      path: '/contact',   group: 'Pages' },
  // Solutions
  { label: 'ERP Systems',            desc: 'Unified business operations',        path: '/solutions/erp-systems',       group: 'Solutions' },
  { label: 'HR Management',          desc: 'People & performance tools',         path: '/solutions/hr-management',     group: 'Solutions' },
  { label: 'School Management',      desc: 'Education platforms',                path: '/solutions/school-management', group: 'Solutions' },
  { label: 'Project Management',     desc: 'Task & delivery tracking',           path: '/solutions/project-management',group: 'Solutions' },
  { label: 'Cost Management',        desc: 'Spend & budget control',             path: '/solutions/cost-management',   group: 'Solutions' },
  { label: 'Custom Web Apps',        desc: 'Bespoke digital solutions',          path: '/solutions/custom-web-apps',   group: 'Solutions' },
  { label: 'AI & Automation',        desc: 'Intelligent process automation',     path: '/solutions/ai-automation',     group: 'Solutions' },
  { label: 'SaaS Platforms',         desc: 'Multi-tenant cloud software',        path: '/solutions/saas-platforms',    group: 'Solutions' },
  { label: 'Payment & Billing',      desc: 'Secure financial infrastructure',    path: '/solutions/payment-billing',   group: 'Solutions' },
  { label: 'Data & Analytics',       desc: 'BI dashboards & pipelines',          path: '/solutions/data-analytics',    group: 'Solutions' },
  // Services
  { label: 'Engineering & Development', desc: 'End-to-end product engineering',  path: '/services/software-development', group: 'Services' },
  { label: 'AI & Automation',           desc: 'Intelligent workflow automation', path: '/services/ai-automation',        group: 'Services' },
  { label: 'Cloud & DevOps',            desc: 'Infrastructure & CI/CD',          path: '/services/cloud-devops',         group: 'Services' },
  { label: 'Consulting & Strategy',     desc: 'Tech strategy & upskilling',      path: '/services/training-consultancy', group: 'Services' },
  { label: 'Data & Analytics',          desc: 'BI & data engineering',           path: '/services/data-analytics',       group: 'Services' },
  { label: 'Support & Maintenance',     desc: 'Ongoing care & reliability',      path: '/services/support-maintenance',  group: 'Services' },
]

const GROUP_ORDER = ['Pages', 'Solutions', 'Services']

function groupResults(items) {
  const map = {}
  for (const item of items) {
    if (!map[item.group]) map[item.group] = []
    map[item.group].push(item)
  }
  return GROUP_ORDER.filter(g => map[g]).map(g => ({ group: g, items: map[g] }))
}

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  const filtered = query.trim()
    ? ALL_ITEMS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.group.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_ITEMS

  const flat = filtered

  const go = useCallback((path) => {
    navigate(path)
    onClose()
  }, [navigate, onClose])

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Reset active index when results change
  useEffect(() => { setActiveIndex(0) }, [query])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex(i => Math.min(i + 1, flat.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex(i => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (flat[activeIndex]) go(flat[activeIndex].path)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, flat, activeIndex, go, onClose])

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const grouped = groupResults(filtered)
  let globalIdx = 0

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-black/60"
            style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[10vh] left-1/2 -translate-x-1/2 z-[61] w-full max-w-xl"
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: 'rgba(10,10,14,0.97)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
              }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
                <Search size={16} className="text-white/35 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search pages, solutions, services…"
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60 transition-colors">
                    <X size={14} />
                  </button>
                )}
                <kbd className="text-[10px] font-mono text-white/20 bg-white/5 border border-white/8 px-1.5 py-0.5 rounded">Esc</kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-white/30">
                    No results for &quot;{query}&quot;
                  </div>
                ) : (
                  grouped.map(({ group, items }) => (
                    <div key={group}>
                      <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/25">
                        {group}
                      </div>
                      {items.map((item) => {
                        const idx = globalIdx++
                        const isActive = idx === activeIndex
                        return (
                          <button
                            key={item.path + item.group}
                            data-active={isActive}
                            onClick={() => go(item.path)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75
                              ${isActive ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]'}`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-white/85 truncate">{item.label}</div>
                              <div className="text-xs text-white/35 truncate">{item.desc}</div>
                            </div>
                            <ArrowRight
                              size={13}
                              className={`shrink-0 transition-colors ${isActive ? 'text-blue-400' : 'text-white/20'}`}
                            />
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2.5 border-t border-white/6 flex items-center gap-4 text-[10px] text-white/20">
                <span><kbd className="font-mono bg-white/5 border border-white/8 px-1 py-0.5 rounded">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono bg-white/5 border border-white/8 px-1 py-0.5 rounded">↵</kbd> open</span>
                <span><kbd className="font-mono bg-white/5 border border-white/8 px-1 py-0.5 rounded">Esc</kbd> close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

CommandPalette.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
