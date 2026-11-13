import type { GameState } from './GameContext'

/** Sauvegarde en ligne par nom d'équipe (voir api/save.ts). Toute panne renvoie « unavailable » : le jeu continue en local. */

export type LoadResult = { status: 'found'; state: GameState } | { status: 'none' } | { status: 'unavailable' }
export type SaveResult = { status: 'ok' } | { status: 'conflict'; state: GameState } | { status: 'unavailable' }

const TIMEOUT_MS = 7000

async function request(url: string, init?: RequestInit) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: ctrl.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function readJson(res: Response) {
  if (!(res.headers.get('content-type') ?? '').includes('json')) return null
  try {
    return await res.json()
  } catch {
    return null
  }
}

export async function loadCloud(team: string): Promise<LoadResult> {
  try {
    const res = await request(`/api/save?team=${encodeURIComponent(team)}`)
    const body = await readJson(res)
    if (res.ok && body && 'state' in body) return body.state ? { status: 'found', state: body.state as GameState } : { status: 'none' }
  } catch {
    /* hors ligne, délai dépassé… */
  }
  return { status: 'unavailable' }
}

export async function saveCloud(state: GameState, keepalive = false): Promise<SaveResult> {
  try {
    const res = await request('/api/save', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ state }),
      keepalive,
    })
    const body = await readJson(res)
    if (res.ok && body?.ok) return { status: 'ok' }
    if (res.status === 409 && body?.state) return { status: 'conflict', state: body.state as GameState }
  } catch {
    /* hors ligne */
  }
  return { status: 'unavailable' }
}
