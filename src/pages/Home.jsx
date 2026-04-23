import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const HeroScene = lazy(() => import('../components/HeroScene'))
import {
  ArrowRight, Check, ChevronRight, Zap, Shield, Clock, Star, Sparkles,
  Search, Pen, Rocket, GraduationCap, Headphones,
  Factory, BookOpen, Heart, TrendingUp, ShoppingCart, Globe,
  Calendar, Users, Terminal,
} from 'lucide-react'
import {
  FadeUp, StaggerContainer, StaggerItem, SlideLeft, SlideRight, ScaleIn,
  CountUp, RevealWords, FloatCard,
} from '../components/Animate'
import NewsletterSignup from '../components/NewsletterSignup'
import { solutions } from '../data/solutions'
import { services } from '../data/services'

const EASE = [0.16, 1, 0.3, 1]

// ── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { to: 50,  suffix: '+', label: 'Projects Delivered',   sub: 'across 6 industries' },
  { to: 98,  suffix: '%', label: 'Client Satisfaction',  sub: 'average NPS score' },
  { to: 5,   suffix: '+', label: 'Years Experience',     sub: 'in enterprise software' },
  { text: '24/7',          label: 'Support Available',   sub: 'SLA-backed response' },
]

const methodology = [
  { step: '01', icon: Search,      title: 'Discover', color: 'from-blue-500 to-blue-600',      desc: 'Deep-dive workshops to map your workflows, pain points, and success metrics before a line of code is written.' },
  { step: '02', icon: Pen,         title: 'Design',   color: 'from-indigo-500 to-violet-500',  desc: 'Architecture blueprints, UX wireframes, and a signed-off technical spec so you know exactly what you are getting.' },
  { step: '03', icon: Terminal,    title: 'Build',    color: 'from-violet-500 to-purple-600',  desc: 'Two-week sprints with live demos every cycle. You always see working software, never just progress reports.' },
  { step: '04', icon: Rocket,      title: 'Deploy',   color: 'from-purple-600 to-fuchsia-600', desc: 'Zero-downtime rollout with staged environments, automated tests, and a 30-day hypercare window.' },
  { step: '05', icon: GraduationCap, title: 'Train', color: 'from-fuchsia-600 to-pink-500',   desc: 'Role-based training, full documentation, and video walkthroughs until every user is confident.' },
  { step: '06', icon: Headphones,  title: 'Support',  color: 'from-pink-500 to-rose-500',      desc: 'Dedicated SLA support, proactive monitoring, and quarterly roadmap reviews for the long haul.' },
]

