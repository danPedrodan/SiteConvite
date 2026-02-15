import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageLayout from '../components/PageLayout'
import Button from '../components/Button'
import '../styles/pergunta.css'

export default function Pergunta() {
  const navigate = useNavigate()

  const [hasFallen, setHasFallen] = useState(false)
  const [viewportH, setViewportH] = useState(() => window.innerHeight || 800)
  const [startFall, setStartFall] = useState(false)

  // ✅ NOVO: controla a comemoração
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const onResize = () => setViewportH(window.innerHeight || 800)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setStartFall(true), 450)
    return () => clearTimeout(t)
  }, [])

  const noTargetY = useMemo(() => viewportH + 220, [viewportH])

  // ✅ NOVO: clique no "Sim"
  function handleYes() {
    setShowCelebration(true)

    // após a animação, vai para o ranking
    setTimeout(() => {
      navigate('/ranking')
    }, 1500)
  }

  return (
    <PageLayout title="Quer sair comigo?">
      <div className="perguntaWrap">
        <div className="buttonsRow">
          <Button onClick={handleYes} aria-label="Responder sim">
            Sim
          </Button>

          <div className="noZone">
            {!hasFallen && (
              <motion.div
                initial={{ y: 0, rotate: -2 }}
                animate={startFall ? { y: noTargetY, rotate: 6 } : { y: 0, rotate: -2 }}
                transition={startFall ? { duration: 1.4, ease: 'easeIn' } : { duration: 0.2 }}
                onAnimationComplete={() => {
                  if (startFall) setHasFallen(true)
                }}
                style={{ display: 'inline-block' }}
              >
                <Button
                  variant="ghost"
                  onClick={(e) => e.preventDefault()}
                >
                  Não
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <div className="msgArea">
          {hasFallen ? (
            <motion.p
              className="helper msg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Ops… parece que o não caiu e foi embora. Enfim, responde aí por favor :)
            </motion.p>
          ) : (
            <p className="helper msg" style={{ opacity: 0.85 }}>
              (tô aguardando sua resposta…)
            </p>
          )}
        </div>
      </div>

      {/* ✅ NOVO: overlay de comemoração */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="celebrationOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src="/emoji.jpg" // pode trocar por outra imagem depois
              alt="Comemoração"
              className="celebrationImage"
              initial={{ scale: 0.6, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 120 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
