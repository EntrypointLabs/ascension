import { animate } from 'motion'
import { $$, prefersReducedMotion } from '../lib/dom.js'

const STAGGER = 0.06
const COVER = { duration: 0.5, ease: [0.81, -0.02, 0.55, 0.51] }
const UNCOVER = { duration: 0.5, ease: [0.28, 0.25, 0.18, 0.98] }

function splitIntoLines(heading, text) {
  heading.textContent = ''
  const words = text.split(/\s+/).filter(Boolean).map((word) => {
    const span = document.createElement('span')
    span.textContent = word
    span.style.display = 'inline-block'
    return span
  })
  words.forEach((word, i) => heading.append(word, i < words.length - 1 ? ' ' : ''))

  const rows = []
  for (const word of words) {
    const row = rows[rows.length - 1]
    if (row && Math.abs(row.top - word.offsetTop) < 2) row.words.push(word.textContent)
    else rows.push({ top: word.offsetTop, words: [word.textContent] })
  }

  heading.textContent = ''
  return rows.map((row) => {
    const wrapper = document.createElement('div')
    wrapper.style.cssText = 'display:block;position:relative;overflow:hidden;width:fit-content'
    const line = document.createElement('div')
    line.textContent = row.words.join(' ')
    const blind = document.createElement('div')
    blind.style.cssText = 'position:absolute;inset:0;background:currentColor;transform-origin:right center'
    wrapper.append(line, blind)
    heading.append(wrapper)
    return { line, blind }
  })
}

function setup(heading) {
  const text = heading.textContent
  heading.setAttribute('aria-label', text)
  if (prefersReducedMotion()) return

  let lines = []
  let played = false
  let running = []
  let width = 0

  const stop = () => {
    running.forEach((animation) => animation.stop())
    running = []
  }

  const reset = () => {
    stop()
    played = false
    for (const { line, blind } of lines) {
      line.style.opacity = '0'
      blind.style.transform = 'translateX(-100%)'
    }
  }

  const finish = () => {
    for (const { line, blind } of lines) {
      line.style.opacity = '1'
      blind.style.transform = 'translateX(101%)'
    }
  }

  const play = () => {
    stop()
    played = true
    lines.forEach(({ line, blind }, i) => {
      const cover = animate(0, 1, {
        ...COVER,
        delay: i * STAGGER,
        onUpdate: (t) => { blind.style.transform = `translateX(${-100 * (1 - t)}%)` },
        onComplete: () => {
          line.style.opacity = '1'
          running.push(animate(0, 1, {
            ...UNCOVER,
            delay: i * STAGGER,
            onUpdate: (t) => { blind.style.transform = `translateX(${101 * t}%)` },
          }))
        },
      })
      running.push(cover)
    })
  }

  const layout = () => {
    if (!heading.offsetWidth || heading.offsetWidth === width) return
    width = heading.offsetWidth
    stop()
    lines = splitIntoLines(heading, text)
    if (played) finish()
    else reset()
  }

  const check = () => {
    if (!lines.length) return
    const rect = heading.getBoundingClientRect()
    const viewport = window.innerHeight
    if (rect.top > viewport) {
      if (played) reset()
    } else if (!played && rect.top + rect.height / 2 <= viewport && rect.bottom >= 0) {
      play()
    }
  }

  layout()
  document.fonts?.ready.then(() => { width = 0; layout(); check() })
  new ResizeObserver(() => { layout(); check() }).observe(heading.parentElement)
  window.addEventListener('scroll', check, { passive: true })
  check()
}

export function initBlindsTextReveal() {
  $$('.blinds-text-reveal > *').forEach(setup)
}
