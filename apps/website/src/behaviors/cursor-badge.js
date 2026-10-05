import { $$, canHover } from '../lib/dom.js'

const TARGETS = 'a.framer-pFFZF.framer-v-qd5qca'

export function initCursorBadge() {
  if (!canHover()) return
  const targets = $$(TARGETS)
  if (!targets.length) return

  const badge = document.createElement('div')
  badge.className = 'cursor-badge'
  badge.setAttribute('aria-hidden', 'true')
  const icon = document.createElement('div')
  icon.className = 'cursor-badge__icon'
  badge.append(icon)
  document.body.append(badge)

  const follow = (event) => {
    badge.style.transform = `translate(-50%, -50%) translate(${event.clientX}px, ${event.clientY}px)`
  }
  for (const target of targets) {
    target.addEventListener('mouseenter', (event) => {
      follow(event)
      badge.dataset.visible = ''
    })
    target.addEventListener('mousemove', follow)
    target.addEventListener('mouseleave', () => delete badge.dataset.visible)
  }
}
