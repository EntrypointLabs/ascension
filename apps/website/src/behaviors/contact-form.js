import { $$ } from '../lib/dom.js'

const STATES = {
  default: { variant: 'framer-v-191alnh', name: 'Default' },
  loading: { variant: 'framer-v-1ojgbdg', name: 'Loading' },
  success: { variant: 'framer-v-1nx4pjc', name: 'Success', message: 'Thank you' },
  error: { variant: 'framer-v-1fj2sur', name: 'Error', message: 'Something went wrong' },
}
const RESET_AFTER = 3000

function setup(form) {
  const button = form.querySelector('button[type="submit"]')
  const content = button?.querySelector('.framer-yyra1m')
  const label = content?.firstElementChild
  if (!label) return
  let status = null

  const show = (key) => {
    const state = STATES[key]
    for (const { variant } of Object.values(STATES)) button.classList.toggle(variant, variant === state.variant)
    button.classList.remove('hover')
    button.dataset.framerName = state.name
    button.disabled = key === 'loading'
    status?.remove()
    status = null
    label.hidden = key !== 'default'
    if (key === 'default') return

    status = document.createElement('div')
    if (key === 'loading') {
      status.className = 'form-spinner'
      status.setAttribute('role', 'status')
      status.setAttribute('aria-label', 'Sending')
    } else {
      status.className = `form-status form-status--${key}`
      status.setAttribute('role', key === 'error' ? 'alert' : 'status')
      status.textContent = state.message
    }
    content.append(status)
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (button.disabled) return
    // The endpoint is where enquiries are delivered. Until one is set on the
    // form (data-endpoint), nothing can be sent, so the visitor is told it failed.
    const endpoint = form.dataset.endpoint
    show('loading')
    let delivered = false
    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        })
        delivered = response.ok
      } catch {
        delivered = false
      }
    } else {
      console.warn('Contact form has no data-endpoint, so this enquiry was not sent.')
    }
    show(delivered ? 'success' : 'error')
    if (delivered) form.reset()
    setTimeout(() => show('default'), RESET_AFTER)
  })

  // The site styles empty fields differently from filled ones.
  for (const input of $$('.framer-form-input', form)) {
    const sync = () => input.classList.toggle('framer-form-input-empty', !input.value)
    input.addEventListener('input', sync)
    form.addEventListener('reset', () => setTimeout(sync))
  }
}

export function initContactForm() {
  $$('form.framer-rbjo7a').forEach(setup)
}
