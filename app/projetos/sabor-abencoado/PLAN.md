# Sabor Abencoado — Plano de Desenvolvimento

## Visao Geral

Site single-page para a padaria artesanal "Sabor Abencoado" de Olhao, Portugal.
Objetivo: mostrar produtos e converter visitas em encomendas via WhatsApp.
O publico-alvo acede maioritariamente pelo telemovel (links partilhados no WhatsApp/Instagram).

---

## Arquitetura de Ficheiros

```
app/projetos/sabor-abencoado/
├── layout.tsx                    # Metadata SEO
├── page.tsx                      # Importa e monta todas as secoes
├── sabor-abencoado.css           # CSS variables, keyframes, cloud shapes
└── _sections/
    ├── s01-hero.tsx              # Hero com logo, slogan, CTA WhatsApp
    ├── s02-sobre.tsx             # Sobre nos / historia
    ├── s03-produtos.tsx          # Catalogo de produtos (Paes + Doces)
    ├── s04-como-encomendar.tsx   # Passos para encomendar + CTA
    └── s05-footer.tsx            # Contactos, horario, creditos
```

Cada ficheiro de secao comeca com `"use client";` no topo.

---

## Design Tokens

### CSS Variables (sabor-abencoado.css)

```css
:root {
  --sa-teal-dark: #1B5E5E;
  --sa-gold: #C9A050;
  --sa-pink: #E8A0B0;
  --sa-blue-light: #A8C8E0;
  --sa-cream: #FFF8F0;
  --sa-beige: #F0E0CC;
  --sa-dark: #2D2D2D;
  --sa-white: #FFFFFF;
  --sa-teal-light: #2A7A7A;
  --sa-gold-light: #D4B76A;
  --sa-pink-light: #F0C0CC;
}
```

### Tailwind Classes Mapeadas

| Token          | Classe Tailwind              | Uso                              |
|----------------|------------------------------|----------------------------------|
| Teal dark      | `text-[#1B5E5E]`            | Titulos, headings                |
| Gold           | `text-[#C9A050]`            | Acentos, estrelas, botoes CTA    |
| Soft pink      | `text-[#E8A0B0]`            | Coracoes, elementos decorativos  |
| Light blue     | `bg-[#A8C8E0]`              | Nuvens, backgrounds subtis       |
| Cream          | `bg-[#FFF8F0]`              | Background principal             |
| Warm beige     | `bg-[#F0E0CC]`              | Cards, secoes alternadas         |
| Dark text      | `text-[#2D2D2D]`            | Corpo de texto                   |
| White          | `bg-white` / `text-white`   | Cards, texto sobre dark bg       |

### Tipografia

- **Titulos (h1, h2):** `font-bold` com `tracking-tight`, tamanhos responsivos
- **Subtitulos (h3):** `font-semibold text-lg` ou `text-xl`
- **Corpo:** `text-base` com `leading-relaxed text-[#2D2D2D]/80`
- **Labels/badges:** `text-xs font-semibold uppercase tracking-[0.2em]`

---

## Estrategia de Animacoes

### Variantes Framer Motion (definir no page.tsx ou num ficheiro partilhado)

```tsx
// Fade up padrao
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Stagger container
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// Float suave (para elementos decorativos — nuvens, estrelas)
// Usar CSS keyframes em sabor-abencoado.css:
// @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
// @keyframes twinkle { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
// @keyframes pulse-soft { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
```

### Regras de animacao

1. **Entrada:** Todas as secoes usam `whileInView` com `viewport={{ once: true, amount: 0.2 }}`
2. **Hover em cards:** `scale(1.02)` + sombra mais intensa, transicao `duration-300`
3. **Botoes CTA:** Usar `ShimmerButton` com `bgColor="#C9A050"` e `shimmerColor="rgba(255,248,240,0.3)"`
4. **Elementos decorativos:** Animacoes CSS puras (float, twinkle) para nao sobrecarregar JS
5. **Mobile:** Reduzir `amount` do viewport para `0.1` e simplificar animacoes

---

## Integracao WhatsApp

### URLs Pre-formatadas

