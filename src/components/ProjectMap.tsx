import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'

type Props = {
  location: [number, number]
  // Full address, used for the pin's accessible label
  label: string
  // Shown in the card that opens over the pin
  street: string
  suburb: string
  image: string
  className?: string
}

// Navy map pin drawn inline, so no marker image files need to be served
const pin = L.divIcon({
  className: '',
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))">
    <path d="M16 0C7.2 0 0 7 0 15.7 0 27.5 16 42 16 42s16-14.5 16-26.3C32 7 24.8 0 16 0z" fill="#002e71"/>
    <circle cx="16" cy="15.5" r="6" fill="#fff"/>
  </svg>`,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -44],
})

const escape = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

// Card shown over the pin: photo, street, and a Directions link to Google Maps
function cardHtml({ location, street, suburb, image }: Omit<Props, 'label' | 'className'>) {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${location.join(',')}`
  return `
    <img src="${escape(image)}" alt="" class="block h-[130px] w-full object-cover" />
    <div class="flex items-start justify-between gap-3 px-4 pb-4 pt-3">
      <div class="min-w-0 pt-1">
        <p class="m-0 text-[1rem] font-medium leading-snug text-body">${escape(street)}</p>
        <p class="m-0 mt-0.5 text-[0.85rem] text-[#6c757d]">${escape(suburb)}</p>
      </div>
      <a href="${directions}" target="_blank" rel="noopener noreferrer"
         class="group flex shrink-0 flex-col items-center gap-1 !text-dropdown no-underline">
        <span class="flex h-10 w-10 items-center justify-center rounded-full bg-dropdown text-white transition-colors group-hover:bg-accent">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M21.7 11.3l-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4zM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/>
          </svg>
        </span>
        <span class="text-[0.8rem] font-medium">Directions</span>
      </a>
    </div>`
}

function ProjectMap({ location, label, street, suburb, image, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    const satellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19, attribution: 'Imagery &copy; Esri' },
    )

    // Wheel zoom off so scrolling the page never gets trapped by the map
    const map = L.map(ref.current, { scrollWheelZoom: false, layers: [streets] }).setView(location, 16)
    L.control.layers({ Map: streets, Satellite: satellite }, undefined, { position: 'topright' }).addTo(map)
    L.control.scale({ position: 'bottomleft' }).addTo(map)

    const marker = L.marker(location, { icon: pin, title: label, keyboard: true }).addTo(map)
    marker.bindPopup(cardHtml({ location, street, suburb, image }), {
      className: 'project-popup',
      closeButton: false,
      minWidth: 280,
      maxWidth: 280,
      autoPanPadding: [20, 20],
    })

    // Open on hover; stay open while the pointer moves from the pin onto the card.
    // Clicking or tapping the pin still toggles it, which covers touch screens.
    let closeTimer: number | undefined
    const open = () => {
      window.clearTimeout(closeTimer)
      marker.openPopup()
    }
    const closeSoon = () => {
      window.clearTimeout(closeTimer)
      closeTimer = window.setTimeout(() => marker.closePopup(), 250)
    }
    marker.on('mouseover', open)
    marker.on('mouseout', closeSoon)
    marker.on('popupopen', (e) => {
      const el = e.popup.getElement()
      el?.addEventListener('mouseenter', open)
      el?.addEventListener('mouseleave', closeSoon)
    })

    // The container can change size with the layout (e.g. sticky column), so keep tiles in sync
    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(ref.current)

    return () => {
      window.clearTimeout(closeTimer)
      observer.disconnect()
      map.remove()
    }
  }, [location, label, street, suburb, image])

  return <div ref={ref} role="region" aria-label={`Map showing ${label}`} className={`z-0 ${className}`} />
}

export default ProjectMap
