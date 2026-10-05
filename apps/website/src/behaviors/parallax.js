import { $$, prefersReducedMotion } from '../lib/dom.js'
import { onFrame } from '../lib/frame.js'

// Speed is relative to the page: 100 scrolls with it, above 100 moves faster, below slower.
const LAYERS = [
  { selector: '.framer-1g8iru3-container', speed: 85 },
  { selector: '.framer-15f57qd-container', speed: 120 },
  { selector: '.framer-1jcsume-container', speed: 120 },
  { selector: '.framer-1wun0y8-container', speed: 112 },
]

export function initParallax() {
  if (prefersReducedMotion()) return
  const layers = LAYERS.flatMap(({ selector, speed }) =>
    $$(selector).map((el) => {
      el.style.transform = ''
      // Some breakpoints centre the layer with a CSS translateX that must be kept.
      const base = getComputedStyle(el).transform
      return { el, factor: (100 - speed) / 100, base: base === 'none' ? '' : `${base} ` }
    }),
  )

  if (!layers.length) return

  let lastScroll = -1
  onFrame(() => {
    if (window.scrollY === lastScroll) return
    lastScroll = window.scrollY
    for (const { el, factor, base } of layers) {
      el.style.transform = `${base}translateY(${lastScroll * factor}px)`
    }
  })
}
