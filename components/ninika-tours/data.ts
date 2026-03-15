import type {
  HeroStat,
  ZoneCard,
  Experience,
  Step,
  Petisco,
  Producer,
  AudienceSegment,
  GalleryItem,
  Testimonial,
  PricingTier,
  FAQItem,
  NavLink,
} from './types';

// ═══════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════

export const NAV_LINKS: NavLink[] = [
  { label: 'A Ilha', href: '#a-ilha' },
  { label: 'Experiências', href: '#experiencias' },
  { label: 'O Que Provar', href: '#o-que-provar' },
  { label: 'Produtores', href: '#produtores' },
  { label: 'Preços', href: '#precos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Reservar', href: '#reservar' },
];

// ═══════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════

export const HERO_TAGLINE = 'Bebe. Prova. Descobre a Ilha.';
export const HERO_SUBTITLE =
  'Experiências de vinho vulcânico e gastronomia açoriana pelas ruas da Terceira';

export const HERO_STATS: HeroStat[] = [
  { value: '1', label: 'Ilha Vulcânica' },
  { value: '8+', label: 'Produtores' },
  { value: '500+', label: 'Anos de Vinho' },
  { value: '12+', label: 'Paragens' },
];

export const HERO_CTA_PRIMARY = 'Reservar Experiência';
export const HERO_CTA_SECONDARY = 'Ver Experiências';

// ═══════════════════════════════════════════════════
// A ILHA — 3 Zones
// ═══════════════════════════════════════════════════

export const ZONES: ZoneCard[] = [
  {
    id: 'biscoitos',
    name: 'Biscoitos & Costa Norte',
    emoji: '🌋',
    description:
      'O coração vinícola da Terceira. Vinhas plantadas em currais de pedra de basalto, protegidas do Atlântico. Aqui nasce o lendário Verdelho.',
    highlights: [
      'Museu do Vinho dos Biscoitos',
      'Currais de vinha (Património UNESCO candidato)',
      'Piscinas naturais vulcânicas',
      'Adegas históricas com provas',
    ],
  },
  {
    id: 'angra',
    name: 'Angra do Heroísmo',
    emoji: '🏛️',
    description:
      'Capital e Património Mundial UNESCO. Ruas coloridas, igrejas barrocas e tascas escondidas onde o vinho corre tão bem como a conversa.',
    highlights: [
      'Centro histórico Património UNESCO',
      'Tascas tradicionais com petiscos',
      'Forte de São João Baptista',
      'Mercado Duque de Bragança',
    ],
  },
  {
    id: 'praia',
    name: 'Praia da Vitória & Interior',
    emoji: '🌿',
    description:
      'A costa leste e o interior verdejante. Pastagens, queijarias artesanais, festas do Espírito Santo e uma gastronomia de campo autêntica.',
    highlights: [
      'Baía da Praia da Vitória',
      'Queijarias artesanais',
      'Festas do Divino Espírito Santo',
      'Algar do Carvão (gruta vulcânica)',
    ],
  },
];

// ═══════════════════════════════════════════════════
// EXPERIÊNCIAS — 6 Tours
// ═══════════════════════════════════════════════════

