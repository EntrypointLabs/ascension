import { inView } from 'motion'
import { $$, prefersReducedMotion } from '../lib/dom.js'

const DURATION = 1000
const easeOutCubic = (t) => 1 - (1 - t) ** 3

function setup(el) {
  const [, head, digits, tail] = el.dataset.countTo.match(/^(\D*)(\d+)(.*)$/)
  const target = Number(digits)
  const write = (value) => { el.textContent = `${head}${Math.round(value)}${tail}` }

  if (prefersReducedMotion()) return write(target)

  inView(el, () => {
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
      write(target * easeOutCubic(t))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, { margin: '0px 0px -10% 0px' })
}

export function initNumberCounters() {
  $$('[data-count-to]').forEach(setup)
}
