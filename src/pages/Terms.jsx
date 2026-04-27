import { Link } from 'react-router-dom'
import { FadeUp } from '../components/Animate'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By accessing or using the Lucy Solution website (lucysolution.com) or any services provided by Lucy Solution, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.',
    ],
  },
  {
    title: '2. Description of Services',
    body: [
      'Lucy Solution provides custom software development, AI & automation, cloud & DevOps, consulting, data & analytics, and support & maintenance services to businesses. Services are delivered under separate written agreements or statements of work negotiated between Lucy Solution and the client.',
      'The information and content on this website are provided for general informational purposes and do not constitute a binding offer of services.',
    ],
  },
  {
    title: '3. Intellectual Property',
    body: [
      'All content on this website — including text, graphics, logos, and code — is the property of Lucy Solution and is protected by applicable intellectual property law. You may not reproduce, distribute, or create derivative works from any content without our express written permission.',
      'Software, systems, and deliverables produced under a client engagement are governed by the intellectual property terms in the applicable service agreement. Unless otherwise agreed in writing, clients receive full ownership of custom code delivered for their project upon final payment.',
    ],
  },
  {
    title: '4. User Conduct',
    body: [
      'You agree not to use this website to transmit any unlawful, harmful, or objectionable content; attempt to gain unauthorised access to any part of our systems; or interfere with the proper functioning of the website.',
      'We reserve the right to terminate or restrict access to the website for any user who violates these terms.',
    ],
  },
  {
    title: '5. Disclaimer of Warranties',
    body: [
      'This website and its content are provided "as is" without warranties of any kind, express or implied. We make no representations about the accuracy, completeness, or suitability of the information on this site for any particular purpose.',
      'Lucy Solution does not warrant that the website will be available at all times or free from errors or viruses.',
    ],
  },
  {
    title: '6. Limitation of Liability',
    body: [
      'To the fullest extent permitted by applicable law, Lucy Solution shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or its content.',
      'Lucy Solution\'s total liability for any claim arising out of or relating to these Terms shall not exceed $100 USD.',
    ],
  },
  {
    title: '7. Third-Party Links',
    body: [
      'This website may contain links to third-party websites. These links are provided for convenience only. Lucy Solution has no control over, and assumes no responsibility for, the content or practices of any third-party sites.',
    ],
  },
  {
    title: '8. Privacy',
    body: [
      'Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data practices.',
    ],
  },
  {
    title: '9. Changes to These Terms',
    body: [
      'We may update these Terms of Service at any time. Continued use of the website after any changes constitutes your acceptance of the new terms. We will update the "Last Updated" date at the top of this page when changes are made.',
    ],
  },
  {
    title: '10. Governing Law',
    body: [
      'These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising from these Terms shall be resolved through good-faith negotiation, and if unresolved, through binding arbitration.',
    ],
  },
  {
    title: '11. Contact',
    body: [
      'If you have questions about these Terms of Service, please contact us at hello@lucysolution.com.',
    ],
  },
]

export default function Terms() {
  return (
    <div className="pt-28 pb-24 px-5">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="section-tag mb-4">Legal</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Terms of Service</h1>
          <p className="text-white/40 text-sm mb-12">Last updated: April 26, 2026</p>
          <p className="text-white/60 leading-relaxed mb-12">
            Please read these Terms of Service carefully before using the Lucy Solution website or engaging our services. These terms govern your relationship with Lucy Solution and your use of our website.
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

        <FadeUp delay={0.5}>
          <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-white/30">© 2026 Lucy Solution. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
              <span className="w-px h-3 bg-white/10" />
              <Link to="/cookies" className="hover:text-white/70 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
