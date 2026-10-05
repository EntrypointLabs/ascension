import { animate, inView } from 'motion'
import { $$, prefersReducedMotion } from '../lib/dom.js'
import { isPhoneOnly } from '../lib/breakpoints.js'

const logo = (delay) => ({ type: 'spring', bounce: 0.2, duration: 1.2, delay })
const card = (delay) => ({ type: 'spring', bounce: 0.2, duration: 1, delay })
const CARD_ON_PHONE = { type: 'spring', bounce: 0.2, duration: 0.8 }

const EFFECTS = [
  { selector: '.framer-15pey2w', from: { y: 40 }, transition: logo(0), amount: 0.5 },
  { selector: '.framer-urt2ac, .framer-7r6ldx', from: { opacity: 0, y: 40 }, transition: logo(0), amount: 0.5 },
  { selector: '.framer-11kwqkr, .framer-qgokij, .framer-gwnbqx, .framer-4mvfb', from: { opacity: 0, y: 40 }, transition: logo(0.3), amount: 0 },
  { selector: '.framer-c5i1pj, .framer-1ussaiu, .framer-qpcjl5, .framer-rz158a, .framer-1g8ym2o', from: { opacity: 0, y: 40 }, transition: logo(0.5), amount: 0 },
  { selector: '.framer-tx4fep, .framer-yfq8vy, .framer-7dca5x, .framer-14gm8fw, .framer-84ph5o, .framer-1afiunn', from: { opacity: 0, y: 40 }, transition: logo(0.7), amount: 0 },
  { selector: '.framer-ho4zip-container', from: { y: 150 }, transition: card(0), phone: CARD_ON_PHONE, amount: 0 },
  { selector: '.framer-1hjcolu-container', from: { y: 150 }, transition: card(0.2), phone: CARD_ON_PHONE, amount: 0 },
  { selector: '.framer-16oarrh-container', from: { y: 150 }, transition: card(0.4), phone: CARD_ON_PHONE, amount: 0.5 },
]

export function initAppearEffects() {
  const reduced = prefersReducedMotion()
  for (const { selector, from, transition, phone, amount } of EFFECTS) {
    for (const el of $$(selector)) {
      if (reduced) {
        el.style.opacity = ''
        el.style.transform = 'none'
        continue
      }
      const keyframes = {}
      if ('opacity' in from) keyframes.opacity = [from.opacity, 1]
      if ('y' in from) keyframes.y = [from.y, 0]
      // Own the starting pose rather than trusting whatever the markup shipped with.
      if ('opacity' in from) el.style.opacity = from.opacity
      el.style.transform = `translateY(${from.y ?? 0}px)`
      const stop = inView(el, () => {
        animate(el, keyframes, phone && isPhoneOnly(el) ? phone : transition)
        stop()
      }, { amount })
    }
  }
}
