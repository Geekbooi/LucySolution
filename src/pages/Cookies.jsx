import { Link } from 'react-router-dom'
import { FadeUp } from '../components/Animate'

const cookieTypes = [
  {
    name: 'Strictly Necessary Cookies',
    required: true,
    desc: 'These cookies are essential for the website to function correctly. They enable core functionality such as page navigation and access to secure areas. The website cannot function properly without these cookies.',
    examples: [
      { name: 'session', purpose: 'Maintains your session state across page requests', duration: 'Session' },
      { name: 'csrf_token', purpose: 'Protects against cross-site request forgery', duration: 'Session' },
    ],
  },
  {
    name: 'Functional Cookies',
    required: false,
    desc: 'These cookies allow us to remember choices you make and provide enhanced, more personalised features. For example, they may remember your preferred language or region.',
    examples: [
      { name: 'ui_preferences', purpose: 'Stores your UI preferences (e.g. scroll position, panel state)', duration: '30 days' },
    ],
  },
  {
    name: 'Analytics Cookies',
    required: false,
    desc: 'We use aggregated analytics to understand how visitors interact with our website — which pages are visited most, how long people spend on each page, and where visitors come from. This data is used only in aggregate form and does not identify individual users.',
    examples: [
      { name: '_analytics_id', purpose: 'Distinguishes unique users for aggregate traffic reporting', duration: '12 months' },
      { name: '_session_id', purpose: 'Groups page views within a single visit into a session', duration: 'Session' },
    ],
  },
  {
    name: 'Third-Party Service Cookies',
    required: false,
    desc: 'Some features of this website use third-party services that may set their own cookies. We use EmailJS to process contact form and newsletter submissions. EmailJS may set functional cookies required for its service to operate correctly.',
    examples: [
      { name: 'emailjs_*', purpose: 'Required for EmailJS to process form submissions', duration: 'Session' },
    ],
  },
]

export default function Cookies() {
  return (
    <div className="pt-28 pb-24 px-5">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="section-tag mb-4">Legal</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Cookie Policy</h1>
          <p className="text-white/40 text-sm mb-12">Last updated: April 26, 2026</p>
          <p className="text-white/60 leading-relaxed mb-4">
            This Cookie Policy explains how Lucy Solution uses cookies and similar tracking technologies on lucysolution.com. By continuing to use our website, you consent to our use of cookies in accordance with this policy.
          </p>
          <p className="text-white/60 leading-relaxed mb-12">
            A cookie is a small text file placed on your device when you visit a website. Cookies help websites remember your preferences and understand how you interact with the site.
          </p>
        </FadeUp>

        <div className="space-y-10 mb-14">
          {cookieTypes.map((type, i) => (
            <FadeUp key={type.name} delay={i * 0.05}>
              <div className="border-t border-white/8 pt-8">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg font-bold text-white">{type.name}</h2>
                  {type.required ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">Always On</span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">Optional</span>
                  )}
                </div>
                <p className="text-white/55 leading-relaxed text-sm mb-5">{type.desc}</p>
                <div className="rounded-xl border border-white/8 overflow-hidden">
                  <div className="grid grid-cols-3 px-4 py-2.5 bg-white/[0.03] border-b border-white/8">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">Cookie Name</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">Purpose</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">Duration</span>
                  </div>
                  {type.examples.map((ex) => (
                    <div key={ex.name} className="grid grid-cols-3 px-4 py-3 border-b border-white/5 last:border-0">
                      <span className="text-xs font-mono text-blue-400/80">{ex.name}</span>
                      <span className="text-xs text-white/45 leading-relaxed pr-4">{ex.purpose}</span>
                      <span className="text-xs text-white/45">{ex.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div className="border-t border-white/8 pt-8 mb-10">
            <h2 className="text-lg font-bold text-white mb-4">Managing Cookies</h2>
            <p className="text-white/55 leading-relaxed text-sm mb-3">
              Most web browsers allow you to control cookies through their settings. You can configure your browser to refuse all cookies or to alert you when a cookie is being sent. However, disabling strictly necessary cookies may prevent some parts of the website from functioning correctly.
            </p>
            <p className="text-white/55 leading-relaxed text-sm">
              To manage cookies in your browser, refer to the help documentation for your browser:
            </p>
            <ul className="mt-3 space-y-1.5">
              {['Chrome — Settings → Privacy and security → Cookies', 'Firefox — Preferences → Privacy & Security', 'Safari — Preferences → Privacy', 'Edge — Settings → Cookies and site permissions'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/45">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="border-t border-white/8 pt-8 mb-16">
            <h2 className="text-lg font-bold text-white mb-4">Contact</h2>
            <p className="text-white/55 leading-relaxed text-sm">
              If you have any questions about our use of cookies, please contact us at{' '}
              <a href="mailto:hello@lucysolution.com" className="text-blue-400 hover:text-blue-300 transition-colors">hello@lucysolution.com</a>.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.5}>
          <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-white/30">© 2026 Lucy Solution. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
              <span className="w-px h-3 bg-white/10" />
              <Link to="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
