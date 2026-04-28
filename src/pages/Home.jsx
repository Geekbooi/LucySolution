import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ChevronDown, Plus, Star, Check,
  Search, Pen, Terminal, Rocket, GraduationCap, Headphones,
  Factory, BookOpen, Heart, TrendingUp, ShoppingCart, Globe,
  Calendar, Users, BarChart2, ClipboardList,
  Shield, Zap, Clock,
} from 'lucide-react'
import ShinyText from '../components/ShinyText'
import {
  FadeUp, StaggerContainer, StaggerItem,
  SlideLeft, SlideRight, ScaleIn, CountUp, RevealWords, FloatCard,
} from '../components/Animate'
import { solutions } from '../data/solutions'
import { services } from '../data/services'

const EASE = [0.16, 1, 0.3, 1]

// ── Data ──────────────────────────────────────────────────────────────────────

const methodology = [
  { step: '01', icon: Search,       title: 'Discover',  color: 'from-blue-500 to-blue-600',      desc: 'Deep-dive workshops to map your workflows, pain points, and success metrics before a line of code is written.' },
  { step: '02', icon: Pen,          title: 'Design',    color: 'from-indigo-500 to-violet-500',  desc: 'Architecture blueprints, UX wireframes, and a signed-off technical spec — so you know exactly what you are getting.' },
  { step: '03', icon: Terminal,     title: 'Build',     color: 'from-violet-500 to-purple-600',  desc: 'Two-week sprints with live demos every cycle. You see working software, never just status reports.' },
  { step: '04', icon: Rocket,       title: 'Deploy',    color: 'from-purple-600 to-fuchsia-600', desc: 'Zero-downtime rollout with staged environments, automated tests, and a 30-day hypercare window.' },
  { step: '05', icon: GraduationCap,title: 'Train',     color: 'from-fuchsia-600 to-pink-500',   desc: 'Role-based training, full documentation, and video walkthroughs until every user is confident.' },
  { step: '06', icon: Headphones,   title: 'Support',   color: 'from-pink-500 to-rose-500',      desc: 'Dedicated SLA support, proactive monitoring, and quarterly roadmap reviews for the long haul.' },
]

const caseStudies = [
  {
    tag: 'ERP System', industry: 'Manufacturing & Distribution',
    title: 'End-to-End ERP for Meridian Industries',
    problem: 'Manual inventory across 3 warehouses was causing $200K in annual losses from stock discrepancies.',
    solution: 'Custom ERP with real-time inventory sync, procurement automation, and consolidated finance reporting.',
    result: '43%', resultLabel: 'reduction in stock errors',
    timeline: '4 months', team: '3 engineers',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    cardClass: 'case-card-blue',
    gradText: 'from-blue-400 to-indigo-500',
    gradBg: 'from-blue-500/10 to-indigo-600/5',
  },
  {
    tag: 'School Management', industry: 'Education Sector',
    title: 'Digital Campus for Westfield Academy',
    problem: 'Paper-based records created 6+ hours of daily admin burden per staff member.',
    solution: 'End-to-end school platform: enrollment, grading, fee collection, attendance, and parent portal.',
    result: '80%', resultLabel: 'drop in admin processing time',
    timeline: '3 months', team: '2 engineers',
    tech: ['React', 'Django', 'MySQL', 'SMS Gateway'],
    cardClass: 'case-card-green',
    gradText: 'from-emerald-400 to-teal-500',
    gradBg: 'from-emerald-500/10 to-teal-600/5',
  },
  {
    tag: 'HR Platform', industry: 'Workforce Management',
    title: 'HR Automation Suite for NovaTech Corp',
    problem: 'Fragmented HR tools caused repeated payroll errors and growing compliance risk.',
    solution: 'Unified HR platform: payroll, leave management, performance reviews, and audit-ready compliance.',
    result: '0', resultLabel: 'payroll errors since launch',
    timeline: '5 months', team: '4 engineers',
    tech: ['Vue.js', 'FastAPI', 'PostgreSQL', 'Celery'],
    cardClass: 'case-card-violet',
    gradText: 'from-violet-400 to-purple-500',
    gradBg: 'from-violet-500/10 to-purple-600/5',
  },
]

const testimonials = [
  { text: 'Lucy Solution delivered our ERP ahead of schedule with exceptional quality. Their team was communicative and genuinely invested in our success.', name: 'James Mitchell', role: 'CEO, Meridian Industries', avatar: 'JM', color: 'from-blue-500 to-violet-600' },
  { text: 'The school management system transformed how we operate. Intuitive, fast, and exactly what we needed — nothing more, nothing less.', name: 'Sarah Thompson', role: 'Director, Westfield Academy', avatar: 'ST', color: 'from-emerald-500 to-teal-600' },
  { text: 'This team built the entire EthioSpeak web platform. Feature-complete, fast, and delivered on schedule. A truly professional engagement from discovery to launch.', name: 'Ferehiwot Biddle', role: 'CEO, EthioSpeak', avatar: 'FB', color: 'from-violet-500 to-fuchsia-600' },
  { text: 'Lucy Solution built our law firm website with professionalism and precision. They understood our brand immediately and delivered a polished, client-ready platform we are proud to share.', name: 'Eyasu Mekonen', role: 'Attorney, Eyasu Law Firm', avatar: 'EM', color: 'from-amber-500 to-orange-600' },
]

