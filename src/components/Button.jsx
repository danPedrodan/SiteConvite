import React from 'react'
import '../styles/button.css'

/**
 * Botão reutilizável com estilos e acessibilidade básica.
 * - `variant`: 'primary' | 'ghost'
 */
export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
