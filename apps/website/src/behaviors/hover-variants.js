import { animate } from 'motion'
import { $$, canHover, prefersReducedMotion } from '../lib/dom.js'

const CENTERED = 'translateY(-50%)'
const WHITE = 'var(--token-1530324f-f67d-478c-b9fa-e0c31727e1b8, rgb(255, 255, 255))'
const BLACK = 'var(--token-2255d844-7158-4eb0-9dc1-01533948a5b9, rgb(0, 0, 0))'
const GRADIENT =
  'linear-gradient(134deg, var(--token-8133f35e-43ef-4489-9b59-a949408e0fe8, rgb(241, 139, 178)) 0%, var(--token-711feeef-5006-43e3-ab46-81a81b4b214e, rgb(189, 191, 81)) 141%)'

// On hover each component swaps to a layout where the resting icon slides out
// and a second copy slides in. `moving` lists the parts whose position changes,
// with the transform each one carries at rest and while hovered.
const COMPONENTS = [
  {
    selector: 'button.framer-zmEEP',
    duration: 0.4,
    activeClass: 'framer-v-191alnh',
    moving: [
      { part: '.framer-1c5xont', rest: '', hover: CENTERED },
      { part: '.framer-7kslyj', rest: CENTERED, hover: '' },
    ],
    fill: { part: '.framer-yyra1m', hover: GRADIENT },
  },
  {
    selector: 'a.framer-BWd8D',
    duration: 0.4,
    moving: [
      { part: '.framer-14uhs9l', rest: '', hover: CENTERED },
      { part: '.framer-qcqhn2', rest: '', hover: '' },
    ],
    fadeIn: '.framer-m8q4fv',
  },
  {
    selector: 'a.framer-oeUmd',
    duration: 0.2,
    moving: [
      { part: '.framer-ialnuk', rest: '', hover: CENTERED },
      { part: '.framer-sucssb', rest: CENTERED, hover: '' },
    ],
  },
  {
    selector: 'a.framer-pFFZF.framer-v-qd5qca',
    duration: 0.4,
    moving: [
      { part: '.framer-vwnsvk', rest: '', hover: '' },
      { part: '.framer-wfg3qo', rest: '', hover: '' },
    ],
    reveal: '.framer-1xs8rhz',
    fill: { part: '.framer-1qsltu0', rest: 'rgba(0, 0, 0, 0)', hover: GRADIENT },
    ink: { parts: '.framer-vwnsvk, .framer-wfg3qo', rest: WHITE, hover: BLACK },
  },
]

function setup(root, config) {
  const transition = { type: 'spring', bounce: 0, duration: config.duration }
  const parts = config.moving.flatMap((entry) => $$(entry.part, root).map((el) => ({ el, ...entry })))
  const fade = config.fadeIn ? root.querySelector(config.fadeIn) : null
  const reveal = config.reveal ? root.querySelector(config.reveal) : null
  const fill = config.fill ? root.querySelector(config.fill.part) : null
  const fillRest = config.fill?.rest ?? fill?.style.background ?? ''
  const inked = config.ink ? $$(config.ink.parts, root) : []
  let running = []

  const set = (hovered) => {
    // Components that change state (a submitting form button) only react while in their default state.
    if (hovered && config.activeClass && !root.classList.contains(config.activeClass)) return
    running.forEach((animation) => animation.stop())
    const before = parts.map(({ el }) => el.getBoundingClientRect())

    root.classList.toggle('hover', hovered)
    if (reveal) reveal.hidden = !hovered
    if (fill) fill.style.background = hovered ? config.fill.hover : fillRest
    inked.forEach((el) => el.style.setProperty('--hn22zp', hovered ? config.ink.hover : config.ink.rest))
    parts.forEach((part) => { part.el.style.transform = hovered ? part.hover : part.rest })
    const after = parts.map(({ el }) => el.getBoundingClientRect())

    // Start each part where it was a moment ago and let it travel to its new slot.
    running = parts.map((part, i) => {
      const base = hovered ? part.hover : part.rest
      const dx = before[i].left - after[i].left
      const dy = before[i].top - after[i].top
      if (!dx && !dy) return { stop() {} }
      // Hold the old position for this frame; the animation only writes from the next one.
      part.el.style.transform = `${base} translate(${dx}px, ${dy}px)`.trim()
      return animate(1, 0, {
        ...transition,
        onUpdate: (t) => {
          part.el.style.transform = `${base} translate(${dx * t}px, ${dy * t}px)`.trim()
        },
        onComplete: () => { part.el.style.transform = base },
      })
    })
    if (fade) running.push(animate(fade, { opacity: hovered ? 1 : 0 }, transition))
  }

  root.addEventListener('mouseenter', () => set(true))
  root.addEventListener('mouseleave', () => set(false))
}

export function initHoverVariants() {
  if (!canHover() || prefersReducedMotion()) return
  for (const config of COMPONENTS) $$(config.selector).forEach((root) => setup(root, config))
}
