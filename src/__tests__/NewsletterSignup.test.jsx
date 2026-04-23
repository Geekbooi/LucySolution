/* global global */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewsletterSignup from '../components/NewsletterSignup'

// ── Helpers ──────────────────────────────────────────────────────────────────

function setup(props = {}) {
  const user = userEvent.setup()
  const utils = render(<NewsletterSignup {...props} />)
  const emailInput = () => screen.getByRole('textbox', { name: /email/i })
  const submitBtn  = () => screen.getByRole('button',  { name: /subscribe/i })
  return { user, emailInput, submitBtn, ...utils }
}

afterEach(() => { vi.restoreAllMocks() })

// ── Rendering ─────────────────────────────────────────────────────────────────

describe('NewsletterSignup – rendering', () => {
  it('renders the email input', () => {
    setup()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
  })

  it('renders the subscribe button', () => {
    setup()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  it('renders a heading', () => {
    setup()
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})

// ── Validation ────────────────────────────────────────────────────────────────

describe('NewsletterSignup – validation', () => {
  beforeEach(() => {
    // Isolate from network — validation tests don't care about API responses
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'ok' }),
    })
  })

  it('shows required error when submitting empty', async () => {
    const { user, submitBtn } = setup()
    await user.click(submitBtn())
    expect(await screen.findByRole('alert')).toHaveTextContent(/email.*required/i)
  })

  it('shows invalid-email error for a bad email address', async () => {
    const { user, emailInput, submitBtn } = setup()
    await user.type(emailInput(), 'not-an-email')
    await user.click(submitBtn())
    expect(await screen.findByRole('alert')).toHaveTextContent(/valid email/i)
  })

  it('does NOT show an error for a well-formed email', async () => {
    const { user, emailInput, submitBtn } = setup()
    await user.type(emailInput(), 'test@example.com')
    await user.click(submitBtn())
    // On valid submit, form transitions to success — no alert element present
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument())
  })

  it('clears validation error once the user starts typing again', async () => {
    const { user, emailInput, submitBtn } = setup()
    await user.click(submitBtn())
    await screen.findByRole('alert')
    await user.type(emailInput(), 'a')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

// ── Submit – success path ─────────────────────────────────────────────────────

describe('NewsletterSignup – success flow', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Subscribed!' }),
    })
  })

  it('disables the button while submitting', async () => {
    let resolve
    vi.spyOn(global, 'fetch').mockImplementation(
      () => new Promise(r => { resolve = r })
    )
    const { user, emailInput, submitBtn } = setup()
    await user.type(emailInput(), 'good@email.com')
    // Start click but do not await — fetch is pending
    user.click(submitBtn())
    await vi.waitFor(() => expect(submitBtn()).toBeDisabled())
    // Clean up: resolve the pending fetch so no dangling promises
    await act(async () => {
      resolve({ ok: true, json: async () => ({ message: 'ok' }) })
    })
  })

  it('shows a success message after a successful submission', async () => {
    const { user, emailInput, submitBtn } = setup()
    await user.type(emailInput(), 'good@email.com')
    await user.click(submitBtn())
    expect(await screen.findByRole('status')).toHaveTextContent(/subscribed|thank you|you're in/i)
  })

  it('clears the email field after success', async () => {
    const { user, emailInput, submitBtn } = setup()
    await user.type(emailInput(), 'good@email.com')
    await user.click(submitBtn())
    await screen.findByRole('status')
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('calls onSuccess callback when provided', async () => {
    const onSuccess = vi.fn()
    const { user, emailInput, submitBtn } = setup({ onSuccess })
    await user.type(emailInput(), 'good@email.com')
    await user.click(submitBtn())
    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('good@email.com'))
  })
})

// ── Submit – error path ───────────────────────────────────────────────────────

describe('NewsletterSignup – error flow', () => {
  it('shows an error message when the API returns a non-ok response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Already subscribed' }),
    })
    const { user, emailInput, submitBtn } = setup()
    await user.type(emailInput(), 'exists@email.com')
    await user.click(submitBtn())
    expect(await screen.findByRole('alert')).toHaveTextContent(/already subscribed/i)
  })

  it('shows a generic error message on network failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'))
    const { user, emailInput, submitBtn } = setup()
    await user.type(emailInput(), 'test@email.com')
    await user.click(submitBtn())
    expect(await screen.findByRole('alert')).toHaveTextContent(/something went wrong/i)
  })

  it('re-enables the button after an error so the user can retry', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'))
    const { user, emailInput, submitBtn } = setup()
    await user.type(emailInput(), 'test@email.com')
    await user.click(submitBtn())
    await screen.findByRole('alert')
    expect(submitBtn()).not.toBeDisabled()
  })
})

// ── Accessibility ─────────────────────────────────────────────────────────────

describe('NewsletterSignup – accessibility', () => {
  it('the form has an accessible label', () => {
    setup()
    expect(screen.getByRole('form', { name: /newsletter/i })).toBeInTheDocument()
  })

  it('error message is linked to the input via aria-describedby', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => ({}) })
    const { user, submitBtn, emailInput } = setup()
    await user.click(submitBtn())
    await screen.findByRole('alert')
    const input = emailInput()
    const errorId = input.getAttribute('aria-describedby')
    expect(errorId).toBeTruthy()
    expect(document.getElementById(errorId)).toBeInTheDocument()
  })
})
