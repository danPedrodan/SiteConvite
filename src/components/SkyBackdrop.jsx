// src/components/SkyBackdrop.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function rand(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function SkyBackdrop({ active = true }) {
  const stars = useMemo(() => {
    const count = 70
    const arr = []
    for (let i = 1; i <= count; i++) {
      const r1 = rand(i * 12.3)
      const r2 = rand(i * 45.6)
      const r3 = rand(i * 78.9)

      arr.push({
        id: i,
        left: `${r1 * 100}%`,
        top: `${r2 * 100}%`,
        size: 1 + Math.round(r3 * 2),
        delay: r2 * 2.5,
        duration: 2.2 + r1 * 3.2,
        opacity: 0.25 + r3 * 0.55,
      })
    }
    return arr
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* 🌌 véu noturno */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1000px 700px at 60% 20%, rgba(40,60,120,0.22), transparent 60%), ' +
            'radial-gradient(900px 600px at 20% 80%, rgba(120,60,140,0.16), transparent 65%)',
          opacity: 0.9,
        }}
      />

      {/* ✨ estrelas */}
      {stars.map((s) => (
        <motion.span
          key={s.id}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: 999,
            background: 'rgba(255,255,255,1)',
            boxShadow: '0 0 10px rgba(255,255,255,0.35)',
            opacity: s.opacity,
          }}
          animate={{ opacity: [s.opacity * 0.4, s.opacity, s.opacity * 0.5] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: s.delay,
          }}
        />
      ))}

      {/* ☄️ cometa que divide em 2 (azul/vermelho) */}
      <SplitComet active={active} />
    </div>
  )
}
function SplitComet({ active }) {
  const [cycle, setCycle] = useState(0)
  const [split, setSplit] = useState(false)

  const DURATION = 12
  const SPLIT_AT = DURATION * 0.275
  const OVERLAP = DURATION * 0.30


  useEffect(() => {
    if (!active) {
      setSplit(false)
      return
    }

    setSplit(false)

    const tSplit = setTimeout(() => setSplit(true), SPLIT_AT * 1000)

    const tNext = setTimeout(() => {
      setSplit(false)
      setCycle((c) => c + 1)
    }, (DURATION - OVERLAP) * 1000)

    return () => {
      clearTimeout(tSplit)
      clearTimeout(tNext)
    }
  }, [active, cycle])

  if (!active) return null

  return (
    <motion.div
      key={cycle}
      style={{
        position: 'absolute',
        left: '-35%',
        top: '-35%',
        width: '170%',
        height: '170%',
        transform: 'rotate(25deg)',
      }}
      initial={{ opacity: 0, x: '-30%', y: '-20%' }}
      animate={{
        x: ['-30%', '30%'],
        y: ['-20%', '35%'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: DURATION,
        ease: 'easeOut',
      }}
    >
      <AnimatePresence>
        {!split && (
          <motion.div
            key="single"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '22%',
              transform: 'translateX(-50%)',
            }}
          >
            <div
              style={{
                width: '560px',
                height: '3px',
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(200,220,255,0.22) 35%, rgba(255,255,255,0.95) 55%, rgba(200,220,255,0.18) 75%, rgba(255,255,255,0) 100%)',
                borderRadius: 999,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '0px',
                width: '10px',
                height: '10px',
                transform: 'translate(-50%, -3.5px)',
                background: 'white',
                boxShadow: '0 0 18px rgba(255,255,255,0.8)',
                borderRadius: 999,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {split && (
          <motion.div
            key="split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '22%',
              transform: 'translateX(-50%)',
              width: '560px',
              height: '40px',
            }}
          >
            {[
              { color: '#9befff', offset: -14 }, // azul claro
              { color: '#6bff9c', offset: -4 },  // verde
              { color: '#b88cff', offset: 6 },   // roxo
              { color: '#1f4dff', offset: 16 },  // azul escuro
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={{ y: c.offset }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '12px',
                }}
              >
                <div
                  style={{
                    width: '560px',
                    height: '3px',
                    background: `linear-gradient(90deg,
                      rgba(0,0,0,0) 0%,
                      ${c.color}40 30%,
                      ${c.color} 55%,
                      ${c.color}40 75%,
                      rgba(0,0,0,0) 100%)`,
                    borderRadius: 999,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '0px',
                    width: '10px',
                    height: '10px',
                    transform: 'translate(-50%, -3.5px)',
                    background: c.color,
                    boxShadow: `0 0 20px ${c.color}, 0 0 40px ${c.color}88`,
                    borderRadius: 999,
                  }}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.9, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '160px',
                height: '160px',
                transform: 'translate(-50%, -50%)',
                borderRadius: 999,
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(150,200,255,0.2) 40%, rgba(0,0,0,0) 70%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}