export const EXPERIENCES: Experience[] = [
  {
    id: 'rota-verdelho',
    name: 'Rota do Verdelho',
    tagline: 'O vinho que nasce da lava',
    description:
      'Caminha por entre muros de pedra negra que parecem labirintos, construídos há séculos para proteger as vinhas do vento atlântico. Visita três produtores — Casa Agrícola Brum, Materramenta e Dimas Adega — e prova vinhos lado a lado com o Atlântico como pano de fundo.',
    duration: '3 horas',
    includes: [
      'Caminhada guiada pelos currais de vinha',
      'Entrada no Museu do Vinho dos Biscoitos',
      'Visita a 3 produtores',
      'Prova de 6-8 vinhos ao longo do percurso',
      'Tábua de queijo da ilha e pão de milho',
      'Guia especializado em vinho e património',
    ],
    price: 'Desde €55',
    emoji: '🍇',
    badge: 'Mais Popular',
    groupSize: '4–10 pessoas',
  },
  {
    id: 'tasquinha',
    name: 'Tasquinha a Tasquinha',
    tagline: 'De tasca em tasca, a Angra revela-se',
    description:
      'Passeio gastronómico pelo centro histórico de Angra do Heroísmo, cidade Património UNESCO. De porta em porta, de petisco em petisco, de copo em copo — como fazem os locais ao fim do dia. Alcatra, torresmos, morcela com ananás e a melhor aguardente de Verdelho.',
    duration: '2,5 horas',
    includes: [
      '5 paragens em tascas autênticas',
      'Alcatra, torresmos, morcela, linguiça, queijo',
      '4 copos de vinho/cerveja + 1 aguardente',
      'Doce tradicional no final',
      'Guia local que conhece cada tasqueiro',
    ],
    price: 'Desde €40',
    emoji: '🚶',
    groupSize: '4–12 pessoas',
  },
  {
    id: 'vulcao-copo',
    name: 'Vulcão no Copo',
    tagline: 'Seis vinhos. Três ilhas. Um vulcão em cada copo.',
    description:
      'A degustação mais completa dos Açores. Sentado numa sala privada, provas vinhos da Terceira, do Pico e da Graciosa, lado a lado. Percebes como o mesmo basalto, o mesmo Atlântico, o mesmo Verdelho, produzem resultados radicalmente diferentes.',
    duration: '2 horas',
    includes: [
      'Espaço privado de degustação',
      '6 vinhos premium de 3 ilhas',
      'Tábua de queijo de São Jorge DOP (3 curas)',
      'Charcutaria regional completa',
      'Guia sommelier/enólogo',
      'Material didáctico sobre castas e regiões',
    ],
    price: 'Desde €75',
    emoji: '🌋',
    groupSize: '2–8 pessoas',
  },
  {
    id: 'mar-mesa',
    name: 'Do Mar à Mesa',
    tagline: 'O Atlântico no prato e no copo',
    description:
      'Começa no porto, onde os barcos ainda chegam com o peixe do dia, e termina numa tasca costeira. Pelo meio, cracas cozidas, lapas grelhadas com manteiga de alho, polvo guisado com vinho de cheiro — e um Verdelho que parece ter sido feito exactamente para isto.',
    duration: '3 horas',
    includes: [
      'Visita ao porto e contacto com pescadores',
      'Caminhada costeira guiada',
      'Degustação de cracas, lapas e polvo',
      '3 copos de vinho açoriano',
      'Sobremesa tradicional',
      'Guia com conhecimento da cultura marítima',
    ],
    price: 'Desde €50',
    emoji: '🦞',
    groupSize: '4–10 pessoas',
  },
  {
    id: 'espirito-santo',
    name: 'Espírito Santo à Mesa',
    tagline: 'A tradição que alimenta a alma',
    description:
      'Imersão numa tradição documentada desde 1492. Entra num Império, participa na preparação das Sopas — caldo perfumado de hortelã com carne cozida sobre fatias de pão. Prova massa sovada a sair do forno e alfenim moldado à mão.',
    duration: '3 horas',
    includes: [
      'Visita a um Império do Espírito Santo activo',
      'Participação na preparação das Sopas',
      'Refeição comunitária completa',
      'Massa sovada artesanal e alfenim',
      'Selecção de doçaria conventual de Angra',
      'Vinho de cheiro e contexto cultural',
    ],
    price: 'Desde €45',
    emoji: '👑',
    priceNote: 'Disponível de Maio a Agosto',
    groupSize: '6–14 pessoas',
  },
  {
    id: 'sunset-sip',
    name: 'Sunset & Sip',
    tagline: 'O pôr-do-sol mais vínico do Atlântico',
    description:
      'A experiência mais descontraída. Sem horários rígidos, sem itinerários complicados. Só tu, um miradouro espectacular — Serra do Cume a 545 metros ou o Monte Brasil — uma tábua de queijos e enchidos, três vinhos açorianos e o fim de tarde mais bonito da tua vida.',
    duration: '1,5 horas',
    includes: [
      'Localização premium num miradouro',
      '3 vinhos açorianos (branco/rosé, Verdelho seco, generoso)',
      'Tábua de queijo de São Jorge DOP (2 curas)',
      'Presunto regional e linguiça curada',
      'Pão de milho artesanal e compotas',
      'Mantas e setup no miradouro',
    ],
    price: 'Desde €30',
    emoji: '🌅',
    badge: 'Romântico',
    groupSize: '4–16 pessoas',
  },
];

