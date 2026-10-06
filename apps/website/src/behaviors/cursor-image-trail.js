import { animate } from 'motion'
import { $$, canHover, prefersReducedMotion } from '../lib/dom.js'

const IMAGES = [
  '/assets/logos/btc-mono.svg',
  '/assets/logos/xau-mono.svg',
  '/assets/logos/nvda-mono.svg',
]
const SIZE = 150
const MIN_TRAVEL = 62
const VISIBLE_FOR = 300
const POP = { type: 'spring', stiffness: 300, damping: 30 }

function setup(area) {
  area.style.position = 'relative'
  area.style.overflow = 'hidden'
  let last = null
  let next = 0

  area.addEventListener('mousemove', (event) => {
    const rect = area.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    if (last && Math.hypot(x - last.x, y - last.y) <= MIN_TRAVEL) return
    last = { x, y }

    const image = document.createElement('img')
    image.src = IMAGES[next]
    image.alt = ''
    image.draggable = false
    image.style.cssText = `position:absolute;left:${x - SIZE / 2}px;top:${y - SIZE / 2}px;width:${SIZE}px;height:${SIZE}px;object-fit:cover;filter:grayscale(1);pointer-events:none;opacity:0`
    next = (next + 1) % IMAGES.length
    area.append(image)

    animate(image, { opacity: [0, 1], scale: [0.6, 1] }, POP)
    setTimeout(() => {
      animate(image, { opacity: 0, scale: 0.6 }, POP).then(() => image.remove())
    }, VISIBLE_FOR)
  })
  area.addEventListener('mouseleave', () => { last = null })
}

export function initCursorImageTrail() {
  if (!canHover() || prefersReducedMotion()) return
  IMAGES.forEach((src) => { new Image().src = src })
  $$('.framer-1sjajlx-container > div').forEach(setup)
}
