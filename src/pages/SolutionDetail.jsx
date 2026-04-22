import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import { FadeUp, SlideLeft, SlideRight, StaggerContainer, StaggerItem } from '../components/Animate'
import { getSolution, solutions } from '../data/solutions'

export default function SolutionDetail() {
  const { slug } = useParams()
  const sol = getSolution(slug)
  if (!sol) return <Navigate to="/solutions" replace />

  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <section className="relative px-5 pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-60" />
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${sol.color} opacity-[0.04] rounded-full blur-[120px]`} />
        <div className="relative max-w-7xl mx-auto">
          <FadeUp>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/35 mb-8">
              <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight size={13} />
              <Link to="/solutions" className="hover:text-white/60 transition-colors">Solutions</Link>
              <ChevronRight size={13} />
              <span className="text-white/60">{sol.title}</span>
            </div>

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sol.color} flex items-center justify-center text-white text-2xl font-bold shadow-xl`}>
                  {sol.icon}
                </div>
                <span className="section-tag">{sol.tag}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
                <span className="gradient-text">{sol.title}</span>
              </h1>
              <p className="text-xl text-blue-400 font-medium mb-5">{sol.tagline}</p>
              <p className="text-lg text-white/55 leading-relaxed max-w-2xl mb-8">{sol.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">Request Demo <ArrowRight size={16} /></Link>
                <Link to="/contact" className="btn-secondary">Get Started</Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-5 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <SlideLeft>
              <div className="section-tag mb-4">Features</div>
              <h2 className="text-3xl font-black tracking-tight mb-4">What This Solution Offers</h2>
              <p className="text-white/50 leading-relaxed mb-8">Everything you need to run this area of your business more efficiently and intelligently.</p>
              <div className="space-y-3">
                {sol.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/7">
                    <div className="w-6 h-6 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} className="text-blue-400" />
                    </div>
                    <span className="text-sm text-white/70 leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </SlideLeft>
            <SlideRight>
              {/* Mock dashboard card */}
              <div className={`rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#1a1a2e] border border-white/10 p-8 shadow-2xl`}>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sol.color} flex items-center justify-center text-white text-lg`}>{sol.icon}</div>
                  <div className="flex gap-2">
                    {['bg-red-500','bg-yellow-500','bg-green-500'].map(c=>(
                      <div key={c} className={`w-3 h-3 rounded-full ${c} opacity-70`} />
                    ))}
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">{sol.title} Dashboard</h3>
                <p className="text-xs text-white/35 mb-6">{sol.subtitle}</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[['Active Users','1,284'],['Uptime','99.9%'],['Tasks Done','94%'],['Reports','42 New']].map(([k,v])=>(
                    <div key={k} className="bg-white/4 rounded-xl p-3">
                      <div className="text-xs text-white/35 mb-1">{k}</div>
                      <div className="text-base font-bold text-white">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="h-16 bg-white/3 rounded-xl flex items-end gap-1 px-3 pb-2 overflow-hidden">
                  {[40,65,55,80,70,90,60,75,85,70,95,88].map((h,i)=>(
                    <div key={i} className={`flex-1 rounded-t-sm bg-gradient-to-t ${sol.color} opacity-70`} style={{height:`${h}%`}} />
                  ))}
                </div>
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* Benefits + Targets + Outcomes */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <FadeUp delay={0}>
            <div className="card-dark p-7 h-full">
              <div className="section-tag mb-5">Benefits</div>
              <h3 className="text-xl font-bold text-white mb-5">Key Benefits</h3>
              <div className="space-y-3">
                {sol.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2.5">
                    <Check size={15} className="text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-white/60 leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="card-dark p-7 h-full">
              <div className="section-tag mb-5">Clients</div>
              <h3 className="text-xl font-bold text-white mb-5">Who This Is For</h3>
              <div className="space-y-3">
                {sol.targets.map((t) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full shrink-0 mt-2" />
                    <span className="text-sm text-white/60 leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="card-dark p-7 h-full">
              <div className="section-tag mb-5">ROI</div>
              <h3 className="text-xl font-bold text-white mb-5">Expected Outcomes</h3>
              <div className="space-y-3">
                {sol.outcomes.map((o) => (
                  <div key={o} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0 mt-2" />
                    <span className="text-sm text-white/60 leading-relaxed">{o}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* More solutions */}
      <section className="py-20 px-5 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-10">
            <h2 className="text-2xl font-bold text-white">Explore Other Solutions</h2>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.filter(s => s.slug !== slug).slice(0, 3).map((s) => (
              <StaggerItem key={s.slug}>
                <Link to={`/solutions/${s.slug}`} className="card-dark flex items-center gap-4 p-5 group">
                  <div className={`w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-bold`}>{s.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-white truncate">{s.title}</div>
                    <div className="text-xs text-white/40">{s.tag}</div>
                  </div>
                  <ArrowRight size={14} className="text-white/25 group-hover:text-blue-400 transition-colors shrink-0" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="relative rounded-3xl p-12 bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-hero-glow opacity-80" />
              <div className="relative">
                <h2 className="text-3xl font-black tracking-tight text-white mb-3">Ready to get started?</h2>
                <p className="text-white/50 mb-8">Let's discuss how {sol.title} can transform your operations.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/contact" className="btn-primary">Request Demo <ArrowRight size={15} /></Link>
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
