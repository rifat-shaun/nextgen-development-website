import { useEffect } from 'react'

// Adds `is-visible` to every `.reveal` element as it scrolls into view.
// Pass a changing `key` (e.g. the route) to pick up elements on new pages.
export function useReveal(key?: string) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.15 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])
}
