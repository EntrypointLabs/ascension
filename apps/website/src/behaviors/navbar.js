import { animate } from 'motion'
import { $$, canHover, prefersReducedMotion } from '../lib/dom.js'

const HIDE = { type: 'spring', bounce: 0.2, duration: 0.4 }
const EXPAND = { type: 'spring', bounce: 0, duration: 0.4 }
const NUDGE = { type: 'spring', bounce: 0.2, duration: 0.4 }
const CLOSED = 'framer-v-8pcz1v'
const OPEN = 'framer-v-14clhh7'
const ICON_REST = 'framer-v-145qnvq'
const ICON_ACTIVE = 'framer-v-kis9bu'
const COLLAPSED_HEIGHT = 1
const BLACK = 'var(--token-2255d844-7158-4eb0-9dc1-01533948a5b9, rgb(0, 0, 0))'

let backdrop = null

function showBackdrop(onDismiss) {
  hideBackdrop()
  backdrop = document.createElement('div')
  backdrop.className = 'framer-kWPFy framer-1g1kk9n'
  backdrop.addEventListener('click', onDismiss)
  ;(document.getElementById('template-overlay') ?? document.body).append(backdrop)
}

function hideBackdrop() {
  backdrop?.remove()
  backdrop = null
}

function setupMenu(bar) {
  const panel = bar.querySelector('.framer-cs73j')
  const icon = bar.querySelector('.framer-NbMzW')
  const nav = bar.querySelector('nav')
  const header = bar.querySelector('.framer-m0zrc3')
  const rule = bar.querySelector('[data-framer-name="Dash Line"]')
  if (!panel || !nav || !header) return () => false
  const [lineA, lineB] = $$('[data-framer-name="Line"]', icon)
  const instant = prefersReducedMotion()
  const restingWidth = panel.style.width
  let open = false
  let motion = null

  const applyState = (isOpen) => {
    panel.classList.toggle(OPEN, isOpen)
    panel.classList.toggle(CLOSED, !isOpen)
    panel.dataset.framerName = isOpen ? 'Open' : 'Close'
  }

  const setOpen = (next) => {
    if (next === open) return
    open = next
    motion?.stop()
    panel.setAttribute('aria-expanded', String(open))
    nav.inert = !open
    icon.classList.toggle(ICON_ACTIVE, open)
    icon.classList.toggle(ICON_REST, !open)
    if (open) showBackdrop(() => setOpen(false))
    else hideBackdrop()

    const rotate = open ? 45 : 0
    if (instant) {
      applyState(open)
      nav.style.height = ''
      lineA.style.transform = `rotate(${rotate}deg)`
      lineB.style.transform = `rotate(${-rotate}deg)`
      return
    }
    animate(lineA, { rotate }, EXPAND)
    animate(lineB, { rotate: -rotate }, EXPAND)

    // The link list keeps its top edge and is revealed from the bottom, so the
    // list itself is what grows; the panel and its corner steps follow it. On
    // narrow screens the closed bar is also narrower, so the width travels too.
    const wasExpanded = panel.classList.contains(OPEN)
    const fromHeight = wasExpanded ? nav.offsetHeight : COLLAPSED_HEIGHT
    const fromWidth = panel.offsetWidth
    const fromHeader = header.offsetWidth
    const fromRule = rule?.offsetWidth ?? 0
    nav.style.height = ''
    panel.style.width = restingWidth
    header.style.width = ''
    if (rule) rule.style.width = ''
    applyState(open)
    const toWidth = panel.offsetWidth
    const toHeader = header.offsetWidth
    const toRule = rule?.offsetWidth ?? 0
    applyState(true)
    const toHeight = open ? nav.offsetHeight : COLLAPSED_HEIGHT

    const render = (t) => {
      nav.style.height = `${fromHeight + (toHeight - fromHeight) * t}px`
      if (fromWidth !== toWidth) panel.style.width = `${fromWidth + (toWidth - fromWidth) * t}px`
      // The header row (and the dashed rule under it) stretches along with the panel.
      header.style.width = `${fromHeader + (toHeader - fromHeader) * t}px`
      // Closed, the dashed rule is a 1px stub; it draws out across the panel as it opens.
      if (rule) rule.style.width = `${fromRule + (toRule - fromRule) * t}px`
    }
    render(0)
    motion = animate(0, 1, {
      ...EXPAND,
      onUpdate: render,
      onComplete: () => {
        applyState(open)
        nav.style.height = ''
        panel.style.width = restingWidth
        header.style.width = ''
        if (rule) rule.style.width = ''
      },
    })
  }

  // The whole white bar toggles the menu, not only the icon and label.
  const toggle = (event) => {
    if (event.target.closest('a')) return
    setOpen(!open)
  }
  panel.setAttribute('role', 'button')
  panel.setAttribute('tabindex', '0')
  panel.setAttribute('aria-label', 'Menu')
  panel.setAttribute('aria-expanded', 'false')
  // Closed, the list is clipped to a sliver but its links would still take keyboard focus.
  nav.inert = true
  panel.style.cursor = 'pointer'
  panel.addEventListener('click', toggle)
  panel.addEventListener('keydown', (event) => {
    if (event.target !== panel || (event.key !== 'Enter' && event.key !== ' ')) return
    event.preventDefault()
    setOpen(!open)
  })
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false) })
  $$('a', nav).forEach((link) => link.addEventListener('click', () => setOpen(false)))

  return () => open
}

