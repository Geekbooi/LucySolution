import { Link } from 'react-router-dom'
import { FadeUp } from '../components/Animate'

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'When you contact us through our website, request a demo, or subscribe to our newsletter, we collect personal information such as your name, email address, company name, and any details you voluntarily provide in message fields.',
      'We also collect non-personal technical data automatically — including your IP address, browser type, device type, pages visited, and time spent on the site — to help us improve our service and understand how visitors use our platform.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'We use the information you provide solely to respond to your enquiries, deliver the services you have requested, and — if you have opted in — send you relevant product updates and company news.',
      'Technical data is used in aggregate form for analytics purposes only. We do not build individual profiles from this data, and it is never used for advertising targeting.',
    ],
  },
  {
    title: 'Third-Party Services',
    body: [
      'We use EmailJS to process contact form submissions and newsletter signups. Your data is transmitted securely to EmailJS servers solely for the purpose of delivering messages to our team.',
      'We may use analytics tools (such as aggregated page-view counters) to understand site traffic. These tools do not receive personally identifiable information. We do not sell, rent, or trade your personal data to any third party under any circumstances.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'Contact form submissions and newsletter subscriptions are retained only as long as necessary to fulfil the purpose for which they were collected, or as required by applicable law. You may request deletion of your data at any time by contacting us.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'Depending on your location, you may have rights under applicable privacy law including the right to access, correct, or delete personal data we hold about you; the right to withdraw consent; and the right to lodge a complaint with a supervisory authority.',
      'To exercise any of these rights, please email us at hello@lucysolution.com. We will respond within 30 days.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'Our website uses cookies to maintain basic functionality and improve user experience. For full details on the cookies we use, please see our Cookie Policy.',
    ],
  },
  {
    title: 'Security',
    body: [
      'We implement industry-standard security measures to protect your data in transit and at rest. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date at the top of this page. We encourage you to review this page periodically.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'If you have any questions about this Privacy Policy or how we handle your data, please reach out to us at hello@lucysolution.com.',
    ],
  },
]

export default function Privacy() {
  return (
    <div className="pt-28 pb-24 px-5">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="section-tag mb-4">Legal</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-white/40 text-sm mb-12">Last updated: April 26, 2026</p>
          <p className="text-white/60 leading-relaxed mb-12">
            Lucy Solution (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This policy explains what information we collect, why we collect it, and how we use it when you visit lucysolution.com or interact with our services.
          </p>
        </FadeUp>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.04}>
              <div className="border-t border-white/8 pt-8">
                <h2 className="text-lg font-bold text-white mb-4">{s.title}</h2>
                <div className="space-y-3">
                  {s.body.map((p) => (
                    <p key={p} className="text-white/55 leading-relaxed text-sm">{p}</p>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-white/30">© 2026 Lucy Solution. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <Link to="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
              <span className="w-px h-3 bg-white/10" />
              <Link to="/cookies" className="hover:text-white/70 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
