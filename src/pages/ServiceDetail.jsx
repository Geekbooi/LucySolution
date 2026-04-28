import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import { FadeUp, SlideLeft, SlideRight, StaggerContainer, StaggerItem } from '../components/Animate'
import { getService } from '../data/services'

export default function ServiceDetail() {
  const { slug } = useParams()
  const srv = getService(slug)
  if (!srv) return <Navigate to="/services" replace />

  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <section className="relative px-5 pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-60" />
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${srv.color} opacity-[0.04] rounded-full blur-[120px]`} />
        <div className="relative max-w-7xl mx-auto">
          <FadeUp>
            <div className="flex items-center gap-2 text-sm text-white/35 mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight size={13} />
              <Link to="/services" className="hover:text-white/60 transition-colors">Services</Link>
              <ChevronRight size={13} />
              <span className="text-white/60">{srv.title}</span>
            </div>
            <div className="max-w-3xl">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${srv.color} flex items-center justify-center text-white text-2xl font-bold shadow-xl mb-6`}>
                {srv.icon === 'code' ? '{ }' : srv.icon === 'users' ? '◎' : '⟳'}
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight gradient-text mb-4">{srv.title}</h1>
              <p className="text-xl text-blue-400 font-medium mb-5">{srv.tagline}</p>
              <p className="text-lg text-white/55 leading-relaxed max-w-2xl mb-8">{srv.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">Get Started <ArrowRight size={16} /></Link>
                <Link to="/pricing" className="btn-secondary">View Pricing</Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-5 border-t border-white/[0.08]" style={{ background: 'linear-gradient(180deg, #161645 0%, #0e0e32 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp className="max-w-xl mb-12">
            <div className="section-tag mb-4">Process</div>
            <h2 className="text-3xl font-black tracking-tight mb-3">How We Work</h2>
            <p className="text-white/50">A clear, transparent process so you always know what to expect.</p>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {srv.process.map((step) => (
              <StaggerItem key={step.step}>
                <div className="card-dark p-6 h-full">
                  <div className="text-4xl font-black text-white/6 mb-3 leading-none">{step.step}</div>
                  <h3 className="font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Deliverables + Why us */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <SlideLeft>
            <div className="card-dark p-8 h-full">
              <div className="section-tag mb-5">Deliverables</div>
              <h3 className="text-2xl font-bold text-white mb-6">What You&apos;ll Receive</h3>
              <div className="space-y-3">
                {srv.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.025] border border-white/6">
                    <Check size={14} className="text-blue-400 shrink-0" />
                    <span className="text-sm text-white/65">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </SlideLeft>
          <SlideRight>
            <div className="card-dark p-8 h-full">
              <div className="section-tag mb-5">Why Us</div>
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Lucy Solution</h3>
              <div className="space-y-4">
                {srv.whyUs.map((w) => (
                  <div key={w} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-blue-400" />
                    </div>
                    <span className="text-sm text-white/60 leading-relaxed">{w}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/contact" className="btn-primary">Start a Conversation <ArrowRight size={14} /></Link>
              </div>
            </div>
          </SlideRight>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="relative rounded-3xl p-12 bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-hero-glow opacity-80" />
              <div className="relative">
                <h2 className="text-3xl font-black text-white tracking-tight mb-3">Ready to get started?</h2>
                <p className="text-white/50 mb-8">Let&apos;s talk about how our {srv.title} service can help your business.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/contact" className="btn-primary">Contact Us <ArrowRight size={15} /></Link>
                  <Link to="/pricing" className="btn-secondary">View Pricing</Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