// Inactive links gain a leading arrow on hover and the label slides aside for it.
function setupLinkHover(link) {
  const wrap = link.querySelector('.framer-t3hh1w')
  const label = wrap?.querySelector('.framer-1rvygm1')
  if (!label) return
  const arrow = document.createElement('div')
  arrow.className = 'framer-Kk7it framer-6cl7do'
  arrow.style.setProperty('--hn22zp', BLACK)
  let motion = null

  const set = (hovered) => {
    motion?.stop()
    const before = label.getBoundingClientRect().left
    link.classList.toggle('hover', hovered)
    if (hovered) wrap.prepend(arrow)
    else arrow.remove()
    label.style.transform = ''
    const shift = before - label.getBoundingClientRect().left
    if (!shift) return
    // Hold the old position for this frame; the animation only writes from the next one.
    label.style.transform = `translateX(${shift}px)`
    motion = animate(shift, 0, {
      ...NUDGE,
      onUpdate: (x) => { label.style.transform = `translateX(${x}px)` },
      onComplete: () => { label.style.transform = '' },
    })
  }
  link.addEventListener('mouseenter', () => set(true))
  link.addEventListener('mouseleave', () => set(false))
}

export function initNavbar() {
  const bars = $$('.framer-3sfwr9-container')
  if (!bars.length) return
  const isOpen = bars.map(setupMenu)
  if (canHover() && !prefersReducedMotion()) {
    $$('.framer-3sfwr9-container a.framer-Gu83m.framer-v-1b6t7uj').forEach(setupLinkHover)
  }

  // The bar follows scroll direction. A reversal only counts once two scroll
  // steps in a row agree, so a single stray step does not flip it; the very
  // first downward step from load hides it straight away.
  let lastY = window.scrollY
  let direction = 0
  let pending = 1
  let hidden = false
  window.addEventListener('scroll', () => {
    const y = window.scrollY
    const step = Math.sign(y - lastY)
    lastY = y
    if (!step) return
    if (step === direction) {
      pending = 0
      return
    }
    if (step !== pending) {
      pending = step
      return
    }
    direction = step
    pending = 0
    const shouldHide = direction > 0 && !isOpen.some((open) => open())
    if (shouldHide === hidden) return
    hidden = shouldHide
    for (const bar of bars) {
      if (prefersReducedMotion()) bar.style.transform = hidden ? 'translateY(-48px)' : 'none'
      else animate(bar, { y: hidden ? -48 : 0 }, HIDE)
    }
  }, { passive: true })
}
