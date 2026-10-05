const subscribers = new Set()
let running = false
let last = 0

function loop(now) {
  const dt = Math.min((now - last) / 1000, 1 / 30)
  last = now
  for (const fn of subscribers) fn(dt)
  if (subscribers.size) requestAnimationFrame(loop)
  else running = false
}

export function onFrame(fn) {
  subscribers.add(fn)
  if (!running) {
    running = true
    last = performance.now()
    requestAnimationFrame(loop)
  }
  return () => subscribers.delete(fn)
}

// Critically damped spring chasing a moving target. `settleTime` is roughly
// how long it takes to visually arrive after the target stops.
export function createFollower(initial, settleTime = 0.3) {
  const omega = 9.233 / settleTime
  let value = initial
  let velocity = 0
  return {
    step(target, dt) {
      const steps = Math.max(1, Math.ceil(dt / 0.004))
      const h = dt / steps
      for (let i = 0; i < steps; i++) {
        velocity += (omega * omega * (target - value) - 2 * omega * velocity) * h
        value += velocity * h
      }
      if (Math.abs(target - value) < 0.0005 && Math.abs(velocity) < 0.0005) {
        value = target
        velocity = 0
      }
      return value
    },
    jump(target) {
      value = target
      velocity = 0
    },
  }
}
