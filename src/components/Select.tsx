import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { FiCheck, FiChevronDown } from 'react-icons/fi'

export type OptionGroup = { label: string; options: string[] }

type Props = {
  id: string
  value: string
  onChange: (value: string) => void
  groups: OptionGroup[]
  placeholder?: string
  className?: string
  invalid?: boolean
  describedBy?: string
}

// Custom listbox styled to match the site, replacing the native <select>
function Select({
  id,
  value,
  onChange,
  groups,
  placeholder = 'Select an option',
  className = '',
  invalid = false,
  describedBy,
}: Props) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listId = useId()

  const options = groups.flatMap((g) => g.options)

  const openList = () => {
    setActive(Math.max(options.indexOf(value), 0))
    setOpen(true)
  }

  const choose = (option: string) => {
    onChange(option)
    setOpen(false)
  }

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Keep the highlighted option in view
  useEffect(() => {
    if (open && active >= 0) {
      listRef.current
        ?.querySelector(`[data-index="${active}"]`)
        ?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, active])

  const onKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        openList()
      }
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActive((i) => Math.min(i + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActive((i) => Math.max(i - 1, 0))
        break
      case 'Home':
        e.preventDefault()
        setActive(0)
        break
      case 'End':
        e.preventDefault()
        setActive(options.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (active >= 0) choose(options[active])
        break
      case 'Escape':
      case 'Tab':
        setOpen(false)
        break
      default:
        // Type-ahead: jump to the next option starting with the typed letter
        if (e.key.length === 1) {
          const key = e.key.toLowerCase()
          const start = active + 1
          const next = [...options.slice(start), ...options.slice(0, start)].find((o) =>
            o.toLowerCase().startsWith(key),
          )
          if (next) setActive(options.indexOf(next))
        }
    }
  }

  let index = -1

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${className} flex items-center justify-between text-left ${
          open
            ? 'border-brand shadow-[0_0_0_0.25rem_rgba(0,76,145,0.15)]'
            : invalid
              ? '!border-[#dc3545] shadow-[0_0_0_0.25rem_rgba(220,53,69,0.15)]'
              : ''
        }`}
      >
        <span className={value ? 'text-body' : 'text-[#9aa0a6]'}>{value || placeholder}</span>
        <FiChevronDown
          className={`ml-3 shrink-0 text-[#6c757d] transition-transform duration-200 ${open ? 'rotate-180 text-brand' : ''}`}
        />
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={id}
        className={`absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 max-h-72 origin-top overflow-y-auto rounded-xl border border-black/[0.06] bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-[opacity,transform] duration-150 ${
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        }`}
      >
        {groups.map((group) => (
          <li key={group.label} role="presentation">
            <div className="px-3 pb-1 pt-2 text-[0.7rem] font-semibold uppercase tracking-wider text-[#9aa0a6]">
              {group.label}
            </div>
            <ul role="group" aria-label={group.label}>
              {group.options.map((option) => {
                index += 1
                const i = index
                const selected = option === value
                return (
                  <li
                    key={option}
                    id={`${listId}-${i}`}
                    data-index={i}
                    role="option"
                    aria-selected={selected}
                    onPointerMove={() => setActive(i)}
                    onClick={() => choose(option)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-[0.95rem] transition-colors ${
                      i === active ? 'bg-brand/[0.07] text-brand' : 'text-body'
                    } ${selected ? 'font-medium text-brand' : ''}`}
                  >
                    {option}
                    {selected && <FiCheck className="ml-3 shrink-0 text-accent" />}
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select
