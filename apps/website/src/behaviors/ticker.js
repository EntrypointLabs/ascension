import { $$, prefersReducedMotion } from '../lib/dom.js'
import { onFrame } from '../lib/frame.js'

const VELOCITY = 100
const TICKERS = [
  { selector: '.framer-1mo3up8 > ul', gap: 80, draggable: false },
  { selector: '.framer-1l4yphm > ul', gap: 0, draggable: true },
  { selector: '.framer-1apc8uf > ul', gap: 80, draggable: false },
]

// Markup captured from a running page already contains repeated items. Keep
// one lap: the shortest run of items after which the sequence starts over.
function dropRenderedCopies(track) {
  const items = Array.from(track.children)
  const signature = items.map((item) => `${item.firstElementChild?.className ?? ''}|${item.textContent}`)
  for (let lap = 1; lap < items.length; lap++) {
    if (signature.every((value, i) => i + lap >= items.length || value === signature[i + lap])) {
      items.slice(lap).forEach((item) => item.remove())
      return
    }
  }
}

function setup(track, { gap, draggable }) {
  dropRenderedCopies(track)
  const originals = Array.from(track.children)
  // Captured items may still carry the offsets the running page used to wrap them around.
  originals.forEach((item) => { item.style.transform = 'none' })
  let setWidth = 0
  let offset = 0
  let dragging = false
  let lastPointerX = 0
  let coast = 0

  const fill = () => {
    track.querySelectorAll('[data-ticker-clone]').forEach((clone) => clone.remove())
    setWidth = originals.reduce((sum, item) => sum + item.offsetWidth + gap, 0)
    if (!setWidth) return
    const copies = Math.ceil(track.parentElement.offsetWidth / setWidth) + 1
    for (let i = 0; i < copies; i++) {
      for (const item of originals) {
        const clone = item.cloneNode(true)
        clone.dataset.tickerClone = ''
        clone.setAttribute('aria-hidden', 'true')
        track.append(clone)
      }
    }
  }

  track.style.opacity = '1'
  track.style.transform = 'translateX(0px)'
  fill()
  new ResizeObserver(() => { if (track.offsetParent) fill() }).observe(track.parentElement)

  if (draggable) {
    const host = track.parentElement
    host.style.cursor = 'grab'
    host.addEventListener('pointerdown', (event) => {
      dragging = true
      coast = 0
      lastPointerX = event.clientX
      host.setPointerCapture(event.pointerId)
      host.style.cursor = 'grabbing'
    })
    host.addEventListener('pointermove', (event) => {
      if (!dragging) return
      const dx = event.clientX - lastPointerX
      lastPointerX = event.clientX
      offset -= dx
      coast = -dx * 60
    })
    const release = () => {
      dragging = false
      host.style.cursor = 'grab'
    }
    host.addEventListener('pointerup', release)
    host.addEventListener('pointercancel', release)
  }

  const reduced = prefersReducedMotion()
  let visible = true
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }).observe(track.parentElement)

  onFrame((dt) => {
    if (!visible || !setWidth) return
    if (!dragging) {
      // After a fling, ease back to the cruising speed instead of snapping.
      coast += ((reduced ? 0 : VELOCITY) - coast) * Math.min(1, dt * 4)
      offset += coast * dt
    }
    offset = ((offset % setWidth) + setWidth) % setWidth
    track.style.transform = `translateX(${-offset}px)`
  })
}

export function initTickers() {
  for (const config of TICKERS) $$(config.selector).forEach((track) => setup(track, config))
}
