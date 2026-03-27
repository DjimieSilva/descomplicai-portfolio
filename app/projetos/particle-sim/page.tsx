'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Vec2 {
  x: number
  y: number
}

interface TrailPoint {
  x: number
  y: number
  alpha: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  ax: number
  ay: number
  prevX: number
  prevY: number
  mass: number
  radius: number
  type: ParticleType
  color: string
  glowColor: string
  trail: TrailPoint[]
  maxTrail: number
  isAttractor: boolean
  mergeCount: number
}

type ParticleType = 'star' | 'planet' | 'moon' | 'comet' | 'dust'
type CollisionMode = 'elastic' | 'inelastic' | 'merge'
type PresetName = 'solar' | 'galaxy' | 'bigbang'

// ─── Particle Definitions ────────────────────────────────────────────────────

const PARTICLE_DEFS: Record<
  ParticleType,
  {
    label: string
    emoji: string
    mass: number
    radius: number
    color: string
    glowColor: string
    maxTrail: number
    description: string
  }
> = {
  star: {
    label: 'Estrela',
    emoji: '☀️',
    mass: 100,
    radius: 18,
    color: '#FFD700',
    glowColor: '#FF8C00',
    maxTrail: 8,
    description: 'Massa enorme, brilho dourado',
  },
  planet: {
    label: 'Planeta',
    emoji: '🪐',
    mass: 10,
    radius: 9,
    color: '#4FC3F7',
    glowColor: '#0288D1',
    maxTrail: 20,
    description: 'Massa média, órbita estável',
  },
  moon: {
    label: 'Lua',
    emoji: '🌙',
    mass: 1,
    radius: 5,
    color: '#CFD8DC',
    glowColor: '#90A4AE',
    maxTrail: 25,
    description: 'Leve, orbita planetas',
  },
  comet: {
    label: 'Cometa',
    emoji: '☄️',
    mass: 0.3,
    radius: 3,
    color: '#E1F5FE',
    glowColor: '#00BCD4',
    maxTrail: 60,
    description: 'Rápido, trilha longa',
  },
  dust: {
    label: 'Poeira',
    emoji: '💫',
    mass: 0.05,
    radius: 1.5,
    color: '#B39DDB',
    glowColor: '#7E57C2',
    maxTrail: 15,
    description: 'Micro-partícula, muito leve',
  },
}

// ─── Physics Constants ────────────────────────────────────────────────────────

const BASE_G = 0.8
const SOFTENING = 25 // softening length squared to prevent singularities
const MAX_FORCE = 800
const EXPLOSION_THRESHOLD = 120
const EXPLOSION_PARTICLE_COUNT = 6

// ─── Utility Functions ────────────────────────────────────────────────────────

let nextId = 1
const getId = () => nextId++

function createParticle(
  x: number,
  y: number,
  vx: number,
  vy: number,
  type: ParticleType,
  trailLength: number,
  isAttractor = false
): Particle {
  const def = PARTICLE_DEFS[type]
  const planetColors = ['#4FC3F7', '#EF9A9A', '#A5D6A7', '#FFCC80', '#CE93D8']
  const color =
    type === 'planet'
      ? planetColors[Math.floor(Math.random() * planetColors.length)]
      : def.color

  return {
    id: getId(),
    x,
    y,
    vx,
    vy,
    ax: 0,
    ay: 0,
    prevX: x - vx,
    prevY: y - vy,
    mass: def.mass,
    radius: def.radius,
    type,
    color,
    glowColor: def.glowColor,
    trail: [],
    maxTrail: Math.round((trailLength / 100) * def.maxTrail * 3),
    isAttractor,
    mergeCount: 1,
  }
}

function circularVelocity(
  px: number,
  py: number,
  cx: number,
  cy: number,
  mass: number,
  G: number
): Vec2 {
  const dx = px - cx
  const dy = py - cy
  const r = Math.sqrt(dx * dx + dy * dy)
  if (r < 1) return { x: 0, y: 0 }
  const speed = Math.sqrt((G * mass) / r)
  return {
    x: (-dy / r) * speed,
    y: (dx / r) * speed,
  }
}