// ═══════════════════════════════════════════════════
// COMO FUNCIONA — 4 Steps
// ═══════════════════════════════════════════════════

export const STEPS: Step[] = [
  {
    number: 1,
    title: 'Escolhe',
    description:
      'Explora as nossas experiências e escolhe a que mais te entusiasma. Rota do Verdelho? Tasquinha a Tasquinha? Tu decides.',
    emoji: '🔍',
  },
  {
    number: 2,
    title: 'Reserva',
    description:
      'Preenche o formulário com as tuas datas e preferências. Respondemos em menos de 24 horas com disponibilidade e detalhes.',
    emoji: '📋',
  },
  {
    number: 3,
    title: 'Encontra-te',
    description:
      'No dia, encontramo-nos no ponto combinado em Angra ou nos Biscoitos. O teu guia local está à espera — relaxa e desfruta.',
    emoji: '📍',
  },
  {
    number: 4,
    title: 'Descomplica',
    description:
      'Bebe, prova, ri, descobre. Sem formalidades, sem julgamentos. Apenas tu, vinho vulcânico e a melhor gastronomia da Terceira.',
    emoji: '🎉',
  },
];

// ═══════════════════════════════════════════════════
// O QUE VAIS PROVAR — 10 Items
// ═══════════════════════════════════════════════════

export const PETISCOS: Petisco[] = [
  {
    id: 'polvo',
    name: 'Polvo Guisado',
    description:
      'Polvo do Atlântico cozinhado lentamente em vinho tinto, alho e ervas. Tão macio que derrete. Um clássico açoriano que não perdoas.',
    emoji: '🐙',
    category: 'prato',
  },
  {
    id: 'alcatra',
    name: 'Alcatra Terceirense',
    description:
      'O prato-rei da Terceira. Carne de vaca cozinhada em alguidar de barro com vinho Verdelho, especiarias e toucinho. Tradição desde 1450.',
    emoji: '🥩',
    category: 'prato',
  },
  {
    id: 'queijo-vaquinha',
    name: 'Queijo Vaquinha',
    description:
      'Queijo artesanal de Cinco Ribeiras, pasta mole e amanteigada. Produzido diariamente pela família Cota com leite de vacas que pastam livremente.',
    emoji: '🧀',
    category: 'petisco',
  },
  {
    id: 'linguica',
    name: 'Linguiça da Ilha',
    description:
      'Enchido de porco temperado com pimenta da terra, alho e vinho. Grelhada na brasa ou cozida no vinho — qualquer versão é viciante.',
    emoji: '🌭',
    category: 'petisco',
  },
  {
    id: 'cracas',
    name: 'Cracas',
    description:
      'Crustáceo vulcânico agarrado às rochas do litoral. Cozidas em água do mar e servidas com limão. Sabor a oceano puro — só nos Açores.',
    emoji: '🦪',
    category: 'petisco',
  },
  {
    id: 'dona-amelia',
    name: 'Dona Amélia',
    description:
      'Bolo húmido com mel de cana, canela, erva-doce e passas. Criado em honra da Rainha D. Amélia na sua visita à Terceira em 1901.',
    emoji: '🍰',
    category: 'doce',
  },
  {
    id: 'massa-sovada',
    name: 'Massa Sovada',
    description:
      'Pão doce fofo e amanteigado, indispensável nas Festas do Espírito Santo. Receita de gerações. O nome vem do acto de sovar vigorosamente a massa.',
    emoji: '🍞',
    category: 'doce',
  },
  {
    id: 'sopas-es',
    name: 'Sopas do Espírito Santo',
    description:
      'Fatias de pão de trigo embebidas em caldo de carne perfumado com hortelã. Tradição da Rainha Santa Isabel que alimenta centenas nas festas comunitárias.',
    emoji: '🍲',
    category: 'prato',
  },
  {
    id: 'lapas',
    name: 'Lapas Grelhadas',
    description:
      'Grelhadas na concha com manteiga de alho e pimenta da terra. Apanhadas nas rochas vulcânicas e servidas a escaldar. O petisco obrigatório.',
    emoji: '🐚',
    category: 'petisco',
  },
  {
    id: 'verdelho',
    name: 'Verdelho dos Biscoitos',
    description:
      'Casta cultivada em currais de basalto junto ao mar. Notas minerais, cítricas e salinas — o terroir vulcânico no copo. Favorito histórico da corte russa.',
    emoji: '🍷',
    category: 'vinho',
  },
];

