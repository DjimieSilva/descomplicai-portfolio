import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simulador de Partículas — Descomplicai',
  description:
    'Simulador de física de partículas N-body com gravidade, colisões elásticas, trilhas e presets estelares. Totalmente client-side.',
}

export default function ParticleSimLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
