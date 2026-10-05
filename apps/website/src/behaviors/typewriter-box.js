import { animate, inView } from 'motion'
import { $$, clamp, prefersReducedMotion, whenLoaded } from '../lib/dom.js'

const REVEAL = { type: 'spring', bounce: 0, duration: 1 }
const FADE_WINDOW = 0.2
const APPEAR_ON_LOAD = ['framer-1pyr24-container', 'framer-1rppaum-container']

const px = (value) => parseFloat(value) || 0

// Glyphs with tight line-height or negative tracking overflow their line box;
// the box grows by that overflow and pulls it back with negative margins so
// the layout position of the text does not move.
function measureInkOverflow(textEl) {
  const text = textEl.textContent ?? ''
  const lineHeight = textEl.offsetHeight
  const ctx = document.createElement('canvas').getContext('2d')
  if (!text || !ctx || !lineHeight) return { top: 0, right: 0, bottom: 0, left: 0 }

  const style = getComputedStyle(textEl)
  ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  const whole = ctx.measureText(text)
  const first = ctx.measureText(text[0])
  const last = ctx.measureText(text[text.length - 1])
  const tightening = Math.max(0, -px(style.letterSpacing))
  const ascent = whole.fontBoundingBoxAscent || 0
  const descent = whole.fontBoundingBoxDescent || 0
  const baseline = (lineHeight - (ascent + descent)) / 2 + ascent

  return {
    left: Math.ceil(Math.max(0, first.actualBoundingBoxLeft || 0)),
    right: Math.ceil(Math.max(0, (last.actualBoundingBoxRight || 0) - last.width + tightening)),
    top: Math.ceil(Math.max(0, (whole.actualBoundingBoxAscent || 0) - baseline)),
    bottom: Math.ceil(Math.max(0, (whole.actualBoundingBoxDescent || 0) - (lineHeight - baseline))),
  }
}

function setup(box) {
  const textEl = box.firstElementChild
  const chars = Array.from(textEl.children)
  const basePadding = ['Top', 'Right', 'Bottom', 'Left'].map((side) => px(box.style[`padding${side}`]))
  let thresholds = []
  let progress = 0

  const render = () => {
    box.style.clipPath = `inset(0 ${clamp((1 - progress) * 100, 0, 100)}% 0 0)`
    chars.forEach((char, i) => {
      char.style.opacity = clamp((progress - thresholds[i]) / FADE_WINDOW, 0, 1)
    })
  }

  const measure = () => {
    if (!box.offsetWidth) return
    const ink = measureInkOverflow(textEl)
    ;['top', 'right', 'bottom', 'left'].forEach((side, i) => {
      const Side = side[0].toUpperCase() + side.slice(1)
      box.style[`padding${Side}`] = `${basePadding[i] + ink[side]}px`
      box.style[`margin${Side}`] = `${-ink[side]}px`
    })
    const span = box.offsetWidth
    thresholds = chars.map((char) =>
      clamp((char.offsetLeft + char.offsetWidth) / span, 0, 1 - FADE_WINDOW),
    )
    render()
  }

  measure()
  new ResizeObserver(measure).observe(box)
  document.fonts?.ready.then(measure)

  const play = () => {
    if (progress > 0) return
    if (prefersReducedMotion()) {
      progress = 1
      return render()
    }
    animate(0, 1, { ...REVEAL, onUpdate: (value) => { progress = value; render() } })
  }

  const container = box.closest('[class*="-container"]')
  if (APPEAR_ON_LOAD.some((name) => container?.classList.contains(name))) {
    whenLoaded(() => inView(box.parentElement, play))
  } else {
    inView(box.parentElement, play)
  }
}

export function initTypewriterBoxes() {
  $$('[aria-label] > span[aria-hidden="true"][style*="clip-path"]').forEach(setup)
}