// ═══════════════════════════════════════════════════
// PRODUTORES — 8 Producers (real researched data)
// ═══════════════════════════════════════════════════

export const PRODUCERS: Producer[] = [
  {
    id: 'materramenta',
    name: 'Materramenta',
    location: 'Biscoitos',
    description:
      'Nascida em 2016 do basalto dos Biscoitos. Luís Vasco Cunha trouxe sangue novo com vinhos de expressão vulcânica — o Verdelho e o Arinto dos Açores ganham aqui uma voz moderna e mineral. Nome homenageia o primeiro dono das terras de vinha no norte da Terceira.',
    specialty: 'Verdelho e Arinto de terroir vulcânico',
    emoji: '🌿',
    founded: '2016',
  },
  {
    id: 'dimas',
    name: 'Dimas Adega',
    location: 'Costa Norte, Terceira',
    description:
      'O polícia que faz vinho. Dimas Pires, agente da polícia há mais de 20 anos, teve a ousadia de introduzir castas europeias — Caladoc, Seyval Blanc, Grenache, Riesling — criando vinhos que não existem noutro lugar do mundo.',
    specialty: 'Castas europeias inovadoras nos Açores',
    emoji: '🏺',
  },
  {
    id: 'brum',
    name: 'Casa Agrícola Brum',
    location: 'Biscoitos',
    description:
      'A casa centenária do vinho dos Biscoitos. 5 gerações, 130+ anos. Francisco Maria Brum recuperou currais abandonados e reabilitou a produção vinícola. O Museu do Vinho, inaugurado em 1990, conta 430 anos de história.',
    specialty: 'Verdelho dos Biscoitos, vinhos generosos',
    emoji: '🪨',
    founded: '1890',
  },
  {
    id: 'cooperativa',
    name: 'Adega Cooperativa dos Biscoitos',
    location: 'Biscoitos',
    description:
      'Berço do lendário Magma. Dezenas de pequenos produtores unem-se numa das menores Denominações de Origem da Europa (~20 hectares). Em 2009, Anselmo Mendes trouxe o impulso que colocou os vinhos dos Biscoitos no mapa internacional.',
    specialty: 'Magma DOC Biscoitos — 100% Verdelho',
    emoji: '🤝',
    founded: '1999',
  },
  {
    id: 'quinta-ilhas',
    name: 'Quinta das Ilhas',
    location: 'Terceira',
    description:
      'Rui Martins produz vinhos que combinam tradição açoriana com técnicas modernas. Representou a Terceira na feira "Alma do Vinho" em Alenquer, a maior festa de vinhos da região de Lisboa.',
    specialty: 'Brancos de castas regionais',
    emoji: '🏝️',
  },
  {
    id: 'incerteza',
    name: 'Incerteza',
    location: 'Biscoitos',
    description:
      '"Numa ilha onde tudo é incerto, é possível produzir excelentes vinhos." Sandro Mendonca criou o primeiro rosé da história da Terceira. Verdelho com exuberância aromática cruzada com acidez, salinidade e mineralidade de basalto.',
    specialty: 'Verdelho e primeiro rosé da Terceira',
    emoji: '🎲',
    founded: '2021',
  },
  {
    id: 'lira',
    name: 'Lira',
    location: 'Terceira',
    description:
      'João Paulo Cota, com enfoque na expressão pura da casta Verdelho. Vinhos elegantes e equilibrados que representam a qualidade crescente dos produtores terceirenses.',
    specialty: 'Verdelho elegante e equilibrado',
    emoji: '🎵',
  },
  {
    id: 'vinha-branca',
    name: 'Vinha Branca do Mar',
    location: 'Biscoitos',
    description:
      'O médico-artista-vitivinicultor. Dimas Simas Lopes — cardiologista, escultor, pintor e produtor. Adega Simas com 4.7/5 no TripAdvisor. "Great boutique experience!" Vista espectacular, produtos artesanais de excelente qualidade.',
    specialty: 'Vinhos artesanais, aguardentes e compotas',
    emoji: '🌊',
  },
];

