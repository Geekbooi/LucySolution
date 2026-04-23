import { useState, useId } from 'react'
import PropTypes from 'prop-types'
import { ArrowRight, CheckCircle } from 'lucide-react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

class ApiError extends Error {}

function validate(email) {
  if (!email.trim()) return 'Email address is required'
  if (!EMAIL_RE.test(email)) return 'Please enter a valid email address'
  return null
}

export default function NewsletterSignup({ onSuccess } = {}) {
  const [email, setEmail]   = useState('')
  const [error, setError]   = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const errorId = useId()

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const msg = validate(email)
    if (msg) { setError(msg); return }

    setStatus('loading')
    setError(null)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new ApiError(data.message || 'Something went wrong. Please try again.')
      setStatus('success')
      onSuccess?.(email)
    } catch (err) {
      // Network / unexpected errors get a generic message; API errors use the server message
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section
        aria-label="Newsletter signup"
        className="rounded-2xl p-8 text-center"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)' }}
      >
        <div role="status" className="flex flex-col items-center gap-3">
          <CheckCircle size={36} className="text-emerald-400" />
          <p className="text-base font-semibold text-white">You&apos;re in!</p>
          <p className="text-sm text-white/55">We&apos;ll be in touch with the latest updates.</p>
        </div>
      </section>
    )
  }

  return (
    <section
      aria-label="Newsletter signup"
      className="rounded-2xl p-8"
      style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(94,106,210,0.06) 50%, rgba(124,58,237,0.08) 100%)',
        border: '1px solid rgba(59,130,246,0.18)',
      }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
        <p className="text-sm text-white/50">
          Get product news, engineering insights, and exclusive offers &mdash; no spam, ever.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        aria-label="Newsletter signup"
        noValidate
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <div className="flex-1 stack-sm">
          <label htmlFor={`${errorId}-email`} className="sr-only">Email address</label>
          <input
            id={`${errorId}-email`}
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="you@company.com"
            aria-label="Email address"
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
            className={`input-newsletter ${error ? 'is-error' : ''}`}
          />
          {error && (
            <p id={errorId} role="alert" className="text-xs text-red-400 mt-1">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label="Subscribe"
          className={`btn-primary whitespace-nowrap flex items-center gap-2 self-start sm:self-auto ${status === 'loading' ? 'btn-loading' : ''}`}
        >
          {status !== 'loading' && <>Subscribe <ArrowRight size={14} /></>}
        </button>
      </form>
    </section>
  )
}

NewsletterSignup.propTypes = {
  onSuccess: PropTypes.func,
}
