import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/Animate'
import { services } from '../data/services'

export default function Services() {
  return (
    <div className="pt-28 pb-24 px-5 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="max-w-2xl mb-16">
          <div className="section-tag mb-4">Services</div>
          <h1 className="text-5xl font-black tracking-tight mb-5">What We Offer</h1>
          <p className="text-lg text-white/50 leading-relaxed">
            Comprehensive software services designed to transform your business and accelerate long-term growth.
          </p>
        </FadeUp>

        <StaggerContainer className="grid md:grid-cols-1 gap-6">
          {services.map((srv, i) => (
            <StaggerItem key={srv.slug}>
              <div className="card-dark p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${srv.color} flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg`}>
                      {srv.icon === 'code' ? '{ }' : srv.icon === 'users' ? '◎' : '⟳'}
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight mb-2">{srv.title}</h2>
                    <p className="text-blue-400 font-medium text-sm mb-4">{srv.tagline}</p>
                    <p className="text-white/50 leading-relaxed mb-6">{srv.description}</p>
                    <Link to={`/services/${srv.slug}`} className="btn-primary">
                      Learn More <ArrowRight size={15} />
                    </Link>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Deliverables</h4>
                    <div className="space-y-2.5">
                      {srv.deliverables.map((d) => (
                        <div key={d} className="flex items-center gap-3 text-sm text-white/60">
                          <Check size={14} className="text-blue-400 shrink-0" />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  )
}
