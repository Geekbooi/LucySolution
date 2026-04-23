import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const BAR_DATA = [38, 55, 42, 72, 58, 85, 64, 90, 76, 88]

function Floater({ children, y1, y2, duration, delay, rotate, className }) {
  return (
    <motion.div
      className={className}
      style={{ rotate }}
      animate={{ y: [y1, y2] }}
      transition={{ repeat: Infinity, repeatType: 'reverse', duration, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

Floater.propTypes = {
  children: PropTypes.node, y1: PropTypes.number, y2: PropTypes.number,
  duration: PropTypes.number, delay: PropTypes.number, rotate: PropTypes.number, className: PropTypes.string,
}
Floater.defaultProps = { y1: -5, y2: 5, duration: 5.5, delay: 0, rotate: 0, className: '' }

export default function HeroVisual() {
  return (
    <div className="relative w-full h-full select-none" aria-hidden="true">

      {/* Ambient glow orbs behind cards */}
      <div className="absolute top-[30%] left-[25%] w-72 h-72 rounded-full bg-blue-600/[0.12] blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] right-[20%] w-52 h-52 rounded-full bg-violet-600/[0.1] blur-[80px] pointer-events-none" />

      {/* ── MAIN DASHBOARD CARD ─────────────────────────────── */}
      <Floater y1={-5} y2={5} duration={6.5} delay={0} rotate={-1} className="absolute left-0 top-14 w-[285px]">
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.038)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.06) inset',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] text-white/32 uppercase tracking-[0.12em] mb-0.5">Project Dashboard</p>
              <p className="text-sm font-bold text-white leading-tight">ERP — Tadesse Group</p>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold text-emerald-400">Live</span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-[3px] h-[58px] mb-4">
            {BAR_DATA.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-[3px]"
                style={{
                  height: `${h}%`,
                  transformOrigin: 'bottom center',
                  background: i % 3 === 2
                    ? 'linear-gradient(to top, #7C3AED, #a78bfa)'
                    : 'linear-gradient(to top, #2563eb, #60a5fa)',
                  opacity: 0.85 + (i / BAR_DATA.length) * 0.15,
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.5 + i * 0.07 }}
              />
            ))}
          </div>

          {/* KPI chips */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              ['On Track',  'Schedule', 'rgba(52,211,153,1)'],
              ['Sprint 4',  'Current',  'rgba(96,165,250,1)'],
              ['98%',       'Quality',  'rgba(167,139,250,1)'],
            ].map(([val, lbl, clr]) => (
              <div
                key={lbl}
                className="text-center py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="text-xs font-bold" style={{ color: clr }}>{val}</div>
                <div className="text-[9px] text-white/28 uppercase tracking-wider mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </Floater>

      {/* ── METRIC BADGE ────────────────────────────────────── */}
      <Floater y1={-9} y2={4} duration={4.8} delay={0.6} rotate={2} className="absolute right-6 top-8 w-44">
        <div
          className="rounded-2xl p-4"
          style={{
            background: 'linear-gradient(135deg, rgba(37,99,235,0.22) 0%, rgba(109,40,217,0.15) 100%)',
            border: '1px solid rgba(96,165,250,0.2)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,235,0.12)',
          }}
        >
          <p className="text-[10px] text-blue-300/55 uppercase tracking-[0.12em] mb-1.5">Key Result</p>
          <p
            className="text-4xl font-black mb-1"
            style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            43%
          </p>
          <p className="text-xs text-white/42 leading-snug">Reduction in stock errors</p>
          <div className="mt-2.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 7.5L5 2.5L8.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            vs. pre-deployment
          </div>
        </div>
      </Floater>

      {/* ── SPRINT PROGRESS CARD ────────────────────────────── */}
      <Floater y1={-4} y2={8} duration={5.8} delay={0.35} rotate={-0.5} className="absolute right-2 top-[54%] w-52">
        <div
          className="rounded-2xl p-4"
          style={{
            background: 'rgba(255,255,255,0.034)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 16px 44px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.05) inset',
          }}
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #4f46e5)', boxShadow: '0 6px 20px rgba(124,58,237,0.35)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="5" width="11" height="7.5" rx="1.5" stroke="white" strokeWidth="1.2" />
                <path d="M4.5 5V3.5a2.5 2.5 0 015 0V5" stroke="white" strokeWidth="1.2" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-white">Sprint 4 of 6</p>
              <p className="text-[9px] text-white/32">Build phase active</p>
            </div>
          </div>

          {/* Animated progress bar */}
          <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #3B82F6, #7C3AED)' }}
              initial={{ width: '0%' }}
              animate={{ width: '78%' }}
              transition={{ duration: 1.4, ease: EASE, delay: 1.1 }}
            />
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-white/28">Progress</span>
            <span className="font-bold" style={{ color: '#93c5fd' }}>78%</span>
          </div>
        </div>
      </Floater>

      {/* ── ACTIVITY FEED ───────────────────────────────────── */}
      <Floater y1={-3} y2={6} duration={7.2} delay={1} rotate={0.8} className="absolute left-4 bottom-16 w-58">
        <div
          className="rounded-2xl p-4"
          style={{
            background: 'rgba(255,255,255,0.028)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 14px 40px rgba(0,0,0,0.4)',
            width: '232px',
          }}
        >
          <p className="text-[10px] text-white/28 uppercase tracking-[0.12em] mb-3">Recent Activity</p>
          {[
            { dot: '#34d399', text: 'All 24 tests passing',      time: '2m ago' },
            { dot: '#60a5fa', text: 'Module deployed to staging', time: '18m ago' },
            { dot: '#a78bfa', text: 'Client demo confirmed',      time: '1h ago' },
          ].map(({ dot, text, time }) => (
            <div key={text} className="flex items-start gap-2.5 py-2 last:pb-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-1.5 h-1.5 rounded-full mt-[5px] shrink-0" style={{ backgroundColor: dot }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/58 leading-snug">{text}</p>
                <p className="text-[9px] text-white/22 mt-0.5">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </Floater>

      {/* ── FLOATING TECH BADGES ────────────────────────────── */}
      {[
        { label: 'React', x: '64%', y: '14%', delay: 1.5 },
        { label: 'PostgreSQL', x: '10%', y: '78%', delay: 1.8 },
        { label: 'Node.js', x: '78%', y: '82%', delay: 2.0 },
      ].map(({ label, x, y, delay }) => (
        <motion.div
          key={label}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay }}
        >
          <div
            className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-white/45"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}
          >
            {label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
