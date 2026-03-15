# Plano: 4 Sites de Experiências de Vinhos em Portugal

## Visão Geral
4 landing pages premium para experiências vínicas em Portugal, cada uma com identidade visual única, embeddadas como sub-rotas no portfolio Descomplicai (`/projetos/vindima-selvagem`, `/projetos/noir-tasting`, `/projetos/rota-dos-vinhos`, `/projetos/terroir-alma`).

**Princípios**: Mobile-first (98% phone), lightweight effects, self-contained com CSS scoped, zero dependências externas novas.

---

## Os 4 Sites

### 1. Vindima Selvagem (€€) — Vindima Participativa no Douro
- **Tom**: Rústico, autêntico, terra
- **Paleta**: Terracotta (#C4704B), verde oliva (#6B7F3B), creme (#F5F0E6), castanho (#3D2B1F)
- **Tipografia**: Serif orgânica + sans clean
- **Efeitos**: Parallax suave nas imagens, text reveal on scroll, grain texture overlay
- **Secções**: Hero (vinha ao pôr-do-sol), A Experiência (timeline do dia), O Que Inclui (cards), Galeria, Testemunhos, Reservar

### 2. Noir Tasting (€€€€) — Provas Privadas em Caves Históricas
- **Tom**: Exclusivo, misterioso, luxuoso
- **Paleta**: Preto (#0A0A0A), dourado (#C9A84C), burgundy (#722F37), off-white (#F8F5F0)
- **Tipografia**: Didot/serif elegante + light sans
- **Efeitos**: Cinematic text reveal (blur → focus), fade-in dramático, glow sutil no dourado
- **Secções**: Hero (cave escura com velas), A Prova (steps verticais), Vinhos Exclusivos (carousel), O Espaço (galeria), Pricing (2 tiers), Reservar

### 3. Rota dos Vinhos (€) — Rotas Turísticas por Regiões
- **Tom**: Acessível, aventureiro, solar
- **Paleta**: Branco (#FFFFFF), azul oceano (#2563EB), amarelo sol (#F59E0B), verde vinha (#16A34A), coral (#F97316)
- **Tipografia**: Rounded sans-serif, friendly
- **Efeitos**: Horizontal snap scroll para regiões, infinite slider para fotos, cards com hover lift, badges coloridos
- **Secções**: Hero (mapa estilizado), Regiões (horizontal scroll cards), Como Funciona (3 steps), Experiências (grid), FAQ, Reservar

### 4. Terroir & Alma (€€€) — Retiros Imersivos com Produtores
- **Tom**: Editorial, storytelling, intimista
- **Paleta**: Cream (#FAF7F2), charcoal (#2D2D2D), wine (#8B1A3A), sage (#9CAF88)
- **Tipografia**: Playfair Display italic + Inter light (editorial style)
- **Efeitos**: Magazine layout assimétrico, pull quotes grandes, parallax cinematográfico, text reveal staggered
- **Secções**: Hero (produtor nas vinhas), A Filosofia (manifesto editorial), O Retiro (timeline 3 dias), Produtores (profiles), Testemunhos (editorial carousel), Reservar

---

## Plano de Execução (24 Etapas)

### Fase 0: Setup (Etapas 1-2)
1. Criar estrutura de diretórios para os 4 sites dentro de `/app/projetos/`
2. Preparar layouts com metadata e CSS scoped para cada site

### Fase 1: Vindima Selvagem (Etapas 3-7)
3. Hero section — imagem de vinha com overlay gradient, título com text reveal, CTA
4. A Experiência — timeline vertical do dia (6h-20h) com scroll animation
5. O Que Inclui — 6 cards com ícones, hover lift, grain background
6. Testemunhos — carousel simples com aspas grandes
7. Reservar/Contact — CTA final com WhatsApp link, footer

### Fase 2: Noir Tasting (Etapas 8-12)
8. Hero section — full-screen dark com text cinematic reveal (blur→focus), partículas douradas subtis
9. A Prova — 5 steps verticais com fade-in staggered, ícones de taça
10. Vinhos Exclusivos — horizontal scroll de 6 vinhos com detalhes no hover
11. Pricing — 2 tiers (Clássica €150, Reserva €350) com glassmorphism cards
12. Contact/Reservar — formulário minimalista dark, footer elegante

### Fase 3: Rota dos Vinhos (Etapas 13-17)
13. Hero section — mapa estilizado de Portugal com regiões highlighted, título bold
14. Regiões — horizontal snap scroll com 6 regiões (Douro, Alentejo, Dão, Bairrada, Vinhos Verdes, Lisboa)
15. Como Funciona — 3 steps horizontais com ícones animados
16. Experiências — grid 2x3 de pacotes com badges de preço, categoria
17. FAQ + CTA — accordion FAQ, CTA com WhatsApp, footer colorido

### Fase 4: Terroir & Alma (Etapas 18-22)
18. Hero section — editorial full-bleed com parallax, título Playfair italic, scroll indicator
19. A Filosofia — manifesto em layout 2-col com pull quote grande
20. O Retiro — timeline de 3 dias com layout assimétrico, imagens alternadas
21. Produtores — 3 profiles com foto, bio, vinho signature
22. Testemunhos + CTA — editorial testimonial carousel, CTA final, footer magazine

### Fase 5: Integração (Etapas 23-24)
23. Adicionar os 4 sites ao array PROJECTS em `/projetos/page.tsx` e `page.tsx` (homepage)
24. Build completo, double-check, commit e push para deploy
