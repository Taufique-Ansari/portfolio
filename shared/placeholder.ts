// Placeholder image helper standing in for the reference's missing assets.
// Bright raster mock photos (stable per seed) — clearly visible for the gallery
// cards, project covers, portrait and contact art.
export function mock(seed: string, w = 1500, h = 1000): string {
  // Binance P2P CRM
  if (seed === 'binance-crm') {
    return '/assests/images/project/Bp2p/bp2p1.png'
  }
  if (seed === 'binance-crm-2') {
    return '/assests/images/project/Bp2p/bp2p2.png'
  }
  if (seed === 'binance-crm-3') {
    return '/assests/images/project/Bp2p/bp2p3.png'
  }
  if (seed === 'binance-crm-4') {
    return '/assests/images/project/Bp2p/bp2p4.png'
  }

  // Tenant Management System
  if (seed === 'tenant-management') {
    return '/assests/images/project/tenant/tenant1.png'
  }
  if (seed === 'tenant-management-2') {
    return '/assests/images/project/tenant/tenant2.png'
  }
  if (seed === 'tenant-management-3') {
    return '/assests/images/project/tenant/tenant3.png'
  }
  if (seed === 'tenant-management-4') {
    return '/assests/images/project/tenant/tenant4.png'
  }

  // Digital Book Store
  if (seed === 'digital-bookstore') {
    return '/assests/images/project/bookstore/book1.png'
  }
  if (seed === 'digital-bookstore-2') {
    return '/assests/images/project/bookstore/book2.png'
  }
  if (seed === 'digital-bookstore-3') {
    return '/assests/images/project/bookstore/book3.png'
  }
  if (seed === 'digital-bookstore-4') {
    return '/assests/images/project/bookstore/book4.png'
  }

  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`
}
