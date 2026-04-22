import { useState } from 'react'
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, Clock, MessageSquare } from 'lucide-react'
import { FadeUp, SlideLeft, SlideRight, StaggerContainer, StaggerItem } from '../components/Animate'

const services = [
  'Software Development',
  'Training & Consultancy',
  'Support & Maintenance',
  'ERP Systems',
  'HR Management',
  'School Management',
  'Project Management',
  'Custom Web Apps',
  'Other',
]

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@kaldilabs.com', href: 'mailto:hello@kaldilabs.com' },
  { icon: Phone, label: 'Phone', value: '+251 911 234 567', href: 'tel:+251911234567' },
  { icon: MapPin, label: 'Location', value: 'Addis Ababa, Ethiopia', href: null },
]

const faqs = [
  { q: 'How quickly do you respond?', a: 'We reply to all inquiries within 24 hours on business days.' },
  { q: 'Do you work with international clients?', a: 'Yes, we work with businesses across Africa and globally.' },
  { q: 'Can we schedule a call first?', a: 'Absolutely — mention it in the message and we\'ll send a calendar link.' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1800)
  }

  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative px-5 pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-60" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto">
          <FadeUp className="max-w-2xl">
            <div className="section-tag mb-5">Contact Us</div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight gradient-text mb-5">
              Let's Build Something Great
            </h1>
            <p className="text-xl text-white/55 leading-relaxed">
              Tell us about your project and we'll get back to you within 24 hours. No commitment required.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-10 px-5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-8">

          {/* Form */}
          <SlideLeft className="lg:col-span-3">
            <div className="card-dark p-8 md:p-10 h-full">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[480px] text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mb-6">
                    <CheckCircle size={36} className="text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-3">Message Sent!</h2>
                  <p className="text-white/50 max-w-sm leading-relaxed mb-8">
                    Thanks for reaching out. We'll review your request and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', company: '', service: '', message: '' }) }}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-black text-white mb-2">Send Us a Message</h2>
                    <p className="text-white/45 text-sm">Fill in the details below and we'll be in touch.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-widest">
                          Full Name <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25
                                     focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-widest">
                          Email <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="john@company.com"
                          className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25
                                     focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-widest">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25
                                     focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-widest">
                          Service Interest
                        </label>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white/70
                                     focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all duration-200
                                     appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#111]">Select a service...</option>
                          {services.map(s => (
                            <option key={s} value={s} className="bg-[#111]">{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-widest">
                        Message <span className="text-blue-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25
                                   focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all duration-200 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>Send Message <ArrowRight size={15} /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </SlideLeft>

          {/* Sidebar */}
          <SlideRight className="lg:col-span-2 flex flex-col gap-5">
            {/* Contact details */}
            <div className="card-dark p-7">
              <h3 className="font-bold text-white mb-5">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xs text-white/35 mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} className="text-sm text-white/75 hover:text-white transition-colors">{value}</a>
                      ) : (
                        <span className="text-sm text-white/75">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="card-dark p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Clock size={16} className="text-emerald-400" />
                </div>
                <h3 className="font-bold text-white">Response Time</h3>
              </div>
              <div className="space-y-3">
                {[
                  ['Email inquiries', '< 24 hours'],
                  ['Project estimates', '2–3 business days'],
                  ['Support tickets', '< 4 hours'],
                ].map(([label, time]) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-xs text-white/45">{label}</span>
                    <span className="text-xs font-semibold text-emerald-400">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="card-dark p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <MessageSquare size={16} className="text-violet-400" />
                </div>
                <h3 className="font-bold text-white">Quick Answers</h3>
              </div>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.q}>
                    <div className="text-xs font-semibold text-white/70 mb-1">{faq.q}</div>
                    <div className="text-xs text-white/40 leading-relaxed">{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </SlideRight>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-10 px-5">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] h-56 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={28} className="text-white/20 mx-auto mb-3" />
                <div className="text-sm text-white/30">Addis Ababa, Ethiopia</div>
                <div className="text-xs text-white/20 mt-1">Map integration available upon request</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
