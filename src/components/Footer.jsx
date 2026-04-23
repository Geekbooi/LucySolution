import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, Globe, ArrowRight } from 'lucide-react'

const socials = [
  {
    label: 'X (Twitter)',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.17-6.763-5.91 6.763h-3.308l7.73-8.835L2.56 2.25h6.74l4.56 6.388L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L18.083 19.77z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.006 1.42-.103.249-.129.597-.129.946v5.439h-3.554s.047-8.842 0-9.763h3.554v1.381c.43-.664 1.198-1.608 2.914-1.608 2.131 0 3.727 1.39 3.727 4.384v5.606zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.957.77-1.715 1.958-1.715 1.187 0 1.927.758 1.927 1.715 0 .953-.74 1.715-1.97 1.715zm1.946 11.597H3.392V9.689h3.891v10.763zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
      </svg>
    ),
  },
]

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Pricing',  path: '/pricing' },
    { label: 'Contact',  path: '/contact' },
  ],
  Solutions: [
    { label: 'ERP Systems',       path: '/solutions/erp-systems' },
    { label: 'HR Management',     path: '/solutions/hr-management' },
    { label: 'School Management', path: '/solutions/school-management' },
    { label: 'Custom Web Apps',   path: '/solutions/custom-web-apps' },
  ],
  Services: [
    { label: 'Software Development',   path: '/services/software-development' },
    { label: 'Training & Consultancy', path: '/services/training-consultancy' },
    { label: 'Support & Maintenance',  path: '/services/support-maintenance' },
  ],
}

function NewsletterTeaser() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 900)
  }

  return (
    <div className="rounded-2xl p-7 mb-10"
      style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(94,106,210,0.06) 50%, rgba(124,58,237,0.08) 100%)',
        border: '1px solid rgba(59,130,246,0.18)',
      }}
    >
      {status === 'success' ? (
        <div className="flex items-center gap-3 text-sm text-white/75">
          <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-xs">✓</span>
          <span>You&apos;re in! We&apos;ll be in touch with the latest updates.</span>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className="text-base font-bold text-white mb-0.5">Stay in the loop</h3>
            <p className="text-sm text-white/45">Product news, engineering insights, and exclusive offers.</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 w-full sm:w-auto shrink-0"
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              aria-label="Email address"
              className="input-newsletter flex-1 sm:w-48 text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`btn-primary btn-sm whitespace-nowrap flex items-center gap-1.5 ${status === 'loading' ? 'btn-loading' : ''}`}
            >
              {status !== 'loading' && <>Subscribe <ArrowRight size={13} /></>}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-5 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8l3-3 3 3 3-3 3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12l3-3 3 3 3-3 3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                </svg>
              </div>
              <span className="font-bold text-lg text-white">Kaldilabs</span>
            </Link>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs mb-6">
              Building smart software solutions for modern businesses. Your partner from concept to long-term success.
            </p>
            <div className="space-y-2.5">
              <a href="mailto:hello@kaldilabs.com" className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white/75 transition-colors">
                <Mail size={14} className="text-blue-400 shrink-0" />
                hello@kaldilabs.com
              </a>
              <a href="tel:+15550000000" className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white/75 transition-colors">
                <Phone size={14} className="text-blue-400 shrink-0" />
                +1 (555) 000-0000
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/45">
                <Globe size={14} className="text-blue-400 shrink-0" />
                kaldilabs.com
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/40 hover:text-white/75 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter teaser */}
        <NewsletterTeaser />

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2025 Kaldilabs. All rights reserved.</p>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center
                           text-white/35 border border-white/8
                           hover:text-white/70 hover:border-white/18 hover:bg-white/5
                           transition-all duration-150"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-4 text-xs text-white/30">
            <a href="#" className="hover:text-white/55 transition-colors">Privacy</a>
            <span className="w-px h-3 bg-white/10" />
            <a href="#" className="hover:text-white/55 transition-colors">Terms</a>
            <span className="w-px h-3 bg-white/10" />
            <a href="#" className="hover:text-white/55 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
