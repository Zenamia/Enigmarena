import { useEffect, useState } from 'react'
import { IconButton } from './IconButton'

export function FullscreenButton() {
  const [isFs, setIsFs] = useState(!!document.fullscreenElement)

  useEffect(() => {
    const onChange = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  // iOS Safari n'autorise pas le plein écran sur les pages : on masque alors le bouton.
  if (!document.documentElement.requestFullscreen) return null

  const toggle = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen()
  }

  return <IconButton icon="/ui/btn-fullscreen.webp" label={isFs ? 'Exit full screen' : 'Full screen'} onClick={toggle} />
}
