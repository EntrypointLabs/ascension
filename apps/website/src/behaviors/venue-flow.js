import { $$, prefersReducedMotion } from '../lib/dom.js'

const PARTICLES = 520
const LANES = 6
const LANE_Y = [0.22, 0.5, 0.78]
// Stream visibility. The original look is brightness 1, particleScale 1, trailFade 0.2.
const STREAM = { brightness: 1.7, particleScale: 1.7, trailFade: 0.12 }
// Each stream takes its two colours from the venue logo it starts at, in lane order:
// left side top to bottom, then right side top to bottom.
const LANE_COLORS = [
  ['240,185,11', '255,224,138'],
  ['247,166,0', '255,255,255'],
  ['80,210,193', '151,252,228'],
  ['0,238,204', '255,255,255'],
  ['76,154,248', '255,255,255'],
  ['96,110,255', '3,209,207'],
]
const PRIMARY_SHARE = 0.65

const spawn = (index) => ({
  lane: index % LANES,
  progress: Math.random(),
  speed: 0.0013 + Math.random() * 0.003,
  offset: (Math.random() - 0.5) * 2,
  size: 0.6 + Math.random() * 1.8,
  tint: Math.random(),
})

function setup(root) {
  const canvas = root.querySelector('canvas')
  const mark = root.querySelector('.venue-flow__mark')
  const context = canvas.getContext('2d')
  const particles = Array.from({ length: PARTICLES }, (_, index) => spawn(index))
  const still = prefersReducedMotion()
  const pointer = { x: 0.5, y: 0.5 }
  let width = 0
  let height = 0
  let frame = 0

  const resize = () => {
    const ratio = Math.min(2, window.devicePixelRatio || 1)
    width = canvas.clientWidth
    height = canvas.clientHeight
    canvas.width = Math.max(1, Math.floor(width * ratio))
    canvas.height = Math.max(1, Math.floor(height * ratio))
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    if (still) draw()
  }

  const draw = () => {
    const box = canvas.getBoundingClientRect()
    const target = mark.getBoundingClientRect()
    const targetX = target.left + target.width / 2 - box.left + (pointer.x - 0.5) * 30
    const targetY = target.top + target.height / 2 - box.top + (pointer.y - 0.5) * 18

    // Erasing a fraction of the previous frame leaves a trail without painting an opaque backdrop.
    context.globalCompositeOperation = 'destination-out'
    context.fillStyle = `rgba(0,0,0,${still ? 1 : STREAM.trailFade})`
    context.fillRect(0, 0, width, height)
    context.globalCompositeOperation = 'source-over'

    for (const particle of particles) {
      if (!still) {
        particle.progress += particle.speed
        if (particle.progress > 1) {
          particle.progress = 0
          particle.offset = (Math.random() - 0.5) * 2
        }
      }
      const fromLeft = particle.lane < LANES / 2
      const startX = fromLeft ? -30 : width + 30
      const startY = height * LANE_Y[particle.lane % 3] + particle.offset * 24
      const bendX = fromLeft ? width * 0.24 : width * 0.76
      const pullX = targetX + (fromLeft ? -width * 0.1 : width * 0.1)
      const pullY = targetY + particle.offset * 16
      const t = particle.progress
      const u = 1 - t
      const x = u * u * u * startX + 3 * u * u * t * bendX + 3 * u * t * t * pullX + t * t * t * targetX
      const y = u * u * u * startY + 3 * u * u * t * startY + 3 * u * t * t * pullY + t * t * t * targetY
      const alpha = Math.min(1, Math.sin(Math.PI * t) * 0.85 * STREAM.brightness)
      const [primary, secondary] = LANE_COLORS[particle.lane]
      context.fillStyle =
        particle.tint < PRIMARY_SHARE
          ? `rgba(${primary},${alpha.toFixed(3)})`
          : `rgba(${secondary},${(alpha * 0.7).toFixed(3)})`
      const size = particle.size * STREAM.particleScale * (1 - t * 0.5)
      context.fillRect(x, y, size, size)
    }
  }

  const loop = () => {
    draw()
    frame = requestAnimationFrame(loop)
  }

  root.addEventListener('pointermove', (event) => {
    const box = root.getBoundingClientRect()
    pointer.x = (event.clientX - box.left) / box.width
    pointer.y = (event.clientY - box.top) / box.height
  })
  new ResizeObserver(resize).observe(canvas)
  resize()

  if (still) return
  new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(frame)
    if (entry.isIntersecting) frame = requestAnimationFrame(loop)
  }).observe(root)
}

export function initVenueFlow() {
  $$('.venue-flow').forEach(setup)
}
