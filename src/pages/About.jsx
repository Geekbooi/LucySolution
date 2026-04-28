import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/Animate'

const technologies = [
  'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB',
  'Redis', 'Docker', 'AWS', 'Tailwind CSS', 'TypeScript', 'GraphQL',
]

const values = [
  { title: 'Attention to Detail', desc: 'We obsess over the small things because they make the big things great.' },
  { title: 'Client-First', desc: 'Every decision starts with what\'s best for our clients and their users.' },
  { title: 'Transparency', desc: 'Open communication, honest timelines, no surprises.' },
  { title: 'Reliability', desc: 'We deliver what we promise, when we promise it.' },
]


export default function About() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative px-5 pt-12 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-60" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto">
          <FadeUp className="max-w-3xl">
            <div className="section-tag mb-5">About Us</div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight gradient-text mb-5">
              We Build Software That Matters
            </h1>
            <p className="text-xl text-white/55 leading-relaxed mb-8">
              Lucy Solution is a software solutions company dedicated to building high-quality, scalable systems for modern businesses worldwide. We combine technical excellence with a relentless focus on client success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary">Work With Us <ArrowRight size={15} /></Link>
              <Link to="/solutions" className="btn-secondary">Our Work</Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-5 border-t border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.028)' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <FadeUp delay={0}>
            <div className="card-dark p-8 h-full">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 mb-5 text-lg">◎</div>
              <h2 className="text-2xl font-black text-white mb-3">Our Mission</h2>
              <p className="text-white/55 leading-relaxed">
                To empower businesses of all sizes with intelligent, custom software solutions that solve real problems, drive efficiency, and enable growth — delivered with integrity and care.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="card-dark p-8 h-full">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 mb-5 text-lg">◈</div>
              <h2 className="text-2xl font-black text-white mb-3">Our Vision</h2>
              <p className="text-white/55 leading-relaxed">
                To become the most trusted software partner for modern businesses worldwide — known for our precision, reliability, and transformative impact.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="max-w-xl mb-12">
            <div className="section-tag mb-4">Values</div>
            <h2 className="text-3xl font-black tracking-tight mb-3">What We Stand For</h2>
            <p className="text-white/50">These principles guide every project we take on.</p>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="card-dark p-7 text-center h-full">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={18} className="text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center max-w-xl mx-auto mb-12">
            <div className="section-tag mb-4">Tech Stack</div>
            <h2 className="text-3xl font-black tracking-tight mb-3">Technologies We Use</h2>
            <p className="text-white/50">Modern, battle-tested tools for every use case.</p>
          </FadeUp>
          <FadeUp>
            <div className="flex flex-wrap gap-3 justify-center">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/8 text-sm font-medium text-white/65
                             hover:bg-white/8 hover:border-white/14 hover:text-white transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-5 border-t border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.028)' }}>
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[['50+','Projects Delivered'],['98%','Client Satisfaction'],['5+','Years of Experience'],['24/7','Support Available']].map(([num, lbl]) => (
              <StaggerItem key={lbl}>
                <div className="card-dark p-8 text-center">
                  <div className="text-4xl font-black gradient-text-blue tracking-tight mb-2">{num}</div>
                  <div className="text-sm text-white/40">{lbl}</div>
                </div>
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
                <h2 className="text-3xl font-black text-white tracking-tight mb-3">Let&apos;s Work Together</h2>
                <p className="text-white/50 mb-8">Reach out and let&apos;s discuss how Lucy Solution can help your business grow.</p>
                <Link to="/contact" className="btn-primary">Get in Touch <ArrowRight size={15} /></Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
