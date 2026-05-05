self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}

  event.waitUntil(
    self.registration.showNotification(data.title ?? 'Trackfi Alert', {
      body: data.message,
      icon: '/logos/trackfi.svg',
      badge: '/logos/trackfi.svg',
      data: { url: data.url ?? '/alerts' },
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  )
})