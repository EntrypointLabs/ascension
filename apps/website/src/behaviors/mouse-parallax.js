import { $$, prefersReducedMotion } from '../lib/dom.js'
import { onFrame } from '../lib/frame.js'

const DISTANCE = 20
const SMOOTHING = 0.3

// The floating glass badges drift away from the pointer, measured from the viewport centre.
export function initMouseParallax() {
  if (prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  const hosts = $$('.framer-12w0sqp-container').map((marker) => ({ el: marker.parentElement, x: 0, y: 0, visible: true }))
  if (!hosts.length) return

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const host = hosts.find((item) => item.el === entry.target)
      if (host) host.visible = entry.isIntersecting
    }
  })
  hosts.forEach((host) => observer.observe(host.el))

  const pointer = { x: 0, y: 0 }
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return
    pointer.x = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
    pointer.y = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
  })
  document.documentElement.addEventListener('pointerleave', () => {
    pointer.x = 0
    pointer.y = 0
  })

  onFrame((dt) => {
    const ease = 1 - Math.exp(-dt / SMOOTHING)
    const targetX = -pointer.x * DISTANCE
    const targetY = -pointer.y * DISTANCE
    for (const host of hosts) {
      if (!host.visible) continue
      if (Math.abs(targetX - host.x) < 0.02 && Math.abs(targetY - host.y) < 0.02) continue
      host.x += (targetX - host.x) * ease
      host.y += (targetY - host.y) * ease
      host.el.style.translate = `${host.x.toFixed(2)}px ${host.y.toFixed(2)}px`
    }
  })
}
