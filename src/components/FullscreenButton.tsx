import { useEffect, useState } from 'react'
import { IconButton } from './IconButton'

export function FullscreenButton() {
  const [isFs, setIsFs] = useState(!!document.fullscreenElement)

  useEffect(() => {
    const onChange = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggle = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen?.()
  }

  return <IconButton icon="/ui/btn-fullscreen.webp" label={isFs ? 'Quitter le plein écran' : 'Plein écran'} onClick={toggle} />
}
