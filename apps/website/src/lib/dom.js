export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector))

export const canHover = () => window.matchMedia('(hover: hover)').matches

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const whenLoaded = (callback) => {
  if (document.readyState === 'complete') callback()
  else window.addEventListener('load', callback, { once: true })
}

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