const industries = [
  { icon: Factory,      label: 'Manufacturing' },
  { icon: BookOpen,     label: 'Education' },
  { icon: Heart,        label: 'Healthcare' },
  { icon: TrendingUp,   label: 'Finance' },
  { icon: ShoppingCart, label: 'Retail' },
  { icon: Globe,        label: 'Government' },
]

const whyUs = [
  { icon: Zap,    title: 'Attention to Detail',  desc: 'Every pixel and every line of code crafted with precision.',          color: 'bg-blue-500/10 text-blue-400' },
  { icon: Shield, title: 'Enterprise Security',  desc: 'Security-first architecture baked into every project we deliver.',     color: 'bg-violet-500/10 text-violet-400' },
  { icon: Clock,  title: 'On-Time Delivery',     desc: 'We respect deadlines and honour commitments without compromise.',       color: 'bg-emerald-500/10 text-emerald-400' },
  { icon: Check,  title: 'Full-Cycle Support',   desc: 'With you from discovery through deployment and long-term growth.',     color: 'bg-amber-500/10 text-amber-400' },
]

const faqs = [
  {
    q: 'What exactly does Lucy Solution build?',
    a: 'We build custom enterprise software: ERP systems, school management platforms, HR & payroll tools, project management suites, and bespoke web applications. Every product is scoped, designed, and engineered specifically for your organisation — no generic templates.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most projects run 3–6 months from kick-off to production launch. The timeline depends on scope and complexity. We provide a firm estimate with milestone dates after the initial discovery session — and we honour it.',
  },
  {
    q: 'What is your pricing model?',
    a: 'We scope each project and offer a fixed-price engagement with defined milestones. There are no vague retainers or hourly billing surprises. You know the cost upfront, and you pay as milestones are reached.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes a 30-day hypercare window post-launch. After that, we offer flexible SLA-backed support plans — from monthly check-ins to 24/7 monitoring. We don\'t disappear after go-live.',
  },
  {
    q: 'Can you integrate with our existing systems?',
    a: 'Almost always. We have deep experience integrating with SAP, Odoo, QuickBooks, various SMS and payment gateways, government e-portals, and legacy databases. We assess integration complexity during the discovery phase.',
  },
]

const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Python', color: '#FFD43B' },
  { name: 'Django', color: '#092E20' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'MySQL', color: '#00758F' },
  { name: 'Vue.js', color: '#42B883' },
  { name: 'Next.js', color: '#FFFFFF' },
  { name: 'Celery', color: '#37B24D' },
  { name: 'Nginx', color: '#009900' },
  { name: 'Linux', color: '#FCC624' },
]

const ctaOptions = [
  { label: 'Book a Discovery Call', desc: 'Free 30-min scoping session', primary: true },
  { label: 'Get a Project Estimate', desc: 'No-obligation quote' },
  { label: 'Talk to a Specialist', desc: 'ERP, HR, or custom dev' },
  { label: 'Request a System Audit', desc: 'For your existing software' },
]

// ── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Services',  to: '/services' },
  { label: 'Pricing',   to: '/pricing' },
  { label: 'About',     to: '/about' },
]

function KaldiNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-14 py-4"
      style={{
        background: 'rgba(6,6,26,0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 shrink-0">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path d="M13 2L22 7.5v11L13 24 4 18.5V7.5L13 2Z" stroke="white" strokeWidth="1.3" fill="none"/>
          <circle cx="13" cy="8" r="2" fill="url(#navGrad)"/>
          <circle cx="7"  cy="18" r="2" fill="url(#navGrad)"/>
          <circle cx="19" cy="18" r="2" fill="url(#navGrad)"/>
          <line x1="13" y1="8" x2="7"  y2="18" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
          <line x1="13" y1="8" x2="19" y2="18" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
          <line x1="7"  y1="18" x2="19" y2="18" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
          <defs>
            <linearGradient id="navGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa"/>
              <stop offset="100%" stopColor="#818cf8"/>
            </linearGradient>
          </defs>
        </svg>
        <span className="text-base font-bold tracking-tight text-white">Lucy Solution</span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className="px-3.5 py-1.5 text-sm font-medium text-white/55 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-150"
          >
            {label}
          </Link>
        ))}
        <button className="flex items-center gap-1 px-3.5 py-1.5 text-sm font-medium text-white/55 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-150">
          More <ChevronDown size={12} className="opacity-50" />
        </button>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3">
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-white/55 hover:text-white transition-colors"
        >
          Sign in
        </Link>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link to="/contact" className="flex items-center gap-1.5 bg-white text-black rounded-lg text-sm font-bold px-5 py-2 hover:bg-white/90 transition-colors">
            Book a Call <ArrowRight size={13} />
          </Link>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-px bg-white/60"
              animate={{ width: open && i === 1 ? 0 : '18px' }}
              style={{ width: '18px' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-1 md:hidden"
            style={{ background: 'rgba(6,6,26,0.96)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-white/60 hover:text-white transition-colors border-b"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                {label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3 text-center justify-center">
              Book a Discovery Call <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[60%] bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 sm:px-10 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">

          {/* Left: headline + CTAs */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="text-white/30 text-[11px] font-bold tracking-[0.22em] uppercase mb-5"
            >
              Enterprise Software Partner
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
              className="text-[52px] sm:text-[68px] lg:text-[88px] font-bold text-white leading-[0.93] tracking-tight mb-8"
            >
              We Build<br />
              Software<br />
              <ShinyText text="That Lasts." from="#60a5fa" shine="#e0e7ff" speed={3000} />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/contact" className="btn-primary group">
                Book a Discovery Call
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link to="/solutions" className="btn-secondary group">
                See Our Work
                <ArrowRight size={14} className="opacity-60 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right: tagline + stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.65 }}
            className="shrink-0 md:max-w-[280px] md:mb-1"
          >
            <p className="text-white/38 text-sm leading-relaxed mb-6">
              From ERP systems to custom web platforms — Lucy Solution engineers
              end-to-end enterprise software for growing organisations worldwide.
              Fixed timelines. Measurable outcomes.
            </p>
            <div className="flex items-center gap-6">
              {[
                { val: '50+', lbl: 'Projects' },
                { val: '98%', lbl: 'Satisfaction' },
                { val: '5+',  lbl: 'Years' },
              ].map(({ val, lbl }, i) => (
                <div key={lbl} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-7 bg-white/10" />}
                  <div>
                    <div className="text-xl font-black text-white leading-none">{val}</div>
                    <div className="text-[9px] text-white/25 uppercase tracking-wider mt-0.5">{lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent to-white/18"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />
        <span className="text-[9px] text-white/16 uppercase tracking-[0.2em] rotate-90 mt-4">Scroll</span>
      </motion.div>
    </section>
  )
}

// ── Trust Marquee ─────────────────────────────────────────────────────────────
const CLIENTS = [
  'Meridian Industries', 'Westfield Academy', 'NovaTech Corp',
  'EthioSpeak', 'Eyasu Law Firm', 'Apex Pharma', 'Sunrise School', 'Horizon Finance',
  'Peak Logistics', 'BlueSky Retail', 'Atlas Trade Co.',
]

function TrustMarquee() {
  const doubled = [...CLIENTS, ...CLIENTS]
  return (
    <div
      className="py-5 overflow-hidden border-y"
      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="text-xs font-semibold text-white/22 uppercase tracking-widest shrink-0"
          >
            {name}
            <span className="ml-12 text-white/10">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── Position Statement ────────────────────────────────────────────────────────
function PositionStatement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end center'] })
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.4], [40, 0])

  return (
    <section
      ref={ref}
      className="py-28 md:py-36 px-6 md:px-14 text-center"
      style={{ background: 'rgba(255,255,255,0.028)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
        <div className="section-tag inline-flex mb-6">The Lucy Solution Difference</div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          The premier enterprise software partner<br />
          for{' '}
          <span className="gradient-text">the world&apos;s fastest-growing</span>
          {' '}companies.
        </h2>
        <p className="text-base md:text-lg text-white/42 max-w-2xl mx-auto leading-relaxed">
          We don&apos;t ship demos — we deliver production systems that withstand real operations,
          real users, and real business pressure. Every project comes with fixed timelines,
          clear milestones, and a team that stays accountable.
        </p>
      </motion.div>
    </section>
  )
}

// ── Feature Mockup Cards ──────────────────────────────────────────────────────
function ERPMockup() {
  const rows = [
    { item: 'Steel Coils — Batch #4819', qty: '320 units', status: 'In Transit', ok: true },
    { item: 'Cement — Order #C-210', qty: '1,200 bags', status: 'In Stock', ok: true },
    { item: 'Generator Parts — PO-0098', qty: '14 units', status: 'Low Stock', ok: false },
    { item: 'Packaging Film — PO-0112', qty: '800 rolls', status: 'In Stock', ok: true },
  ]
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface-overlay)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
          <BarChart2 size={14} className="text-blue-400" />
          <span className="text-xs font-semibold text-white/70">Inventory Dashboard</span>
        </div>
        <span className="text-[10px] text-white/28">Live · synced now</span>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 divide-x" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', divideColor: 'rgba(255,255,255,0.06)' }}>
        {[
          { label: 'Total Stock Value', val: '$2.4M', up: true },
          { label: 'Pending POs', val: '12', up: false },
          { label: 'Fulfilment Rate', val: '97.3%', up: true },
        ].map((k) => (
          <div key={k.label} className="px-4 py-3">
            <p className="text-[9px] text-white/35 mb-1">{k.label}</p>
            <p className="text-sm font-bold text-white">{k.val}</p>
            <p className="text-[9px] mt-0.5" style={{ color: k.up ? '#34d399' : '#f87171' }}>
              {k.up ? '▲ 4.2%' : '▼ 1.1%'}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="px-5 py-4">
        <p className="text-[9px] font-bold text-white/25 uppercase tracking-widest mb-3">Inventory Items</p>
        <div className="flex flex-col gap-2">
          {rows.map((r) => (
            <div key={r.item} className="flex items-center gap-3 text-[10px]">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: r.ok ? '#34d399' : '#f59e0b' }}
              />
              <span className="flex-1 text-white/55 truncate">{r.item}</span>
              <span className="text-white/35 shrink-0">{r.qty}</span>
              <span
                className="px-2 py-0.5 rounded-full text-[9px] font-semibold shrink-0"
                style={{
                  background: r.ok ? 'rgba(52,211,153,0.1)' : 'rgba(245,158,11,0.1)',
                  color: r.ok ? '#34d399' : '#f59e0b',
                }}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini chart */}
      <div className="px-5 pb-5">
        <div className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="text-[9px] text-white/30 mb-2">Revenue trend — 8 weeks</p>
          <svg viewBox="0 0 240 52" className="w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="erpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0 40 L30 35 L60 28 L90 22 L120 18 L150 12 L180 8 L210 5 L240 2" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M0 40 L30 35 L60 28 L90 22 L120 18 L150 12 L180 8 L210 5 L240 2 L240 52 L0 52Z" fill="url(#erpGrad)"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function SchoolMockup() {
  const students = [
    { name: 'Emma Wilson', grade: 'Grade 9', avg: '92%', status: 'Enrolled' },
    { name: 'Jake Peterson', grade: 'Grade 11', avg: '87%', status: 'Enrolled' },
    { name: 'Sarah Williams', grade: 'Grade 10', avg: '95%', status: 'Honours' },
    { name: 'Michael Chen', grade: 'Grade 12', avg: '79%', status: 'Enrolled' },
  ]
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface-overlay)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
          <ClipboardList size={14} className="text-emerald-400" />
          <span className="text-xs font-semibold text-white/70">Student Records</span>
        </div>
        <span
          className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}
        >
          Term 2 · 2026
        </span>
      </div>

      <div className="grid grid-cols-3 divide-x" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { label: 'Enrolled Students', val: '1,284' },
          { label: 'Avg. Attendance', val: '96.4%' },
          { label: 'Fee Collection', val: '91%' },
        ].map((k) => (
          <div key={k.label} className="px-4 py-3">
            <p className="text-[9px] text-white/35 mb-1">{k.label}</p>
            <p className="text-sm font-bold text-white">{k.val}</p>
          </div>
        ))}
      </div>

      <div className="px-5 py-4">
        <p className="text-[9px] font-bold text-white/25 uppercase tracking-widest mb-3">Recent Students</p>
        <div className="flex flex-col gap-2.5">
          {students.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500/40 to-teal-600/40 flex items-center justify-center shrink-0 text-[9px] font-bold text-white"
              >
                {s.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-white/70 truncate">{s.name}</p>
                <p className="text-[9px] text-white/30">{s.grade}</p>
              </div>
              <span className="text-[9px] font-bold text-white/50">{s.avg}</span>
              <span
                className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
                style={{
                  background: s.status === 'Honours' ? 'rgba(251,191,36,0.12)' : 'rgba(52,211,153,0.1)',
                  color: s.status === 'Honours' ? '#fbbf24' : '#34d399',
                }}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="rounded-xl p-3.5 flex items-center justify-between" style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.1)' }}>
          <div className="flex items-center gap-2">
            <Check size={13} className="text-emerald-400" />
            <span className="text-[10px] text-white/50">All term reports published</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-400">View portal ›</span>
        </div>
      </div>
    </div>
  )
}

function HRMockup() {
  const payroll = [
    { name: 'Engineering', headcount: 14, total: '$182K', status: 'Processed' },
    { name: 'Operations', headcount: 22, total: '$203K', status: 'Processed' },
    { name: 'Sales & BD', headcount: 9, total: '$96K', status: 'Pending' },
    { name: 'Management', headcount: 5, total: '$120K', status: 'Processed' },
  ]
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface-overlay)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
          <Users size={14} className="text-violet-400" />
          <span className="text-xs font-semibold text-white/70">Payroll Overview</span>
        </div>
        <span className="text-[10px] text-white/28">April 2026</span>
      </div>

      <div className="grid grid-cols-3 divide-x" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { label: 'Total Payroll', val: '$601K' },
          { label: 'Headcount', val: '50' },
          { label: 'Errors', val: '0', highlight: true },
        ].map((k) => (
          <div key={k.label} className="px-4 py-3">
            <p className="text-[9px] text-white/35 mb-1">{k.label}</p>
            <p className="text-sm font-bold" style={{ color: k.highlight ? '#34d399' : 'white' }}>{k.val}</p>
          </div>
        ))}
      </div>

      <div className="px-5 py-4">
        <p className="text-[9px] font-bold text-white/25 uppercase tracking-widest mb-3">Departments</p>
        <div className="flex flex-col gap-2.5">
          {payroll.map((d) => (
            <div key={d.name} className="flex items-center gap-3 text-[10px]">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: d.status === 'Processed' ? '#818cf8' : '#f59e0b' }}
              />
              <span className="flex-1 text-white/55">{d.name}</span>
              <span className="text-white/30">{d.headcount} staff</span>
              <span className="font-semibold text-white/60">{d.total}</span>
              <span
                className="px-2 py-0.5 rounded-full text-[9px] font-semibold shrink-0"
                style={{
                  background: d.status === 'Processed' ? 'rgba(129,140,248,0.12)' : 'rgba(245,158,11,0.12)',
                  color: d.status === 'Processed' ? '#818cf8' : '#f59e0b',
                }}
              >
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5">
        <div
          className="rounded-xl p-3 flex items-center gap-2"
          style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.12)' }}
        >
          <Check size={13} className="text-violet-400 shrink-0" />
          <span className="text-[10px] text-white/45">Compliance audit passed · next review in 28 days</span>
        </div>
      </div>
    </div>
  )
}

// ── Feature Section ───────────────────────────────────────────────────────────
FeatureSection.propTypes = {
  label:    PropTypes.string.isRequired,
  heading:  PropTypes.node.isRequired,
  body:     PropTypes.string.isRequired,
  linkText: PropTypes.string,
  linkTo:   PropTypes.string,
  mockup:   PropTypes.node.isRequired,
  reverse:  PropTypes.bool,
}
function FeatureSection({ label, heading, body, linkText = 'Learn more', linkTo = '/solutions', mockup, reverse = false }) {
  return (
    <section
      className="py-24 md:py-28 px-6 md:px-14"
      style={{ background: 'rgba(0,0,0,0.12)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className={`max-w-6xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-14 md:gap-20`}>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex-1 flex flex-col gap-5"
        >
          <div className="section-tag w-fit">{label}</div>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.1] tracking-tight">
            {heading}
          </h2>
          <p className="text-base leading-relaxed text-white/45">
            {body}
          </p>
          <Link
            to={linkTo}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/55 hover:text-blue-400 transition-colors w-fit group"
          >
            {linkText}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Mockup */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="flex-1 w-full"
        >
          {mockup}
        </motion.div>
      </div>
    </section>
  )
}

// ── Tech Stack Section ────────────────────────────────────────────────────────
function TechStackSection() {
  return (
    <section className="py-20 px-6 md:px-14" style={{ background: 'rgba(255,255,255,0.028)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-12">
          <div className="section-tag inline-flex mb-4">Built With</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Best-in-class tools, proven in production
          </h2>
        </FadeUp>

        <StaggerContainer className="flex flex-wrap justify-center gap-3">
          {techStack.map(({ name, color }) => (
            <StaggerItem key={name}>
              <motion.div
                whileHover={{ y: -2, scale: 1.04 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white/55 hover:text-white/80 transition-colors cursor-default"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: color, boxShadow: `0 0 6px ${color}55` }}
                />
                {name}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// ── Methodology Section ───────────────────────────────────────────────────────
function MethodologySection() {
  return (
    <section className="py-28 px-6 md:px-14" style={{ background: 'rgba(0,0,0,0.12)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag inline-flex mb-4">Methodology</div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            <RevealWords>How We Deliver</RevealWords>
          </h2>
          <p className="text-white/45 leading-relaxed">
            A clear, predictable process so you always know what happens next —
            and why. No surprises, just progress.
          </p>
        </FadeUp>

        <div className="relative">
          <motion.div
            className="absolute hidden lg:block h-px top-[52px] left-[9%] right-[9%] pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2) 15%, rgba(94,106,210,0.2) 50%, rgba(124,58,237,0.2) 85%, transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {methodology.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-[52px] h-[52px] rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg relative z-10 shrink-0`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="text-[10px] font-black text-white/18 mb-1.5 tracking-[0.15em]">{step.step}</div>
                  <h3 className="font-bold text-white text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <FadeUp delay={0.3} className="text-center mt-14">
          <Link to="/contact" className="btn-secondary">
            Start with a Discovery Call <ArrowRight size={14} />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Case Studies ──────────────────────────────────────────────────────────────
function CaseStudiesSection() {
  return (
    <section className="py-28 px-6 md:px-14" style={{ background: 'rgba(255,255,255,0.028)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <FadeUp className="max-w-xl">
            <div className="section-tag mb-4">Case Studies</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">
              <RevealWords>Results We Have Delivered</RevealWords>
            </h2>
            <p className="text-white/45 leading-relaxed">
              Not just screenshots — the actual problems, the solutions we engineered,
              and the numbers that followed.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <Link to="/solutions" className="btn-secondary shrink-0">
              All Solutions <ArrowRight size={14} />
            </Link>
          </FadeUp>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {caseStudies.map((cs, i) => (
            <StaggerItem key={i}>
              <FloatCard className={`case-card ${cs.cardClass} h-full`}>
                <div className="p-7 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <span className="section-tag">{cs.tag}</span>
                  </div>
                  <div className="text-xs text-white/25 font-semibold uppercase tracking-wider mb-3">{cs.industry}</div>
                  <h3 className="font-bold text-white text-[17px] mb-5 leading-snug">{cs.title}</h3>

                  <div className="mb-4">
                    <div className="text-[10px] font-black text-white/25 uppercase tracking-[0.12em] mb-1.5">Challenge</div>
                    <p className="text-sm text-white/50 leading-relaxed">{cs.problem}</p>
                  </div>
                  <div className="mb-6 flex-1">
                    <div className="text-[10px] font-black text-white/25 uppercase tracking-[0.12em] mb-1.5">Solution</div>
                    <p className="text-sm text-white/50 leading-relaxed">{cs.solution}</p>
                  </div>

                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${cs.gradBg} border border-white/[0.07] mb-5`}>
                    <div className={`text-4xl font-black bg-gradient-to-r ${cs.gradText} bg-clip-text text-transparent mb-1`}>{cs.result}</div>
                    <div className="text-xs text-white/45">{cs.resultLabel}</div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-white/25 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={11} />{cs.timeline}</span>
                    <span className="flex items-center gap-1.5"><Users size={11} />{cs.team}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.06] text-[10px] font-semibold text-white/35">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FloatCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-28 px-6 md:px-14" style={{ background: 'rgba(0,0,0,0.12)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center max-w-xl mx-auto mb-16">
          <div className="section-tag inline-flex mb-4">Testimonials</div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-3">What Clients Say</h2>
          <p className="text-white/45">Hear directly from the teams we&apos;ve helped transform.</p>
        </FadeUp>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <FloatCard className="h-full">
                <div className="testimonial-card h-full">
                  <div className="flex gap-1 mb-5 pt-6">
                    {[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="testimonial-author">
                    <div className={`testimonial-avatar bg-gradient-to-br ${t.color} text-white text-xs font-bold`}>{t.avatar}</div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/35">{t.role}</div>
                    </div>
                  </div>
                </div>
              </FloatCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// ── Why Kaldilabs ─────────────────────────────────────────────────────────────
function WhySection() {
  return (
    <section className="py-28 px-6 md:px-14" style={{ background: 'rgba(255,255,255,0.028)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <SlideLeft>
          <div className="section-tag mb-5">Why Lucy Solution</div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-5">The Lucy Solution Difference</h2>
          <p className="text-white/45 leading-relaxed mb-10">
            We don&apos;t just write code — we build solutions that make measurable impact.
            Honest timelines, clear communication, and software that actually works.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {whyUs.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="flex gap-3.5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200"
              >
                <div className={`w-9 h-9 shrink-0 rounded-xl ${color} flex items-center justify-center`}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white mb-1">{title}</div>
                  <div className="text-xs text-white/42 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/about" className="btn-primary">About Us <ArrowRight size={15} /></Link>
          </div>
        </SlideLeft>

        <SlideRight>
          <div className="grid grid-cols-2 gap-4">
            {[
              { to: 50, suffix: '+', label: 'Projects Completed', sub: 'across 6 industries', color: 'from-blue-500/10 to-blue-600/5' },
              { to: 98, suffix: '%', label: 'Client Satisfaction', sub: 'NPS average', color: 'from-violet-500/10 to-violet-600/5' },
              { to: 5,  suffix: '+', label: 'Years of Excellence', sub: 'in enterprise software', color: 'from-emerald-500/10 to-emerald-600/5' },
              { text: '24/7',         label: 'Support Available', sub: 'SLA-backed response', color: 'from-amber-500/10 to-amber-600/5' },
            ].map((s) => (
              <div key={s.label} className={`p-6 rounded-2xl text-center bg-gradient-to-br ${s.color} border border-white/[0.07]`}>
                <div className="text-4xl font-black gradient-text-blue tracking-tight mb-1">
                  {s.text ? s.text : <CountUp to={s.to} suffix={s.suffix} duration={2.2} />}
                </div>
                <div className="text-sm font-bold text-white/58 mb-0.5">{s.label}</div>
                <div className="text-xs text-white/28">{s.sub}</div>
              </div>
            ))}
          </div>
        </SlideRight>
      </div>
    </section>
  )
}

// ── Industries ────────────────────────────────────────────────────────────────
function IndustriesSection() {
  return (
    <section className="py-20 px-6 md:px-14" style={{ background: 'rgba(0,0,0,0.12)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-12">
          <div className="section-tag inline-flex mb-3">Industries</div>
          <h2 className="text-2xl font-bold text-white/75">Sectors We Serve</h2>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {industries.map(({ icon: Icon, label }) => (
            <StaggerItem key={label}>
              <div className="industry-chip">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <span className="text-xs font-semibold text-white/48">{label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// ── Solutions Grid ────────────────────────────────────────────────────────────
function SolutionsSection() {
  return (
    <section className="py-28 px-6 md:px-14" style={{ background: 'rgba(255,255,255,0.028)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag inline-flex mb-4">Solutions</div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Systems We Build</h2>
          <p className="text-white/45 leading-relaxed">
            Robust, scalable systems built for the long term — from enterprise resource planning
            to custom web applications.
          </p>
        </FadeUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.filter(s => ['erp-systems','hr-management','school-management','ai-automation','saas-platforms','custom-web-apps'].includes(s.slug)).map((sol) => (
            <StaggerItem key={sol.slug}>
              <Link
                to={`/solutions/${sol.slug}`}
                className="card-dark flex flex-col p-6 group relative overflow-hidden h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${sol.color} opacity-0 group-hover:opacity-[0.035] transition-opacity duration-500 rounded-[20px]`} />
                <div className="flex items-start justify-between mb-5 relative">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${sol.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                    {sol.icon}
                  </div>
                  <span className="section-tag text-[10px]">{sol.tag}</span>
                </div>
                <h3 className="font-bold text-white mb-2 relative">{sol.title}</h3>
                <p className="text-sm text-white/42 leading-relaxed mb-5 flex-1 relative">{sol.description.slice(0, 90)}…</p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-white/32 group-hover:text-blue-400 transition-colors duration-200 relative">
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeUp className="text-center mt-12">
          <Link to="/solutions" className="btn-secondary">View All Solutions <ArrowRight size={15} /></Link>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Services Section ──────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section className="py-28 px-6 md:px-14" style={{ background: 'rgba(0,0,0,0.12)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp className="max-w-xl mb-16">
          <div className="section-tag mb-4">Services</div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            <RevealWords>What We Do</RevealWords>
          </h2>
          <p className="text-white/45 leading-relaxed">
            Comprehensive software services designed to transform your business and drive measurable growth.
          </p>
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {services.filter(s => ['software-development','ai-automation','cloud-devops'].includes(s.slug)).map((srv) => (
            <StaggerItem key={srv.slug}>
              <FloatCard className="h-full">
                <Link to={`/services/${srv.slug}`} className="card-gradient-border flex flex-col p-8 group h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${srv.color} flex items-center justify-center mb-6 shadow-lg shrink-0`}>
                    <span className="text-white text-lg font-bold">
                      {srv.icon === 'code' ? '{ }' : srv.icon === 'cpu' ? '⬟' : srv.icon === 'cloud' ? '⬡' : srv.icon === 'users' ? '◎' : '⟳'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-sm text-white/42 leading-relaxed mb-6 flex-1">{srv.description.slice(0, 115)}…</p>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-blue-400/65 group-hover:text-blue-400 group-hover:gap-2.5 transition-all duration-200">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </FloatCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeUp className="text-center mt-12">
          <Link to="/services" className="btn-secondary">View All Services <ArrowRight size={15} /></Link>
        </FadeUp>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer:   PropTypes.string.isRequired,
  isOpen:   PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  index:    PropTypes.number.isRequired,
}
function FAQItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.05 }}
      className="border-b"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-8 group"
      >
        <span className="text-base md:text-lg font-semibold text-white group-hover:text-white/80 transition-colors">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="shrink-0 text-white/35 group-hover:text-white/55 transition-colors"
        >
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 text-sm md:text-base leading-relaxed text-white/42">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-24 md:py-32 px-6 md:px-14" style={{ background: 'rgba(255,255,255,0.028)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-3xl mx-auto">
        <FadeUp className="text-center mb-14">
          <div className="section-tag inline-flex mb-4">FAQ</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Everything you need<br />to know
          </h2>
        </FadeUp>

        <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              index={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <FadeUp delay={0.2} className="text-center mt-12">
          <p className="text-sm text-white/35 mb-4">Still have questions?</p>
          <Link to="/contact" className="btn-secondary">
            Talk to us directly <ArrowRight size={14} />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}

// ── CTA Section ───────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 px-6 md:px-14" style={{ background: 'rgba(0,0,0,0.12)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-5xl mx-auto">
        <ScaleIn>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.09]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d1424] via-[#111230] to-[#0f0a22]" />
            <div className="absolute inset-0 bg-cta-glow opacity-80" />
            <div className="absolute -top-14 -right-14 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-violet-600/10 rounded-full blur-3xl" />

            <div className="relative z-10 px-8 pt-14 pb-10 text-center">
              <div className="section-tag inline-flex mb-5">Ready when you are</div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                Have a project in mind?
              </h2>
              <p className="text-white/42 mb-10 leading-relaxed max-w-md mx-auto">
                Every path below leads to the same place: working software that solves
                real problems for real people. No commitments, no spam.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {ctaOptions.map(({ label, desc, primary }) => (
                  <Link
                    key={label}
                    to="/contact"
                    className={`flex flex-col items-start gap-1 p-5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-1 ${
                      primary
                        ? 'bg-blue-600/15 border-blue-500/25 hover:bg-blue-600/25 hover:border-blue-500/40'
                        : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/14'
                    }`}
                  >
                    <span className="font-bold text-sm text-white leading-tight">{label}</span>
                    <span className="text-xs text-white/35">{desc}</span>
                  </Link>
                ))}
              </div>

              <p className="text-xs text-white/22">
                No commitments. No spam. Just a conversation about your project.
              </p>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
const FOOTER_COLS = [
  {
    heading: 'Solutions',
    links: [
      { label: 'ERP Systems',       to: '/solutions/erp-systems' },
      { label: 'HR Management',     to: '/solutions/hr-management' },
      { label: 'School Management', to: '/solutions/school-management' },
      { label: 'Project Management',to: '/solutions/project-management' },
      { label: 'Custom Web Apps',   to: '/solutions/custom-web-apps' },
      { label: 'AI & Automation',   to: '/solutions/ai-automation' },
      { label: 'SaaS Platforms',    to: '/solutions/saas-platforms' },
      { label: 'Payment & Billing', to: '/solutions/payment-billing' },
      { label: 'Data & Analytics',  to: '/solutions/data-analytics' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Engineering & Development', to: '/services/software-development' },
      { label: 'AI & Automation',           to: '/services/ai-automation' },
      { label: 'Cloud & DevOps',            to: '/services/cloud-devops' },
      { label: 'Consulting & Strategy',     to: '/services/training-consultancy' },
      { label: 'Data & Analytics',          to: '/services/data-analytics' },
      { label: 'Support & Maintenance',     to: '/services/support-maintenance' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
]

function KaldiFooter() {
  return (
    <footer
      className="px-6 md:px-14 pt-16 pb-8"
      style={{ background: 'var(--surface-base)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <path d="M13 2L22 7.5v11L13 24 4 18.5V7.5L13 2Z" stroke="white" strokeWidth="1.3" fill="none"/>
                <circle cx="13" cy="8" r="2" fill="#60a5fa"/>
                <circle cx="7"  cy="18" r="2" fill="#60a5fa"/>
                <circle cx="19" cy="18" r="2" fill="#60a5fa"/>
              </svg>
              <span className="font-bold tracking-tight text-white">Lucy Solution</span>
            </Link>
            <p className="text-sm text-white/32 leading-relaxed max-w-[200px] mb-5">
              Enterprise software for the world&apos;s fastest-growing teams.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-white/30">All systems operational</span>
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-white/32 hover:text-white/65 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs text-white/22">© 2026 Lucy Solution. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/25">
            <Link to="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
            <a href="mailto:hello@lucysolution.com" className="hover:text-white/50 transition-colors">hello@lucysolution.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div>
      <KaldiNavbar />
      <HeroSection />
      <TrustMarquee />
      <PositionStatement />

      <FeatureSection
        label="Enterprise Resource Planning"
        heading={<>One system.<br />Every operation<br />under control.</>}
        body="Connect your inventory, procurement, finance, and reporting into a single source of truth. Real-time data flows across every department — without the spreadsheet chaos. Built for your workflow, not a generic template."
        linkText="Explore ERP Systems"
        linkTo="/solutions/erp-systems"
        mockup={<ERPMockup />}
      />

      <FeatureSection
        label="Education Technology"
        heading={<>Run your campus.<br />Not your inbox.</>}
        body="From enrollment to report cards, manage every administrative workflow in one platform. Cut paper-based processing by over 80%, give parents a self-service portal, and let your staff focus on teaching — not filing."
        linkText="Explore School Management"
        linkTo="/solutions/school-management"
        mockup={<SchoolMockup />}
        reverse
      />

      <FeatureSection
        label="Workforce Management"
        heading={<>Payroll that runs itself.<br />Compliance that holds.</>}
        body="Automate pay runs, track leave, manage performance reviews, and stay audit-ready — without duct-taping three tools together. Zero payroll errors since launch for every client we've deployed."
        linkText="Explore HR Platform"
        linkTo="/solutions/hr-management"
        mockup={<HRMockup />}
      />

      <TechStackSection />
      <MethodologySection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <WhySection />
      <IndustriesSection />
      <SolutionsSection />
      <ServicesSection />
      <FAQSection />
      <CTASection />
      <KaldiFooter />
    </div>
  )
}
