import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ChevronRight, Zap, Shield, Clock, Star, Sparkles } from 'lucide-react'
import { FadeUp, StaggerContainer, StaggerItem, SlideLeft, SlideRight, ScaleIn } from '../components/Animate'
import NewsletterSignup from '../components/NewsletterSignup'
import { solutions } from '../data/solutions'
import { services } from '../data/services'

const EASE = [0.16, 1, 0.3, 1]

const stats = [
  { num: '50+',  label: 'Projects Delivered' },
  { num: '98%',  label: 'Client Satisfaction' },
  { num: '5+',   label: 'Years Experience' },
  { num: '24/7', label: 'Support' },
]

const testimonials = [
  { text: 'Kaldilabs delivered our ERP ahead of schedule with exceptional quality. Their team was communicative and genuinely invested in our success.', name: 'Abebe Tadesse', role: 'CEO, Tadesse Enterprises', avatar: 'A', color: 'from-blue-500 to-violet-600' },
  { text: 'The school management system they built transformed how we operate. Intuitive, fast, and exactly what we needed — nothing more, nothing less.', name: 'Sara Haile', role: 'Director, Bright Future Academy', avatar: 'S', color: 'from-emerald-500 to-teal-600' },
  { text: "Outstanding technical training. Our team's productivity improved significantly after the consultancy sessions. Highly professional engagement.", name: 'Daniel Bekele', role: 'CTO, NovaTech Solutions', avatar: 'D', color: 'from-violet-500 to-fuchsia-600' },
]

const whyUs = [
  { icon: Zap,    title: 'Attention to Detail',  desc: 'Every pixel and every line of code crafted with precision',        color: 'bg-blue-500/10 text-blue-400' },
  { icon: Shield, title: 'Enterprise Security',   desc: 'Security-first architecture on every project we deliver',           color: 'bg-violet-500/10 text-violet-400' },
  { icon: Clock,  title: 'On-Time Delivery',      desc: 'We respect deadlines and honor commitments without compromise',     color: 'bg-emerald-500/10 text-emerald-400' },
  { icon: Check,  title: 'Full-Cycle Support',    desc: 'With you from planning through deployment and long-term growth',    color: 'bg-amber-500/10 text-amber-400' },
]

