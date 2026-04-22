import { Link } from 'react-router-dom'
import { Mail, Phone, Globe, ExternalLink } from 'lucide-react'

const socials = [
  { label: 'X', href: '#' },
  { label: 'in', href: '#' },
  { label: 'gh', href: '#' },
  { label: 'ig', href: '#' },
]

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ],
  Solutions: [
    { label: 'ERP Systems', path: '/solutions/erp-systems' },
    { label: 'HR Management', path: '/solutions/hr-management' },
    { label: 'School Management', path: '/solutions/school-management' },
    { label: 'Custom Web Apps', path: '/solutions/custom-web-apps' },
  ],
  Services: [
    { label: 'Software Development', path: '/services/software-development' },
    { label: 'Training & Consultancy', path: '/services/training-consultancy' },
    { label: 'Support & Maintenance', path: '/services/support-maintenance' },
  ],
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2025 Kaldilabs. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center
                           text-white/35 border border-white/8 text-xs font-bold
                           hover:text-white/70 hover:border-white/18 hover:bg-white/5
                           transition-all duration-150"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
