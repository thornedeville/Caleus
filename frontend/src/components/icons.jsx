function iconProps(size) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
}

export function TrendsIcon({ size = 16 }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M3 17 L9 10 L13 14 L21 5" />
      <path d="M15 5 H21 V11" />
    </svg>
  )
}

export function CompareIcon({ size = 16 }) {
  return (
    <svg {...iconProps(size)}>
      <rect x="3" y="6" width="12" height="14" rx="2" />
      <rect x="9" y="4" width="12" height="14" rx="2" />
    </svg>
  )
}

export function CalendarIcon({ size = 16 }) {
  return (
    <svg {...iconProps(size)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10 H21" />
      <path d="M8 3 V7" />
      <path d="M16 3 V7" />
    </svg>
  )
}

export function TrendDownIcon({ size = 16 }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M4 7 L11 14 L14 11 L20 17" />
      <path d="M20 10 V17 H13" />
    </svg>
  )
}

export function BarsIcon({ size = 16 }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M5 19 V11" />
      <path d="M12 19 V5" />
      <path d="M19 19 V14" />
    </svg>
  )
}

export function UploadIcon({ size = 20 }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M12 15 V4" />
      <path d="M7 8 L12 3 L17 8" />
      <path d="M4 16 V19 A2 2 0 0 0 6 21 H18 A2 2 0 0 0 20 19 V16" />
    </svg>
  )
}

// small decorative motif for stat cards, not tied to real per-stat history
export function MiniBarsIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="12" width="4" height="9" rx="1" fill="var(--border)" />
      <rect x="10" y="7" width="4" height="14" rx="1" fill="var(--border)" />
      <rect x="18" y="3" width="4" height="18" rx="1" fill="var(--text)" />
    </svg>
  )
}