function randomGaussian(): number {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

// ─── Preset Generators ────────────────────────────────────────────────────────

function generateSolarSystem(
  cx: number,
  cy: number,
  G: number,
  trailLength: number
): Particle[] {
  const particles: Particle[] = []

  // Central star
  const star = createParticle(cx, cy, 0, 0, 'star', trailLength)
  star.mass = 200
  star.radius = 24
  particles.push(star)

  // Planets in circular orbits
  const planetData = [
    { r: 100, mass: 8, radius: 7, color: '#B0BEC5' },
    { r: 170, mass: 15, radius: 10, color: '#4FC3F7' },
    { r: 250, mass: 12, radius: 9, color: '#EF9A9A' },
    { r: 360, mass: 20, radius: 12, color: '#FFCC80' },
  ]

  planetData.forEach((pd, i) => {
    const angle = (i / planetData.length) * Math.PI * 2
    const px = cx + Math.cos(angle) * pd.r
    const py = cy + Math.sin(angle) * pd.r
    const v = circularVelocity(px, py, cx, cy, star.mass, G)
    const p = createParticle(px, py, v.x, v.y, 'planet', trailLength)
    p.mass = pd.mass
    p.radius = pd.radius
    p.color = pd.color
    particles.push(p)

    // Add moons
    if (i >= 1) {
      const moonCount = i === 3 ? 3 : 1
      for (let m = 0; m < moonCount; m++) {
        const moonAngle = (m / moonCount) * Math.PI * 2
        const moonR = pd.radius * 4 + 10
        const mx = px + Math.cos(moonAngle) * moonR
        const my = py + Math.sin(moonAngle) * moonR
        const mv = circularVelocity(mx, my, px, py, p.mass, G)
        const moon = createParticle(
          mx,
          my,
          v.x + mv.x,
          v.y + mv.y,
          'moon',
          trailLength
        )
        particles.push(moon)
      }
    }
  })

  // Asteroid belt (dust particles)
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2
    const r = 290 + randomGaussian() * 20
    const px = cx + Math.cos(angle) * r
    const py = cy + Math.sin(angle) * r
    const v = circularVelocity(px, py, cx, cy, star.mass, G)
    const noise = (Math.random() - 0.5) * 0.5
    particles.push(
      createParticle(px, py, v.x + noise, v.y + noise, 'dust', trailLength)
    )
  }

  // Comets in elliptical orbits
  for (let i = 0; i < 5; i++) {
    const angle = Math.random() * Math.PI * 2
    const r = 150 + Math.random() * 250
    const px = cx + Math.cos(angle) * r
    const py = cy + Math.sin(angle) * r
    const v = circularVelocity(px, py, cx, cy, star.mass, G)
    const eccentric = 0.8 + Math.random() * 1.5
    particles.push(
      createParticle(
        px,
        py,
        v.x * eccentric,
        v.y * eccentric,
        'comet',
        trailLength
      )
    )
  }

  return particles
}

function generateGalaxy(
  cx: number,
  cy: number,
  G: number,
  trailLength: number
): Particle[] {
  const particles: Particle[] = []
  const count = 220

  // Central black hole (massive star)
  const center = createParticle(cx, cy, 0, 0, 'star', trailLength)
  center.mass = 500
  center.radius = 20
  center.color = '#9C27B0'
  center.glowColor = '#4A148C'
  particles.push(center)

  for (let i = 0; i < count; i++) {
    // Spiral arm distribution
    const arm = i % 3
    const armAngle = (arm / 3) * Math.PI * 2
    const t = Math.random()
    const r = 40 + t * 320
    const spiralAngle = armAngle + t * Math.PI * 3.5
    const scatter = randomGaussian() * 25

    const px =
      cx + Math.cos(spiralAngle) * r + Math.cos(spiralAngle + Math.PI / 2) * scatter
    const py =
      cy + Math.sin(spiralAngle) * r + Math.sin(spiralAngle + Math.PI / 2) * scatter

    const v = circularVelocity(px, py, cx, cy, center.mass, G)
    const turbulence = 0.15

    const type: ParticleType =
      Math.random() < 0.03 ? 'star' : Math.random() < 0.1 ? 'planet' : 'dust'
    const p = createParticle(
      px,
      py,
      v.x * (1 + randomGaussian() * turbulence),
      v.y * (1 + randomGaussian() * turbulence),
      type,
      trailLength
    )

    // Color gradient from blue (outer) to gold (inner)
    const normalized = r / 320
    const hue = 200 + normalized * 40
    const sat = 70 + normalized * 20
    const light = 50 + normalized * 20
    if (type === 'dust') {
      p.color = `hsl(${hue},${sat}%,${light}%)`
      p.glowColor = `hsl(${hue},${sat}%,${light - 15}%)`
    }

    particles.push(p)
  }

  return particles
}