export default function Home() {
  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

        {/* Ambient glow blobs */}
        <div className="blob blob-blue w-[700px] h-[700px] top-[-180px] left-[-140px] opacity-70" />
        <div className="blob blob-violet w-[600px] h-[600px] bottom-[-120px] right-[-100px] opacity-60" />
        <div className="blob blob-indigo w-[400px] h-[400px] top-[35%] left-[55%] opacity-50" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.16),rgba(94,106,210,0.08)_45%,transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_110%,rgba(5,5,6,0.9),transparent)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest
                            bg-white/[0.06] border border-white/10 text-blue-300 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Trusted Software Partner
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-2px] leading-[1.04] mb-7"
          >
            <span className="gradient-text">Building Smart</span>
            <br />
            <span className="gradient-text-vivid">Software Solutions</span>
            <br />
            <span className="gradient-text">for Modern Business</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="text-lg text-white/50 max-w-[540px] mx-auto leading-relaxed mb-10"
          >
            High-quality, scalable systems tailored to your needs — from concept through deployment and beyond.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/contact" className="btn-primary">
              Start a Project <ArrowRight size={16} />
            </Link>
            <Link to="/solutions" className="btn-secondary">
              Explore Solutions
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.42 }}
            className="mt-18 pt-10 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black gradient-text-blue tracking-tight">{s.num}</div>
                <div className="text-[11px] text-white/38 mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050506] to-transparent" />
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section className="py-28 px-5">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="max-w-xl mb-16">
            <div className="section-tag mb-4">Services</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">What We Do</h2>
            <p className="text-white/50 leading-relaxed">Comprehensive software services designed to transform your business and drive measurable growth.</p>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {services.map((srv) => (
              <StaggerItem key={srv.slug}>
                <Link to={`/services/${srv.slug}`} className="card-dark flex flex-col p-8 group h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${srv.color} flex items-center justify-center mb-6 shadow-lg shrink-0`}>
                    <span className="text-white text-lg font-bold">
                      {srv.icon === 'code' ? '{ }' : srv.icon === 'users' ? '◎' : '⟳'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-6 flex-1">{srv.description.slice(0, 115)}…</p>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-blue-400/70 group-hover:text-blue-400 group-hover:gap-2.5 transition-all duration-200">
                    Learn more <ChevronRight size={14} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── SOLUTIONS GRID ─────────────────────────────────────────── */}
      <section className="py-28 px-5" style={{ background: 'var(--surface-raised)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-tag mb-4">Solutions</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Systems We Build</h2>
            <p className="text-white/50 leading-relaxed">From enterprise resource planning to custom web applications — robust, scalable systems built for the long term.</p>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((sol) => (
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
                  <p className="text-sm text-white/45 leading-relaxed mb-5 flex-1 relative">{sol.description.slice(0, 90)}…</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-white/35 group-hover:text-blue-400 transition-colors duration-200 relative">
                    Explore <ChevronRight size={14} />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeUp className="text-center mt-12">
            <Link to="/solutions" className="btn-secondary">
              View All Solutions <ArrowRight size={15} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── WHY KALDILABS ─────────────────────────────────────────── */}
      <section className="py-28 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideLeft>
              <div className="section-tag mb-5">Why Kaldilabs</div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-5">The Kaldilabs Difference</h2>
              <p className="text-white/50 leading-relaxed mb-10">
                We don&apos;t just write code &mdash; we build solutions that make measurable impact. Honest timelines, clear communication, and software that actually works.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {whyUs.map(({ icon: Icon, title, desc, color }) => (
                  <div key={title} className="flex gap-3.5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]
                                              hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200">
                    <div className={`w-9 h-9 shrink-0 rounded-xl ${color} bg-opacity-10 flex items-center justify-center`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white mb-1">{title}</div>
                      <div className="text-xs text-white/45 leading-relaxed">{desc}</div>
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
                  ['50+', 'Projects Completed',  'from-blue-500/10 to-blue-600/5'],
                  ['98%', 'Client Satisfaction',  'from-violet-500/10 to-violet-600/5'],
                  ['5+',  'Years of Excellence',  'from-emerald-500/10 to-emerald-600/5'],
                  ['24/7','Support Available',    'from-amber-500/10 to-amber-600/5'],
                ].map(([num, lbl, grad]) => (
                  <div key={lbl} className={`p-6 rounded-2xl text-center bg-gradient-to-br ${grad} border border-white/[0.07]`}>
                    <div className="text-4xl font-black gradient-text-blue tracking-tight mb-2">{num}</div>
                    <div className="text-xs text-white/40">{lbl}</div>
                  </div>
                ))}
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="py-28 px-5" style={{ background: 'var(--surface-raised)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center max-w-xl mx-auto mb-16">
            <div className="section-tag mb-4">Testimonials</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">What Clients Say</h2>
            <p className="text-white/50">Hear directly from the businesses we&apos;ve helped transform.</p>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="card-dark p-7 h-full flex flex-col">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-white/58 leading-relaxed flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/38">{t.role}</div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <ScaleIn>
            <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center border border-white/10">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d1424] via-[#111230] to-[#0f0a22]" />
              <div className="absolute inset-0 bg-cta-glow opacity-80" />
              {/* Decorative blobs */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-violet-600/15 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/10 text-xs font-bold text-blue-300 uppercase tracking-wider mb-6">
                  <Sparkles size={11} /> Ready when you are
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                  Have a project in mind?
                </h2>
                <p className="text-white/50 mb-10 leading-relaxed max-w-md mx-auto">
                  Let&apos;s build it together. Turn your vision into reliable, scalable software.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/contact" className="btn-primary">Contact Us <ArrowRight size={15} /></Link>
                  <Link to="/pricing" className="btn-secondary">View Pricing</Link>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────────────────────────────── */}
      <section
        className="py-20 px-5"
        aria-label="Newsletter"
      >
        <div className="max-w-2xl mx-auto">
          <FadeUp>
            <NewsletterSignup />
          </FadeUp>
        </div>
      </section>

    </div>
  )
}