const caseStudies = [
  {
    tag: 'ERP System', industry: 'Manufacturing & Distribution',
    title: 'End-to-End ERP for Tadesse Group',
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
    title: 'Digital Campus for Bright Future Academy',
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
    title: 'HR Automation Suite for NovaTech',
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

const industries = [
  { icon: Factory,     label: 'Manufacturing' },
  { icon: BookOpen,    label: 'Education' },
  { icon: Heart,       label: 'Healthcare' },
  { icon: TrendingUp,  label: 'Finance' },
  { icon: ShoppingCart,label: 'Retail' },
  { icon: Globe,       label: 'Government' },
]

const testimonials = [
  { text: 'Kaldilabs delivered our ERP ahead of schedule with exceptional quality. Their team was communicative and genuinely invested in our success.', name: 'Abebe Tadesse', role: 'CEO, Tadesse Enterprises', avatar: 'A', color: 'from-blue-500 to-violet-600' },
  { text: 'The school management system transformed how we operate. Intuitive, fast, and exactly what we needed — nothing more, nothing less.', name: 'Sara Haile', role: 'Director, Bright Future Academy', avatar: 'S', color: 'from-emerald-500 to-teal-600' },
  { text: "Outstanding technical training. Our team's productivity improved significantly after the consultancy sessions. Highly professional engagement.", name: 'Daniel Bekele', role: 'CTO, NovaTech Solutions', avatar: 'D', color: 'from-violet-500 to-fuchsia-600' },
]

const whyUs = [
  { icon: Zap,    title: 'Attention to Detail',  desc: 'Every pixel and every line of code crafted with precision.',          color: 'bg-blue-500/10 text-blue-400' },
  { icon: Shield, title: 'Enterprise Security',  desc: 'Security-first architecture on every project we deliver.',            color: 'bg-violet-500/10 text-violet-400' },
  { icon: Clock,  title: 'On-Time Delivery',     desc: 'We respect deadlines and honour commitments without compromise.',      color: 'bg-emerald-500/10 text-emerald-400' },
  { icon: Check,  title: 'Full-Cycle Support',   desc: 'With you from planning through deployment and long-term growth.',     color: 'bg-amber-500/10 text-amber-400' },
]

const ctaOptions = [
  { label: 'Book a Discovery Call', desc: 'Free 30-min consultation', primary: true },
  { label: 'Get a Project Estimate', desc: 'No-obligation scoping' },
  { label: 'Talk to a Specialist', desc: 'ERP, HR, or custom dev' },
  { label: 'Request a System Audit', desc: 'For existing software' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div>

      {/* ════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">

        {/* Aurora blobs — more vibrant now that bg isn't pure black */}
        <div className="blob blob-blue   w-[800px] h-[800px] -top-56 -left-48   opacity-80" />
        <div className="blob blob-violet w-[680px] h-[680px] -bottom-36 -right-36 opacity-70" style={{ animationDelay: '5s' }} />
        <div className="blob blob-indigo w-[480px] h-[480px] top-[35%] left-[50%] opacity-55" style={{ animationDelay: '9s' }} />

        {/* Dot grid — more modern than line grid */}
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        {/* Top radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_-15%,rgba(59,130,246,0.22),rgba(94,106,210,0.1)_40%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_115%,rgba(6,6,15,0.96),transparent)]" />

        {/* Split layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-8 items-center">

          {/* ── Text column ─────────────────────────────────────── */}
          <div className="text-center lg:text-left py-20 lg:py-0">

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/[0.06] border border-white/10 text-blue-300 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Enterprise Software Partner
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
              className="text-5xl sm:text-6xl lg:text-[68px] font-extrabold tracking-[-2px] leading-[1.04] mb-5"
            >
              <span className="gradient-text">We Build Software</span>
              <br />
              <span className="gradient-text-vivid">That Drives Real</span>
              <br />
              <span className="gradient-text">Business Results</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
              className="text-lg text-white/52 max-w-[520px] lg:mx-0 mx-auto leading-relaxed mb-10"
            >
              From ERP systems to custom web platforms — Kaldilabs engineers end-to-end enterprise software
              for growing organisations. Fixed timelines. Measurable outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.28 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link to="/contact" className="btn-primary btn-lg">
                Book a Discovery Call <ArrowRight size={16} />
              </Link>
              <Link to="/solutions" className="btn-secondary">
                See Our Work
              </Link>
            </motion.div>

            {/* Animated stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.42 }}
              className="mt-14 pt-8 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl lg:mx-0 mx-auto"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-3xl font-black gradient-text-blue tracking-tight">
                    {s.text ? s.text : <CountUp to={s.to} suffix={s.suffix} duration={2.4} />}
                  </div>
                  <div className="text-[11px] text-white/40 mt-0.5 font-semibold">{s.label}</div>
                  <div className="text-[10px] text-white/22 mt-0.5 uppercase tracking-wider">{s.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── 3D orb scene ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="hidden lg:block relative h-[580px]"
          >
            {/* Glow halo behind the orb */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(59,130,246,0.18),rgba(124,58,237,0.1)_55%,transparent_80%)] pointer-events-none" />
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          aria-hidden="true"
        >
          <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-white/40"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-[10px] text-white/20 uppercase tracking-widest">Scroll</span>
        </motion.div>

        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050506] to-transparent pointer-events-none" />
      </section>


      {/* ════════════════════════════════════════════════════════
          METHODOLOGY — How We Deliver
          ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-5 relative overflow-hidden" style={{ background: 'var(--surface-raised)' }}>
        {/* Subtle glow behind section */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-tag mb-4">Methodology</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">
              <RevealWords>How We Deliver</RevealWords>
            </h2>
            <p className="text-white/50 leading-relaxed">
              A clear, predictable process so you always know what happens next and why.
              No surprises — just progress.
            </p>
          </FadeUp>

          <div className="relative">
            {/* Animated connector line (desktop) */}
            <motion.div
              className="absolute hidden lg:block h-px top-[52px] left-[9%] right-[9%] pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25) 15%, rgba(94,106,210,0.25) 50%, rgba(124,58,237,0.25) 85%, transparent)' }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.4 }}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {methodology.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.1 }}
                  className="method-step flex flex-col items-center text-center"
                >
                  <div className={`w-[52px] h-[52px] rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg relative z-10 shrink-0`}>
                    <step.icon size={22} className="text-white" />
                  </div>
                  <div className="text-[10px] font-black text-white/20 mb-1.5 tracking-[0.15em]">{step.step}</div>
                  <h3 className="font-bold text-white text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-white/42 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <FadeUp delay={0.3} className="text-center mt-14">
            <Link to="/contact" className="btn-secondary">
              Start with a Discovery Call <ArrowRight size={14} />
            </Link>
          </FadeUp>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          CASE STUDIES
          ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <FadeUp className="max-w-xl">
              <div className="section-tag mb-4">Case Studies</div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">
                <RevealWords>Results We Have Delivered</RevealWords>
              </h2>
              <p className="text-white/50 leading-relaxed">
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
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <span className="section-tag">{cs.tag}</span>
                    </div>
                    <div className="text-xs text-white/28 font-semibold uppercase tracking-wider mb-3">{cs.industry}</div>

                    <h3 className="font-bold text-white text-[17px] mb-5 leading-snug">{cs.title}</h3>

                    {/* Challenge */}
                    <div className="mb-4">
                      <div className="text-[10px] font-black text-white/28 uppercase tracking-[0.12em] mb-1.5">Challenge</div>
                      <p className="text-sm text-white/52 leading-relaxed">{cs.problem}</p>
                    </div>

                    {/* Solution */}
                    <div className="mb-6 flex-1">
                      <div className="text-[10px] font-black text-white/28 uppercase tracking-[0.12em] mb-1.5">Solution</div>
                      <p className="text-sm text-white/52 leading-relaxed">{cs.solution}</p>
                    </div>

                    {/* Result metric */}
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${cs.gradBg} border border-white/[0.07] mb-5`}>
                      <div className={`text-4xl font-black bg-gradient-to-r ${cs.gradText} bg-clip-text text-transparent mb-1`}>
                        {cs.result}
                      </div>
                      <div className="text-xs text-white/48">{cs.resultLabel}</div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-white/28 mb-4">
                      <span className="flex items-center gap-1.5"><Calendar size={11} />{cs.timeline}</span>
                      <span className="flex items-center gap-1.5"><Users size={11} />{cs.team}</span>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {cs.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.07] text-[10px] font-semibold text-white/38">
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


      {/* ════════════════════════════════════════════════════════
          SERVICES
          ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-5" style={{ background: 'var(--surface-raised)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp className="max-w-xl mb-16">
            <div className="section-tag mb-4">Services</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">
              <RevealWords>What We Do</RevealWords>
            </h2>
            <p className="text-white/50 leading-relaxed">
              Comprehensive software services designed to transform your business and drive measurable growth.
            </p>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {services.map((srv) => (
              <StaggerItem key={srv.slug}>
                <FloatCard className="h-full">
                  <Link to={`/services/${srv.slug}`} className="card-gradient-border flex flex-col p-8 group h-full">
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
                </FloatCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          SOLUTIONS GRID
          ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-5">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-tag mb-4">Solutions</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Systems We Build</h2>
            <p className="text-white/50 leading-relaxed">
              From enterprise resource planning to custom web applications — robust, scalable systems built for the long term.
            </p>
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


      {/* ════════════════════════════════════════════════════════
          INDUSTRIES
          ════════════════════════════════════════════════════════ */}
      <section className="py-20 px-5" style={{ background: 'var(--surface-raised)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-12">
            <div className="section-tag mb-3">Industries</div>
            <h2 className="text-2xl font-bold text-white/80">Sectors We Serve</h2>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {industries.map(({ icon: Icon, label }) => (
              <StaggerItem key={label}>
                <div className="industry-chip">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <span className="text-xs font-semibold text-white/50">{label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          WHY KALDILABS
          ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideLeft>
              <div className="section-tag mb-5">Why Kaldilabs</div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-5">The Kaldilabs Difference</h2>
              <p className="text-white/50 leading-relaxed mb-10">
                We don&apos;t just write code &mdash; we build solutions that make measurable impact.
                Honest timelines, clear communication, and software that actually works.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {whyUs.map(({ icon: Icon, title, desc, color }) => (
                  <div
                    key={title}
                    className="flex gap-3.5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]
                               hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200"
                  >
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
                  { to: 50, suffix: '+', label: 'Projects Completed', sub: 'across 6 industries', color: 'from-blue-500/10 to-blue-600/5' },
                  { to: 98, suffix: '%', label: 'Client Satisfaction', sub: 'NPS average', color: 'from-violet-500/10 to-violet-600/5' },
                  { to: 5,  suffix: '+', label: 'Years of Excellence', sub: 'in enterprise software', color: 'from-emerald-500/10 to-emerald-600/5' },
                  { text: '24/7',         label: 'Support Available', sub: 'SLA-backed response', color: 'from-amber-500/10 to-amber-600/5' },
                ].map((s) => (
                  <div key={s.label} className={`p-6 rounded-2xl text-center bg-gradient-to-br ${s.color} border border-white/[0.07]`}>
                    <div className="text-4xl font-black gradient-text-blue tracking-tight mb-1">
                      {s.text ? s.text : <CountUp to={s.to} suffix={s.suffix} duration={2.2} />}
                    </div>
                    <div className="text-sm font-bold text-white/60 mb-0.5">{s.label}</div>
                    <div className="text-xs text-white/30">{s.sub}</div>
                  </div>
                ))}
              </div>
            </SlideRight>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          TEAM / FOUNDER CREDIBILITY
          ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-5" style={{ background: 'var(--surface-raised)' }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <SlideLeft>
            <div className="section-tag mb-5">Our Team</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-5">
              Engineers First,<br />Consultants Second
            </h2>
            <p className="text-white/50 leading-relaxed mb-5">
              Kaldilabs was founded by engineers who grew tired of watching enterprise software
              fail &mdash; not because the technology was wrong, but because vendors never understood the
              business deeply enough.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              We lead every engagement with curiosity, ship working software in weeks not months,
              and stay long after go-live to make sure adoption actually sticks.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {['Enterprise Architecture', 'Cloud-Native Deployment', 'ERP & Business Systems', 'Training & Adoption'].map((skill) => (
                <div key={skill} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="w-5 h-5 rounded-md bg-blue-500/15 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-blue-400" />
                  </div>
                  <span className="text-xs font-semibold text-white/60">{skill}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-primary">
              Meet the Team <ArrowRight size={15} />
            </Link>
          </SlideLeft>

          <SlideRight>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '12+', label: 'Engineers',   sub: 'Full-stack & domain experts', color: 'from-blue-500/10 to-blue-600/5' },
                { num: '4',   label: 'Countries',   sub: 'Active client presence',       color: 'from-violet-500/10 to-violet-600/5' },
                { num: '100%',label: 'On-Time',     sub: 'Delivery record (last 12 mo)',  color: 'from-emerald-500/10 to-emerald-600/5' },
                { num: '3yr', label: 'Avg. Tenure', sub: 'Client engagement length',     color: 'from-amber-500/10 to-amber-600/5' },
              ].map(({ num, label, sub, color }) => (
                <div key={label} className={`p-6 rounded-2xl text-center bg-gradient-to-br ${color} border border-white/[0.07]`}>
                  <div className="text-3xl font-black gradient-text-blue mb-1">{num}</div>
                  <div className="text-sm font-bold text-white/65 mb-1">{label}</div>
                  <div className="text-xs text-white/32">{sub}</div>
                </div>
              ))}
            </div>
          </SlideRight>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          TESTIMONIALS
          ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-5">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center max-w-xl mx-auto mb-16">
            <div className="section-tag mb-4">Testimonials</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">What Clients Say</h2>
            <p className="text-white/50">Hear directly from the businesses we&apos;ve helped transform.</p>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <FloatCard className="h-full">
                  <div className="testimonial-card h-full">
                    <div className="flex gap-1 mb-5 pt-6">
                      {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-sm text-white/58 leading-relaxed flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                    <div className="testimonial-author">
                      <div className={`testimonial-avatar bg-gradient-to-br ${t.color}`}>{t.avatar}</div>
                      <div>
                        <div className="text-sm font-semibold text-white">{t.name}</div>
                        <div className="text-xs text-white/38">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </FloatCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          MULTI-CTA BANNER
          ════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5" style={{ background: 'var(--surface-raised)' }}>
        <div className="max-w-5xl mx-auto">
          <ScaleIn>
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d1424] via-[#111230] to-[#0f0a22]" />
              <div className="absolute inset-0 bg-cta-glow opacity-80" />
              <div className="absolute -top-14 -right-14 w-56 h-56 bg-blue-600/12 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-violet-600/12 rounded-full blur-2xl" />

              <div className="relative z-10 px-8 pt-12 pb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/10 text-xs font-bold text-blue-300 uppercase tracking-wider mb-5">
                  <Sparkles size={11} /> Ready when you are
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
                  Have a project in mind?
                </h2>
                <p className="text-white/48 mb-10 leading-relaxed max-w-md mx-auto">
                  Choose how you want to get started. Every path leads to the same place: working software that solves real problems.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {ctaOptions.map(({ label, desc, primary }) => (
                    <Link
                      key={label}
                      to="/contact"
                      className={`flex flex-col items-start gap-1 p-5 rounded-2xl border text-left transition-all duration-250 hover:-translate-y-1 ${
                        primary
                          ? 'bg-blue-600/18 border-blue-500/28 hover:bg-blue-600/28 hover:border-blue-500/45'
                          : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/15'
                      }`}
                    >
                      <span className="font-bold text-sm text-white leading-tight">{label}</span>
                      <span className="text-xs text-white/38">{desc}</span>
                    </Link>
                  ))}
                </div>

                <p className="text-xs text-white/25">
                  No commitments. No spam. Just a conversation about your project.
                </p>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          NEWSLETTER
          ════════════════════════════════════════════════════════ */}
      <section className="py-20 px-5" aria-label="Newsletter">
        <div className="max-w-2xl mx-auto">
          <FadeUp>
            <NewsletterSignup />
          </FadeUp>
        </div>
      </section>

    </div>
  )
}
