import { animate } from 'motion'
import { $$, prefersReducedMotion } from '../lib/dom.js'

const EXPAND = { type: 'spring', bounce: 0, duration: 0.4 }
const WHITE = 'var(--token-1530324f-f67d-478c-b9fa-e0c31727e1b8, rgb(255, 255, 255))'
const BLACK = 'var(--token-2255d844-7158-4eb0-9dc1-01533948a5b9, rgb(0, 0, 0))'
const INK = 'var(--token-3683120b-6b27-44a6-a80e-91baa8533521, rgb(10, 10, 10))'

const GROUPS = [
  {
    item: '.framer-q20OP',
    open: 'framer-v-1c4rcl8',
    closed: 'framer-v-x3yozu',
    iconBox: '.framer-1l9kfy6',
    boxFill: { open: WHITE, closed: 'rgba(0, 0, 0, 0)' },
    iconFill: { open: BLACK, closed: WHITE },
    closedRotation: 45,
  },
  {
    item: '.framer-1SR9g.framer-v-1tlaxfr, .framer-1SR9g.framer-v-v9wloy',
    open: 'framer-v-1tlaxfr',
    closed: 'framer-v-v9wloy',
    iconBox: '.framer-1q8f050',
    boxFill: { open: INK, closed: WHITE },
    iconFill: { open: WHITE, closed: INK },
    closedRotation: -45,
  },
  {
    item: '.framer-1SR9g.framer-v-1y3clgb, .framer-1SR9g.framer-v-bux5rg',
    open: 'framer-v-1y3clgb',
    closed: 'framer-v-bux5rg',
    iconBox: '.framer-1q8f050',
    boxFill: { open: INK, closed: WHITE },
    iconFill: { open: WHITE, closed: INK },
    closedRotation: -45,
    collapsible: true,
  },
]

function setupGroup(group) {
  const items = $$(group.item)
  const instant = prefersReducedMotion()

  const setState = (item, open) => {
    const panel = item.lastElementChild
    const iconBox = item.querySelector(group.iconBox)
    const icon = iconBox?.firstElementChild
    const from = item.offsetHeight

    item.classList.toggle(group.open, open)
    item.classList.toggle(group.closed, !open)
    item.dataset.framerName = item.dataset.framerName.replace(/Open|Close/, open ? 'Open' : 'Close')
    item.setAttribute('aria-expanded', String(open))
    panel.hidden = !open
    if (iconBox) iconBox.style.backgroundColor = open ? group.boxFill.open : group.boxFill.closed
    if (icon) {
      icon.style.setProperty('--hn22zp', open ? group.iconFill.open : group.iconFill.closed)
      if (instant) icon.style.transform = open ? 'none' : `rotate(${group.closedRotation}deg)`
      else animate(icon, { rotate: open ? 0 : group.closedRotation }, EXPAND)
    }
    if (instant) return

    item.style.height = ''
    const to = item.offsetHeight
    // While collapsing, the panel has to stay rendered until the height catches up.
    if (!open) panel.hidden = false
    item.style.overflow = 'hidden'
    animate(from, to, {
      ...EXPAND,
      onUpdate: (height) => { item.style.height = `${height}px` },
      onComplete: () => {
        item.style.height = ''
        item.style.overflow = ''
        panel.hidden = !item.classList.contains(group.open)
      },
    })
  }

  for (const item of items) {
    const siblings = items.filter((other) => other !== item && other.parentElement?.parentElement === item.parentElement?.parentElement)
    item.setAttribute('role', 'button')
    item.setAttribute('tabindex', '0')
    item.setAttribute('aria-expanded', String(item.classList.contains(group.open)))
    const activate = () => {
      const isOpen = item.classList.contains(group.open)
      if (isOpen && !group.collapsible) return
      for (const other of siblings) if (other.classList.contains(group.open)) setState(other, false)
      setState(item, !isOpen)
    }
    item.addEventListener('click', activate)
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        activate()
      }
    })
  }
}

export function initAccordions() {
  GROUPS.forEach(setupGroup)
}
