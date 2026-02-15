import React from 'react'

export default function LogoHeart({ size = 22, title = 'Coração' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      style={{ display: 'block' }}
    >
      <path
        d="M12 21s-7.2-4.5-9.4-9C.6 7.7 3.1 4.8 6.2 5c1.6.1 3 1.1 3.8 2.4.8-1.3 2.2-2.3 3.8-2.4 3.1-.2 5.6 2.7 3.6 7-2.2 4.5-9.4 9-9.4 9z"
        fill="currentColor"
      />
    </svg>
  )
}