function generateBigBang(
  cx: number,
  cy: number,
  trailLength: number
): Particle[] {
  const particles: Particle[] = []
  const count = 320

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 0.5 + Math.random() * 8 + randomGaussian() * 2
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed

    const offset = Math.random() * 8
    const type: ParticleType =
      Math.random() < 0.02
        ? 'star'
        : Math.random() < 0.08
        ? 'planet'
        : Math.random() < 0.3
        ? 'moon'
        : Math.random() < 0.4
        ? 'comet'
        : 'dust'

    const p = createParticle(
      cx + Math.cos(angle) * offset,
      cy + Math.sin(angle) * offset,
      vx,
      vy,
      type,
      trailLength
    )

    // Heatmap coloring
    const hue = (i / count) * 360
    if (type === 'dust') {
      p.color = `hsl(${hue},90%,70%)`
      p.glowColor = `hsl(${hue},90%,45%)`
    }

    particles.push(p)
  }

  return particles
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ParticleSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const isPausedRef = useRef(false)
  const settingsRef = useRef({
    G: 1,
    timeScale: 1,
    trailLength: 50,
    collisionMode: 'merge' as CollisionMode,
    selectedType: 'planet' as ParticleType,
    maxParticles: 500,
    showGrid: true,
  })

  // Camera state
  const cameraRef = useRef({ x: 0, y: 0, zoom: 1 })
  const isDraggingRef = useRef(false)
  const isMiddleDragRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0, camX: 0, camY: 0 })
  const slingshotRef = useRef<{
    active: boolean
    startX: number
    startY: number
    curX: number
    curY: number
  } | null>(null)

  // UI State
  const [isPaused, setIsPaused] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)
  const [particleCount, setParticleCount] = useState(0)
  const [G, setG] = useState(1)
  const [timeScale, setTimeScale] = useState(1)
  const [trailLength, setTrailLength] = useState(50)
  const [collisionMode, setCollisionMode] = useState<CollisionMode>('merge')
  const [selectedType, setSelectedType] = useState<ParticleType>('planet')

  // Sync refs with state
  useEffect(() => {
    settingsRef.current.G = G
  }, [G])
  useEffect(() => {
    settingsRef.current.timeScale = timeScale
  }, [timeScale])
  useEffect(() => {
    settingsRef.current.trailLength = trailLength
    // Update existing particle trail lengths
    particlesRef.current.forEach((p) => {
      const def = PARTICLE_DEFS[p.type]
      p.maxTrail = Math.round((trailLength / 100) * def.maxTrail * 3)
    })
  }, [trailLength])
  useEffect(() => {
    settingsRef.current.collisionMode = collisionMode
  }, [collisionMode])
  useEffect(() => {
    settingsRef.current.selectedType = selectedType
  }, [selectedType])

  // ─── Physics Step ─────────────────────────────────────────────────────────

  const physicsStep = useCallback((dt: number) => {
    const ps = particlesRef.current
    const { G: gVal, collisionMode: colMode } = settingsRef.current
    const actualG = BASE_G * gVal

    // Reset accelerations
    for (let i = 0; i < ps.length; i++) {
      ps[i].ax = 0
      ps[i].ay = 0
    }

    // N-body gravity
    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const dx = ps[j].x - ps[i].x
        const dy = ps[j].y - ps[i].y
        const distSq = dx * dx + dy * dy + SOFTENING
        const dist = Math.sqrt(distSq)
        const force = (actualG * ps[i].mass * ps[j].mass) / distSq
        const clampedForce = Math.min(force, MAX_FORCE)
        const fx = (clampedForce * dx) / dist
        const fy = (clampedForce * dy) / dist
        ps[i].ax += fx / ps[i].mass
        ps[i].ay += fy / ps[i].mass
        ps[j].ax -= fx / ps[j].mass
        ps[j].ay -= fy / ps[j].mass
      }
    }

    // Verlet integration
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i]
      const newX = 2 * p.x - p.prevX + p.ax * dt * dt
      const newY = 2 * p.y - p.prevY + p.ay * dt * dt

      // Compute velocity from positions (for collision response)
      p.vx = (newX - p.prevX) / (2 * dt)
      p.vy = (newY - p.prevY) / (2 * dt)

      p.prevX = p.x
      p.prevY = p.y
      p.x = newX
      p.y = newY

      // Update trail
      p.trail.unshift({ x: p.prevX, y: p.prevY, alpha: 1 })
      if (p.trail.length > p.maxTrail) {
        p.trail.length = p.maxTrail
      }
      // Fade trail
      for (let t = 0; t < p.trail.length; t++) {
        p.trail[t].alpha = 1 - t / p.trail.length
      }
    }

    // Collision detection & response
    const toRemove = new Set<number>()
    const toAdd: Particle[] = []

    for (let i = 0; i < ps.length; i++) {
      if (toRemove.has(i)) continue
      for (let j = i + 1; j < ps.length; j++) {
        if (toRemove.has(j)) continue
        const pi = ps[i]
        const pj = ps[j]
        const dx = pj.x - pi.x
        const dy = pj.y - pi.y
        const distSq = dx * dx + dy * dy
        const minDist = pi.radius + pj.radius
        if (distSq > minDist * minDist) continue

        const dist = Math.sqrt(distSq) || 0.001
        const relVx = pi.vx - pj.vx
        const relVy = pi.vy - pj.vy
        const relSpeed = Math.sqrt(relVx * relVx + relVy * relVy)

        if (colMode === 'merge') {
          // Merge: add masses, recalc radius
          const totalMass = pi.mass + pj.mass
          pi.x = (pi.x * pi.mass + pj.x * pj.mass) / totalMass
          pi.y = (pi.y * pi.mass + pj.y * pj.mass) / totalMass
          // Conservation of momentum
          pi.vx = (pi.vx * pi.mass + pj.vx * pj.mass) / totalMass
          pi.vy = (pi.vy * pi.mass + pj.vy * pj.mass) / totalMass
          pi.prevX = pi.x - pi.vx
          pi.prevY = pi.y - pi.vy
          pi.mass = totalMass
          pi.radius = Math.cbrt(
            Math.pow(pi.radius, 3) + Math.pow(pj.radius, 3)
          )
          pi.mergeCount += pj.mergeCount

          // Upgrade type if grown enough
          if (pi.mergeCount >= 20 && pi.type !== 'star') {
            pi.type = 'star'
            pi.color = '#FFD700'
            pi.glowColor = '#FF8C00'
          } else if (pi.mergeCount >= 5 && pi.type === 'dust') {
            pi.type = 'moon'
            pi.color = PARTICLE_DEFS.moon.color
            pi.glowColor = PARTICLE_DEFS.moon.glowColor
          }

          toRemove.add(j)

          // Explosion if high-velocity collision
          if (relSpeed > EXPLOSION_THRESHOLD) {
            for (let e = 0; e < EXPLOSION_PARTICLE_COUNT; e++) {
              const angle = (e / EXPLOSION_PARTICLE_COUNT) * Math.PI * 2
              const speed = relSpeed * 0.1
              const ep = createParticle(
                pi.x,
                pi.y,
                pi.vx + Math.cos(angle) * speed,
                pi.vy + Math.sin(angle) * speed,
                'dust',
                settingsRef.current.trailLength
              )
              ep.color = '#FF6E40'
              ep.glowColor = '#FF3D00'
              toAdd.push(ep)
            }
          }
        } else if (colMode === 'elastic') {
          // Elastic collision
          const nx = dx / dist
          const ny = dy / dist
          const dvDotN = relVx * nx + relVy * ny
          if (dvDotN > 0) continue
          const impulse = (2 * dvDotN) / (1 / pi.mass + 1 / pj.mass)
          pi.vx -= (impulse * nx) / pi.mass
          pi.vy -= (impulse * ny) / pi.mass
          pj.vx += (impulse * nx) / pj.mass
          pj.vy += (impulse * ny) / pj.mass
          pi.prevX = pi.x - pi.vx
          pi.prevY = pi.y - pi.vy
          pj.prevX = pj.x - pj.vx
          pj.prevY = pj.y - pj.vy

          // Separate overlapping
          const overlap = minDist - dist
          pi.x -= (overlap * nx * pj.mass) / (pi.mass + pj.mass)
          pi.y -= (overlap * ny * pj.mass) / (pi.mass + pj.mass)
          pj.x += (overlap * nx * pi.mass) / (pi.mass + pj.mass)
          pj.y += (overlap * ny * pi.mass) / (pi.mass + pj.mass)
        } else {
          // Inelastic
          const nx = dx / dist
          const ny = dy / dist
          const dvDotN = relVx * nx + relVy * ny
          if (dvDotN > 0) continue
          const restitution = 0.3
          const impulse =
            (-(1 + restitution) * dvDotN) / (1 / pi.mass + 1 / pj.mass)
          pi.vx += (impulse * nx) / pi.mass
          pi.vy += (impulse * ny) / pi.mass
          pj.vx -= (impulse * nx) / pj.mass
          pj.vy -= (impulse * ny) / pj.mass
          pi.prevX = pi.x - pi.vx
          pi.prevY = pi.y - pi.vy
          pj.prevX = pj.x - pj.vx
          pj.prevY = pj.y - pj.vy

          const overlap = minDist - dist
          pi.x -= (overlap * nx * 0.5)
          pi.y -= (overlap * ny * 0.5)
          pj.x += (overlap * nx * 0.5)
          pj.y += (overlap * ny * 0.5)
        }
      }
    }

    // Apply removals and additions
    if (toRemove.size > 0) {
      particlesRef.current = ps.filter((_, i) => !toRemove.has(i))
    }
    const maxP = settingsRef.current.maxParticles
    if (toAdd.length > 0) {
      for (const ep of toAdd) {
        if (particlesRef.current.length < maxP) {
          particlesRef.current.push(ep)
        }
      }
    }
  }, [])

  // ─── Render ────────────────────────────────────────────────────────────────

  const renderFrame = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const cam = cameraRef.current
      const { showGrid } = settingsRef.current

      // Background with motion blur
      ctx.fillStyle = 'rgba(3, 0, 20, 0.85)'
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width / 2 + cam.x, height / 2 + cam.y)
      ctx.scale(cam.zoom, cam.zoom)

      // Grid
      if (showGrid) {
        const gridSize = 80
        const startX = Math.floor((-width / 2 / cam.zoom - cam.x / cam.zoom) / gridSize) * gridSize
        const startY = Math.floor((-height / 2 / cam.zoom - cam.y / cam.zoom) / gridSize) * gridSize
        const endX = startX + (width / cam.zoom) + gridSize * 2
        const endY = startY + (height / cam.zoom) + gridSize * 2

        ctx.strokeStyle = 'rgba(100, 100, 200, 0.06)'
        ctx.lineWidth = 0.5 / cam.zoom
        ctx.beginPath()
        for (let gx = startX; gx < endX; gx += gridSize) {
          ctx.moveTo(gx, startY)
          ctx.lineTo(gx, endY)
        }
        for (let gy = startY; gy < endY; gy += gridSize) {
          ctx.moveTo(startX, gy)
          ctx.lineTo(endX, gy)
        }
        ctx.stroke()
      }

      const ps = particlesRef.current

      // Draw trails
      for (const p of ps) {
        if (p.trail.length < 2) continue
        ctx.beginPath()
        ctx.moveTo(p.trail[0].x, p.trail[0].y)

        for (let t = 1; t < p.trail.length; t++) {
          const tp = p.trail[t]
          ctx.lineTo(tp.x, tp.y)
        }

        const gradient = ctx.createLinearGradient(
          p.trail[0].x,
          p.trail[0].y,
          p.trail[p.trail.length - 1].x,
          p.trail[p.trail.length - 1].y
        )
        gradient.addColorStop(0, p.color + 'CC')
        gradient.addColorStop(1, p.color + '00')
        ctx.strokeStyle = gradient
        ctx.lineWidth = Math.max(0.5, p.radius * 0.5)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }

      // Draw particles
      for (const p of ps) {
        ctx.save()

        // Glow layers for stars and large objects
        if (p.type === 'star' || p.isAttractor || p.mergeCount >= 10) {
          const glowRadius = p.radius * (p.type === 'star' ? 5 : 3)
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius)
          grd.addColorStop(0, p.glowColor + 'AA')
          grd.addColorStop(0.4, p.glowColor + '44')
          grd.addColorStop(1, p.glowColor + '00')
          ctx.beginPath()
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        // Planet glow
        if (p.type === 'planet') {
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5)
          grd.addColorStop(0, p.color + '55')
          grd.addColorStop(1, p.color + '00')
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        // Main particle body
        const bodyGrd = ctx.createRadialGradient(
          p.x - p.radius * 0.3,
          p.y - p.radius * 0.3,
          0,
          p.x,
          p.y,
          p.radius
        )
        bodyGrd.addColorStop(0, '#FFFFFF')
        bodyGrd.addColorStop(0.3, p.color)
        bodyGrd.addColorStop(1, p.glowColor)

        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2)
        ctx.fillStyle = bodyGrd
        ctx.fill()

        // Attractor ring
        if (p.isAttractor) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius + 4, 0, Math.PI * 2)
          ctx.strokeStyle = '#FF4081AA'
          ctx.lineWidth = 1.5
          ctx.stroke()

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius + 10, 0, Math.PI * 2)
          ctx.strokeStyle = '#FF408144'
          ctx.lineWidth = 1
          ctx.stroke()
        }

        ctx.restore()
      }

      // Draw slingshot vector
      const sl = slingshotRef.current
      if (sl && sl.active) {
        const worldStart = screenToWorld(sl.startX, sl.startY, cam, width, height)
        const worldCur = screenToWorld(sl.curX, sl.curY, cam, width, height)
        const dx = worldStart.x - worldCur.x
        const dy = worldStart.y - worldCur.y
        const speed = Math.sqrt(dx * dx + dy * dy) * 0.05

        // Arrow line
        ctx.beginPath()
        ctx.moveTo(worldStart.x, worldStart.y)
        ctx.lineTo(worldStart.x + dx * 3, worldStart.y + dy * 3)
        ctx.strokeStyle = '#FF6E40CC'
        ctx.lineWidth = 2
        ctx.setLineDash([4, 4])
        ctx.stroke()
        ctx.setLineDash([])

        // Arrowhead
        const len = Math.sqrt(dx * dx + dy * dy)
        if (len > 0) {
          const ndx = dx / len
          const ndy = dy / len
          const arrowX = worldStart.x + dx * 3
          const arrowY = worldStart.y + dy * 3
          const headLen = 15
          ctx.beginPath()
          ctx.moveTo(arrowX, arrowY)
          ctx.lineTo(
            arrowX - headLen * ndx + headLen * 0.5 * ndy,
            arrowY - headLen * ndy - headLen * 0.5 * ndx
          )
          ctx.lineTo(
            arrowX - headLen * ndx - headLen * 0.5 * ndy,
            arrowY - headLen * ndy + headLen * 0.5 * ndx
          )
          ctx.closePath()
          ctx.fillStyle = '#FF6E40'
          ctx.fill()
        }

        // Speed label
        ctx.save()
        ctx.scale(1 / cam.zoom, 1 / cam.zoom)
        const screenSt = worldToScreen(worldStart, cam, width, height)
        ctx.fillStyle = '#FF6E40'
        ctx.font = 'bold 12px monospace'
        ctx.fillText(
          `v: ${speed.toFixed(1)}`,
          screenSt.x * cam.zoom + 15,
          screenSt.y * cam.zoom - 10
        )
        ctx.restore()
      }

      ctx.restore()
    },
    []
  )

  // ─── Animation Loop ────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastTime = performance.now()

    const loop = (now: number) => {
      animFrameRef.current = requestAnimationFrame(loop)
      const rawDt = (now - lastTime) / 1000
      lastTime = now
      const dt = Math.min(rawDt, 0.05) * settingsRef.current.timeScale * 60

      if (!isPausedRef.current && dt > 0) {
        physicsStep(dt * 0.016)
      }

      renderFrame(ctx, canvas.width, canvas.height)
      setParticleCount(particlesRef.current.length)
    }

    animFrameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [physicsStep, renderFrame])

  // ─── Canvas Resize ─────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ─── Coordinate Helpers ────────────────────────────────────────────────────

  function screenToWorld(
    sx: number,
    sy: number,
    cam: { x: number; y: number; zoom: number },
    w: number,
    h: number
  ): Vec2 {
    return {
      x: (sx - w / 2 - cam.x) / cam.zoom,
      y: (sy - h / 2 - cam.y) / cam.zoom,
    }
  }

  function worldToScreen(
    wp: Vec2,
    cam: { x: number; y: number; zoom: number },
    w: number,
    h: number
  ): Vec2 {
    return {
      x: wp.x * cam.zoom + w / 2 + cam.x,
      y: wp.y * cam.zoom + h / 2 + cam.y,
    }
  }

  // ─── Mouse / Interaction ───────────────────────────────────────────────────

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const sx = e.clientX - rect.left
    const sy = e.clientY - rect.top

    if (e.button === 1) {
      // Middle click — pan
      e.preventDefault()
      isMiddleDragRef.current = true
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        camX: cameraRef.current.x,
        camY: cameraRef.current.y,
      }
      return
    }

    if (e.button === 2) {
      // Right click — attractor
      const wPos = screenToWorld(sx, sy, cameraRef.current, canvas.width, canvas.height)
      const attractor = createParticle(wPos.x, wPos.y, 0, 0, 'star', settingsRef.current.trailLength, true)
      attractor.mass = 300
      attractor.radius = 16
      attractor.color = '#FF4081'
      attractor.glowColor = '#C51162'
      if (particlesRef.current.length < settingsRef.current.maxParticles) {
        particlesRef.current.push(attractor)
      }
      return
    }

    if (e.button === 0) {
      // Left click — slingshot start
      isDraggingRef.current = true
      slingshotRef.current = {
        active: true,
        startX: sx,
        startY: sy,
        curX: sx,
        curY: sy,
      }
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (isMiddleDragRef.current) {
      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y
      cameraRef.current.x = dragStartRef.current.camX + dx
      cameraRef.current.y = dragStartRef.current.camY + dy
      return
    }

    if (isDraggingRef.current && slingshotRef.current) {
      const rect = canvas.getBoundingClientRect()
      slingshotRef.current.curX = e.clientX - rect.left
      slingshotRef.current.curY = e.clientY - rect.top
    }
  }, [])

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return

      if (e.button === 1) {
        isMiddleDragRef.current = false
        return
      }

      if (e.button === 0 && isDraggingRef.current && slingshotRef.current) {
        isDraggingRef.current = false
        const sl = slingshotRef.current
        slingshotRef.current = null

        const rect = canvas.getBoundingClientRect()
        const startX = sl.startX
        const startY = sl.startY
        const endX = e.clientX - rect.left
        const endY = e.clientY - rect.top

        const wStart = screenToWorld(startX, startY, cameraRef.current, canvas.width, canvas.height)

        // Slingshot velocity: opposite to drag direction
        const vx = (startX - endX) * 0.05
        const vy = (startY - endY) * 0.05

        const type = settingsRef.current.selectedType
        if (particlesRef.current.length < settingsRef.current.maxParticles) {
          particlesRef.current.push(
            createParticle(wStart.x, wStart.y, vx, vy, type, settingsRef.current.trailLength)
          )
        }
      }
    },
    []
  )

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    cameraRef.current.zoom = Math.max(0.05, Math.min(10, cameraRef.current.zoom * delta))
  }, [])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  // ─── Controls ─────────────────────────────────────────────────────────────

  const togglePause = useCallback(() => {
    isPausedRef.current = !isPausedRef.current
    setIsPaused((p) => !p)
  }, [])

  const clearAll = useCallback(() => {
    particlesRef.current = []
    cameraRef.current = { x: 0, y: 0, zoom: 1 }
  }, [])

  const loadPreset = useCallback(
    (preset: PresetName) => {
      const canvas = canvasRef.current
      if (!canvas) return
      clearAll()

      const cx = 0
      const cy = 0
      const actualG = BASE_G * settingsRef.current.G

      if (preset === 'solar') {
        particlesRef.current = generateSolarSystem(cx, cy, actualG, trailLength)
        cameraRef.current.zoom = 0.9
      } else if (preset === 'galaxy') {
        particlesRef.current = generateGalaxy(cx, cy, actualG, trailLength)
        cameraRef.current.zoom = 0.55
      } else if (preset === 'bigbang') {
        particlesRef.current = generateBigBang(cx, cy, trailLength)
        cameraRef.current.zoom = 0.7
      }

      isPausedRef.current = false
      setIsPaused(false)
    },
    [clearAll, trailLength]
  )

  // ─── Render UI ─────────────────────────────────────────────────────────────

  return (
    <div
      style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#030014', position: 'relative' }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ display: 'block', cursor: isDraggingRef.current ? 'crosshair' : 'default' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onContextMenu={handleContextMenu}
      />

      {/* HUD — particle count */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(200,200,255,0.5)',
          fontFamily: 'monospace',
          fontSize: 12,
          letterSpacing: 2,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {particleCount} partículas
      </div>

      {/* Panel toggle button */}
      <motion.button
        onClick={() => setPanelOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          top: 16,
          right: panelOpen ? 336 : 16,
          zIndex: 20,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 8,
          color: '#fff',
          padding: '6px 12px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          fontSize: 13,
          fontFamily: 'monospace',
          transition: 'right 0.3s ease',
        }}
      >
        {panelOpen ? '›' : '‹ Painel'}
      </motion.button>

      {/* Control Panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            initial={{ x: 340, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 340, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 320,
              height: '100vh',
              background: 'rgba(3, 0, 20, 0.85)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              overflowY: 'auto',
              padding: '20px 16px',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              boxSizing: 'border-box',
            }}
          >
            {/* Header */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 3,
                  color: 'rgba(180,180,255,0.5)',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  marginBottom: 4,
                }}
              >
                Descomplicai
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'system-ui, sans-serif',
                  letterSpacing: -0.5,
                }}
              >
                Simulador de Partículas
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(150,150,200,0.7)',
                  marginTop: 4,
                  fontFamily: 'monospace',
                }}
              >
                Clique → spawnar · Arrastar → velocidade
                <br />
                Botão direito → atractor · Scroll → zoom
                <br />
                Botão do meio → pan
              </div>
            </div>

            <Divider />

            {/* Particle type selector */}
            <Section label="Tipo de Partícula">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(Object.keys(PARTICLE_DEFS) as ParticleType[]).map((type) => {
                  const def = PARTICLE_DEFS[type]
                  const isSelected = selectedType === type
                  return (
                    <motion.button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: isSelected
                          ? `rgba(${hexToRgb(def.color)}, 0.18)`
                          : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isSelected ? def.color + '66' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 8,
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{def.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: isSelected ? def.color : 'rgba(255,255,255,0.85)',
                            fontFamily: 'system-ui',
                          }}
                        >
                          {def.label}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: 'rgba(150,150,200,0.6)',
                            fontFamily: 'monospace',
                          }}
                        >
                          {def.description}
                        </div>
                      </div>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: def.color,
                          boxShadow: isSelected ? `0 0 8px ${def.color}` : 'none',
                          flexShrink: 0,
                        }}
                      />
                    </motion.button>
                  )
                })}
              </div>
            </Section>

            <Divider />

            {/* Sliders */}
            <Section label="Física">
              <SliderRow
                label="Gravidade"
                value={G}
                min={0}
                max={10}
                step={0.1}
                display={G.toFixed(1) + 'x'}
                onChange={setG}
                accentColor="#FFD700"
              />
              <SliderRow
                label="Velocidade do Tempo"
                value={timeScale}
                min={0.1}
                max={5}
                step={0.1}
                display={timeScale.toFixed(1) + 'x'}
                onChange={setTimeScale}
                accentColor="#4FC3F7"
              />
              <SliderRow
                label="Trilha"
                value={trailLength}
                min={0}
                max={100}
                step={1}
                display={trailLength + '%'}
                onChange={setTrailLength}
                accentColor="#CE93D8"
              />
            </Section>

            <Divider />

            {/* Collision mode */}
            <Section label="Modo de Colisão">
              <div style={{ display: 'flex', gap: 6 }}>
                {(['elastic', 'inelastic', 'merge'] as CollisionMode[]).map((mode) => {
                  const labels: Record<CollisionMode, string> = {
                    elastic: 'Elástica',
                    inelastic: 'Inelástica',
                    merge: 'Fusão',
                  }
                  const active = collisionMode === mode
                  return (
                    <motion.button
                      key={mode}
                      onClick={() => setCollisionMode(mode)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 1,
                        padding: '7px 4px',
                        borderRadius: 7,
                        border: `1px solid ${active ? 'rgba(180,160,255,0.6)' : 'rgba(255,255,255,0.1)'}`,
                        background: active ? 'rgba(160,120,255,0.2)' : 'rgba(255,255,255,0.04)',
                        color: active ? '#D1C4E9' : 'rgba(200,200,255,0.5)',
                        fontSize: 11,
                        fontFamily: 'monospace',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {labels[mode]}
                    </motion.button>
                  )
                })}
              </div>
            </Section>

            <Divider />

            {/* Controls */}
            <Section label="Controlo">
              <div style={{ display: 'flex', gap: 8 }}>
                <motion.button
                  onClick={togglePause}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1,
                    padding: '9px 0',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: isPaused
                      ? 'rgba(100,255,150,0.15)'
                      : 'rgba(255,255,255,0.08)',
                    color: isPaused ? '#80E27E' : '#fff',
                    fontSize: 20,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {isPaused ? '▶' : '⏸'}
                </motion.button>
                <motion.button
                  onClick={clearAll}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1,
                    padding: '9px 0',
                    borderRadius: 8,
                    border: '1px solid rgba(255,80,80,0.3)',
                    background: 'rgba(255,80,80,0.1)',
                    color: '#FF8A80',
                    fontSize: 13,
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  Limpar
                </motion.button>
              </div>

              {/* Particle count pill */}
              <div
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color: 'rgba(150,150,220,0.6)',
                  padding: '6px 0',
                }}
              >
                {particleCount} / {settingsRef.current.maxParticles} partículas
              </div>
            </Section>

            <Divider />

            {/* Presets */}
            <Section label="Presets">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <PresetButton
                  emoji="🌞"
                  label="Sistema Solar"
                  description="Estrela + 4 planetas + luas + cometas"
                  color="#FFD700"
                  onClick={() => loadPreset('solar')}
                />
                <PresetButton
                  emoji="🌌"
                  label="Galáxia Espiral"
                  description="220 partículas em braços espirais"
                  color="#B39DDB"
                  onClick={() => loadPreset('galaxy')}
                />
                <PresetButton
                  emoji="💥"
                  label="Big Bang"
                  description="320 partículas explosivas do centro"
                  color="#FF6E40"
                  onClick={() => loadPreset('bigbang')}
                />
              </div>
            </Section>

            <Divider />

            {/* Instructions footer */}
            <div
              style={{
                fontSize: 10,
                color: 'rgba(100,100,160,0.5)',
                fontFamily: 'monospace',
                lineHeight: 1.6,
                paddingBottom: 8,
              }}
            >
              Construído com física Verlet N-body
              <br />
              Simulação puramente client-side
              <br />
              © 2026 Descomplicai
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: 2,
          color: 'rgba(180,180,255,0.4)',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
        }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: 'rgba(255,255,255,0.06)',
        width: '100%',
      }}
    />
  )
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  accentColor,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
  accentColor: string
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: 'rgba(200,200,255,0.7)',
            fontFamily: 'monospace',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 12,
            color: accentColor,
            fontFamily: 'monospace',
            fontWeight: 600,
          }}
        >
          {display}
        </span>
      </div>
      <div style={{ position: 'relative', height: 20 }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.08)',
            transform: 'translateY(-50%)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: accentColor,
              borderRadius: 2,
              boxShadow: `0 0 6px ${accentColor}88`,
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            margin: 0,
          }}
        />
      </div>
    </div>
  )
}

function PresetButton({
  emoji,
  label,
  description,
  color,
  onClick,
}: {
  emoji: string
  label: string
  description: string
  color: string
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: `rgba(${hexToRgb(color)}, 0.08)`,
        border: `1px solid ${color}33`,
        borderRadius: 10,
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: 22, flexShrink: 0 }}>{emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color,
            fontFamily: 'system-ui',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 10,
            color: 'rgba(150,150,200,0.55)',
            fontFamily: 'monospace',
            marginTop: 2,
          }}
        >
          {description}
        </div>
      </div>
      <span
        style={{
          color: color + '88',
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        →
      </span>
    </motion.button>
  )
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '200,200,255'
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
}
