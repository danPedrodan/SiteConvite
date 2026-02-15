// src/App.jsx
import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Pergunta from './pages/Pergunta'
import Ranking from './pages/Ranking'
import SkyBackdrop from './components/SkyBackdrop'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  const [playMusic, setPlayMusic] = useState(false)

  // ✅ ID do vídeo do YouTube (Sparkle)
  const videoId = 'a2GujJZfXpg'

  function startMusic() {
    setPlayMusic(true)
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Fundo animado: estrelas sempre + cometa só depois do clique */}
      <SkyBackdrop active={playMusic} />

      {/* 🎵 Player invisível (tocará no site todo depois do clique) */}
      <MusicPlayer play={playMusic} videoId={videoId} />

      <Routes>
        <Route path="/" element={<Home onStartMusic={startMusic} isMusicOn={playMusic} />} />
        <Route path="/pergunta" element={<Pergunta />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
