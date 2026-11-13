/**
 * Sauvegarde de partie par nom d'équipe (fonction Vercel).
 *
 *   GET  /api/save?team=NOM  → { state }          ({ state: null } si l'équipe est inconnue)
 *   POST /api/save {state}   → { ok: true }        (409 { state } si une version plus récente existe déjà)
 *
 * Stockage : base Redis Upstash ajoutée au projet Vercel (variables KV_REST_API_URL / KV_REST_API_TOKEN,
 * ou UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN). Sans elle, l'API répond 501 « not_configured »
 * et le jeu continue de sauvegarder localement.
 */

const MAX_BODY = 8_000
const CASE_COUNT = 14
const SCREENS = ['title', 'signin', 'instructions', 'rules', 'loading', 'welcome', 'files', 'epilogue', 'score', 'end']
const CASE_SCREENS = ['story', 'invest', 'hint', 'puzzle', 'confirm', 'solution', 'solved']

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } })

/** Clé d'équipe : sans accents, majuscules, lettres et chiffres uniquement (identique au client). */
export function teamKey(name: string) {
  return String(name ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
}

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url, token } : null
}

async function redis(cfg: { url: string; token: string }, command: (string | number)[]) {
  const res = await fetch(cfg.url, {
    method: 'POST',
    headers: { authorization: `Bearer ${cfg.token}`, 'content-type': 'application/json' },
    body: JSON.stringify(command),
  })
  if (!res.ok) throw new Error(`redis ${res.status}`)
  const data = (await res.json()) as { result?: unknown; error?: string }
  if (data.error) throw new Error(data.error)
  return data.result
}

const ints = (v: unknown) =>
  Array.isArray(v) ? [...new Set(v.filter((n): n is number => Number.isInteger(n) && n >= 1 && n <= CASE_COUNT))].sort((a, b) => a - b) : []
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null)

/** N'accepte que la forme attendue d'une sauvegarde. */
function cleanState(raw: any) {
  if (!raw || typeof raw !== 'object') return null
  const team = typeof raw.team === 'string' ? raw.team.trim().slice(0, 30) : ''
  if (teamKey(team).length < 2) return null
  const sn = raw.screen?.name
  let screen: { name: string; n?: number } = { name: 'files' }
  if (SCREENS.includes(sn)) screen = { name: sn }
  else if (CASE_SCREENS.includes(sn) && Number.isInteger(raw.screen.n) && raw.screen.n >= 1 && raw.screen.n <= CASE_COUNT) screen = { name: sn, n: raw.screen.n }
  return {
    screen,
    team,
    confirmed: true,
    startedAt: num(raw.startedAt),
    finishedAt: num(raw.finishedAt),
    solved: ints(raw.solved),
    hintsOpened: ints(raw.hintsOpened),
    revealed: ints(raw.revealed),
    unlockAll: raw.unlockAll === true,
    savedAt: num(raw.savedAt) ?? 0,
  }
}

const storeKey = (team: string) => `enigmarena:save:${teamKey(team)}`

export async function GET(request: Request) {
  const cfg = redisConfig()
  if (!cfg) return json({ error: 'not_configured' }, 501)
  const team = new URL(request.url).searchParams.get('team') ?? ''
  if (teamKey(team).length < 2) return json({ error: 'bad_team' }, 400)
  try {
    const stored = await redis(cfg, ['GET', storeKey(team)])
    if (typeof stored !== 'string') return json({ state: null })
    return json({ state: JSON.parse(stored) })
  } catch {
    return json({ error: 'storage_error' }, 502)
  }
}

export async function POST(request: Request) {
  const cfg = redisConfig()
  if (!cfg) return json({ error: 'not_configured' }, 501)
  const text = await request.text()
  if (text.length > MAX_BODY) return json({ error: 'too_large' }, 413)
  let state: ReturnType<typeof cleanState>
  try {
    state = cleanState(JSON.parse(text)?.state)
  } catch {
    state = null
  }
  if (!state) return json({ error: 'bad_state' }, 400)
  try {
    const key = storeKey(state.team)
    const stored = await redis(cfg, ['GET', key])
    if (typeof stored === 'string') {
      const current = JSON.parse(stored)
      if (typeof current?.savedAt === 'number' && current.savedAt > state.savedAt) return json({ state: current }, 409)
    }
    await redis(cfg, ['SET', key, JSON.stringify(state)])
    return json({ ok: true })
  } catch {
    return json({ error: 'storage_error' }, 502)
  }
}
