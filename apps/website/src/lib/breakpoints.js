// Elements that differ per breakpoint are rendered once per breakpoint inside
// `.ssr-variant` wrappers; the `hidden-*` classes say where each copy is hidden.
const HIDDEN_ON = {
  'hidden-72rtr7': 'desktop',
  'hidden-17lbsej': 'tablet',
  'hidden-2bvp91': 'phone',
}
const ALL = ['desktop', 'tablet', 'phone']

export function breakpointsOf(el) {
  const wrapper = el.closest('.ssr-variant')
  if (!wrapper) return ALL
  const hidden = Object.keys(HIDDEN_ON)
    .filter((name) => wrapper.classList.contains(name))
    .map((name) => HIDDEN_ON[name])
  return ALL.filter((name) => !hidden.includes(name))
}

export const isPhoneOnly = (el) => breakpointsOf(el).join() === 'phone'
export const isTabletOnly = (el) => breakpointsOf(el).join() === 'tablet'

export function currentBreakpoint() {
  if (window.innerWidth >= 1200) return 'desktop'
  return window.innerWidth >= 810 ? 'tablet' : 'phone'
}