// ═══════════════════════════════════════════════════
// PARA QUEM — 4 Segments
// ═══════════════════════════════════════════════════

export const AUDIENCES: AudienceSegment[] = [
  {
    id: 'familias',
    title: 'Famílias',
    description:
      'Experiências adaptadas para todas as idades. As crianças exploram enquanto os adultos provam. Versões sem álcool disponíveis com sumos de fruta açorianos.',
    emoji: '👨‍👩‍👧‍👦',
    highlights: [
      'Opções sem álcool para menores',
      'Ritmo adaptado a famílias',
      'Actividades para crianças nas quintas',
      'Menus infantis nos restaurantes parceiros',
    ],
  },
  {
    id: 'casais',
    title: 'Casais',
    description:
      'Sunset & Sip, jantares privados e rotas exclusivas. A Terceira é um dos destinos mais românticos e menos massificados da Europa. Perfeito para aniversários e luas-de-mel.',
    emoji: '💑',
    highlights: [
      'Experiência Sunset & Sip dedicada',
      'Jantares privados em adegas',
      'Rotas exclusivas a dois',
      'Fotografia incluída nas experiências premium',
    ],
  },
  {
    id: 'equipas',
    title: 'Equipas & Empresas',
    description:
      'Team building com sabor. Desafios de vindima, provas cegas competitivas e almoços de grupo em quintas. Até 30 pessoas com logística completa.',
    emoji: '🏢',
    highlights: [
      'Programas de team building personalizados',
      'Desafios de prova cega por equipas',
      'Capacidade até 30 participantes',
      'Facturação empresarial disponível',
    ],
  },
  {
    id: 'despedidas',
    title: 'Despedidas de Solteiro/a',
    description:
      'Esquece os destinos óbvios. Uma despedida na Terceira é inesquecível: vinhos vulcânicos, petiscos intermináveis e paisagens que ninguém do grupo vai acreditar.',
    emoji: '🎉',
    highlights: [
      'Roteiros personalizados para grupos',
      'Combinação com actividades náuticas',
      'Noite de tascas em Angra incluída',
      'Coordenação surpresa disponível',
    ],
  },
];

// ═══════════════════════════════════════════════════
// GALERIA — Placeholder Descriptions
// ═══════════════════════════════════════════════════

export const GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    alt: 'Currais de vinha em basalto nos Biscoitos com o mar ao fundo',
    aspectRatio: 'landscape',
    placeholder: 'Muros de pedra escura protegem videiras verdes, o Atlântico azul-profundo ao fundo',
  },
  {
    id: 'g2',
    alt: 'Copo de Verdelho dourado contra pôr-do-sol na costa',
    aspectRatio: 'portrait',
    placeholder: 'Copo de vinho dourado iluminado pelo sol poente, silhueta da costa vulcânica',
  },
  {
    id: 'g3',
    alt: 'Alcatra a fumegar numa panela de barro tradicional',
    aspectRatio: 'square',
    placeholder: 'Panela de barro escuro com carne suculenta, vapor aromático a subir',
  },
  {
    id: 'g4',
    alt: 'Rua colorida de Angra do Heroísmo com grupo a rir',
    aspectRatio: 'landscape',
    placeholder: 'Rua estreita com casas coloridas, grupo alegre a caminhar com copos na mão',
  },
  {
    id: 'g5',
    alt: 'Lapas grelhadas na brasa à beira-mar',
    aspectRatio: 'square',
    placeholder: 'Conchas abertas sobre grelha fumegante, gotas de manteiga de alho, mar desfocado',
  },
  {
    id: 'g6',
    alt: 'Interior de adega centenária nos Biscoitos com barris de carvalho',
    aspectRatio: 'portrait',
    placeholder: 'Adega escura de pedra vulcânica, barris antigos, luz suave por uma janela pequena',
  },
  {
    id: 'g7',
    alt: 'Império do Espírito Santo decorado para as festas',
    aspectRatio: 'landscape',
    placeholder: 'Edifício branco e vermelho com coroa prateada, flores e bandeiras coloridas',
  },
  {
    id: 'g8',
    alt: 'Tábua de queijos e enchidos com Verdelho',
    aspectRatio: 'square',
    placeholder: 'Tábua de madeira com queijo curado, linguiça fatiada, pão e garrafa de vinho branco',
  },
];

