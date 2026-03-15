import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './ninika.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NinikaTours — Experiências de Vinho Vulcânico e Gastronomia na Ilha Terceira, Açores',
  description:
    'Bebe. Prova. Descobre a Ilha. Tours de vinho Verdelho e gastronomia açoriana na Ilha Terceira. Rotas pelos Biscoitos, tascas de Angra e experiências vulcânicas autênticas. Reserva a tua experiência.',
  keywords: [
    'Terceira',
    'Açores',
    'vinho',
    'Verdelho',
    'enoturismo',
    'gastronomia açoriana',
    'wine tour Azores',
    'Biscoitos wine',
    'Angra do Heroísmo',
    'experiências Terceira',
    'NinikaTours',
    'vinho vulcânico',
    'walking tour Terceira',
    'petiscos açorianos',
    'Alcatra',
    'Espírito Santo Açores',
    'turismo Terceira',
    'wine tasting Azores',
  ],
  openGraph: {
    title: 'NinikaTours — Vinho Vulcânico & Gastronomia na Terceira',
    description:
      'Tours de vinho Verdelho e gastronomia açoriana na Ilha Terceira. Rotas pelos Biscoitos, tascas de Angra e experiências vulcânicas autênticas.',
    type: 'website',
    locale: 'pt_PT',
    siteName: 'NinikaTours',
    images: [
      {
        url: '/ninika-tours/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NinikaTours — Currais de vinha vulcânica nos Biscoitos, Terceira',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NinikaTours — Vinho Vulcânico & Gastronomia na Terceira, Açores',
    description:
      'Bebe. Prova. Descobre a Ilha. Tours de vinho e gastronomia na Terceira.',
    images: ['/ninika-tours/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://descomplicai.com/projetos/ninika-tours',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NinikaTours({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`ninika-root ${cormorant.variable} ${dmSans.variable}`}>
      {children}
    </div>
  );
}
