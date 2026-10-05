import { $$ } from '../lib/dom.js'

const RADIUS = 400
const REFRACTION = -140
const DISPERSION = 8
const EDGE = 0.0601
const MAP_BLUR = 0.07
const OUTPUT_BLUR = 2
const SURFACE = {
  background: 'light-dark(hsl(0 0% 100% / 0.028), hsl(0 0% 100% / 0.0168))',
  boxShadow: [
    'inset 3.57px 3.57px 7.3px -2.52px rgba(255, 255, 255, 0.72)',
    'inset -3.57px -3.57px 7.3px -2.52px rgba(255, 255, 255, 0.28)',
    'inset 0 0 2px 1px rgba(255, 255, 255, 0.24)',
    '0px 8px 24px rgba(17, 17, 26, 0.08)',
    '0px 16px 56px rgba(17, 17, 26, 0.06)',
  ].join(', '),
}

// Refraction relies on an SVG filter inside backdrop-filter, which only Chromium renders.
function supportsSvgBackdrop() {
  const ua = navigator.userAgent
  if ((/Safari/.test(ua) && !/Chrome/.test(ua)) || /Firefox/.test(ua)) return false
  const probe = document.createElement('div')
  probe.style.backdropFilter = 'url(#probe)'
  return probe.style.backdropFilter !== ''
}

// Red encodes horizontal displacement, blue vertical; the grey core leaves the centre undistorted.
function displacementMap(width, height, id) {
  const size = Math.min(width, height)
  const edge = EDGE * size
  const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="r-${id}" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>
      <linearGradient id="b-${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="black"/>
    <rect width="${width}" height="${height}" rx="${RADIUS}" fill="url(#r-${id})"/>
    <rect width="${width}" height="${height}" rx="${RADIUS}" fill="url(#b-${id})" style="mix-blend-mode:screen"/>
    <rect x="${edge}" y="${edge}" width="${width - edge * 2}" height="${height - edge * 2}" rx="${RADIUS}" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(${MAP_BLUR * size}px)"/>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function setup(surface) {
  const filter = surface.querySelector('filter')
  const image = surface.querySelector('feImage')
  if (!filter || !image) return

  const channels = $$('feDisplacementMap', surface)
  ;[-DISPERSION, 0, DISPERSION].forEach((offset, i) => {
    channels[i]?.setAttribute('scale', String(REFRACTION + offset))
    channels[i]?.setAttribute('xChannelSelector', 'R')
    channels[i]?.setAttribute('yChannelSelector', 'B')
  })
  surface.querySelector('feGaussianBlur')?.setAttribute('stdDeviation', String(OUTPUT_BLUR))

  const draw = () => {
    if (!surface.offsetWidth) return
    image.setAttribute('href', displacementMap(surface.offsetWidth, surface.offsetHeight, filter.id))
  }
  draw()
  new ResizeObserver(draw).observe(surface)

  surface.classList.replace('fgs--fallback', 'fgs--svg')
  surface.style.background = SURFACE.background
  surface.style.backdropFilter = `url(#${filter.id}) blur(1.12px) saturate(1.05)`
  surface.style.boxShadow = SURFACE.boxShadow
}

export function initGlassSurfaces() {
  if (!supportsSvgBackdrop()) return
  $$('.fgs').forEach(setup)
}