// ═══════════════════════════════════════════════════
// TESTEMUNHOS — 8 Testimonials (mix PT/EN, from research)
// ═══════════════════════════════════════════════════

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ana e Pedro',
    origin: 'Lisboa, Portugal',
    text: 'Nunca pensei que uma caminhada por vinhas pudesse ser tão emocionante. O guia conhecia cada muro, cada cepa, cada história. E o Verdelho... meu Deus, o Verdelho. Voltámos três vezes à Materramenta para comprar garrafas.',
    rating: 5,
    language: 'pt',
    experience: 'Rota do Verdelho',
  },
  {
    id: 't2',
    name: 'James & Sarah',
    origin: 'London, UK',
    text: "We booked Sunset & Sip on our last evening in Terceira and it was the highlight of our trip. Serra do Cume at golden hour is unreal. The wines were excellent, the cheese board was generous, and our guide made us feel like old friends.",
    rating: 5,
    language: 'en',
    experience: 'Sunset & Sip',
  },
  {
    id: 't3',
    name: 'Ricardo M.',
    origin: 'Toronto, Canadá',
    text: 'Levei os meus pais e os miúdos ao Espírito Santo à Mesa. Os meus pais choraram — eles cresceram com esta tradição e tinham saudades. Os miúdos adoraram moldar alfenim. Foi o dia mais bonito das nossas férias.',
    rating: 5,
    language: 'pt',
    experience: 'Espírito Santo à Mesa',
  },
  {
    id: 't4',
    name: 'Elena K.',
    origin: 'New York, USA',
    text: "I'm a sommelier from New York and I thought I knew volcanic wines. I didn't. The Vulcão no Copo tasting blew my mind — tasting Terceira, Pico and Graciosa side by side is the only way to understand these wines. The São Jorge cheese pairing was genius.",
    rating: 5,
    language: 'en',
    experience: 'Vulcão no Copo',
  },
  {
    id: 't5',
    name: 'Marta e Sofia',
    origin: 'Porto, Portugal',
    text: 'A Tasquinha a Tasquinha foi a melhor noite que passámos em Angra. Comemos em cinco sítios diferentes, cada um melhor que o anterior. A alcatra na Tasca das Tias sozinha já valia o preço. Mas a morcela com ananás... isso sim, isso foi a surpresa da noite.',
    rating: 5,
    language: 'pt',
    experience: 'Tasquinha a Tasquinha',
  },
  {
    id: 't6',
    name: 'Thomas W.',
    origin: 'Melbourne, Australia',
    text: "The Do Mar à Mesa experience changed how I think about seafood. Cracas are like nothing I've ever tasted — briny, intense, almost alien. Eating grilled limpets on the rocks with a glass of Verdelho felt like the most honest meal I've ever had.",
    rating: 5,
    language: 'en',
    experience: 'Do Mar à Mesa',
  },
  {
    id: 't7',
    name: 'Carlos e Inês',
    origin: 'Coimbra, Portugal',
    text: 'Fizemos a Rota do Verdelho durante a vindima em Setembro e foi mágico. Vimos as uvas a serem colhidas, pisámos uvas (sim, a sério), e provámos mosto fresco. A paisagem dos Biscoitos é de outro planeta.',
    rating: 5,
    language: 'pt',
    experience: 'Rota do Verdelho',
  },
  {
    id: 't8',
    name: 'The Martins Family',
    origin: 'São Paulo, Brasil',
    text: "We did three experiences in two days — Tasquinha, Vulcão no Copo, and Sunset & Sip. Best decision of our Azores trip. The team genuinely loves what they do and it shows. Not once did it feel like a tourist thing.",
    rating: 5,
    language: 'en',
    experience: 'Múltiplas experiências',
  },
];

