import React from 'react'
import Card from './Card'
import LogoHeart from './LogoHeart'
import '../styles/layout.css'

export default function PageLayout({ children, title, subtitle }) {
  return (
    <div className="container">
      <div className="shell">
        <div className="topbar">
          <div className="badge" aria-hidden="true">
            <span style={{ color: 'var(--accent)' }}>
              <LogoHeart size={18} />
            </span>
            <span style={{ fontWeight: 700 }}>Convite</span>
          </div>
        </div>

        <Card>
          <div className="page">
            {(title || subtitle) && (
              <header className="page__header">
                {title && <h1 className="page__title">{title}</h1>}
                {subtitle && <p className="page__subtitle">{subtitle}</p>}
              </header>
            )}
            {children}
          </div>
        </Card>

        <footer className="footer">
          <span aria-hidden="true">✨</span> feito com carinho
        </footer>
      </div>
    </div>
  )
}
