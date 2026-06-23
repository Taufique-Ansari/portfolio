'use client'

import { useEffect } from 'react'

// Boots the imperative GSAP/Lenis animation engine once on mount. It renders no markup
// of its own — it drives the server-rendered DOM by id/class. The orchestrator lives in
// engine/ and fans out to each feature's animation module.
export default function PortfolioEngine() {
  useEffect(() => {
    // The engine guards itself against double-invocation (StrictMode / HMR).
    import('@/engine').then((m) => m.default())
  }, [])

  return null
}
