import { Link } from 'react-router-dom'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/Animate'

const plans = [
  {
    name: 'Starter',
    price: '$499',
    period: '/mo',
    tagline: 'For small businesses just getting started',
    badge: null,
    color: 'from-slate-600 to-slate-500',
    features: [
      'Up to 3 user accounts',
      '1 core module (choose one)',
      'Standard support (email)',
      'Monthly system updates',
      'Basic reporting dashboard',
      'Cloud hosting included',
    ],
    cta: 'Get Started',
    ctaStyle: 'btn-secondary',
  },
  {
    name: 'Growth',
    price: '$1,199',
    period: '/mo',
    tagline: 'Most popular — perfect for growing teams',
    badge: 'Most Popular',
    color: 'from-blue-600 to-violet-600',
    features: [
      'Up to 25 user accounts',
      '3 modules included',
      'Priority support (chat + email)',
      'Bi-weekly updates & patches',
      'Advanced analytics & reporting',
      'API access for integrations',
      'Custom branding & white-label',
      'Onboarding & training session',
    ],
    cta: 'Start Growing',
    ctaStyle: 'btn-primary',
  },
  {
    name: 'Professional',
    price: '$2,499',
    period: '/mo',
    tagline: 'Advanced features for established businesses',
    badge: null,
    color: 'from-violet-600 to-purple-600',
    features: [
      'Unlimited user accounts',
      'All modules included',
      '24/7 dedicated support',
      'Weekly updates & feature releases',
      'Custom workflow automation',
      'Dedicated account manager',
      'SLA guarantee (99.9% uptime)',
      'Data migration assistance',
      'Custom integrations',
    ],
    cta: 'Go Professional',
    ctaStyle: 'btn-secondary',
  },
]

const services = [
  {
    name: 'Engineering & Development',
    tiers: [
      { tier: 'Starter', price: '$500–$5,000', desc: 'Small web app or MVP' },
      { tier: 'Growth', price: '$5,000–$20,000', desc: 'Full-featured application' },
      { tier: 'Professional', price: '$20,000+', desc: 'Enterprise-grade system' },
    ],
  },
  {
    name: 'AI & Automation',
    tiers: [
      { tier: 'Starter', price: '$1,000–$5,000', desc: 'Single workflow automation' },
      { tier: 'Growth', price: '$5,000–$15,000', desc: 'Multi-process AI integration' },
      { tier: 'Professional', price: '$15,000+', desc: 'Enterprise AI platform' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    tiers: [
      { tier: 'Starter', price: '$800–$3,000', desc: 'Basic CI/CD & cloud setup' },
      { tier: 'Growth', price: '$3,000–$8,000', desc: 'Full infrastructure & pipelines' },
      { tier: 'Professional', price: '$8,000+', desc: 'Enterprise-scale DevOps' },
    ],
  },
  {
    name: 'Consulting & Strategy',
    tiers: [
      { tier: 'Starter', price: '$199/session', desc: '2-hour focused workshop' },
      { tier: 'Growth', price: '$1,200/week', desc: 'Full team training program' },
      { tier: 'Professional', price: 'Custom', desc: 'Embedded consultant' },
    ],
  },
  {
    name: 'Data & Analytics',
    tiers: [
      { tier: 'Starter', price: '$1,000–$4,000', desc: 'Basic dashboard & reporting' },
      { tier: 'Growth', price: '$4,000–$12,000', desc: 'Full BI platform & pipelines' },
      { tier: 'Professional', price: '$12,000+', desc: 'Enterprise data platform' },
    ],
  },
  {
    name: 'Support & Maintenance',
    tiers: [
      { tier: 'Starter', price: '$199/mo', desc: 'Basic monitoring & patches' },
      { tier: 'Growth', price: '$499/mo', desc: 'Priority support + improvements' },
      { tier: 'Professional', price: '$999/mo', desc: 'Dedicated support team' },
    ],
  },
]

const faqs = [
  { q: 'Are prices negotiable for startups?', a: 'Absolutely. We offer flexible payment plans and startup discounts. Contact us to discuss.' },
  { q: 'Is there a setup fee?', a: 'Starter plan has no setup fee. Growth and Professional plans include onboarding at no extra charge.' },
  { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade at any time. Changes take effect from the next billing cycle.' },
  { q: 'What is included in support?', a: 'All plans include bug fixes and security patches. Growth+ adds feature updates and dedicated channels.' },
]

export default function Pricing() {
  return (
    <div className="pt-28 pb-24 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag mb-4">Pricing</div>
          <h1 className="text-5xl font-black tracking-tight mb-5">Simple, Transparent Pricing</h1>
          <p className="text-lg text-white/50 leading-relaxed">
            Affordable plans built for every stage of growth. No hidden fees, no surprises.
          </p>
        </FadeUp>

        {/* Plans */}
        <StaggerContainer className="grid md:grid-cols-3 gap-5 mb-20">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div className={`relative card-dark p-8 h-full flex flex-col ${plan.badge ? 'border-blue-500/30 bg-[rgba(37,99,235,0.04)]' : ''}`}>
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold shadow-lg">
                      <Zap size={10} /> {plan.badge}
                    </div>
                  </div>
                )}
                <div className="mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} mb-4`} />
                  <h2 className="text-xl font-black text-white mb-1">{plan.name}</h2>
                  <p className="text-xs text-white/40 mb-5">{plan.tagline}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-sm text-white/40">{plan.period}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/60">{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className={plan.ctaStyle + ' justify-center'}>
                  {plan.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Per-service table */}
        <FadeUp className="mb-10">
          <div className="section-tag mb-4">By Service</div>
          <h2 className="text-3xl font-black tracking-tight mb-3">Pricing by Service</h2>
          <p className="text-white/50">One-off project pricing for specific engagements.</p>
        </FadeUp>
        <div className="overflow-x-auto mb-20">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left py-3 px-4 text-xs font-bold text-white/40 uppercase tracking-widest">Service</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-white/40 uppercase tracking-widest">Starter</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-white/40 uppercase tracking-widest">Growth</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-white/40 uppercase tracking-widest">Professional</th>
              </tr>
            </thead>
            <tbody>
              {services.map((srv, i) => (
                <tr key={srv.name} className={`border-b border-white/5 ${i%2===0?'bg-white/[0.01]':''}`}>
                  <td className="py-4 px-4 font-semibold text-sm text-white">{srv.name}</td>
                  {srv.tiers.map((t) => (
                    <td key={t.tier} className="py-4 px-4">
                      <div className="font-bold text-sm text-white">{t.price}</div>
                      <div className="text-xs text-white/35 mt-0.5">{t.desc}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQs */}
        <FadeUp className="mb-8">
          <h2 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h2>
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-2 gap-4 mb-16">
          {faqs.map((faq) => (
            <StaggerItem key={faq.q}>
              <div className="card-dark p-6">
                <h3 className="font-bold text-white text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp>
          <div className="relative rounded-3xl p-10 md:p-14 text-center bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-80" />
            <div className="relative">
              <h2 className="text-3xl font-black text-white tracking-tight mb-3">Not sure which plan fits?</h2>
              <p className="text-white/50 mb-8">Let&apos;s talk. We&apos;ll help you find the right solution for your budget and goals.</p>
              <Link to="/contact" className="btn-primary">Talk to Us <ArrowRight size={15} /></Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