```tsx
// Contacto principal
const WHATSAPP_MAIN = "https://wa.me/351914882047?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20na%20Sabor%20Aben%C3%A7oado%20%F0%9F%8D%B0";

// Contacto secundario
const WHATSAPP_ALT = "https://wa.me/351932642860?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20na%20Sabor%20Aben%C3%A7oado%20%F0%9F%8D%B0";

// Encomenda com produto especifico (usado nos cards de produto)
function getWhatsAppUrl(produto: string): string {
  const msg = encodeURIComponent(`Ola! Gostaria de encomendar ${produto} da Sabor Abencoado`);
  return `https://wa.me/351914882047?text=${msg}`;
}
```

### Onde aparecem CTAs

1. **Hero:** Botao principal "Encomendar pelo WhatsApp" (ShimmerButton dourado)
2. **Produtos:** Cada card tem um botao/link "Encomendar" que abre WhatsApp com o nome do produto
3. **Como Encomendar:** Botao CTA final grande
4. **Footer:** Links dos dois numeros de WhatsApp
5. **Floating element (opcional):** Botao WhatsApp fixo no canto inferior direito em mobile

---

## Estrutura de Dados dos Produtos

```tsx
type Categoria = "paes" | "doces";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  categoria: Categoria;
  destaque?: boolean; // para marcar os mais populares
}

const PRODUTOS: Produto[] = [
  {
    id: "pao-chourico",
    nome: "Pao com Chourico",
    descricao: "Pao artesanal recheado com chourico tradicional portugues. Perfeito para lanches e petiscos.",
    emoji: "🌭",
    categoria: "paes",
    destaque: true,
  },
  {
    id: "pao-caseiro",
    nome: "Pao Caseiro",
    descricao: "Pao feito a mao, com fermento natural e cozido em forno de lenha. O sabor da tradicao.",
    emoji: "🍞",
    categoria: "paes",
    destaque: true,
  },
  {
    id: "pao-queijo-fiambre",
    nome: "Pao com Queijo e Fiambre",
    descricao: "Pao macio recheado com queijo derretido e fiambre. Ideal para o pequeno-almoco ou lanche.",
    emoji: "🧀",
    categoria: "paes",
  },
  {
    id: "tarte-pastel-nata",
    nome: "Tarte de Pastel de Nata",
    descricao: "A nossa reinterpretacao do classico pastel de nata em formato de tarte. Creme aveludado com canela.",
    emoji: "🥧",
    categoria: "doces",
    destaque: true,
  },
  {
    id: "bolos-caseiros",
    nome: "Bolos Caseiros",
    descricao: "Bolos feitos com receitas de familia, ingredientes frescos e muito amor. Varios sabores disponiveis.",
    emoji: "🎂",
    categoria: "doces",
  },
  {
    id: "bolo-pote",
    nome: "Bolo de Pote",
    descricao: "Camadas de bolo, creme e cobertura num frasco de vidro. Pratico, delicioso e perfeito para oferecer.",
    emoji: "🍰",
    categoria: "doces",
    destaque: true,
  },
  {
    id: "pudins",
    nome: "Pudins",
    descricao: "Pudim caseiro com calda de caramelo. Textura cremosa e sabor que recorda a cozinha da avo.",
    emoji: "🍮",
    categoria: "doces",
  },
];

const CATEGORIAS = {
  paes: { label: "Paes Artesanais", emoji: "🥖", cor: "#1B5E5E" },
  doces: { label: "Doces & Sobremesas", emoji: "🍰", cor: "#C9A050" },
};
```

---

## Secao por Secao

---

### S01 — Hero (`s01-hero.tsx`)

**Objetivo:** Impressionar, comunicar o que e a Sabor Abencoado e converter.

#### Conteudo

- Badge no topo: "Pastry Takeaway | Olhao"
- Titulo: "Sabor Abencoado" (h1, grande, teal dark)
- Subtitulo/slogan: "Vem provar os melhores sabores de Olhao" (text-xl, dark/80)
- Frase complementar: "Levaremos ate si bolos e paes caseiros feitos com amor" (text-base, dark/60)
- CTA principal: "Encomendar pelo WhatsApp" (ShimmerButton dourado)
- CTA secundario: "Ver Produtos" (botao outline, scroll para #produtos)

#### Layout

```
Mobile (< 768px):
┌──────────────────────────┐
│    [nuvens decorativas]   │
│                           │
│      ☁ badge ☁            │
│                           │
│    SABOR ABENCOADO        │
│                           │
│  slogan em 2 linhas       │
│                           │
│  [  Encomendar WhatsApp ] │
│  [  Ver Produtos        ] │
│                           │
│      ⬇ scroll             │
└──────────────────────────┘

