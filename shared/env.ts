// Device / viewport environment flags, computed once on the client.
export const isMobile = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1
export const isSlowHardware =
  isMobile ||
  (typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 8 : 8) <= 4

export function getViewportSize() {
  const root = document.documentElement
  return {
    width: root.clientWidth || window.innerWidth,
    height: window.innerHeight,
  }
}

export function isMobileViewport() {
  return getViewportSize().width <= 768
}