// ═══════════════════════════════════════════════════
// PREÇOS — 4 Tiers (from experiences content doc)
// ═══════════════════════════════════════════════════

export const PRICING: PricingTier[] = [
  {
    id: 'descobre',
    name: 'Descobre',
    price: '€30',
    priceUnit: 'por pessoa',
    description:
      'Para quem quer provar a ilha sem compromisso. Ideal para um fim de tarde ou uma primeira experiência.',
    features: [
      '1,5 horas de experiência',
      '3 vinhos açorianos',
      'Tábua de queijos e enchidos',
      'Miradouro premium',
      'Guia local',
      'Formato casual e descontraído',
    ],
    highlighted: false,
    cta: 'Reservar Descobre',
  },
  {
    id: 'saboreia',
    name: 'Saboreia',
    price: '€45',
    priceUnit: 'por pessoa',
    description:
      'Experiências mais completas, com comida a sério e imersão cultural. O sweet spot entre preço e profundidade.',
    features: [
      '2,5–3 horas de experiência',
      'Refeição completa incluída',
      '3-4 bebidas (vinho, cerveja ou aguardente)',
      'Guia local especializado',
      'Contexto cultural e histórico',
      'Grupo até 14 pessoas',
    ],
    highlighted: false,
    cta: 'Reservar Saboreia',
  },
  {
    id: 'mergulha',
    name: 'Mergulha',
    price: '€55',
    priceUnit: 'por pessoa',
    description:
      'Para quem quer ir mais fundo. Caminhada, produtores, terroir — a experiência completa do vinho açoriano.',
    features: [
      '3 horas de experiência',
      '3 produtores visitados',
      '6-8 vinhos provados',
      'Entrada no Museu do Vinho',
      'Tábua de queijo e pão de milho',
      'Caminhada pela paisagem vitícola',
      'Guia especializado em vinho',
    ],
    highlighted: true,
    cta: 'Reservar Mergulha',
    badge: 'Mais Popular',
  },
  {
    id: 'vulcao',
    name: 'Vulcão',
    price: '€75',
    priceUnit: 'por pessoa',
    description:
      'A experiência premium. Degustação privada, 3 ilhas num copo, harmonização completa. Para quem quer o melhor.',
    features: [
      '2 horas de degustação premium',
      '6 vinhos de 3 ilhas',
      'Espaço privado',
      'Queijo de São Jorge DOP (3 curas)',
      'Charcutaria regional completa',
      'Guia sommelier/enólogo',
      'Certificado de prova',
    ],
    highlighted: false,
    cta: 'Reservar Vulcão',
  },
];