Desktop (>= 768px):
Igual mas com mais espaco (py-32), titulo maior (text-6xl/7xl),
CTAs lado a lado (flex-row)
```

#### Design

- **Background:** Gradiente suave de `#FFF8F0` para `#A8C8E0/20` (creme para azul claro subtil)
- **Elementos decorativos:**
  - 2-3 formas de nuvem (divs com `border-radius` arredondado, bg-[#A8C8E0]/15, position absolute)
  - Estrelas pequenas (★) em dourado, com animacao `twinkle` CSS
  - Lua crescente decorativa em dourado claro (opcional, SVG simples)
- **Glow decorativo:** Blob `bg-[#E8A0B0]/10 blur-[120px]` atras do titulo

#### Animacoes

- Badge: `initial={{ opacity: 0, scale: 0.9 }}` → `animate={{ opacity: 1, scale: 1 }}`
- Titulo: `TextReveal` ou fadeUp com delay 0.2
- Slogan: fadeUp com delay 0.5
- CTAs: fadeUp com delay 0.8
- Nuvens: animacao CSS `float` com duracoes diferentes (3s, 4s, 5s)
- Estrelas: animacao CSS `twinkle` com delays variados
- Scroll indicator: chevron com animacao y bounce

#### Acessibilidade

- `<section aria-label="Inicio">`
- h1 para o nome do negocio
- Botao CTA com `aria-label="Encomendar pelo WhatsApp"`
- Elementos decorativos com `aria-hidden="true"`

---

### S02 — Sobre Nos (`s02-sobre.tsx`)

**Objetivo:** Criar confianca e ligacao emocional. Transmitir que e caseiro, feito com amor.

#### Conteudo

- Label: "SOBRE NOS" (uppercase tracking)
- Titulo: "Feito com amor em Olhao" (h2, teal dark)
- Paragrafo: Texto sobre a padaria caseira, a paixao pela pastelaria, a entrega ao domicilio.
  Sugestao: "Na Sabor Abencoado, cada bolo e cada pao sao feitos com receitas de familia e ingredientes selecionados. Nascemos da paixao pela pastelaria caseira e do desejo de levar sabores autenticos a sua porta, em Olhao e arredores."
- 3 cards de destaque com icones:
  1. **Artesanal** (icon: `ChefHat` ou `Heart`) — "Tudo feito a mao, com receitas tradicionais"
  2. **Entrega ao Domicilio** (icon: `Truck`) — "Levamos ate si, de segunda a sexta"
  3. **Feito com Amor** (icon: `Sparkles`) — "Ingredientes frescos, carinho em cada detalhe"

#### Layout

```
Mobile:
┌──────────────────────────┐
│  SOBRE NOS               │
│  Feito com amor em Olhao  │
│                           │
│  [paragrafo]              │
│                           │
│  ┌─────────────────────┐  │
│  │ ❤ Artesanal         │  │
│  │ descricao curta      │  │
│  └─────────────────────┘  │
│  ┌─────────────────────┐  │
│  │ 🚚 Entrega          │  │
│  │ descricao curta      │  │
│  └─────────────────────┘  │
│  ┌─────────────────────┐  │
│  │ ✨ Com Amor          │  │
│  │ descricao curta      │  │
│  └─────────────────────┘  │
└──────────────────────────┘

Desktop: grid-cols-3 para os cards, texto a esquerda com max-w-2xl
```

#### Design

- **Background:** `bg-[#F0E0CC]/40` (beige claro, secao alternada)
- **Cards:** `bg-white/80 border border-[#C9A050]/15 rounded-2xl p-6 shadow-sm`
- **Icones:** Dentro de circulo `bg-[#1B5E5E]/10 w-12 h-12 rounded-xl`, icone em `text-[#1B5E5E]`
- **Hover nos cards:** `hover:shadow-md hover:border-[#C9A050]/30 hover:bg-white transition-all duration-300`

#### Animacoes

- Titulo e texto: fadeUp com `whileInView`
- Cards: stagger fadeUp, custom index para delay
- Icones: no hover, `group-hover:bg-[#1B5E5E] group-hover:text-white` (transicao de cor)

#### Acessibilidade

- `<section id="sobre" aria-label="Sobre nos">`
- Cards como `<div>` (nao interativos, nao precisam de role)

---

### S03 — Produtos (`s03-produtos.tsx`)

**Objetivo:** Mostrar o catalogo de produtos e facilitar a encomenda direta.

#### Conteudo

- Label: "OS NOSSOS PRODUTOS" (uppercase tracking, teal)
- Titulo: "Sabores que vao a sua porta" (h2)
- Subtitulo: "Escolha os seus favoritos e encomende pelo WhatsApp"
- Filtro de categorias: 2 botoes/tabs — "Paes Artesanais" | "Doces & Sobremesas" | "Todos"
- Grid de cards de produto (usar dados do array PRODUTOS)
- CTA geral no fundo: "Encomendar Agora" (ShimmerButton)

#### Card de Produto

```
┌────────────────────────┐
│  🍞  (emoji grande)     │
│                         │
│  PAO CASEIRO            │
│  ★ Popular              │ (badge, so se destaque === true)
│                         │
│  Descricao curta do      │
│  produto...              │
│                         │
│  [ Encomendar ]          │ (link para WhatsApp com nome do produto)
└────────────────────────┘
```

#### Layout

```
Mobile: grid-cols-1 gap-4 (cards full-width empilhados)
sm: grid-cols-2
lg: grid-cols-3 (ou grid-cols-4 se couber)

Filtro de categorias: flex com gap-2, botoes em pill shape
```

#### Design

- **Background:** `bg-[#FFF8F0]` (creme, voltar ao principal)
- **Cards:** `bg-white rounded-2xl border border-[#E8A0B0]/20 p-6 shadow-sm`
- **Emoji:** `text-4xl` centrado no topo do card, dentro de circulo `bg-[#FFF8F0] w-16 h-16 rounded-full flex items-center justify-center`
- **Badge "Popular":** `bg-[#C9A050]/15 text-[#C9A050] text-xs font-bold px-2 py-0.5 rounded-full`
- **Botao Encomendar no card:** `text-sm font-semibold text-[#1B5E5E] border border-[#1B5E5E]/20 rounded-full px-4 py-2 hover:bg-[#1B5E5E] hover:text-white transition-all`
- **Filtro ativo:** `bg-[#1B5E5E] text-white`, inativo: `bg-white text-[#2D2D2D]/60 border border-[#2D2D2D]/10`

#### Animacoes

- Cards: stagger fadeUp no `whileInView`
- Filtro: ao mudar categoria, usar `AnimatePresence` com `layout` prop nos cards para transicao suave
- Hover no card: `whileHover={{ y: -4 }}` + sombra aumentada
- Botao Encomendar: escala subtil no hover

#### Funcionalidade

- State local: `const [categoria, setCategoria] = useState<"todos" | "paes" | "doces">("todos")`
- Filtrar: `PRODUTOS.filter(p => categoria === "todos" || p.categoria === categoria)`
- Ao clicar "Encomendar": `window.open(getWhatsAppUrl(produto.nome), "_blank")`

#### Acessibilidade

- `<section id="produtos" aria-label="Os nossos produtos">`
- Filtro: `role="tablist"`, cada botao `role="tab"` com `aria-selected`
- Cards: semantica com `<article>`, `<h3>` para nome do produto
- Botao encomendar: `aria-label="Encomendar {nome do produto} pelo WhatsApp"`

---

### S04 — Como Encomendar (`s04-como-encomendar.tsx`)

**Objetivo:** Remover friccao. Mostrar que encomendar e simples (3 passos).

#### Conteudo

- Label: "COMO ENCOMENDAR"
- Titulo: "Simples como 1, 2, 3" (h2)
- 3 passos ilustrados:
  1. **Escolha** (icon: `ShoppingBag`) — "Veja os nossos produtos e escolha os seus favoritos"
  2. **WhatsApp** (icon: `MessageCircle`) — "Envie-nos mensagem pelo WhatsApp com a sua encomenda"
  3. **Entrega** (icon: `Truck`) — "Receba em casa, fresquinho e feito com amor"
- Info de horario: "Entregas de segunda a sexta em Olhao e arredores"
- CTA grande final: "Fazer Encomenda" (ShimmerButton)
- Texto adicional: "Ou ligue para 914 882 047 / 932 642 860"

#### Layout

```
Mobile:
┌──────────────────────────┐
│  COMO ENCOMENDAR          │
│  Simples como 1, 2, 3     │
│                           │
│      ① ──────────         │
│   Escolha                 │
│   descricao               │
│                           │
│      ② ──────────         │
│   WhatsApp                │
│   descricao               │
│                           │
│      ③ ──────────         │
│   Entrega                 │
│   descricao               │
│                           │
│  info horario             │
│                           │
│  [  Fazer Encomenda  ]    │
│  ou ligue: 914 882 047    │
└──────────────────────────┘

Desktop: flex-row ou grid-cols-3 para os 3 passos, com linhas a conectar
```

#### Design

- **Background:** `bg-[#1B5E5E]` (teal dark — secao escura para contraste)
- **Texto:** `text-white` para titulos, `text-white/60` para corpo
- **Numeros dos passos:** `text-5xl font-bold text-[#C9A050]/30` (dourado semitransparente, grande atras)
- **Icones:** `bg-[#C9A050]/15 w-14 h-14 rounded-2xl` com icone em `text-[#C9A050]`
- **Linha conectora (desktop):** Linha tracejada horizontal `border-dashed border-[#C9A050]/20` entre os passos
- **CTA:** ShimmerButton com `bgColor="#C9A050"`, `shimmerColor="rgba(255,255,255,0.2)"`
- **Glow decorativo:** Blob `bg-[#C9A050]/8 blur-[100px]` no fundo

#### Animacoes

- Passos: stagger fadeUp
- Numeros: `initial={{ scale: 0.5, opacity: 0 }}` → animar para full size
- CTA: fadeUp com delay apos os 3 passos

#### Acessibilidade

- `<section id="como-encomendar" aria-label="Como encomendar">`
- Passos: `<ol>` com `<li>` para lista ordenada semantica
- Links de telefone: `<a href="tel:+351914882047">`

---

### S05 — Footer (`s05-footer.tsx`)

**Objetivo:** Informacoes de contacto, horario, encerrar a pagina.

#### Conteudo

- **Coluna 1 — Marca:**
  - Nome "Sabor Abencoado" (h3, dourado)
  - "Pastry Takeaway" (subtitulo)
  - Frase curta sobre a padaria

- **Coluna 2 — Horario & Entrega:**
  - "Horario" (h4)
  - Segunda a Sexta: Entregas disponiveis
  - Sabado e Domingo: Encerrado
  - "Zona de entrega: Olhao e arredores"

- **Coluna 3 — Contactos:**
  - WhatsApp 1: 914 882 047 (link)
  - WhatsApp 2: 932 642 860 (link)
  - Localizacao: Olhao, Algarve

- **Barra inferior:**
  - "(c) 2026 Sabor Abencoado. Todos os direitos reservados."
  - "Olhao, Algarve - Portugal"
  - "Feito com amor por Descomplicai"

#### Layout

```
Mobile: stack vertical, cada coluna em bloco separado
Desktop: grid-cols-3

Barra inferior: flex-col em mobile, flex-row em desktop, separada por border-t
```

#### Design

- **Background:** `bg-[#2D2D2D]` (dark) ou `bg-[#1B5E5E]` (teal escuro para consistencia com a secao anterior — ESCOLHER: teal se s04 for teal, senao usar dark para contraste)
  - **Decisao:** Usar `bg-[#2D2D2D]` para diferenciar do s04
- **Texto:** `text-white/40` para corpo, `text-[#C9A050]` para o nome da marca
- **Links hover:** `hover:text-[#C9A050] transition-colors`
- **Icones:** `text-[#C9A050]` (dourado)
- **Border top:** `border-t border-white/10`

#### Animacoes

- Nenhuma animacao de entrada necessaria (footer e o fim da pagina)
- Links com `transition-colors duration-200` no hover

#### Acessibilidade

- `<footer aria-label="Rodape">`
- Links com `aria-label` descritivo
- Telefones como `<a href="tel:...">`
- WhatsApp como `<a href="https://wa.me/..." target="_blank" rel="noopener noreferrer">`

---

## CSS Personalizado (sabor-abencoado.css)

```css
/* Importar no layout.tsx */

/* Keyframes para elementos celestiais */
@keyframes sa-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

@keyframes sa-float-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes sa-twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes sa-pulse-soft {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Classes utilitarias */
.sa-float {
  animation: sa-float 4s ease-in-out infinite;
}

.sa-float-slow {
  animation: sa-float-slow 6s ease-in-out infinite;
}

.sa-twinkle {
  animation: sa-twinkle 3s ease-in-out infinite;
}

.sa-twinkle-delay {
  animation: sa-twinkle 3s ease-in-out 1.5s infinite;
}

.sa-pulse-soft {
  animation: sa-pulse-soft 4s ease-in-out infinite;
}

/* Cloud shape decorativa (usada como pseudo-elemento ou div) */
.sa-cloud {
  background: rgba(168, 200, 224, 0.15);
  border-radius: 50px;
  position: absolute;
  filter: blur(1px);
}

/* Smooth scroll para todo o site */
html {
  scroll-behavior: smooth;
}
```

---

## layout.tsx

```tsx
import type { Metadata } from "next";
import "./sabor-abencoado.css";

export const metadata: Metadata = {
  title: "Sabor Abencoado — Pastry Takeaway | Olhao",
  description: "Bolos e paes caseiros feitos com amor. Entrega ao domicilio em Olhao, Algarve. Encomende pelo WhatsApp.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FFF8F0] text-[#2D2D2D] min-h-screen">
      {children}
    </div>
  );
}
```

---

## page.tsx

```tsx
"use client";

import Hero from "./_sections/s01-hero";
import Sobre from "./_sections/s02-sobre";
import Produtos from "./_sections/s03-produtos";
import ComoEncomendar from "./_sections/s04-como-encomendar";
import Footer from "./_sections/s05-footer";

export default function SaborAbencoado() {
  return (
    <main>
      <Hero />
      <Sobre />
      <Produtos />
      <ComoEncomendar />
      <Footer />
    </main>
  );
}
```

---

## Mobile-First: Decisoes Chave

1. **Touch targets:** Todos os botoes com minimo `py-3 px-6` (48px de altura minima)
2. **Texto legivel:** Minimo `text-base` (16px) para corpo, nunca menor que `text-sm` (14px)
3. **Cards full-width:** Em mobile, cards ocupam 100% da largura (`grid-cols-1`)
4. **CTAs empilhados:** Em mobile, botoes em `flex-col` com `gap-3`
5. **Espacamento generoso:** `py-16 px-5` em mobile, `py-28 px-6` em desktop
6. **Imagens/emojis:** Emojis grandes (text-4xl) sao suficientes — nao precisamos de imagens pesadas
7. **WhatsApp botao fixo:** Considerar um botao flutuante fixo no canto inferior direito, so em mobile:
   ```tsx
   <a href={WHATSAPP_MAIN} className="fixed bottom-6 right-6 z-50 md:hidden bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
     <MessageCircle className="w-6 h-6" />
   </a>
   ```

---

## Componentes Shared-UI Disponiveis (reutilizar)

Do projeto portfolio, importar de `@/components/shared-ui/`:

| Componente       | Uso neste projeto                                    |
|------------------|------------------------------------------------------|
| `ShimmerButton`  | CTAs de WhatsApp (dourado)                          |
| `FloatingNav`    | NAO usar — site simples demais para nav flutuante    |
| `TextReveal`     | Titulo "Sabor Abencoado" no hero                     |
| `Marquee`        | OPCIONAL — frase de rodape ou entre secoes            |

---

## Elementos Tematicos (Celestial/Abencoado)

O tema do logo e celestial — anjo, nuvens, estrelas, lua. Incorporar subtilmente:

1. **Nuvens:** Divs com `border-radius: 50px` e `bg-[#A8C8E0]/15`, posicionadas absolute nos cantos das secoes. 2-3 nuvens no hero, 1 no sobre.
2. **Estrelas:** Caracteres ★ ou ✦ em `text-[#C9A050]/40` com animacao `twinkle`. Espalhar 3-5 no hero.
3. **Halos/brilhos:** Blobs de `blur-[100px]` em rosa claro ou azul claro atras de titulos.
4. **Coracao:** Usar ❤ em `text-[#E8A0B0]` junto ao slogan "feito com amor".
5. **Asas:** NAO tentar replicar as asas do logo em CSS — manter simplicidade.

---

## Checklist de Implementacao

- [ ] Criar `sabor-abencoado.css` com variaves e keyframes
- [ ] Criar `layout.tsx` com metadata
- [ ] Criar `page.tsx` com imports das secoes
- [ ] Implementar `s01-hero.tsx` com decoracoes celestiais
- [ ] Implementar `s02-sobre.tsx` com 3 cards de valores
- [ ] Implementar `s03-produtos.tsx` com filtro e cards
- [ ] Implementar `s04-como-encomendar.tsx` com 3 passos
- [ ] Implementar `s05-footer.tsx` com contactos
- [ ] Testar em viewport mobile (375px)
- [ ] Verificar todos os links WhatsApp
- [ ] Validar acessibilidade (headings, aria-labels, contraste)
