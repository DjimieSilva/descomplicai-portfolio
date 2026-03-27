"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Category =
  | "metal-alcalino"
  | "metal-alcalino-terroso"
  | "metal-transicao"
  | "metal"
  | "metaloide"
  | "nao-metal"
  | "gas-nobre"
  | "lantanideo"
  | "actinideo";

type State = "solido" | "liquido" | "gas" | "desconhecido";

interface Element {
  number: number;
  symbol: string;
  name: string;
  mass: number | string;
  category: Category;
  group: number | null;
  period: number;
  electronConfig: string;
  discoveryYear: number | string;
  meltingPoint: number | null; // K
  boilingPoint: number | null; // K
  funFact: string;
  stateAtRoom: State;
}

// ─── Category Config ──────────────────────────────────────────────────────────

const CATEGORIES: Record<
  Category,
  { label: string; color: string; bg: string; border: string; glow: string }
> = {
  "metal-alcalino": {
    label: "Metais Alcalinos",
    color: "#fca5a5",
    bg: "rgba(220,38,38,0.18)",
    border: "rgba(220,38,38,0.5)",
    glow: "rgba(220,38,38,0.6)",
  },
  "metal-alcalino-terroso": {
    label: "Metais Alcalino-Terrosos",
    color: "#fdba74",
    bg: "rgba(234,88,12,0.18)",
    border: "rgba(234,88,12,0.5)",
    glow: "rgba(234,88,12,0.6)",
  },
  "metal-transicao": {
    label: "Metais de Transição",
    color: "#fde047",
    bg: "rgba(202,138,4,0.18)",
    border: "rgba(202,138,4,0.5)",
    glow: "rgba(202,138,4,0.6)",
  },
  metal: {
    label: "Metais",
    color: "#93c5fd",
    bg: "rgba(37,99,235,0.18)",
    border: "rgba(37,99,235,0.5)",
    glow: "rgba(37,99,235,0.6)",
  },
  metaloide: {
    label: "Metalóides",
    color: "#86efac",
    bg: "rgba(22,163,74,0.18)",
    border: "rgba(22,163,74,0.5)",
    glow: "rgba(22,163,74,0.6)",
  },
  "nao-metal": {
    label: "Não-Metais",
    color: "#d8b4fe",
    bg: "rgba(124,58,237,0.18)",
    border: "rgba(124,58,237,0.5)",
    glow: "rgba(124,58,237,0.6)",
  },
  "gas-nobre": {
    label: "Gases Nobres",
    color: "#67e8f9",
    bg: "rgba(8,145,178,0.18)",
    border: "rgba(8,145,178,0.5)",
    glow: "rgba(8,145,178,0.6)",
  },
  lantanideo: {
    label: "Lantanídeos",
    color: "#f9a8d4",
    bg: "rgba(219,39,119,0.18)",
    border: "rgba(219,39,119,0.5)",
    glow: "rgba(219,39,119,0.6)",
  },
  actinideo: {
    label: "Actinídeos",
    color: "#d1d5db",
    bg: "rgba(107,114,128,0.18)",
    border: "rgba(107,114,128,0.5)",
    glow: "rgba(107,114,128,0.6)",
  },
};

// ─── Element Data (all 118) ───────────────────────────────────────────────────

