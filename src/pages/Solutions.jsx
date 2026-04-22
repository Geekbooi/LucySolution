import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/Animate'
import { solutions } from '../data/solutions'

export default function Solutions() {
  return (
    <div className="pt-28 pb-24 px-5 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeUp className="max-w-2xl mb-16">
          <div className="section-tag mb-4">Solutions</div>
          <h1 className="text-5xl font-black tracking-tight mb-5">Systems We Build</h1>
          <p className="text-lg text-white/50 leading-relaxed">
            From enterprise resource planning to custom web applications — robust, scalable systems built to grow with your business.
          </p>
        </FadeUp>

        {/* Grid */}
        <StaggerContainer className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {solutions.map((sol) => (
            <StaggerItem key={sol.slug}>
              <Link
                to={`/solutions/${sol.slug}`}
                className="card-dark block p-8 group relative overflow-hidden h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${sol.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${sol.color} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                      {sol.icon}
                    </div>
                    <span className="section-tag">{sol.tag}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">{sol.title}</h2>
                  <p className="text-sm text-white/50 mb-2 font-medium">{sol.subtitle}</p>
                  <p className="text-sm text-white/40 leading-relaxed mb-6">{sol.description.slice(0, 130)}…</p>
                  <div className="space-y-2 mb-6">
                    {sol.features.slice(0, 3).map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs text-white/45">
                        <div className="w-1 h-1 bg-blue-400 rounded-full shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-white/40 group-hover:text-blue-400 transition-colors">
                    Explore Solution <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  )
}
