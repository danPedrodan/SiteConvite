function SplitComet({ active }) {
  // controla ciclos do cometa (pra split acontecer toda vez)
  const [cycle, setCycle] = useState(0)
  const [split, setSplit] = useState(false)

  // ajuste fino
  const DURATION = 10 // tempo total do “voo”
  const SPLIT_AT = 2.75 // quando divide (em segundos)
  const REPEAT_DELAY = 0 // pausa entre ciclos

  useEffect(() => {
    if (!active) {
      setSplit(false)
      return
    }

    setSplit(false)

    // agenda o split do ciclo atual
    const tSplit = setTimeout(() => setSplit(true), SPLIT_AT * 1000)

    // quando termina o voo + pausa, inicia novo ciclo
    const tNext = setTimeout(() => {
      setSplit(false)
      setCycle((c) => c + 1)
    }, (DURATION -3 ) * 1000)

    return () => {
      clearTimeout(tSplit)
      clearTimeout(tNext)
    }
  }, [active, cycle])

  // se não está ativo, nem renderiza (fica quieto)
  if (!active) return null

  return (
    <motion.div
      // trocar a key reinicia a animação toda vez (novo ciclo)
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
        // delay opcional ao ativar (fica mais “cinema”)
        delay: 0,
      }}
    >
      {/* Durante a primeira parte: 1 rastro (pré-split) */}
      <AnimatePresence>
        {!split && (
          <motion.div
            key="single"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ position: 'absolute', left: '50%', top: '22%', transform: 'translateX(-50%)' }}
          >
            <div
              style={{
                width: '560px',
                height: '3px',
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(200,220,255,0.22) 35%, rgba(255, 255, 255, 0.95) 55%, rgba(200,220,255,0.18) 75%, rgba(255,255,255,0) 100%)',
                filter: 'blur(0.25px)',
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
                background: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 0 18px rgba(180,220,255,0.55), 0 0 42px rgba(255,255,255,0.35)',
                borderRadius: 999,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Depois do split: 2 rastros com pequeno afastamento */}
      <AnimatePresence>
        {split && (
          <motion.div
            key="split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '22%',
              transform: 'translateX(-50%)',
              width: '560px',
              height: '16px',
            }}
          >
            {/* 🔵 rastro azul (vai “subindo” levemente) */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: -6 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{ position: 'absolute', left: 0, right: 0, top: '6px' }}
            >
              <div
                style={{
                  width: '560px',
                  height: '3px',
                  background:
                    'linear-gradient(90deg, rgba(120,220,255,0) 0%, rgba(120,220,255,0.22) 35%,rgba(11, 30, 138, 0.98)  55%, rgba(120,220,255,0.16) 75%, rgba(120,220,255,0) 100%)',
                  filter: 'blur(0.25px)',
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
                  background: 'rgba(18, 115, 139, 0.98)',
                  boxShadow: '0 0 18px rgba(120,220,255,0.55), 0 0 42px rgba(255,255,255,0.35)',
                  borderRadius: 999,
                }}
              />
            </motion.div>

            {/* 🔴 rastro vermelho (vai “descendo” levemente) */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 6 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{ position: 'absolute', left: 0, right: 0, top: '6px' }}
            >
              <div
                style={{
                  width: '560px',
                  height: '3px',
                  background:
                    'linear-gradient(90deg, rgba(255,80,120,0) 0%, rgba(255,80,120,0.26) 35%, rgba(255,200,220,0.95) 55%, rgba(255,80,120,0.18) 75%, rgba(255,80,120,0) 100%)',
                  filter: 'blur(0.25px)',
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
                  background: 'rgba(255,210,225,0.98)',
                  boxShadow: '0 0 18px rgba(255,90,120,0.60), 0 0 42px rgba(255,180,200,0.35)',
                  borderRadius: 999,
                }}
              />
            </motion.div>

            {/* ✨ “flash” sutil no instante do split (bem chamativo sem poluir) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 0.7, 0], scale: [0.9, 1.08, 1.0] }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '120px',
                height: '120px',
                transform: 'translate(-50%, -50%)',
                borderRadius: 999,
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(120,220,255,0.20) 35%, rgba(255,80,120,0.16) 55%, rgba(255,255,255,0) 70%)',
                filter: 'blur(1px)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}