const ELEMENTS: Element[] = [
  { number: 1, symbol: "H", name: "Hidrogênio", mass: 1.008, category: "nao-metal", group: 1, period: 1, electronConfig: "1s¹", discoveryYear: 1766, meltingPoint: 14.01, boilingPoint: 20.28, stateAtRoom: "gas", funFact: "Elemento mais abundante do universo, compõe cerca de 75% de toda a matéria normal." },
  { number: 2, symbol: "He", name: "Hélio", mass: 4.0026, category: "gas-nobre", group: 18, period: 1, electronConfig: "1s²", discoveryYear: 1868, meltingPoint: 0.95, boilingPoint: 4.22, stateAtRoom: "gas", funFact: "Segundo elemento mais abundante no universo. Seu nome vem de Helios, deus grego do sol." },
  { number: 3, symbol: "Li", name: "Lítio", mass: 6.941, category: "metal-alcalino", group: 1, period: 2, electronConfig: "[He] 2s¹", discoveryYear: 1817, meltingPoint: 453.69, boilingPoint: 1615, stateAtRoom: "solido", funFact: "Tão leve que flutua na água. Usado em baterias de celulares e carros elétricos." },
  { number: 4, symbol: "Be", name: "Berílio", mass: 9.0122, category: "metal-alcalino-terroso", group: 2, period: 2, electronConfig: "[He] 2s²", discoveryYear: 1798, meltingPoint: 1560, boilingPoint: 2742, stateAtRoom: "solido", funFact: "Extremamente tóxico, mas transparente a raios-X. Usado em janelas de detectores de raios-X." },
  { number: 5, symbol: "B", name: "Boro", mass: 10.81, category: "metaloide", group: 13, period: 2, electronConfig: "[He] 2s² 2p¹", discoveryYear: 1808, meltingPoint: 2349, boilingPoint: 4200, stateAtRoom: "solido", funFact: "Boro é essencial para plantas. O bórax foi usado por civilizações antigas para soldar ouro." },
  { number: 6, symbol: "C", name: "Carbono", mass: 12.011, category: "nao-metal", group: 14, period: 2, electronConfig: "[He] 2s² 2p²", discoveryYear: "Pré-histórico", meltingPoint: 3823, boilingPoint: 4098, stateAtRoom: "solido", funFact: "Base de toda vida conhecida. O diamante (carbono puro) é o material natural mais duro." },
  { number: 7, symbol: "N", name: "Nitrogênio", mass: 14.007, category: "nao-metal", group: 15, period: 2, electronConfig: "[He] 2s² 2p³", discoveryYear: 1772, meltingPoint: 63.15, boilingPoint: 77.36, stateAtRoom: "gas", funFact: "Representa 78% da atmosfera terrestre. Líquido a -196°C, usado para congelar amostras biológicas." },
  { number: 8, symbol: "O", name: "Oxigênio", mass: 15.999, category: "nao-metal", group: 16, period: 2, electronConfig: "[He] 2s² 2p⁴", discoveryYear: 1774, meltingPoint: 54.36, boilingPoint: 90.2, stateAtRoom: "gas", funFact: "O terceiro elemento mais abundante no universo. Essencial para a respiração da maioria dos seres vivos." },
  { number: 9, symbol: "F", name: "Flúor", mass: 18.998, category: "nao-metal", group: 17, period: 2, electronConfig: "[He] 2s² 2p⁵", discoveryYear: 1886, meltingPoint: 53.48, boilingPoint: 85.03, stateAtRoom: "gas", funFact: "O elemento mais eletronegativo e reativo de todos. Corrói quase todos os materiais conhecidos." },
  { number: 10, symbol: "Ne", name: "Neônio", mass: 20.18, category: "gas-nobre", group: 18, period: 2, electronConfig: "[He] 2s² 2p⁶", discoveryYear: 1898, meltingPoint: 24.56, boilingPoint: 27.07, stateAtRoom: "gas", funFact: "Emite a característica luz vermelha-laranja em letreiros de neon. Nome vem do grego 'neos' (novo)." },
  { number: 11, symbol: "Na", name: "Sódio", mass: 22.99, category: "metal-alcalino", group: 1, period: 3, electronConfig: "[Ne] 3s¹", discoveryYear: 1807, meltingPoint: 370.87, boilingPoint: 1156, stateAtRoom: "solido", funFact: "Explode em contato com água. É componente essencial do sal de cozinha (NaCl)." },
  { number: 12, symbol: "Mg", name: "Magnésio", mass: 24.305, category: "metal-alcalino-terroso", group: 2, period: 3, electronConfig: "[Ne] 3s²", discoveryYear: 1755, meltingPoint: 923, boilingPoint: 1363, stateAtRoom: "solido", funFact: "Queima com chama branca intensa. Presente na clorofila, pigmento verde das plantas." },
  { number: 13, symbol: "Al", name: "Alumínio", mass: 26.982, category: "metal", group: 13, period: 3, electronConfig: "[Ne] 3s² 3p¹", discoveryYear: 1825, meltingPoint: 933.47, boilingPoint: 2792, stateAtRoom: "solido", funFact: "O metal mais abundante na crosta terrestre. Era mais valioso que o ouro no século XIX." },
  { number: 14, symbol: "Si", name: "Silício", mass: 28.085, category: "metaloide", group: 14, period: 3, electronConfig: "[Ne] 3s² 3p²", discoveryYear: 1824, meltingPoint: 1687, boilingPoint: 3538, stateAtRoom: "solido", funFact: "Base da eletrônica moderna. O Vale do Silício recebeu o nome em sua homenagem." },
  { number: 15, symbol: "P", name: "Fósforo", mass: 30.974, category: "nao-metal", group: 15, period: 3, electronConfig: "[Ne] 3s² 3p³", discoveryYear: 1669, meltingPoint: 317.3, boilingPoint: 550, stateAtRoom: "solido", funFact: "Primeiro elemento descoberto por um processo químico documentado. O fósforo branco brilha no escuro." },
  { number: 16, symbol: "S", name: "Enxofre", mass: 32.06, category: "nao-metal", group: 16, period: 3, electronConfig: "[Ne] 3s² 3p⁴", discoveryYear: "Pré-histórico", meltingPoint: 388.36, boilingPoint: 717.87, stateAtRoom: "solido", funFact: "Conhecido desde a antiguidade. O cheiro de ovo podre é causado pelo sulfeto de hidrogênio (H₂S)." },
  { number: 17, symbol: "Cl", name: "Cloro", mass: 35.45, category: "nao-metal", group: 17, period: 3, electronConfig: "[Ne] 3s² 3p⁵", discoveryYear: 1774, meltingPoint: 171.6, boilingPoint: 239.11, stateAtRoom: "gas", funFact: "Usado como arma química na Primeira Guerra Mundial. Hoje é essencial para desinfetar água potável." },
  { number: 18, symbol: "Ar", name: "Argônio", mass: 39.948, category: "gas-nobre", group: 18, period: 3, electronConfig: "[Ne] 3s² 3p⁶", discoveryYear: 1894, meltingPoint: 83.8, boilingPoint: 87.3, stateAtRoom: "gas", funFact: "Terceiro gás mais abundante na atmosfera. Usado para encher lâmpadas incandescentes e soldar metais." },
  { number: 19, symbol: "K", name: "Potássio", mass: 39.098, category: "metal-alcalino", group: 1, period: 4, electronConfig: "[Ar] 4s¹", discoveryYear: 1807, meltingPoint: 336.53, boilingPoint: 1032, stateAtRoom: "solido", funFact: "Essencial para o funcionamento do coração. A banana é famosa por seu alto teor de potássio." },
  { number: 20, symbol: "Ca", name: "Cálcio", mass: 40.078, category: "metal-alcalino-terroso", group: 2, period: 4, electronConfig: "[Ar] 4s²", discoveryYear: 1808, meltingPoint: 1115, boilingPoint: 1757, stateAtRoom: "solido", funFact: "Elemento mais abundante nos ossos e dentes. O cimento Portland contém grande quantidade de cálcio." },
  { number: 21, symbol: "Sc", name: "Escândio", mass: 44.956, category: "metal-transicao", group: 3, period: 4, electronConfig: "[Ar] 3d¹ 4s²", discoveryYear: 1879, meltingPoint: 1814, boilingPoint: 3109, stateAtRoom: "solido", funFact: "Raro na Terra mas comum no sol e em certas estrelas. Usado em lâmpadas de alta intensidade." },
  { number: 22, symbol: "Ti", name: "Titânio", mass: 47.867, category: "metal-transicao", group: 4, period: 4, electronConfig: "[Ar] 3d² 4s²", discoveryYear: 1791, meltingPoint: 1941, boilingPoint: 3560, stateAtRoom: "solido", funFact: "Tão forte quanto o aço, mas 45% mais leve. Biocompatível, usado em implantes cirúrgicos e próteses." },
  { number: 23, symbol: "V", name: "Vanádio", mass: 50.942, category: "metal-transicao", group: 5, period: 4, electronConfig: "[Ar] 3d³ 4s²", discoveryYear: 1801, meltingPoint: 2183, boilingPoint: 3680, stateAtRoom: "solido", funFact: "Descoberto e redescoberto duas vezes. O vanadato de sódio é estudado como possível medicamento para diabetes." },
  { number: 24, symbol: "Cr", name: "Cromo", mass: 51.996, category: "metal-transicao", group: 6, period: 4, electronConfig: "[Ar] 3d⁵ 4s¹", discoveryYear: 1798, meltingPoint: 2180, boilingPoint: 2944, stateAtRoom: "solido", funFact: "Confere dureza e brilho ao aço inoxidável. O nome vem do grego 'chroma' (cor) por seus compostos coloridos." },
  { number: 25, symbol: "Mn", name: "Manganês", mass: 54.938, category: "metal-transicao", group: 7, period: 4, electronConfig: "[Ar] 3d⁵ 4s²", discoveryYear: 1774, meltingPoint: 1519, boilingPoint: 2334, stateAtRoom: "solido", funFact: "Essencial para fotossíntese. É o quarto metal mais usado industrialmente, atrás do ferro, alumínio e cobre." },
  { number: 26, symbol: "Fe", name: "Ferro", mass: 55.845, category: "metal-transicao", group: 8, period: 4, electronConfig: "[Ar] 3d⁶ 4s²", discoveryYear: "Pré-histórico", meltingPoint: 1811, boilingPoint: 3134, stateAtRoom: "solido", funFact: "O núcleo da Terra é composto principalmente de ferro. Define o fim da fusão estelar em estrelas massivas." },
  { number: 27, symbol: "Co", name: "Cobalto", mass: 58.933, category: "metal-transicao", group: 9, period: 4, electronConfig: "[Ar] 3d⁷ 4s²", discoveryYear: 1735, meltingPoint: 1768, boilingPoint: 3200, stateAtRoom: "solido", funFact: "O azul cobalto é usado em pinturas há milênios. Vitamina B12 contém cobalto em seu centro." },
  { number: 28, symbol: "Ni", name: "Níquel", mass: 58.693, category: "metal-transicao", group: 10, period: 4, electronConfig: "[Ar] 3d⁸ 4s²", discoveryYear: 1751, meltingPoint: 1728, boilingPoint: 3186, stateAtRoom: "solido", funFact: "Meteoros de ferro frequentemente contêm níquel. O nome vem do alemão 'Kupfernickel' (cobre do diabo)." },
  { number: 29, symbol: "Cu", name: "Cobre", mass: 63.546, category: "metal-transicao", group: 11, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s¹", discoveryYear: "Pré-histórico", meltingPoint: 1357.77, boilingPoint: 2835, stateAtRoom: "solido", funFact: "Primeiro metal usado pelo homem. Ótimo condutor elétrico, essencial para toda fiação elétrica moderna." },
  { number: 30, symbol: "Zn", name: "Zinco", mass: 65.38, category: "metal-transicao", group: 12, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s²", discoveryYear: 1746, meltingPoint: 692.68, boilingPoint: 1180, stateAtRoom: "solido", funFact: "Essencial para o sistema imunológico. Galvanização com zinco protege o aço da ferrugem." },
  { number: 31, symbol: "Ga", name: "Gálio", mass: 69.723, category: "metal", group: 13, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s² 4p¹", discoveryYear: 1875, meltingPoint: 302.91, boilingPoint: 2477, stateAtRoom: "solido", funFact: "Derrete na palma da mão (ponto de fusão 29,76°C). Previsto por Mendeleev antes de ser descoberto." },
  { number: 32, symbol: "Ge", name: "Germânio", mass: 72.63, category: "metaloide", group: 14, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s² 4p²", discoveryYear: 1886, meltingPoint: 1211.4, boilingPoint: 3106, stateAtRoom: "solido", funFact: "Também previsto por Mendeleev. Foi crucial no desenvolvimento dos primeiros transistores de germânio." },
  { number: 33, symbol: "As", name: "Arsênio", mass: 74.922, category: "metaloide", group: 15, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s² 4p³", discoveryYear: 1250, meltingPoint: 1090, boilingPoint: 887, stateAtRoom: "solido", funFact: "Famoso como veneno histórico. Em baixas doses, foi usado como remédio por séculos." },
  { number: 34, symbol: "Se", name: "Selênio", mass: 78.971, category: "nao-metal", group: 16, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁴", discoveryYear: 1817, meltingPoint: 494, boilingPoint: 958, stateAtRoom: "solido", funFact: "Essencial à saúde em doses mínimas, tóxico em excesso. Usado em células solares e fotocopiadoras." },
  { number: 35, symbol: "Br", name: "Bromo", mass: 79.904, category: "nao-metal", group: 17, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵", discoveryYear: 1826, meltingPoint: 265.8, boilingPoint: 332, stateAtRoom: "liquido", funFact: "Um dos apenas dois elementos que são líquidos à temperatura ambiente (junto com o mercúrio)." },
  { number: 36, symbol: "Kr", name: "Criptônio", mass: 83.798, category: "gas-nobre", group: 18, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶", discoveryYear: 1898, meltingPoint: 115.79, boilingPoint: 119.93, stateAtRoom: "gas", funFact: "Nada a ver com Kryptonita do Superman! Em 1960, um metro era definido pela luz emitida pelo criptônio." },
  { number: 37, symbol: "Rb", name: "Rubídio", mass: 85.468, category: "metal-alcalino", group: 1, period: 5, electronConfig: "[Kr] 5s¹", discoveryYear: 1861, meltingPoint: 312.46, boilingPoint: 961, stateAtRoom: "solido", funFact: "Tão reativo que inflama espontaneamente no ar. Seu nome vem do latim 'rubidus' (vermelho profundo)." },
  { number: 38, symbol: "Sr", name: "Estrôncio", mass: 87.62, category: "metal-alcalino-terroso", group: 2, period: 5, electronConfig: "[Kr] 5s²", discoveryYear: 1790, meltingPoint: 1050, boilingPoint: 1655, stateAtRoom: "solido", funFact: "Seus sais produzem a cor vermelha brilhante em fogos de artifício. Descoberto em Strontian, Escócia." },
  { number: 39, symbol: "Y", name: "Ítrio", mass: 88.906, category: "metal-transicao", group: 3, period: 5, electronConfig: "[Kr] 4d¹ 5s²", discoveryYear: 1794, meltingPoint: 1799, boilingPoint: 3609, stateAtRoom: "solido", funFact: "Usado em ligas de alta resistência para motores de aviação. Presente em supercondutores de alta temperatura." },
  { number: 40, symbol: "Zr", name: "Zircônio", mass: 91.224, category: "metal-transicao", group: 4, period: 5, electronConfig: "[Kr] 4d² 5s²", discoveryYear: 1789, meltingPoint: 2128, boilingPoint: 4682, stateAtRoom: "solido", funFact: "Altamente resistente à corrosão. O zircônio cúbico imita diamantes em joias por seu brilho intenso." },
  { number: 41, symbol: "Nb", name: "Nióbio", mass: 92.906, category: "metal-transicao", group: 5, period: 5, electronConfig: "[Kr] 4d⁴ 5s¹", discoveryYear: 1801, meltingPoint: 2750, boilingPoint: 5017, stateAtRoom: "solido", funFact: "O Brasil possui as maiores reservas mundiais de nióbio (98%). Torna o aço muito mais resistente." },
  { number: 42, symbol: "Mo", name: "Molibdênio", mass: 95.95, category: "metal-transicao", group: 6, period: 5, electronConfig: "[Kr] 4d⁵ 5s¹", discoveryYear: 1781, meltingPoint: 2896, boilingPoint: 4912, stateAtRoom: "solido", funFact: "Um dos metais com maior ponto de fusão. Bactérias fixadoras de nitrogênio precisam de molibdênio." },
  { number: 43, symbol: "Tc", name: "Tecnécio", mass: "(98)", category: "metal-transicao", group: 7, period: 5, electronConfig: "[Kr] 4d⁵ 5s²", discoveryYear: 1937, meltingPoint: 2430, boilingPoint: 4538, stateAtRoom: "solido", funFact: "Primeiro elemento produzido artificialmente. Seu isótopo Tc-99m é o mais usado em medicina nuclear." },
  { number: 44, symbol: "Ru", name: "Rutênio", mass: 101.07, category: "metal-transicao", group: 8, period: 5, electronConfig: "[Kr] 4d⁷ 5s¹", discoveryYear: 1844, meltingPoint: 2607, boilingPoint: 4423, stateAtRoom: "solido", funFact: "Descoberto por Karl Ernst Claus, que o nomeou em homenagem à Russia (Ruthenia). Endurece outros metais." },
  { number: 45, symbol: "Rh", name: "Ródio", mass: 102.91, category: "metal-transicao", group: 9, period: 5, electronConfig: "[Kr] 4d⁸ 5s¹", discoveryYear: 1803, meltingPoint: 2237, boilingPoint: 3968, stateAtRoom: "solido", funFact: "Um dos metais mais raros e caros. Catalisa a conversão de gases tóxicos em catalisadores de automóveis." },
  { number: 46, symbol: "Pd", name: "Paládio", mass: 106.42, category: "metal-transicao", group: 10, period: 5, electronConfig: "[Kr] 4d¹⁰", discoveryYear: 1803, meltingPoint: 1828.05, boilingPoint: 3236, stateAtRoom: "solido", funFact: "Pode absorver até 900 vezes seu volume em hidrogênio. Essencial em catalisadores automotivos." },
  { number: 47, symbol: "Ag", name: "Prata", mass: 107.87, category: "metal-transicao", group: 11, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s¹", discoveryYear: "Pré-histórico", meltingPoint: 1234.93, boilingPoint: 2435, stateAtRoom: "solido", funFact: "O melhor condutor elétrico natural. Tem propriedades antibacterianas conhecidas desde a antiguidade." },
  { number: 48, symbol: "Cd", name: "Cádmio", mass: 112.41, category: "metal-transicao", group: 12, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s²", discoveryYear: 1817, meltingPoint: 594.22, boilingPoint: 1040, stateAtRoom: "solido", funFact: "Altamente tóxico. Usado em baterias de níquel-cádmio e como pigmento amarelo na pintura." },
  { number: 49, symbol: "In", name: "Índio", mass: 114.82, category: "metal", group: 13, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s² 5p¹", discoveryYear: 1863, meltingPoint: 429.75, boilingPoint: 2345, stateAtRoom: "solido", funFact: "Emite um grito característico ao ser dobrado. Essencial nas telas touch screen como ITO." },
  { number: 50, symbol: "Sn", name: "Estanho", mass: 118.71, category: "metal", group: 14, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s² 5p²", discoveryYear: "Pré-histórico", meltingPoint: 505.08, boilingPoint: 2875, stateAtRoom: "solido", funFact: "Bronze é liga de cobre e estanho. O 'grito do estanho' é o som ao dobrar uma barra desse metal." },
  { number: 51, symbol: "Sb", name: "Antimônio", mass: 121.76, category: "metaloide", group: 15, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s² 5p³", discoveryYear: "Pré-histórico", meltingPoint: 903.78, boilingPoint: 1860, stateAtRoom: "solido", funFact: "Usado no antigo Egito como cosmético (kohl). Liga com chumbo para fazer baterias automotivas mais duras." },
  { number: 52, symbol: "Te", name: "Telúrio", mass: 127.6, category: "metaloide", group: 16, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁴", discoveryYear: 1782, meltingPoint: 722.66, boilingPoint: 1261, stateAtRoom: "solido", funFact: "Ingeri-lo faz o suor e respiração cheirarem mal por semanas. Usado em células solares de filmes finos." },
  { number: 53, symbol: "I", name: "Iodo", mass: 126.9, category: "nao-metal", group: 17, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵", discoveryYear: 1811, meltingPoint: 386.85, boilingPoint: 457.4, stateAtRoom: "solido", funFact: "Essencial para a tireoide. Sublima diretamente de sólido para vapor roxo belíssimo ao ser aquecido." },
  { number: 54, symbol: "Xe", name: "Xenônio", mass: 131.29, category: "gas-nobre", group: 18, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶", discoveryYear: 1898, meltingPoint: 161.4, boilingPoint: 165.03, stateAtRoom: "gas", funFact: "Usado em faróis de automóveis de alta intensidade e em propulsores iônicos de naves espaciais." },
  { number: 55, symbol: "Cs", name: "Césio", mass: 132.91, category: "metal-alcalino", group: 1, period: 6, electronConfig: "[Xe] 6s¹", discoveryYear: 1860, meltingPoint: 301.59, boilingPoint: 944, stateAtRoom: "solido", funFact: "O relógio atômico de césio é tão preciso que só perderia 1 segundo em 300 milhões de anos." },
  { number: 56, symbol: "Ba", name: "Bário", mass: 137.33, category: "metal-alcalino-terroso", group: 2, period: 6, electronConfig: "[Xe] 6s²", discoveryYear: 1808, meltingPoint: 1000, boilingPoint: 2170, stateAtRoom: "solido", funFact: "O 'coquetel de bário' ingerido para radiografias do trato digestivo é insolúvel e inofensivo (sulfato de bário)." },
  { number: 57, symbol: "La", name: "Lantânio", mass: 138.91, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 5d¹ 6s²", discoveryYear: 1839, meltingPoint: 1193, boilingPoint: 3737, stateAtRoom: "solido", funFact: "Nome vem do grego 'lanthanein' (esconder). Usado em lentes de câmeras de alta qualidade e filmes cinematográficos." },
  { number: 58, symbol: "Ce", name: "Cério", mass: 140.12, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f¹ 5d¹ 6s²", discoveryYear: 1803, meltingPoint: 1068, boilingPoint: 3716, stateAtRoom: "solido", funFact: "O mais abundante dos lantanídeos. Usado em pedras de isqueiro e como catalisador em conversores catalíticos." },
  { number: 59, symbol: "Pr", name: "Praseodímio", mass: 140.91, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f³ 6s²", discoveryYear: 1885, meltingPoint: 1208, boilingPoint: 3793, stateAtRoom: "solido", funFact: "Seus sais têm cor verde-amarelada. Usado em óculos de segurança para soldadores por absorver luz amarela intensa." },
  { number: 60, symbol: "Nd", name: "Neodímio", mass: 144.24, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f⁴ 6s²", discoveryYear: 1885, meltingPoint: 1297, boilingPoint: 3347, stateAtRoom: "solido", funFact: "Magnetos de neodímio são os ímãs permanentes mais fortes. Presentes em fones de ouvido e discos rígidos." },
  { number: 61, symbol: "Pm", name: "Promécio", mass: "(145)", category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f⁵ 6s²", discoveryYear: 1945, meltingPoint: 1315, boilingPoint: 3273, stateAtRoom: "solido", funFact: "Único lantanídeo sem isótopos estáveis. É extremamente raro na Terra — todo ele é produzido artificialmente." },
  { number: 62, symbol: "Sm", name: "Samário", mass: 150.36, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f⁶ 6s²", discoveryYear: 1879, meltingPoint: 1345, boilingPoint: 2067, stateAtRoom: "solido", funFact: "Magnetos de samário-cobalto resistem a temperaturas mais altas que os de neodímio. Usado em mísseis guiados." },
  { number: 63, symbol: "Eu", name: "Európio", mass: 151.96, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f⁷ 6s²", discoveryYear: 1901, meltingPoint: 1099, boilingPoint: 1802, stateAtRoom: "solido", funFact: "Responsável pelo vermelho nas telas de televisão CRT. Usado em marcas d'água fluorescentes em notas de euro." },
  { number: 64, symbol: "Gd", name: "Gadolínio", mass: 157.25, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f⁷ 5d¹ 6s²", discoveryYear: 1880, meltingPoint: 1585, boilingPoint: 3546, stateAtRoom: "solido", funFact: "Agente de contraste em exames de ressonância magnética. Tem a maior seção transversal para captura de nêutrons." },
  { number: 65, symbol: "Tb", name: "Térbio", mass: 158.93, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f⁹ 6s²", discoveryYear: 1843, meltingPoint: 1629, boilingPoint: 3503, stateAtRoom: "solido", funFact: "Nomeado após Ytterby, vila sueca de onde vieram 4 elementos. Usado em telas de alta definição e discos de armazenamento." },
  { number: 66, symbol: "Dy", name: "Disprósio", mass: 162.5, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f¹⁰ 6s²", discoveryYear: 1886, meltingPoint: 1680, boilingPoint: 2840, stateAtRoom: "solido", funFact: "Seu nome significa 'difícil de alcançar' em grego. Essencial em motores de veículos elétricos por suas propriedades magnéticas." },
  { number: 67, symbol: "Ho", name: "Hólmio", mass: 164.93, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f¹¹ 6s²", discoveryYear: 1878, meltingPoint: 1734, boilingPoint: 2993, stateAtRoom: "solido", funFact: "Tem o maior momento magnético de qualquer elemento. Nomeado em homenagem a Estocolmo (Holmia em latim)." },
  { number: 68, symbol: "Er", name: "Érbio", mass: 167.26, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f¹² 6s²", discoveryYear: 1843, meltingPoint: 1802, boilingPoint: 3141, stateAtRoom: "solido", funFact: "Também nomeado por Ytterby. Amplificadores de fibra óptica usam érbio para transmitir internet de alta velocidade." },
  { number: 69, symbol: "Tm", name: "Túlio", mass: 168.93, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f¹³ 6s²", discoveryYear: 1879, meltingPoint: 1818, boilingPoint: 2223, stateAtRoom: "solido", funFact: "O lantanídeo mais raro (junto com o lutécio). Nomeado em homenagem à Thule, nome mitológico da Escandinávia." },
  { number: 70, symbol: "Yb", name: "Itérbio", mass: 173.04, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f¹⁴ 6s²", discoveryYear: 1878, meltingPoint: 1097, boilingPoint: 1469, stateAtRoom: "solido", funFact: "Terceiro elemento nomeado após Ytterby. Relógios atômicos de itérbio prometem precisão ainda maior que os de césio." },
  { number: 71, symbol: "Lu", name: "Lutécio", mass: 174.97, category: "lantanideo", group: null, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹ 6s²", discoveryYear: 1907, meltingPoint: 1925, boilingPoint: 3675, stateAtRoom: "solido", funFact: "O mais pesado e duro dos lantanídeos. Nomeado em homenagem a Lutetia, nome romano de Paris." },
  { number: 72, symbol: "Hf", name: "Háfnio", mass: 178.49, category: "metal-transicao", group: 4, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d² 6s²", discoveryYear: 1923, meltingPoint: 2506, boilingPoint: 4876, stateAtRoom: "solido", funFact: "Sempre encontrado junto com o zircônio, o que dificultou muito sua descoberta. Usado em barras de controle de reatores nucleares." },
  { number: 73, symbol: "Ta", name: "Tântalo", mass: 180.95, category: "metal-transicao", group: 5, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d³ 6s²", discoveryYear: 1802, meltingPoint: 3290, boilingPoint: 5731, stateAtRoom: "solido", funFact: "Biocompatível e altamente resistente à corrosão. Capacitores de tântalo estão em todos os smartphones modernos." },
  { number: 74, symbol: "W", name: "Tungstênio", mass: 183.84, category: "metal-transicao", group: 6, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d⁴ 6s²", discoveryYear: 1783, meltingPoint: 3695, boilingPoint: 5828, stateAtRoom: "solido", funFact: "O maior ponto de fusão de todos os metais (3422°C). Filamentos de lâmpadas incandescentes são feitos de tungstênio." },
  { number: 75, symbol: "Re", name: "Rênio", mass: 186.21, category: "metal-transicao", group: 7, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d⁵ 6s²", discoveryYear: 1925, meltingPoint: 3459, boilingPoint: 5869, stateAtRoom: "solido", funFact: "Um dos últimos elementos estáveis a ser descoberto. Turbinas de aviões de última geração usam ligas de rênio." },
  { number: 76, symbol: "Os", name: "Ósmio", mass: 190.23, category: "metal-transicao", group: 8, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d⁶ 6s²", discoveryYear: 1803, meltingPoint: 3306, boilingPoint: 5285, stateAtRoom: "solido", funFact: "O elemento natural mais denso (22,59 g/cm³). Seu tetróxido tem cheiro detectável em concentrações ínfimas." },
  { number: 77, symbol: "Ir", name: "Irídio", mass: 192.22, category: "metal-transicao", group: 9, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d⁷ 6s²", discoveryYear: 1803, meltingPoint: 2719, boilingPoint: 4403, stateAtRoom: "solido", funFact: "Anomalia de irídio na camada K-Pg é evidência do meteorito que extinguiu os dinossauros há 66 milhões de anos." },
  { number: 78, symbol: "Pt", name: "Platina", mass: 195.08, category: "metal-transicao", group: 10, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d⁹ 6s¹", discoveryYear: 1735, meltingPoint: 2041.4, boilingPoint: 4098, stateAtRoom: "solido", funFact: "O padrão internacional do quilograma foi feito de liga de platina-irídio. Catalisador em células de combustível." },
  { number: 79, symbol: "Au", name: "Ouro", mass: 196.97, category: "metal-transicao", group: 11, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", discoveryYear: "Pré-histórico", meltingPoint: 1337.33, boilingPoint: 3129, stateAtRoom: "solido", funFact: "Todo o ouro já minerado caberia em um cubo de 21 metros de lado. Sua cor única é efeito relativístico." },
  { number: 80, symbol: "Hg", name: "Mercúrio", mass: 200.59, category: "metal-transicao", group: 12, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", discoveryYear: "Pré-histórico", meltingPoint: 234.32, boilingPoint: 629.88, stateAtRoom: "liquido", funFact: "Único metal líquido à temperatura ambiente. Os romanos o chamavam de 'prata líquida' e o usavam em rituais." },
  { number: 81, symbol: "Tl", name: "Tálio", mass: 204.38, category: "metal", group: 13, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹", discoveryYear: 1861, meltingPoint: 577, boilingPoint: 1746, stateAtRoom: "solido", funFact: "Veneno inodoro e insípido favorito de assassinos por séculos. Hoje usado em detectores de radiação infravermelha." },
  { number: 82, symbol: "Pb", name: "Chumbo", mass: 207.2, category: "metal", group: 14, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", discoveryYear: "Pré-histórico", meltingPoint: 600.61, boilingPoint: 2022, stateAtRoom: "solido", funFact: "Romanos adicionavam chumbo ao vinho como adoçante. Isso pode ter contribuído para o declínio do Império Romano." },
  { number: 83, symbol: "Bi", name: "Bismuto", mass: 208.98, category: "metal", group: 15, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³", discoveryYear: 1753, meltingPoint: 544.55, boilingPoint: 1837, stateAtRoom: "solido", funFact: "Tecnicamente radioativo, mas com meia-vida tão longa que é essencialmente estável. Forma cristais coloridos lindíssimos." },
  { number: 84, symbol: "Po", name: "Polônio", mass: "(209)", category: "metaloide", group: 16, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴", discoveryYear: 1898, meltingPoint: 527, boilingPoint: 1235, stateAtRoom: "solido", funFact: "Descoberto por Marie Curie, que o nomeou em homenagem à Polônia, sua pátria. Extremamente radioativo e tóxico." },
  { number: 85, symbol: "At", name: "Astato", mass: "(210)", category: "nao-metal", group: 17, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵", discoveryYear: 1940, meltingPoint: 575, boilingPoint: 610, stateAtRoom: "solido", funFact: "O elemento natural mais raro na crosta terrestre — menos de 28 gramas existem no planeta inteiro." },
  { number: 86, symbol: "Rn", name: "Radônio", mass: "(222)", category: "gas-nobre", group: 18, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶", discoveryYear: 1900, meltingPoint: 202, boilingPoint: 211.5, stateAtRoom: "gas", funFact: "Gás radioativo que emana do solo. Segunda causa de câncer de pulmão nos EUA, após o tabagismo." },
  { number: 87, symbol: "Fr", name: "Frâncio", mass: "(223)", category: "metal-alcalino", group: 1, period: 7, electronConfig: "[Rn] 7s¹", discoveryYear: 1939, meltingPoint: 281, boilingPoint: 950, stateAtRoom: "solido", funFact: "O segundo elemento mais eletropositivo. Em qualquer momento, existem menos de 30 gramas na crosta terrestre." },
  { number: 88, symbol: "Ra", name: "Rádio", mass: "(226)", category: "metal-alcalino-terroso", group: 2, period: 7, electronConfig: "[Rn] 7s²", discoveryYear: 1898, meltingPoint: 973, boilingPoint: 2010, stateAtRoom: "solido", funFact: "Descoberto por Marie e Pierre Curie. No início do século XX, era adicionado a tintas e remédios sem conhecer seu perigo." },
  { number: 89, symbol: "Ac", name: "Actínio", mass: "(227)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 6d¹ 7s²", discoveryYear: 1899, meltingPoint: 1323, boilingPoint: 3471, stateAtRoom: "solido", funFact: "Tão radioativo que brilha azul no escuro. Nome vem do grego 'aktis' (raio). Extremamente raro na natureza." },
  { number: 90, symbol: "Th", name: "Tório", mass: 232.04, category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 6d² 7s²", discoveryYear: 1829, meltingPoint: 2023, boilingPoint: 5061, stateAtRoom: "solido", funFact: "Mais abundante que o urânio. Combustível alternativo para reatores nucleares com menos resíduos radioativos." },
  { number: 91, symbol: "Pa", name: "Protactínio", mass: 231.04, category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f² 6d¹ 7s²", discoveryYear: 1913, meltingPoint: 1841, boilingPoint: 4300, stateAtRoom: "solido", funFact: "Altamente tóxico e radioativo. Faz parte da cadeia de decaimento do urânio-235." },
  { number: 92, symbol: "U", name: "Urânio", mass: 238.03, category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f³ 6d¹ 7s²", discoveryYear: 1789, meltingPoint: 1405.3, boilingPoint: 4404, stateAtRoom: "solido", funFact: "Combustível de reatores nucleares e armas atômicas. Um quilo de U-235 libera energia equivalente a 3.000 ton de carvão." },
  { number: 93, symbol: "Np", name: "Netúnio", mass: "(237)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f⁴ 6d¹ 7s²", discoveryYear: 1940, meltingPoint: 917, boilingPoint: 4175, stateAtRoom: "solido", funFact: "Primeiro elemento transurânico produzido artificialmente. Nomeado pelo planeta Netuno, após o Urânio." },
  { number: 94, symbol: "Pu", name: "Plutônio", mass: "(244)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f⁶ 7s²", discoveryYear: 1940, meltingPoint: 912.5, boilingPoint: 3501, stateAtRoom: "solido", funFact: "A bomba atômica de Nagasaki foi feita de plutônio. Tem a mais complexa estrutura de fase entre os metais." },
  { number: 95, symbol: "Am", name: "Amerício", mass: "(243)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f⁷ 7s²", discoveryYear: 1944, meltingPoint: 1449, boilingPoint: 2880, stateAtRoom: "solido", funFact: "Elemento transurânico com aplicação doméstica: está nos detectores de fumaça iônicos em quase toda casa." },
  { number: 96, symbol: "Cm", name: "Cúrio", mass: "(247)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f⁷ 6d¹ 7s²", discoveryYear: 1944, meltingPoint: 1613, boilingPoint: 3383, stateAtRoom: "solido", funFact: "Nomeado em homenagem a Marie e Pierre Curie. Tão radioativo que brilha vermelho escuro no escuro." },
  { number: 97, symbol: "Bk", name: "Berquélio", mass: "(247)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f⁹ 7s²", discoveryYear: 1949, meltingPoint: 1259, boilingPoint: 2900, stateAtRoom: "solido", funFact: "Nomeado em homenagem a Berkeley, Califórnia, onde foi sintetizado. Apenas miligramas já foram produzidos." },
  { number: 98, symbol: "Cf", name: "Califórnio", mass: "(251)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f¹⁰ 7s²", discoveryYear: 1950, meltingPoint: 1173, boilingPoint: 1743, stateAtRoom: "solido", funFact: "O isótopo Cf-252 é o emissor de nêutrons mais poderoso já descoberto, usado para iniciar reatores nucleares." },
  { number: 99, symbol: "Es", name: "Einstênio", mass: "(252)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f¹¹ 7s²", discoveryYear: 1952, meltingPoint: 1133, boilingPoint: null, stateAtRoom: "solido", funFact: "Descoberto nos detritos da primeira bomba de hidrogênio. Nomeado em homenagem a Albert Einstein." },
  { number: 100, symbol: "Fm", name: "Férmio", mass: "(257)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f¹² 7s²", discoveryYear: 1952, meltingPoint: 1800, boilingPoint: null, stateAtRoom: "solido", funFact: "Também descoberto nos detritos da bomba H. Nomeado em homenagem a Enrico Fermi, pai da era nuclear." },
  { number: 101, symbol: "Md", name: "Mendelévio", mass: "(258)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f¹³ 7s²", discoveryYear: 1955, meltingPoint: 1100, boilingPoint: null, stateAtRoom: "solido", funFact: "Nomeado em homenagem a Dmitri Mendeleev, criador da tabela periódica. Produzido apenas em escala de átomos." },
  { number: 102, symbol: "No", name: "Nobélio", mass: "(259)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f¹⁴ 7s²", discoveryYear: 1958, meltingPoint: 1100, boilingPoint: null, stateAtRoom: "solido", funFact: "Nomeado em homenagem a Alfred Nobel, inventor da dinamite e criador do Prêmio Nobel." },
  { number: 103, symbol: "Lr", name: "Lawrêncio", mass: "(262)", category: "actinideo", group: null, period: 7, electronConfig: "[Rn] 5f¹⁴ 7s² 7p¹", discoveryYear: 1961, meltingPoint: 1900, boilingPoint: null, stateAtRoom: "solido", funFact: "Último actinídeo. Nomeado em homenagem a Ernest Lawrence, inventor do cíclotron, acelerador de partículas." },
  { number: 104, symbol: "Rf", name: "Rutherfórdio", mass: "(267)", category: "metal-transicao", group: 4, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d² 7s²", discoveryYear: 1969, meltingPoint: 2400, boilingPoint: 5800, stateAtRoom: "solido", funFact: "Nomeado em homenagem a Ernest Rutherford. EUA e URSS disputaram a descoberta durante a Guerra Fria." },
  { number: 105, symbol: "Db", name: "Dúbnio", mass: "(268)", category: "metal-transicao", group: 5, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d³ 7s²", discoveryYear: 1970, meltingPoint: null, boilingPoint: null, stateAtRoom: "desconhecido", funFact: "Nomeado após Dubna, cidade russa onde fica o Instituto Conjunto de Pesquisas Nucleares." },
  { number: 106, symbol: "Sg", name: "Seabórgio", mass: "(271)", category: "metal-transicao", group: 6, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d⁴ 7s²", discoveryYear: 1974, meltingPoint: null, boilingPoint: null, stateAtRoom: "desconhecido", funFact: "Único elemento nomeado em homenagem a um cientista vivo à época: Glenn T. Seaborg." },
  { number: 107, symbol: "Bh", name: "Bóhrio", mass: "(272)", category: "metal-transicao", group: 7, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d⁵ 7s²", discoveryYear: 1981, meltingPoint: null, boilingPoint: null, stateAtRoom: "desconhecido", funFact: "Nomeado em homenagem a Niels Bohr, pioneiro da mecânica quântica e modelo atômico." },
  { number: 108, symbol: "Hs", name: "Hássio", mass: "(270)", category: "metal-transicao", group: 8, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d⁶ 7s²", discoveryYear: 1984, meltingPoint: null, boilingPoint: null, stateAtRoom: "desconhecido", funFact: "Nomeado após Hesse, estado alemão onde fica o GSI (Centro de Pesquisa de Íons Pesados)." },
  { number: 109, symbol: "Mt", name: "Meitnério", mass: "(276)", category: "metal-transicao", group: 9, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d⁷ 7s²", discoveryYear: 1982, meltingPoint: null, boilingPoint: null, stateAtRoom: "desconhecido", funFact: "Nomeado em homenagem a Lise Meitner, física que descobriu a fissão nuclear mas nunca ganhou o Nobel." },
  { number: 110, symbol: "Ds", name: "Darmstácio", mass: "(281)", category: "metal-transicao", group: 10, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d⁸ 7s²", discoveryYear: 1994, meltingPoint: null, boilingPoint: null, stateAtRoom: "desconhecido", funFact: "Nomeado após Darmstadt, Alemanha. Apenas alguns átomos já foram sintetizados, com meia-vida de microssegundos." },
  { number: 111, symbol: "Rg", name: "Roentgênio", mass: "(280)", category: "metal-transicao", group: 11, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s¹", discoveryYear: 1994, meltingPoint: null, boilingPoint: null, stateAtRoom: "desconhecido", funFact: "Nomeado em homenagem a Wilhelm Röntgen, descobridor dos raios-X. Extremamente instável e radioativo." },
  { number: 112, symbol: "Cn", name: "Copernício", mass: "(285)", category: "metal-transicao", group: 12, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s²", discoveryYear: 1996, meltingPoint: null, boilingPoint: 357, stateAtRoom: "desconhecido", funFact: "Nomeado em homenagem a Nicolau Copérnico. Previsto teoricamente como possível gás à temperatura ambiente." },
  { number: 113, symbol: "Nh", name: "Nihônio", mass: "(284)", category: "metal", group: 13, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹", discoveryYear: 2004, meltingPoint: 700, boilingPoint: 1430, stateAtRoom: "desconhecido", funFact: "Primeiro elemento sintetizado na Ásia (Japão). Nihon é o nome japonês do Japão — 'Terra do Sol Nascente'." },
  { number: 114, symbol: "Fl", name: "Fleróvio", mass: "(289)", category: "metal", group: 14, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²", discoveryYear: 1999, meltingPoint: null, boilingPoint: null, stateAtRoom: "desconhecido", funFact: "Nomeado em homenagem ao Laboratório de Reações Nucleares de Flerov, em Dubna, Rússia." },
  { number: 115, symbol: "Mc", name: "Moscóvio", mass: "(288)", category: "metal", group: 15, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³", discoveryYear: 2003, meltingPoint: 670, boilingPoint: 1400, stateAtRoom: "desconhecido", funFact: "Nomeado em homenagem à região de Moscou, na Rússia. Sintetizado pela colaboração russo-americana." },
  { number: 116, symbol: "Lv", name: "Livermório", mass: "(293)", category: "metal", group: 16, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴", discoveryYear: 2000, meltingPoint: 709, boilingPoint: 1085, stateAtRoom: "desconhecido", funFact: "Nomeado em homenagem ao Laboratório Nacional Lawrence Livermore, na Califórnia." },
  { number: 117, symbol: "Ts", name: "Tennessino", mass: "(294)", category: "nao-metal", group: 17, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵", discoveryYear: 2010, meltingPoint: 723, boilingPoint: 883, stateAtRoom: "desconhecido", funFact: "Nomeado em homenagem ao estado do Tennessee, EUA, onde ficam o ORNL e Vanderbilt University." },
  { number: 118, symbol: "Og", name: "Oganessônio", mass: "(294)", category: "gas-nobre", group: 18, period: 7, electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶", discoveryYear: 2002, meltingPoint: 325, boilingPoint: 450, stateAtRoom: "desconhecido", funFact: "O elemento mais pesado já sintetizado. Nomeado em homenagem a Yuri Oganessian, pioneiro em elementos superpesados." },
];

// ─── Grid Layout Map ──────────────────────────────────────────────────────────

// [row, col] in the 18-column grid (1-indexed)
// Rows 1-7: main table. Row 9: lanthanides. Row 10: actinides.
// Empty cells in rows 6-7 groups 3 are placeholders for lanthanide/actinide series

const GRID_POSITIONS: Record<number, [number, number]> = {
  1: [1, 1], 2: [1, 18],
  3: [2, 1], 4: [2, 2], 5: [2, 13], 6: [2, 14], 7: [2, 15], 8: [2, 16], 9: [2, 17], 10: [2, 18],
  11: [3, 1], 12: [3, 2], 13: [3, 13], 14: [3, 14], 15: [3, 15], 16: [3, 16], 17: [3, 17], 18: [3, 18],
  19: [4, 1], 20: [4, 2], 21: [4, 3], 22: [4, 4], 23: [4, 5], 24: [4, 6], 25: [4, 7], 26: [4, 8], 27: [4, 9], 28: [4, 10], 29: [4, 11], 30: [4, 12], 31: [4, 13], 32: [4, 14], 33: [4, 15], 34: [4, 16], 35: [4, 17], 36: [4, 18],
  37: [5, 1], 38: [5, 2], 39: [5, 3], 40: [5, 4], 41: [5, 5], 42: [5, 6], 43: [5, 7], 44: [5, 8], 45: [5, 9], 46: [5, 10], 47: [5, 11], 48: [5, 12], 49: [5, 13], 50: [5, 14], 51: [5, 15], 52: [5, 16], 53: [5, 17], 54: [5, 18],
  55: [6, 1], 56: [6, 2], 57: [9, 3], 72: [6, 4], 73: [6, 5], 74: [6, 6], 75: [6, 7], 76: [6, 8], 77: [6, 9], 78: [6, 10], 79: [6, 11], 80: [6, 12], 81: [6, 13], 82: [6, 14], 83: [6, 15], 84: [6, 16], 85: [6, 17], 86: [6, 18],
  87: [7, 1], 88: [7, 2], 89: [10, 3], 104: [7, 4], 105: [7, 5], 106: [7, 6], 107: [7, 7], 108: [7, 8], 109: [7, 9], 110: [7, 10], 111: [7, 11], 112: [7, 12], 113: [7, 13], 114: [7, 14], 115: [7, 15], 116: [7, 16], 117: [7, 17], 118: [7, 18],
  // Lanthanides row 9, cols 3-17
  58: [9, 4], 59: [9, 5], 60: [9, 6], 61: [9, 7], 62: [9, 8], 63: [9, 9], 64: [9, 10], 65: [9, 11], 66: [9, 12], 67: [9, 13], 68: [9, 14], 69: [9, 15], 70: [9, 16], 71: [9, 17],
  // Actinides row 10, cols 3-17
  90: [10, 4], 91: [10, 5], 92: [10, 6], 93: [10, 7], 94: [10, 8], 95: [10, 9], 96: [10, 10], 97: [10, 11], 98: [10, 12], 99: [10, 13], 100: [10, 14], 101: [10, 15], 102: [10, 16], 103: [10, 17],
};

// ─── Helper: state at temperature ────────────────────────────────────────────

function getStateAtTemp(el: Element, tempK: number): State {
  if (el.meltingPoint === null || el.boilingPoint === null) return el.stateAtRoom;
  if (tempK < el.meltingPoint) return "solido";
  if (tempK < el.boilingPoint) return "liquido";
  return "gas";
}

const STATE_OVERLAY: Record<State, string> = {
  solido: "transparent",
  liquido: "rgba(56,189,248,0.35)",
  gas: "rgba(250,204,21,0.22)",
  desconhecido: "transparent",
};

const STATE_LABELS: Record<State, string> = {
  solido: "Sólido",
  liquido: "Líquido",
  gas: "Gás",
  desconhecido: "Desconhecido",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PeriodicTablePage() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempK, setTempK] = useState(293); // ~20°C room temp

  const filteredNumbers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return new Set(
      ELEMENTS.filter((el) => {
        const matchSearch =
          !q ||
          el.name.toLowerCase().includes(q) ||
          el.symbol.toLowerCase().includes(q) ||
          String(el.number).includes(q);
        const matchCat = !activeCategory || el.category === activeCategory;
        return matchSearch && matchCat;
      }).map((el) => el.number)
    );
  }, [searchQuery, activeCategory]);

  const elementByNumber = useMemo(() => {
    const m: Record<number, Element> = {};
    ELEMENTS.forEach((el) => (m[el.number] = el));
    return m;
  }, []);

  const tempCelsius = Math.round(tempK - 273.15);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#e2e8f0",
        fontFamily:
          "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        overflowX: "auto",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          textAlign: "center",
          padding: "2rem 1rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #67e8f9 0%, #a78bfa 60%, #f9a8d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Tabela Periódica Interativa
        </h1>
        <p
          style={{
            color: "#94a3b8",
            marginTop: "0.4rem",
            fontSize: "0.9rem",
          }}
        >
          118 elementos · clique para detalhes · filtre por categoria · simule temperatura
        </p>
      </div>

      {/* ── Controls ── */}
      <div
        style={{
          padding: "1.2rem 1rem 0.8rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.9rem",
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        {/* Search */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Buscar por nome, símbolo ou número..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              color: "#e2e8f0",
              fontSize: "0.875rem",
              outline: "none",
              width: "280px",
              maxWidth: "100%",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "0.4rem",
                color: "#94a3b8",
                padding: "0.4rem 0.75rem",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              Limpar
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
          {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]).map(
            ([key, cfg]) => {
              const active = activeCategory === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => setActiveCategory(active ? null : key)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: active ? cfg.bg : "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${active ? cfg.border : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "999px",
                    padding: "0.3rem 0.85rem",
                    color: active ? cfg.color : "#94a3b8",
                    fontSize: "0.78rem",
                    fontWeight: active ? 700 : 400,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    boxShadow: active ? `0 0 10px ${cfg.glow}` : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: cfg.color,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {cfg.label}
                </motion.button>
              );
            }
          )}
        </div>

        {/* Temperature Slider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0.6rem",
            padding: "0.65rem 1rem",
          }}
        >
          <span style={{ fontSize: "0.82rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
            Temperatura:
          </span>
          <input
            type="range"
            min={4}
            max={6000}
            value={tempK}
            onChange={(e) => setTempK(Number(e.target.value))}
            style={{ flex: 1, minWidth: "150px", maxWidth: "380px", accentColor: "#67e8f9" }}
          />
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#67e8f9",
              minWidth: "110px",
            }}
          >
            {tempK} K &nbsp;/&nbsp; {tempCelsius}°C
          </span>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {(["solido", "liquido", "gas"] as State[]).map((s) => (
              <span
                key={s}
                style={{
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "2px",
                    background:
                      s === "solido"
                        ? "rgba(148,163,184,0.3)"
                        : s === "liquido"
                        ? "rgba(56,189,248,0.55)"
                        : "rgba(250,204,21,0.45)",
                    display: "inline-block",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />
                {STATE_LABELS[s]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Periodic Table Grid ── */}
      <div
        style={{
          padding: "0.75rem 1rem 0",
          maxWidth: "1600px",
          margin: "0 auto",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(18, minmax(52px, 1fr))",
            gridTemplateRows: "repeat(10, auto)",
            gap: "3px",
            minWidth: "960px",
          }}
        >
          {/* Period labels */}
          {[1, 2, 3, 4, 5, 6, 7].map((p) => (
            <div
              key={`period-${p}`}
              style={{
                gridColumn: "1 / 2",
                gridRow: `${p} / ${p + 1}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#475569",
                fontSize: "0.65rem",
                fontWeight: 700,
              }}
            />
          ))}

          {/* Placeholder cells for La/Ac in row 6/7 col 3 */}
          <PlaceholderCell row={6} col={3} label="57–71" />
          <PlaceholderCell row={7} col={3} label="89–103" />

          {/* All elements */}
          {ELEMENTS.map((el) => {
            const pos = GRID_POSITIONS[el.number];
            if (!pos) return null;
            const [row, col] = pos;
            const cfg = CATEGORIES[el.category];
            const dimmed = filteredNumbers.size > 0 && !filteredNumbers.has(el.number);
            const stateAtTemp = getStateAtTemp(el, tempK);
            const stateOverlay = STATE_OVERLAY[stateAtTemp];
            const isSelected = selectedElement?.number === el.number;

            return (
              <motion.div
                key={el.number}
                onClick={() => setSelectedElement(isSelected ? null : el)}
                initial={false}
                animate={{
                  opacity: dimmed ? 0.12 : 1,
                  scale: isSelected ? 1.08 : 1,
                }}
                whileHover={!dimmed ? { scale: 1.12, zIndex: 10 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  gridColumn: `${col} / ${col + 1}`,
                  gridRow: `${row} / ${row + 1}`,
                  position: "relative",
                  background: cfg.bg,
                  border: `1px solid ${isSelected ? cfg.color : cfg.border}`,
                  borderRadius: "5px",
                  padding: "3px 2px 4px",
                  cursor: "pointer",
                  overflow: "hidden",
                  boxShadow: isSelected
                    ? `0 0 14px ${cfg.glow}, inset 0 0 8px ${cfg.glow}`
                    : "none",
                  minHeight: "52px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  userSelect: "none",
                }}
              >
                {/* State overlay */}
                {stateOverlay !== "transparent" && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: stateOverlay,
                      pointerEvents: "none",
                      borderRadius: "4px",
                    }}
                  />
                )}
                {/* Atomic number */}
                <div
                  style={{
                    fontSize: "0.58rem",
                    color: cfg.color,
                    opacity: 0.8,
                    lineHeight: 1,
                    alignSelf: "flex-start",
                    paddingLeft: "3px",
                  }}
                >
                  {el.number}
                </div>
                {/* Symbol */}
                <div
                  style={{
                    fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                    fontWeight: 800,
                    color: cfg.color,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {el.symbol}
                </div>
                {/* Name */}
                <div
                  style={{
                    fontSize: "0.48rem",
                    color: "#94a3b8",
                    lineHeight: 1.1,
                    textAlign: "center",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                    paddingLeft: "1px",
                    paddingRight: "1px",
                  }}
                >
                  {el.name}
                </div>
                {/* Mass */}
                <div
                  style={{
                    fontSize: "0.46rem",
                    color: "#64748b",
                    lineHeight: 1,
                  }}
                >
                  {typeof el.mass === "number" ? el.mass.toFixed(el.mass < 10 ? 3 : el.mass < 100 ? 2 : 1) : el.mass}
                </div>
              </motion.div>
            );
          })}

          {/* Gap row (row 8) label for lanthanide/actinide separation */}
          <div
            style={{
              gridColumn: "1 / 19",
              gridRow: "8 / 9",
              height: "10px",
            }}
          />
        </div>

        {/* Lanthanide / Actinide row labels */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(18, minmax(52px, 1fr))",
            gap: "3px",
            minWidth: "960px",
            marginTop: "-3px",
          }}
        >
          <div
            style={{
              gridColumn: "1 / 3",
              gridRow: "1 / 2",
              display: "flex",
              alignItems: "center",
              paddingLeft: "4px",
            }}
          >
            <span
              style={{
                fontSize: "0.6rem",
                color: CATEGORIES.lantanideo.color,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Lantanídeos
            </span>
          </div>
          <div
            style={{
              gridColumn: "1 / 3",
              gridRow: "2 / 3",
              display: "flex",
              alignItems: "center",
              paddingLeft: "4px",
            }}
          >
            <span
              style={{
                fontSize: "0.6rem",
                color: CATEGORIES.actinideo.color,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Actinídeos
            </span>
          </div>
        </div>
      </div>

      {/* ── Group Numbers ── */}
      <div
        style={{
          padding: "0 1rem",
          maxWidth: "1600px",
          margin: "0.2rem auto 0",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(18, minmax(52px, 1fr))",
            gap: "3px",
            minWidth: "960px",
          }}
        >
          {Array.from({ length: 18 }, (_, i) => i + 1).map((g) => (
            <div
              key={g}
              style={{
                textAlign: "center",
                fontSize: "0.55rem",
                color: "#334155",
                fontWeight: 700,
                padding: "2px 0",
              }}
            >
              {g}
            </div>
          ))}
        </div>
      </div>

      {/* ── Detail Panel ── */}
      <AnimatePresence>
        {selectedElement && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            style={{
              position: "fixed",
              bottom: "1.5rem",
              right: "1.5rem",
              width: "min(420px, calc(100vw - 2rem))",
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              border: `1.5px solid ${CATEGORIES[selectedElement.category].border}`,
              borderRadius: "1rem",
              padding: "1.4rem",
              boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 30px ${CATEGORIES[selectedElement.category].glow}`,
              zIndex: 100,
              backdropFilter: "blur(12px)",
              maxHeight: "calc(100vh - 3rem)",
              overflowY: "auto",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedElement(null)}
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
              <div
                style={{
                  background: CATEGORIES[selectedElement.category].bg,
                  border: `2px solid ${CATEGORIES[selectedElement.category].color}`,
                  borderRadius: "0.6rem",
                  padding: "0.75rem",
                  textAlign: "center",
                  minWidth: "72px",
                  boxShadow: `0 0 20px ${CATEGORIES[selectedElement.category].glow}`,
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: CATEGORIES[selectedElement.category].color,
                    opacity: 0.8,
                  }}
                >
                  {selectedElement.number}
                </div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: CATEGORIES[selectedElement.category].color,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {selectedElement.symbol}
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    color: "#94a3b8",
                    marginTop: "2px",
                  }}
                >
                  {typeof selectedElement.mass === "number"
                    ? selectedElement.mass.toFixed(3)
                    : selectedElement.mass}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "#f1f5f9",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {selectedElement.name}
                </h2>
                <div
                  style={{
                    marginTop: "0.25rem",
                    display: "inline-block",
                    background: CATEGORIES[selectedElement.category].bg,
                    border: `1px solid ${CATEGORIES[selectedElement.category].border}`,
                    borderRadius: "999px",
                    padding: "0.15rem 0.6rem",
                    fontSize: "0.72rem",
                    color: CATEGORIES[selectedElement.category].color,
                    fontWeight: 600,
                  }}
                >
                  {CATEGORIES[selectedElement.category].label}
                </div>
                <div
                  style={{
                    marginTop: "0.4rem",
                    fontSize: "0.78rem",
                    fontFamily: "monospace",
                    color: "#7dd3fc",
                    background: "rgba(125,211,252,0.08)",
                    borderRadius: "0.3rem",
                    padding: "0.2rem 0.5rem",
                    display: "inline-block",
                  }}
                >
                  {selectedElement.electronConfig}
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem",
                marginBottom: "0.9rem",
              }}
            >
              {[
                { label: "Número Atômico", value: selectedElement.number },
                { label: "Massa Atômica", value: typeof selectedElement.mass === "number" ? `${selectedElement.mass} u` : selectedElement.mass },
                { label: "Período", value: selectedElement.period },
                { label: "Grupo", value: selectedElement.group ?? "—" },
                { label: "Descoberta", value: selectedElement.discoveryYear },
                {
                  label: "Estado (temp. atual)",
                  value: STATE_LABELS[getStateAtTemp(selectedElement, tempK)],
                },
                {
                  label: "Ponto de Fusão",
                  value: selectedElement.meltingPoint != null ? `${selectedElement.meltingPoint} K` : "—",
                },
                {
                  label: "Ponto de Ebulição",
                  value: selectedElement.boilingPoint != null ? `${selectedElement.boilingPoint} K` : "—",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "0.4rem",
                    padding: "0.45rem 0.6rem",
                  }}
                >
                  <div style={{ fontSize: "0.65rem", color: "#64748b", marginBottom: "2px" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#e2e8f0", fontWeight: 600 }}>
                    {String(value)}
                  </div>
                </div>
              ))}
            </div>

            {/* Fun Fact */}
            <div
              style={{
                background: `linear-gradient(135deg, ${CATEGORIES[selectedElement.category].bg}, rgba(255,255,255,0.02))`,
                border: `1px solid ${CATEGORIES[selectedElement.category].border}`,
                borderRadius: "0.5rem",
                padding: "0.75rem 0.9rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  color: CATEGORIES[selectedElement.category].color,
                  fontWeight: 700,
                  marginBottom: "0.3rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Curiosidade
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.83rem",
                  color: "#cbd5e1",
                  lineHeight: 1.55,
                }}
              >
                {selectedElement.funFact}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Legend ── */}
      <div
        style={{
          maxWidth: "1600px",
          margin: "1.5rem auto 0",
          padding: "0 1rem 2rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1.2rem",
        }}
      >
        <h3
          style={{
            fontSize: "0.75rem",
            color: "#475569",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: "0 0 0.75rem",
          }}
        >
          Legenda
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.25rem" }}>
          {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]).map(
            ([key, cfg]) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "3px",
                    background: cfg.bg,
                    border: `1.5px solid ${cfg.border}`,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>{cfg.label}</span>
              </div>
            )
          )}
        </div>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "0.72rem",
            color: "#334155",
          }}
        >
          Azul claro = líquido · Amarelo translúcido = gás · Sem sobreposição = sólido (à temperatura selecionada)
        </p>
      </div>
    </div>
  );
}

// ─── Placeholder Cell (La/Ac reference) ──────────────────────────────────────

function PlaceholderCell({ row, col, label }: { row: number; col: number; label: string }) {
  return (
    <div
      style={{
        gridColumn: `${col} / ${col + 1}`,
        gridRow: `${row} / ${row + 1}`,
        background: "rgba(255,255,255,0.03)",
        border: "1px dashed rgba(255,255,255,0.1)",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "52px",
      }}
    >
      <span style={{ fontSize: "0.5rem", color: "#475569", textAlign: "center" }}>{label}</span>
    </div>
  );
}
