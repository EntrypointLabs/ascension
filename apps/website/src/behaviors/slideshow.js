import { animate } from 'motion'
import { $$, clamp, prefersReducedMotion } from '../lib/dom.js'
import { currentBreakpoint } from '../lib/breakpoints.js'

const SPRING = { type: 'spring', stiffness: 300, damping: 40 }
const FLING_PROJECTION = 0.25
const DRAG_SLOP = 4

const SLIDESHOWS = [
  { selector: '.framer-ftczt6-container', gap: 16 },
  { selector: '.framer-e4sdsf-container', gap: 10, loop: true },
  { selector: '.framer-1oiuupi-container', gap: 10, loop: true, fade: true },
]

const mod = (n, m) => ((n % m) + m) % m

function setup(root, config) {
  const track = root.querySelector('[style*="cursor"]')
  if (!track) return
  const slides = Array.from(track.children)
  const count = slides.length
  if (count < 2) return

  const prev = root.querySelector('button[aria-label="Previous slide"]')
  const next = root.querySelector('button[aria-label="Next slide"]')
  const bar = root.querySelector('[style*="scaleX"]')
  const dots = $$('button[aria-label^="Go to slide"]', root)
  // The markup ships with the first dot active, which gives both opacities.
  const dotOpacity = { active: dots[0]?.style.opacity || '1', rest: dots[1]?.style.opacity || '0.2' }

  let index = 0
  let offset = 0
  let step = 0
  let maxOffset = 0
  let maxIndex = count - 1
  let motion = null

  const gap = () => (typeof config.gap === 'number' ? config.gap : config.gap[currentBreakpoint()])

  const render = () => {
    slides.forEach((slide, i) => {
      let x = i * step - offset
      if (config.loop) {
        const span = count * step
        // A slide exactly half a lap away stays on the trailing side.
        x = mod(x + span / 2 - 1, span) - span / 2 + 1
      }
      slide.style.transform = `translateX(${x}px)`
      if (config.fade) slide.style.opacity = clamp(1 - Math.abs(x) / step, 0, 1)
    })
  }

  const measure = () => {
    if (!track.offsetWidth) return
    step = slides[0].getBoundingClientRect().width + gap()
    const content = count * step - gap()
    maxOffset = Math.max(0, content - track.offsetWidth)
    maxIndex = config.loop ? count - 1 : Math.min(count - 1, Math.ceil(maxOffset / step - 0.001))
    offset = targetFor(index)
    render()
    updateControls()
  }

  const targetFor = (i) => (config.loop ? i * step : Math.min(i * step, maxOffset))

  function updateControls() {
    const shown = mod(index, count)
    if (!config.loop) {
      ;[[prev, index <= 0], [next, index >= maxIndex]].forEach(([button, disabled]) => {
        if (!button) return
        button.disabled = disabled
        button.style.opacity = disabled ? '0.35' : '1'
        button.style.cursor = disabled ? 'default' : 'pointer'
      })
    }
    if (bar) {
      const total = config.loop ? count : maxIndex + 1
      animate(bar, { scaleX: (shown + 1) / total }, SPRING)
    }
    dots.forEach((dot, i) => {
      dot.setAttribute('aria-current', String(i === shown))
      dot.style.opacity = i === shown ? dotOpacity.active : dotOpacity.rest
    })
    root.dispatchEvent(new CustomEvent('slidechange', { detail: { index: shown } }))
  }

  const goTo = (target) => {
    index = config.loop ? target : clamp(target, 0, maxIndex)
    motion?.stop()
    const to = targetFor(index)
    if (prefersReducedMotion()) {
      offset = to
      render()
    } else {
      motion = animate(offset, to, { ...SPRING, onUpdate: (value) => { offset = value; render() } })
    }
    updateControls()
  }

  prev?.addEventListener('click', () => goTo(index - 1))
  next?.addEventListener('click', () => goTo(index + 1))
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(index - mod(index, count) + i)))

  let drag = null
  track.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return
    motion?.stop()
    drag = { id: event.pointerId, startX: event.clientX, startOffset: offset, samples: [], moved: false }
  })
  window.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.id) return
    const dx = event.clientX - drag.startX
    if (!drag.moved && Math.abs(dx) < DRAG_SLOP) return
    drag.moved = true
    track.dataset.dragged = ''
    track.style.cursor = 'grabbing'
    drag.samples.push({ x: event.clientX, time: event.timeStamp })
    while (drag.samples.length > 2 && event.timeStamp - drag.samples[0].time > 100) drag.samples.shift()
    offset = drag.startOffset - dx
    if (!config.loop) offset = clamp(offset, -step / 2, maxOffset + step / 2)
    render()
  })
  const release = (event) => {
    if (!drag || event.pointerId !== drag.id) return
    const { samples, moved } = drag
    drag = null
    track.style.cursor = 'grab'
    // Cleared after the click that ends the drag has been swallowed.
    setTimeout(() => delete track.dataset.dragged)
    if (!moved) return
    const first = samples[0]
    const last = samples[samples.length - 1]
    const elapsed = last && first ? (last.time - first.time) / 1000 : 0
    const velocity = elapsed > 0 ? (last.x - first.x) / elapsed : 0
    const projected = offset - velocity * FLING_PROJECTION
    goTo(Math.round(projected / step))
  }
  window.addEventListener('pointerup', release)
  window.addEventListener('pointercancel', release)
  // A drag must not also activate links inside the slide.
  track.addEventListener('click', (event) => {
    if ('dragged' in track.dataset) {
      event.preventDefault()
      event.stopPropagation()
    }
  }, true)
  track.addEventListener('dragstart', (event) => event.preventDefault())

  measure()
  new ResizeObserver(measure).observe(track)
}

export function initSlideshows() {
  for (const config of SLIDESHOWS) $$(config.selector).forEach((root) => setup(root, config))
}
