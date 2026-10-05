import { $$, clamp, prefersReducedMotion } from '../lib/dom.js'
import { isPhoneOnly, isTabletOnly } from '../lib/breakpoints.js'
import { createFollower, onFrame } from '../lib/frame.js'

// Each element travels from its offset to rest while its target block crosses
// the bottom edge of the viewport (top edge entering → bottom edge entering).
const EFFECTS = [
  { selector: '.framer-1cq7yme', target: '#benefit-scroll', x: 450 },
  { selector: '.framer-1k06g1p', target: '#benefit-scroll', x: 122 },
  { selector: '.framer-3rr9ok', target: '#benefit-scroll', x: -169 },
  { selector: '.framer-1bpyy8', target: '#benefit-scroll', x: -394 },
  { selector: '.framer-1q41e2s', target: '#agenda-scroll', x: 603, tabletX: 962, skipPhone: true },
  { selector: '.framer-8yfyvj', target: '#agenda-scroll-1', y: 200, skipPhone: true },
  { selector: '.framer-1e9b5hv', target: '#agenda-scroll-2', y: 200, skipPhone: true },
  { selector: '.framer-se8kj8', target: '#agenda-scroll-3', y: 200, skipPhone: true },
  { selector: '.framer-15ywfpk', target: '#agenda-scroll-4', y: 200, skipPhone: true },
  { selector: '.framer-16so10n', target: '#agenda-scroll-5', y: 200, skipPhone: true },
]

export function initScrollTransforms() {
  const reduced = prefersReducedMotion()
  const items = []

  for (const effect of EFFECTS) {
    const target = document.querySelector(effect.target)
    for (const el of $$(effect.selector)) {
      if (!target || reduced || (effect.skipPhone && isPhoneOnly(el))) {
        el.style.transform = 'none'
        continue
      }
      const x = isTabletOnly(el) && effect.tabletX != null ? effect.tabletX : effect.x ?? 0
      items.push({ el, target, x, y: effect.y ?? 0, follower: createFollower(1), started: false })
    }
  }
  if (!items.length) return

  onFrame((dt) => {
    const viewport = window.innerHeight
    for (const item of items) {
      if (!item.el.offsetParent) continue
      const rect = item.target.getBoundingClientRect()
      // 1 = fully offset, 0 = at rest
      const remaining = rect.height ? clamp((rect.bottom - viewport) / rect.height, 0, 1) : 0
      if (!item.started) {
        item.follower.jump(remaining)
        item.started = true
      }
      const value = item.follower.step(remaining, dt)
      item.el.style.transform = value === 0 ? 'none' : `translate(${item.x * value}px, ${item.y * value}px)`
    }
  })
}
