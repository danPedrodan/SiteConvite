// src/pages/Home.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageLayout from '../components/PageLayout'
import Button from '../components/Button'
import '../styles/home.css'

function RedString({ active }) {
  return (
    <motion.div
      className="redStringWrap"
      aria-hidden="true"
      initial={{ opacity: 0, y: 6 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <svg className="redStringSvg" viewBox="0 0 1000 260" preserveAspectRatio="none">
        {/* brilho */}
        <motion.path
          d="M -40 170 C 80 70, 200 230, 340 130 C 470 40, 600 240, 740 120 C 860 20, 980 210, 1080 110"
          className="redStringGlow"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 0.26 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        />

        {/* fio principal */}
        <motion.path
          d="M -40 170 C 80 70, 200 230, 340 130 C 470 40, 600 240, 740 120 C 860 20, 980 210, 1080 110"
          className="redStringMain"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: [0.55, 0.85, 0.55] }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration: 3.2, ease: 'easeOut' },
            opacity: { duration: 15.99, repeat: active ? Infinity : 0, ease: 'easeInOut' },
          }}
        />

        {/* “vida” passando no fio (pontilhado claro) */}
        <motion.path
          d="M -40 170 C 80 70, 200 230, 340 130 C 470 40, 600 240, 740 120 C 860 20, 980 210, 1080 110"
          className="redStringSpark"
          initial={{ strokeDashoffset: 0, opacity: 0 }}
          animate={
            active
              ? { strokeDashoffset: -240, opacity: [0.12, 0.28, 0.12] }
              : { strokeDashoffset: 0, opacity: 0 }
          }
          transition={{ duration: 18, repeat: active ? Infinity : 0, ease: 'linear' }}
        />
      </svg>
    </motion.div>
  )
}

export default function Home({ onStartMusic, isMusicOn }) {
  const navigate = useNavigate()
  const [showGate, setShowGate] = useState(true)

  // ✅ se a música já estiver ligada (ex: voltou pra home), não mostra o popup de novo
  useEffect(() => {
    if (isMusicOn) setShowGate(false)
  }, [isMusicOn])

  function handleStart() {
    onStartMusic?.()
    setShowGate(false)
  }

  return (
    <PageLayout>
      <div className="homeHero">
        {/* ✅ só começa depois que o popup sumir */}
        <RedString active={!showGate} />

        {/* ✅ POPUP: toque para liberar a música */}
        <AnimatePresence>
          {showGate && (
            <motion.div
              className="tapGate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={handleStart}
              onTouchStart={handleStart}
              role="button"
              tabIndex={0}
              aria-label="Toque para iniciar a música"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleStart()
              }}
            >
              <motion.div
                className="tapGateCard"
                initial={{ scale: 0.96, y: 6 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <p className="tapGateTitle">Clique para começar ✨</p>
                <p className="tapGateSub">(a música vai tocar durante todo o site)</p>
                <motion.div
                  className="tapGateHint"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  👆
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid two">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="heroTitle">Maria Eduarda</h1>
            <p className="helper heroText">
              Muito me encanta que, além da sua beleza externa, que já é extasiante, eu possa enxergar em você a beleza do nosso Criador.
            </p>
          </motion.div>

          <motion.div
            className="heroImageWrap"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.05, ease: 'easeOut' }}
          >
            <img
              className="heroImage"
              src="/convite.png"
              alt="Imagem romântica (placeholder)"
              loading="eager"
            />

            <motion.p
              className="heroCaption"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            >
              Por isso,tenho um convite especial pra você.
            </motion.p>

            <div className="heroActions">
              <Button
                onClick={() => {
                  onStartMusic?.()
                  navigate('/pergunta')
                }}
                aria-label="Ir para a pergunta"
              >
                Vamos lá
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
