import { animate } from 'motion'
import { $$, canHover, prefersReducedMotion } from '../lib/dom.js'

const INK = 'var(--token-3683120b-6b27-44a6-a80e-91baa8533521, rgb(10, 10, 10))'
const VARIANTS = [
  { container: 'framer-z49nlq-container', stagger: 0.015, duration: 0.4, hoverColor: INK },
  { container: 'framer-3pejm0-container', stagger: 0.01, duration: 0.4 },
  { container: 'framer-h06ufz-container', stagger: 0.015, duration: 0.2 },
  { container: 'framer-85xw73-container', stagger: 0.015, duration: 0.4 },
]
const LINK = 'a, button, [data-framer-component-type="Link"]'
const SR_ONLY = 'position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap'

const outermostLink = (el) => {
  let found = null
  let cursor = el
  for (let depth = 0; cursor && depth < 12; depth++) {
    const link = cursor.closest(LINK)
    if (!link) break
    found = link
    cursor = link.parentElement
  }
  return found ?? el
}

function setup(label, { stagger, duration, hoverColor: fill }) {
  const text = label.textContent
  const color = label.style.color
  // Buttons that fill with the gradient on hover switch the label to dark ink.
  const hoverColor = fill ?? color
  const pairs = []

  label.textContent = ''
  const srOnly = document.createElement('span')
  srOnly.style.cssText = SR_ONLY
  srOnly.textContent = text
  const visual = document.createElement('span')
  visual.setAttribute('aria-hidden', 'true')

  for (const chunk of text.split(/(\s+)/)) {
    if (!chunk) continue
    if (/^\s+$/.test(chunk)) {
      const space = document.createElement('span')
      space.textContent = chunk
      visual.append(space)
      continue
    }
    const word = document.createElement('span')
    word.style.cssText = 'display:inline-block;white-space:nowrap'
    for (const char of Array.from(chunk)) {
      const slot = document.createElement('span')
      slot.style.cssText = 'position:relative;display:inline-block;overflow:hidden;vertical-align:top'
      const rest = document.createElement('span')
      rest.style.cssText = `display:inline-block;color:${color}`
      rest.textContent = char
      const hover = document.createElement('span')
      hover.style.cssText = `position:absolute;left:0;top:0;display:inline-block;color:${hoverColor};transform:translateY(100%)`
      hover.textContent = char
      slot.append(rest, hover)
      word.append(slot)
      pairs.push([rest, hover])
    }
    visual.append(word)
  }
  label.append(srOnly, visual)

  const trigger = outermostLink(label)
  if (trigger !== label) label.style.pointerEvents = 'none'

  const run = (active) => {
    pairs.forEach(([rest, hover], i) => {
      const transition = { type: 'spring', bounce: 0, duration, delay: i * stagger }
      animate(rest, { y: active ? '-100%' : '0%' }, transition)
      animate(hover, { y: active ? '0%' : '100%' }, transition)
    })
  }
  trigger.addEventListener('mouseenter', () => run(true))
  trigger.addEventListener('mouseleave', () => run(false))
  trigger.addEventListener('focusin', () => run(true))
  trigger.addEventListener('focusout', () => run(false))
}

export function initHoverStaggerText() {
  if (!canHover() || prefersReducedMotion()) return
  for (const variant of VARIANTS) {
    $$(`.${variant.container} > span`).forEach((label) => setup(label, variant))
  }
}
