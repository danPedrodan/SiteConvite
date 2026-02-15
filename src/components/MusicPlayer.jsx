import React, { useMemo } from 'react'

// play: boolean (true = autoplay)
// videoId: string (ID do vídeo no YouTube)
export default function MusicPlayer({ play, videoId }) {
  const src = useMemo(() => {
    // autoplay só quando play=true
    // controls=0 tenta esconder UI
    // playsinline melhora no mobile
    return (
      `https://www.youtube.com/embed/${videoId}` +
      `?autoplay=${play ? 1 : 0}` +
      `&mute=0` +
      `&controls=0` +
      `&playsinline=1` +
      `&rel=0` +
      `&modestbranding=1`
    )
  }, [play, videoId])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: 1,
        height: 1,
        left: -9999,
        top: -9999,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 0,
      }}
    >
      <iframe
        title="bg-music"
        width="1"
        height="1"
        src={src}
        allow="autoplay; encrypted-media"
        frameBorder="0"
      />
    </div>
  )
}