// ═══════════════════════════════════════════════════
// FAQ — 12 Questions (Terceira-specific with FULL answers)
// ═══════════════════════════════════════════════════

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Como chego à Ilha Terceira?',
    answer:
      'Há voos directos para o Aeroporto das Lajes (TER) a partir de Lisboa e Porto (SATA e Ryanair), e ligações sazonais de outras cidades europeias. Desde o continente, o voo demora cerca de 2h15. Também há voos inter-ilhas frequentes se já estiveres nos Açores.',
  },
  {
    id: 'faq-2',
    question: 'Preciso de saber alguma coisa sobre vinho para participar?',
    answer:
      'Zero. As nossas experiências são pensadas para todos os níveis — desde quem nunca provou vinho até enólogos profissionais. O guia adapta-se ao grupo. A única coisa que precisas é curiosidade e vontade de provar.',
  },
  {
    id: 'faq-3',
    question: 'Posso reservar no próprio dia?',
    answer:
      'Depende da disponibilidade. Recomendamos reservar com pelo menos 48 horas de antecedência, especialmente na época alta (Junho a Setembro). O Espírito Santo à Mesa requer reserva com 1 semana de antecedência por depender do calendário festivo.',
  },
  {
    id: 'faq-4',
    question: 'As experiências funcionam com chuva?',
    answer:
      'Os Açores são os Açores — o tempo muda várias vezes por dia. As experiências de degustação (Vulcão no Copo) funcionam sempre. As walking tours realizam-se com chuva ligeira (faz parte da experiência!). Só cancelamos com condições meteorológicas severas, e nesse caso oferecemos reagendamento ou reembolso total.',
  },
  {
    id: 'faq-5',
    question: 'Há opções para quem não bebe álcool?',
    answer:
      'Sim. Todas as experiências podem ser adaptadas com sumos naturais, água com gás e chá. O Sunset & Sip e a Tasquinha a Tasquinha funcionam bem sem álcool porque a comida e a experiência são o foco principal. Avisa-nos na reserva.',
  },
  {
    id: 'faq-6',
    question: 'As experiências são acessíveis a pessoas com mobilidade reduzida?',
    answer:
      'O Vulcão no Copo e o Sunset & Sip (no Monte Brasil, com acesso de carro) são acessíveis. A Rota do Verdelho envolve caminhada sobre terreno irregular de basalto e não é recomendada. A Tasquinha a Tasquinha envolve ruas calcetadas no centro de Angra. Contacta-nos para discutirmos alternativas.',
  },
  {
    id: 'faq-7',
    question: 'Podem adaptar as experiências para grupos privados ou eventos?',
    answer:
      'Sim. Todas as experiências podem ser privatizadas. Fazemos experiências à medida para grupos corporativos, despedidas de solteiro/a, aniversários e eventos especiais. Pede-nos um orçamento personalizado.',
  },
  {
    id: 'faq-8',
    question: 'O Espírito Santo à Mesa está disponível fora da época festiva?',
    answer:
      'A experiência autêntica — com participação num Império activo — só está disponível de Maio a Agosto. Fora desta época, oferecemos uma versão adaptada que inclui visita a um Império (sem festividade), degustação de Sopas do Espírito Santo preparadas por cozinheiras locais, e doçaria tradicional.',
  },
  {
    id: 'faq-9',
    question: 'É seguro comer cracas e lapas? Tenho alergias.',
    answer:
      'Cracas e lapas são mariscos (crustáceo e molusco, respectivamente). Se tens alergia a marisco, informa-nos na reserva e adaptamos o menu do Do Mar à Mesa. Se tens outras alergias ou restrições alimentares, diz-nos sempre — trabalhamos com tascas locais que se adaptam.',
  },
  {
    id: 'faq-10',
    question: 'Qual é a melhor época para visitar a Terceira?',
    answer:
      'Depende do que procuras. Junho a Setembro é a época alta, com melhor tempo e festas do Espírito Santo. Abril-Maio e Outubro são óptimos para menos turistas e paisagens verdes exuberantes. A vindima é em Setembro. O inverno é mais chuvoso mas tem um charme próprio e preços mais baixos.',
  },
  {
    id: 'faq-11',
    question: 'Posso comprar vinhos que provo nas experiências?',
    answer:
      'Sim! Ajudamos-te a comprar directamente aos produtores ou indicamos lojas em Angra. Se quiseres enviar para casa, orientamos sobre envio. Os vinhos açorianos são difíceis de encontrar fora dos Açores — comprá-los aqui é metade da experiência.',
  },
  {
    id: 'faq-12',
    question: 'As experiências são em português ou inglês?',
    answer:
      'Todas as experiências estão disponíveis em português e inglês. Também podemos organizar em espanhol e francês com aviso prévio. Indica a tua preferência na reserva.',
  },
];

// ═══════════════════════════════════════════════════
// EXPERIENCE TYPE OPTIONS (for lead form)
// ═══════════════════════════════════════════════════

export const EXPERIENCE_OPTIONS = [
  'Rota do Verdelho',
  'Tasquinha a Tasquinha',
  'Vulcão no Copo',
  'Do Mar à Mesa',
  'Espírito Santo à Mesa',
  'Sunset & Sip',
  'Ainda não sei — surpreendam-me!',
] as const;

export const GROUP_SIZE_OPTIONS = [
  '1–2 pessoas',
  '3–5 pessoas',
  '6–10 pessoas',
  '11–20 pessoas',
  '20+ pessoas',
] as const;
