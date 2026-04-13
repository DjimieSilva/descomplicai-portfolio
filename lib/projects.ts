export type ProjectStatus = "live" | "dev";

export type ProjectCategory =
  | "restaurant"
  | "health"
  | "interactive"
  | "food"
  | "creative"
  | "fitness"
  | "sports"
  | "services";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  type: string;
  description: string;
  gradient: string;
  emoji: string;
  status: ProjectStatus;
};

const projectDefinitions = [
  // ═══ EXISTENTES (17 originais) ═══
  { id: "bfitfam", title: "BFITFAM", category: "fitness", type: "Website + PWA", description: "Plataforma de personal training com app de treinos interativa e tracking de progresso", gradient: "from-blue-600 to-cyan-500", emoji: "💪", status: "live" },
  { id: "tasca-dentro", title: "Tás-cá Dentro", category: "restaurant", type: "Website", description: "Gastrobar de cozinha de autor com carta de vinhos premium e música ao vivo", gradient: "from-amber-600 to-orange-400", emoji: "🍷", status: "live" },
  { id: "ondas-academy", title: "Ondas Academy", category: "sports", type: "Website", description: "Escola de surf em Buarcos — pacotes de aulas para todos os níveis", gradient: "from-cyan-500 to-blue-400", emoji: "🏄", status: "live" },
  { id: "futuro", title: "Futuro Portfolio", category: "creative", type: "3D Experience", description: "Portfolio pessoal com Three.js — 'O Futuro é Humano'", gradient: "from-violet-500 to-purple-500", emoji: "🌍", status: "live" },
  { id: "seeds", title: "Seeds", category: "creative", type: "Storytelling Site", description: "A Gift to Humanity — parallax storytelling sobre plantar quando ninguém está a ver", gradient: "from-green-500 to-emerald-400", emoji: "🌱", status: "live" },
  { id: "descomplicai-brutalist", title: "Descomplicai Brutalist", category: "creative", type: "Redesign Concept", description: "Versão brutalist dark do site Descomplicai — terminal UI, glitch effects, monospace", gradient: "from-gray-700 to-black", emoji: "🖤", status: "live" },
  { id: "descomplicai-editorial", title: "Descomplicai Editorial", category: "creative", type: "Redesign Concept", description: "Versão editorial premium do site Descomplicai — magazine layout, Playfair Display, cream", gradient: "from-amber-200 to-orange-100", emoji: "📰", status: "live" },
  { id: "descomplicai-neobrutalism", title: "Descomplicai Neobrutalism", category: "creative", type: "Redesign Concept", description: "Versão neobrutalist do Descomplicai — cores bold, sombras duras, tipografia oversized, energia playful", gradient: "from-yellow-400 to-pink-500", emoji: "🟡", status: "live" },
  { id: "descomplicai-swiss", title: "Descomplicai Swiss", category: "creative", type: "Redesign Concept", description: "Versão Swiss/International Style — grid rigoroso, whitespace extremo, Inter puro, zero decoração", gradient: "from-white to-gray-100", emoji: "🇨🇭", status: "live" },
  { id: "descomplicai-zen", title: "Descomplicai Zen", category: "creative", type: "Redesign Concept", description: "Versão wabi-sabi — assimetria intencional, serif elegante, kanji decorativos, calma absoluta", gradient: "from-stone-100 to-amber-50", emoji: "🍵", status: "live" },
  { id: "descomplicai-glassmorphism", title: "Descomplicai Glass", category: "creative", type: "Redesign Concept", description: "Versão glassmorphism — vidro fosco, transparência, blur effects, floating cards sobre gradients suaves", gradient: "from-indigo-400 to-purple-300", emoji: "🪟", status: "live" },
  { id: "vindima-selvagem", title: "Vindima Selvagem", category: "food", type: "Wine Experience", description: "Experiência de vindima participativa no Douro — colha as suas uvas, pise a pé, prove vinhos DOC", gradient: "from-amber-700 to-orange-500", emoji: "🍇", status: "live" },
  { id: "quintas-estrelas", title: "Quintas & Estrelas", category: "food", type: "Wine Experience", description: "Estadias em quintas vinícolas com jantares sob as estrelas — glamping, gastronomia, vindima", gradient: "from-indigo-900 to-amber-700", emoji: "✨", status: "live" },
  { id: "rota-dos-vinhos", title: "Rota dos Vinhos", category: "food", type: "Wine Experience", description: "Rotas turísticas guiadas pelas 6 regiões vinícolas de Portugal — acessível e solar", gradient: "from-blue-500 to-green-400", emoji: "🌞", status: "live" },
  { id: "vinho-na-rua", title: "Vinho na Rua", category: "food", type: "Wine Experience", description: "Walking tours de vinho e petiscos por Porto, Lisboa, Braga, Évora e Faro — casual e divertido", gradient: "from-red-800 to-yellow-600", emoji: "🍷", status: "live" },
  { id: "ninika-tours", title: "NinikaTours", category: "food", type: "Wine & Gastro Platform", description: "Experiências de vinho vulcânico e gastronomia açoriana na Ilha Terceira — lead capture + booking", gradient: "from-indigo-950 to-red-900", emoji: "🌋", status: "live" },
  { id: "design-system", title: "Design System", category: "creative", type: "UI Component Library", description: "15 componentes premium — glassmorphism, parallax, smooth scroll, text animations e mais", gradient: "from-blue-600 to-violet-500", emoji: "🧩", status: "live" },
  { id: "meiocheio", title: "MeioCheio", category: "restaurant", type: "Wine Bar Website", description: "Wine bar & petiscos em Figueira da Foz — carta de vinhos, experiências, reservas via WhatsApp", gradient: "from-red-900 to-amber-600", emoji: "🍷", status: "live" },
  { id: "ribeirosanto", title: "Ribeiro Santo", category: "restaurant", type: "Wine Estate Website", description: "Quinta vinícola no Dão — vinhos premiados, enoturismo, 8 páginas com história, catálogo e experiências", gradient: "from-[#722F37] to-[#C9A96E]", emoji: "🍇", status: "live" },
  { id: "sabor-abencoado", title: "Sabor Abençoado", category: "restaurant", type: "Pastry Takeaway", description: "Padaria caseira em Olhão — bolos, pães artesanais e pudins com entrega ao domicílio via WhatsApp", gradient: "from-amber-200 to-pink-200", emoji: "🧁", status: "live" },
  { id: "rabbit-hole", title: "The Infinite Corridor", category: "creative", type: "Interactive Experience", description: "Experiência imersiva de mistério — 79 páginas, 11 secções, puzzles, narrativa não-linear e segredos escondidos", gradient: "from-amber-900 to-slate-900", emoji: "🕳️", status: "live" },

  // ═══ NOVOS — RESTAURANTES (17) ═══
  { id: "zeff-pizza", title: "Zeff Pizza", category: "restaurant", type: "3 Concept Sites", description: "Três conceitos de website para pizzaria romana — Pirate Tavern, Figueira Sun e Roman Artisan", gradient: "from-orange-600 to-red-800", emoji: "🍕", status: "live" },
  { id: "zeff-pizza-pirate", title: "Zeff Pizza Pirate", category: "restaurant", type: "Website Concept", description: "Conceito pirata — tema escuro e dramático inspirado na identidade pirata da Zeff Pizza.", gradient: "from-amber-800 to-orange-600", emoji: "🏴‍☠️", status: "live" },
  { id: "zeff-pizza-sun", title: "Zeff Pizza Sun", category: "restaurant", type: "Website Concept", description: "Conceito mediterrânico — cores quentes, sol e mar da Figueira da Foz.", gradient: "from-amber-400 to-orange-500", emoji: "☀️", status: "live" },
  { id: "zeff-pizza-artisan", title: "Zeff Pizza Artisan", category: "restaurant", type: "Website Concept", description: "Conceito artesanal — design ultra-minimal e luxuoso, editorial italiano.", gradient: "from-stone-600 to-amber-700", emoji: "🏛️", status: "live" },
  { id: "bijou-restaurante", title: "Bijou Restaurante", category: "restaurant", type: "Fine Dining", description: "Restaurante de cozinha de autor com menu de degustação, carta de vinhos premium e ambiente intimista", gradient: "from-[#4A3728] to-[#CFB53B]", emoji: "🍽️", status: "live" },
  { id: "cacarola", title: "Caçarola", category: "restaurant", type: "Comfort Food", description: "Restaurante tradicional português com cozinha caseira, petiscos e ambiente familiar em Figueira da Foz", gradient: "from-amber-800 to-orange-500", emoji: "🥘", status: "live" },
  { id: "cacarola-dois", title: "Caçarola Dois", category: "restaurant", type: "Seafood & Market", description: "Segundo espaço Caçarola com mercado de frescos, wine bar e menu sazonal de marisco", gradient: "from-teal-700 to-amber-500", emoji: "🦐", status: "live" },
  { id: "cafe-praca-18", title: "Café Praça 18", category: "restaurant", type: "Café & Terrace", description: "Café icónico na praça central — pequeno-almoço, brunch, cocktails e esplanada com vista", gradient: "from-yellow-600 to-amber-400", emoji: "☕", status: "live" },
  { id: "casa-dos-papagaios", title: "Casa dos Papagaios", category: "restaurant", type: "Traditional Restaurant", description: "Restaurante tradicional com cozinha regional, ambiente rústico e pratos de forno a lenha", gradient: "from-green-700 to-lime-500", emoji: "🦜", status: "live" },
  { id: "cataventos", title: "Cataventos", category: "restaurant", type: "Beach Bar", description: "Beach bar e restaurante à beira-mar — cocktails, petiscos de praia e sunset sessions", gradient: "from-sky-400 to-orange-300", emoji: "🌊", status: "live" },
  { id: "maregrafo", title: "Marégrafo", category: "restaurant", type: "Seafood Restaurant", description: "Restaurante de marisco fresco junto ao porto — peixe do dia, cataplanas e vista oceano", gradient: "from-blue-800 to-cyan-400", emoji: "🐟", status: "live" },
  { id: "marisqueira-rosa-amelia", title: "Marisqueira Rosa Amélia", category: "restaurant", type: "Seafood House", description: "Marisqueira tradicional com marisco fresco, lagosta e arroz de tamboril — referência local", gradient: "from-rose-700 to-pink-400", emoji: "🦞", status: "live" },
  { id: "mesa-dos-amigos", title: "Mesa dos Amigos", category: "restaurant", type: "Social Dining", description: "Restaurante de partilha com mesa comunitária, tapas portuguesas e noites temáticas", gradient: "from-orange-600 to-red-400", emoji: "🤝", status: "live" },
  { id: "nalu-cabedelo", title: "Nalu Cabedelo", category: "restaurant", type: "Surf Café", description: "Café de praia em Cabedelo — açaí bowls, smoothies, tacos de peixe e vibe surf relaxada", gradient: "from-teal-400 to-blue-300", emoji: "🏄‍♂️", status: "live" },
  { id: "o-picadeiro", title: "O Picadeiro", category: "restaurant", type: "Grill House", description: "Churrasqueira e grill house com carnes maturadas, espetadas e picanha na brasa", gradient: "from-red-800 to-amber-600", emoji: "🥩", status: "live" },
  { id: "pe-na-areia", title: "Pé na Areia", category: "restaurant", type: "Beach Restaurant", description: "Restaurante pé na areia com peixe grelhado, sangria e ambiente descontraído junto ao mar", gradient: "from-amber-300 to-sky-300", emoji: "👣", status: "live" },
  { id: "pe-no-bairro", title: "Pé no Bairro", category: "restaurant", type: "Neighborhood Bar", description: "Bar de bairro com cocktails artesanais, petiscos criativos e música ao vivo", gradient: "from-slate-700 to-amber-500", emoji: "🏘️", status: "live" },
  { id: "quinta-da-salmanha", title: "Quinta da Salmanha", category: "restaurant", type: "Rural Estate", description: "Quinta rural com restaurante de cozinha regional, vinhos da casa e eventos ao ar livre", gradient: "from-green-800 to-amber-400", emoji: "🏡", status: "live" },
  { id: "sand-murtinheira", title: "Sand Murtinheira", category: "restaurant", type: "Beach Lounge", description: "Beach lounge na Praia da Murtinheira — cocktails, sushi, DJ sets e pôr-do-sol", gradient: "from-amber-400 to-rose-300", emoji: "🌅", status: "live" },
  { id: "tasca-da-praia", title: "Tasca da Praia", category: "restaurant", type: "Seaside Tavern", description: "Tasca à beira-mar com petiscos, vinho verde e marisco fresco em ambiente informal", gradient: "from-blue-600 to-amber-400", emoji: "⚓", status: "live" },
  { id: "friseursalon-awat-chalak", title: "Friseursalon Awat & Chalak", category: "restaurant", type: "Website", description: "Professioneller Friseursalon in Heilbronn seit 2007. Zweisprachig DE/EN, echte Fotos, GSAP Animationen.", gradient: "from-amber-800 to-yellow-700", emoji: "💈", status: "live" },

  // ═══ NOVOS — CLÍNICAS (8) ═══
  { id: "alba-saude-dentaria", title: "Alba Saúde Dentária", category: "health", type: "Dental Clinic", description: "Clínica dentária moderna com estética dental, ortodontia invisível e branqueamento premium", gradient: "from-sky-400 to-teal-300", emoji: "🦷", status: "live" },
  { id: "clinica-dentaria-quiaios", title: "Clínica Dentária de Quiaios", category: "health", type: "Dental Clinic", description: "Clínica familiar em Quiaios com tratamentos acessíveis e atendimento personalizado", gradient: "from-blue-400 to-sky-300", emoji: "🏥", status: "live" },
  { id: "clinica-tamargueira", title: "Clínica Tamargueira", category: "health", type: "Dental Implants", description: "Referência em implantologia na região — tecnologia de ponta e equipa especializada", gradient: "from-blue-800 to-blue-500", emoji: "🔬", status: "live" },
  { id: "clinica-vasco-da-gama", title: "Clínica Vasco da Gama", category: "health", type: "Premium Dental", description: "Clínica dentária de luxo com tratamentos premium, estética e design gold & navy", gradient: "from-[#0A1628] to-[#C9A84C]", emoji: "👑", status: "live" },
  { id: "dentalkid", title: "DentalKid", category: "health", type: "Pediatric Dental", description: "Clínica dentária pediátrica com ambiente lúdico, equipa especializada em crianças", gradient: "from-pink-400 to-purple-400", emoji: "🧒", status: "live" },
  { id: "dentalkid-v2", title: "DentalKid V2", category: "health", type: "Pediatric Dental V2", description: "Versão verde e azul da DentalKid — mesmo conteúdo, paleta fresca inspirada no logo", gradient: "from-green-400 to-sky-500", emoji: "🦷", status: "live" },
  { id: "fozclinica", title: "FozClínica", category: "health", type: "Medical Clinic", description: "Clínica médica multidisciplinar na Figueira da Foz — medicina geral, especialidades e exames", gradient: "from-teal-600 to-emerald-400", emoji: "🏨", status: "live" },
  { id: "premium-clinica-dentaria", title: "Premium Clínica Dentária", category: "health", type: "Preventive Dental", description: "Clínica focada em prevenção com design minimalista — check-ups, limpezas e planos de saúde oral", gradient: "from-emerald-700 to-emerald-400", emoji: "🌿", status: "live" },
  { id: "upconcept-clinica", title: "UpConcept Clínica", category: "health", type: "Modern Clinic", description: "Clínica ultra-moderna aberta 7 dias — design contemporâneo, múltiplas especialidades", gradient: "from-blue-700 to-cyan-400", emoji: "⚡", status: "live" },

  // ═══ NOVOS — EXPERIÊNCIAS INTERATIVAS (30) ═══
  { id: "aurora-borealis", title: "Aurora Borealis", category: "interactive", type: "Simulador Interativo", description: "Simulador de aurora boreal — pinta o céu com o rato, 80 estrelas, 18 camadas de luz", gradient: "from-green-400 to-cyan-600", emoji: "🌌", status: "live" },
  { id: "color-palette-generator", title: "Color Palette Generator", category: "interactive", type: "Ferramenta de Design", description: "Gerador de paletas com golden ratio HSL — lock de cores, export CSS, histórico", gradient: "from-pink-500 to-violet-500", emoji: "🎨", status: "live" },
  { id: "typing-speed-test", title: "Teste de Velocidade", category: "interactive", type: "Teste Interativo", description: "Teste de digitação em português — WPM em tempo real, accuracy, ratings com emoji", gradient: "from-blue-500 to-yellow-400", emoji: "⌨️", status: "live" },
  { id: "mood-journal", title: "Diário de Humor", category: "interactive", type: "App de Bem-estar", description: "Diário emocional com calendário heatmap, estatísticas semanais e confetti no 🤩", gradient: "from-pink-300 to-purple-300", emoji: "😊", status: "live" },
  { id: "solar-system", title: "Sistema Solar", category: "interactive", type: "Explorador 3D", description: "Explorador do sistema solar — 8 planetas com órbitas reais, Lua da Terra, info em PT", gradient: "from-indigo-900 to-purple-600", emoji: "🪐", status: "live" },
  { id: "gradient-maker", title: "Gradient Maker", category: "interactive", type: "Ferramenta CSS", description: "Gerador de gradientes CSS — 12 presets, fullscreen, export código, animação de fundo", gradient: "from-orange-500 to-pink-500", emoji: "🌈", status: "live" },
  { id: "pomodoro", title: "Pomodoro Timer", category: "interactive", type: "Produtividade", description: "Timer Pomodoro com SVG circular, 3 modos, tarefas e stats persistentes", gradient: "from-red-400 to-green-400", emoji: "🍅", status: "live" },
  { id: "markdown-editor", title: "Editor Markdown", category: "interactive", type: "Ferramenta Dev", description: "Editor com parser custom, 12 botões toolbar, split-pane preview, download .md", gradient: "from-teal-500 to-cyan-400", emoji: "📝", status: "live" },
  { id: "habit-tracker", title: "Habit Tracker", category: "interactive", type: "App de Produtividade", description: "Rastreador de hábitos com heatmap GitHub-style, streaks 🔥, confetti", gradient: "from-green-500 to-lime-400", emoji: "✅", status: "live" },
  { id: "music-visualizer", title: "Visualizador Musical", category: "interactive", type: "Experiência Visual", description: "Visualizador com canvas 64 barras, 3 modos (barras/ondas/círculo), 4 temas", gradient: "from-cyan-500 to-pink-500", emoji: "🎵", status: "live" },
  { id: "password-generator", title: "Gerador de Passwords", category: "interactive", type: "Ferramenta Segurança", description: "Gerador crypto-random com strength meter, crack-time estimator, histórico", gradient: "from-emerald-500 to-teal-500", emoji: "🛡️", status: "live" },
  { id: "breathing-exercise", title: "Exercício de Respiração", category: "interactive", type: "App de Bem-estar", description: "Exercício guiado com círculo pulsante, 3 padrões (4-4-4, 4-7-8, 3-1-3)", gradient: "from-blue-300 to-purple-300", emoji: "🧘", status: "live" },
  { id: "unit-converter", title: "Conversor de Unidades", category: "interactive", type: "Ferramenta Útil", description: "6 categorias de conversão em tempo real — comprimento, peso, temperatura e mais", gradient: "from-orange-400 to-amber-400", emoji: "📐", status: "live" },
  { id: "quiz-portugal", title: "Quiz Portugal", category: "interactive", type: "Jogo Cultural", description: "15 perguntas sobre Portugal — timer SVG, fun facts, confetti no 15/15", gradient: "from-green-600 to-red-600", emoji: "🇵🇹", status: "live" },
  { id: "pixel-art", title: "Pixel Art Editor", category: "interactive", type: "Ferramenta Criativa", description: "Editor pixel art com flood-fill, export PNG 512px, 3 templates, touch support", gradient: "from-pink-500 to-purple-500", emoji: "🎨", status: "live" },
  { id: "flashcards", title: "Flashcards", category: "interactive", type: "App de Estudo", description: "Flashcards 3D flip com 3 baralhos, swipe gestures, custom decks, atalhos", gradient: "from-amber-400 to-yellow-400", emoji: "📚", status: "live" },
  { id: "recipe-finder", title: "Receitas Portuguesas", category: "interactive", type: "App Gastronómica", description: "12 receitas tradicionais com checklist de ingredientes e fun facts", gradient: "from-red-500 to-orange-400", emoji: "🍳", status: "live" },
  { id: "emoji-mixer", title: "Emoji Mixer", category: "interactive", type: "Jogo Criativo", description: "Slot machine de emojis com 22 story templates, triple match confetti", gradient: "from-pink-400 to-yellow-300", emoji: "🎰", status: "live" },
  { id: "portfolio-builder", title: "Portfolio Builder", category: "interactive", type: "Ferramenta Web", description: "Construtor de portfolio com 3 templates, live preview, export HTML standalone", gradient: "from-blue-500 to-indigo-500", emoji: "🎨", status: "live" },
  { id: "weather-mood", title: "Weather Mood", category: "interactive", type: "Simulador Visual", description: "6 cenas meteorológicas com dia/noite, relâmpagos, neve, arco-íris", gradient: "from-sky-400 to-amber-300", emoji: "🌦️", status: "live" },
  { id: "memory-game", title: "Jogo da Memória", category: "interactive", type: "Jogo", description: "Memory game 3D card flip, 3 dificuldades, star rating, acessibilidade", gradient: "from-blue-400 to-purple-400", emoji: "🧠", status: "live" },
  { id: "css-art-gallery", title: "CSS Art Gallery", category: "interactive", type: "Galeria Artística", description: "6 obras de arte feitas 100% em CSS — pôr do sol, montanha, cidade, oceano, floresta, espaço", gradient: "from-slate-700 to-indigo-700", emoji: "🖼️", status: "live" },
  { id: "countdown", title: "Countdown Timer", category: "interactive", type: "Ferramenta Útil", description: "Flip clock com confetti, share via URL, 4 presets de eventos", gradient: "from-indigo-500 to-violet-500", emoji: "⏳", status: "live" },
  { id: "drawing-canvas", title: "Quadro de Desenho", category: "interactive", type: "Ferramenta Criativa", description: "Canvas com 5 ferramentas, shapes preview, undo/redo, export PNG", gradient: "from-violet-500 to-purple-500", emoji: "✏️", status: "live" },
  { id: "bmi-calculator", title: "Calculadora de IMC", category: "interactive", type: "Ferramenta Saúde", description: "BMI calculator com SVG gauge animado, peso ideal, tips de saúde em PT", gradient: "from-emerald-400 to-teal-400", emoji: "🏥", status: "live" },
  { id: "color-blindness-sim", title: "Simulador de Daltonismo", category: "interactive", type: "Ferramenta Educativa", description: "Simulador com Brettel matrices, Ishihara dots, side-by-side, color picker", gradient: "from-amber-400 to-blue-400", emoji: "👁️", status: "live" },
  { id: "music-box", title: "Caixa de Música", category: "interactive", type: "Experiência Musical", description: "Piano 2 octaves com Web Audio API, 3 instrumentos, record/replay, melodias", gradient: "from-amber-700 to-yellow-500", emoji: "🎹", status: "live" },
  { id: "decision-wheel", title: "Roda da Decisão", category: "interactive", type: "Jogo Útil", description: "Spin the wheel com SVG conic segments, confetti, 2 presets temáticos", gradient: "from-rose-500 to-amber-400", emoji: "🎡", status: "live" },
  { id: "morse-code", title: "Código Morse", category: "interactive", type: "Ferramenta Educativa", description: "Tradutor bidirecional com transmissão visual, estética CRT retro", gradient: "from-amber-500 to-yellow-300", emoji: "📡", status: "live" },
  { id: "todo-kanban", title: "Kanban Board", category: "interactive", type: "App de Produtividade", description: "Quadro kanban com drag & drop HTML5, inline edit, prioridades, localStorage", gradient: "from-blue-400 to-green-400", emoji: "📋", status: "live" },

  // ═══ RPG GAMES ═══
  { id: "rpg-quest", title: "Descomplicai RPG — The Quest", category: "creative", type: "2D RPG Game", description: "RPG completo com mapa 60×50, 12 NPCs, 8 quests, 15 cofres e sistema de diálogo em português", gradient: "from-green-600 to-emerald-400", emoji: "🎮", status: "live" },
  { id: "rpg-chronicle", title: "Descomplicai Chronicle", category: "creative", type: "Parallax Experience", description: "8 capítulos parallax com 10,000px de scroll, personagem-guia e 50+ projetos showcased", gradient: "from-indigo-600 to-purple-500", emoji: "📜", status: "live" },

  // ═══ HOMEPAGE REDESIGNS ═══
  { id: "descomplicai-cosmos", title: "Descomplicai Cosmos", category: "creative", type: "Homepage Redesign", description: "Redesign espacial do site — nebulas, constelações, planetas orbitais e aurora borealis", gradient: "from-blue-900 to-purple-700", emoji: "🌌", status: "live" },
  { id: "descomplicai-jardim", title: "Descomplicai Jardim", category: "creative", type: "Homepage Redesign", description: "Redesign natureza — plantas CSS, borboletas, estufas, portão animado e estações do ano", gradient: "from-green-600 to-amber-400", emoji: "🌿", status: "live" },
  { id: "descomplicai-terminal", title: "Descomplicai Terminal", category: "creative", type: "Homepage Redesign", description: "Redesign hacker — Matrix rain, boot sequence, neofetch, git log e terminal interativo", gradient: "from-gray-900 to-green-800", emoji: "💻", status: "live" },
  { id: "descomplicai-brisa", title: "Descomplicai Brisa", category: "creative", type: "Crowdfunding Site", description: "Conceito Brisa — glassmorphism, bento grid, cores claras. Crowdfunding pessoal para construir para todos.", gradient: "from-sky-400 to-emerald-400", emoji: "🌊", status: "live" },
  { id: "descomplicai-semente", title: "Descomplicai Semente", category: "creative", type: "Crowdfunding Site", description: "Conceito Semente — editorial, storytelling, natureza. Cada projeto é uma semente plantada para a comunidade.", gradient: "from-emerald-500 to-teal-400", emoji: "🌱", status: "live" },
  { id: "descomplicai-horizonte", title: "Descomplicai Horizonte", category: "creative", type: "Crowdfunding Site", description: "Conceito Horizonte — parallax imersivo, gradientes suaves, profundidade. O futuro é para todos.", gradient: "from-indigo-500 to-violet-400", emoji: "🌅", status: "live" },
  { id: "descomplicai-horizonte-v2", title: "Descomplicai Horizonte v2", category: "creative", type: "Redesign Concept", description: "Versão Horizonte evoluída — sunrise gradients, crowdfunding, building in public, comunidade e transparência", gradient: "from-indigo-500 to-orange-400", emoji: "🌅", status: "live" },
  { id: "descomplicai-mare", title: "Descomplicai Maré", category: "creative", type: "Crowdfunding Site", description: "Conceito Maré — oceano, ondas SVG, ilhas de projetos com balloons explicativos. Construo para todos.", gradient: "from-teal-500 to-sky-400", emoji: "🌊", status: "live" },
  { id: "descomplicai-pomar", title: "Descomplicai Pomar", category: "creative", type: "Crowdfunding Site", description: "Conceito Pomar — jardim editorial, tipografia serif, frutos na árvore. Cada projeto é um fruto.", gradient: "from-amber-500 to-emerald-400", emoji: "🍊", status: "live" },
  { id: "descomplicai-ceu", title: "Descomplicai Céu", category: "creative", type: "Crowdfunding Site", description: "Conceito Céu — nuvens CSS, constelações de projetos, parallax em profundidade. O futuro é para todos.", gradient: "from-blue-400 to-violet-400", emoji: "☁️", status: "live" },

  // ═══ MEGA OP 2.0 — SUPER COMPLEXOS (4) ═══
  { id: "fractal-explorer", title: "Fractal Explorer", category: "interactive", type: "Explorador Matemático", description: "Mandelbrot, Julia Set & Burning Ship — zoom infinito, 6 paletas, mini-map, progressive rendering", gradient: "from-purple-600 to-blue-600", emoji: "🌀", status: "live" },
  { id: "particle-sim", title: "Simulador de Partículas", category: "interactive", type: "Simulação Física", description: "N-body Verlet gravity, 5 tipos de partículas, galáxia espiral, slingshot, colisões", gradient: "from-indigo-900 to-cyan-500", emoji: "⚛️", status: "live" },
  { id: "generative-art", title: "Arte Generativa", category: "interactive", type: "Engine Artístico", description: "8 algoritmos: flow field, voronoi, fractal tree, phyllotaxis, galáxia, labirinto, constelação", gradient: "from-rose-600 to-violet-600", emoji: "🎨", status: "live" },
  { id: "jaime-silva", title: "Jaime Silva — Portfolio", category: "creative", type: "Portfolio Pessoal", description: "Portfolio pessoal mega: 7 secções parallax, partículas, typing animation, timeline, glassmorphism", gradient: "from-blue-600 to-purple-600", emoji: "👤", status: "live" },

  // ═══ JARDIM ALGARVIO (3) ═══
  { id: "jardim-algarvio-premium", title: "JardimAlgarvio Premium", category: "services", type: "Paisagismo Luxo", description: "Site editorial de luxo para paisagismo no Algarve — dark design, dourado, parallax cinematico", gradient: "from-[#1A1A18] to-[#C9A96E]", emoji: "🌿", status: "live" },
  { id: "jardim-algarvio-local", title: "JardimAlgarvio Local", category: "services", type: "Negócio Local SEO", description: "Site de jardinagem focado em SEO e conversão — planos de manutenção, mapa do Algarve, WhatsApp CTA", gradient: "from-[#F8FAF7] to-[#16A34A]", emoji: "🌱", status: "live" },
  { id: "jardim-algarvio-organic", title: "JardimAlgarvio Organic", category: "services", type: "Design Botânico", description: "Design orgânico com ilustrações SVG botânicas — cream, olive, terracotta, estilo journal", gradient: "from-[#FDF6EC] to-[#4A5D23]", emoji: "🍃", status: "live" },

  // ═══ MEGA OP 3.0 — PREMIUM (10) ═══
  { id: "globe-explorer", title: "Globo Interativo", category: "interactive", type: "Explorador 3D", description: "CSS 3D sphere com 15 cidades, day/night, search, drag to rotate, atmosphere glow", gradient: "from-blue-700 to-teal-400", emoji: "🌍", status: "live" },
  { id: "periodic-table", title: "Tabela Periódica", category: "interactive", type: "Ferramenta Educativa", description: "118 elementos com temperature slider, category filter, electron config, fun facts", gradient: "from-cyan-600 to-blue-600", emoji: "⚗️", status: "live" },
  { id: "chess", title: "Xadrez", category: "interactive", type: "Jogo Estratégico", description: "Xadrez completo com validação de movimentos, check/checkmate, castling, en passant", gradient: "from-amber-800 to-stone-700", emoji: "♟️", status: "live" },
  { id: "synth", title: "Sintetizador", category: "interactive", type: "Instrumento Musical", description: "3 octaves, ADSR, filter, reverb/delay/distortion, oscilloscope, VU meter, polyphonic", gradient: "from-cyan-600 to-pink-600", emoji: "🎹", status: "live" },
  { id: "ai-chat-sim", title: "Chat IA Simulado", category: "interactive", type: "Simulador", description: "Interface de chat com pattern matching, 10 piadas PT, dark mode, export, markdown", gradient: "from-slate-600 to-blue-500", emoji: "💬", status: "live" },
  { id: "snake-game", title: "Snake Game", category: "interactive", type: "Jogo Clássico", description: "Canvas snake com particle explosion, 3 temas, swipe gestures, high score", gradient: "from-green-600 to-lime-400", emoji: "🐍", status: "live" },
  { id: "calculator", title: "Calculadora Científica", category: "interactive", type: "Ferramenta", description: "Modo científico com sin/cos/tan, DEG/RAD, memória, keyboard shortcuts", gradient: "from-orange-500 to-amber-400", emoji: "🔢", status: "live" },
  { id: "world-clock", title: "Relógio Mundial", category: "interactive", type: "Dashboard", description: "Relógio analógico canvas, 8 fusos, meeting planner, day/night gradient", gradient: "from-indigo-600 to-blue-400", emoji: "🕐", status: "live" },
  { id: "music-theory", title: "Teoria Musical", category: "interactive", type: "Ferramenta Educativa", description: "Escalas, acordes e círculo de quintas com Web Audio — piano interativo", gradient: "from-amber-600 to-red-500", emoji: "🎵", status: "live" },
  { id: "photo-filters", title: "Editor de Fotos", category: "interactive", type: "Editor Visual", description: "Pixel manipulation, 12 presets com thumbnails, crop, compare split-view, undo/redo", gradient: "from-pink-500 to-orange-400", emoji: "📸", status: "live" },

  // ═══ MEGA OP 4.0 — DEV TOOLS & MORE (10) ═══
  { id: "regex-tester", title: "Regex Tester", category: "interactive", type: "Dev Tool", description: "Regex com highlight de matches, 10 presets PT, explicação em português, replace", gradient: "from-emerald-600 to-teal-500", emoji: "🔍", status: "live" },
  { id: "color-theory", title: "Teoria da Cor", category: "interactive", type: "Ferramenta Design", description: "Color wheel SVG, 5 harmonias, WCAG contrast checker, daltonismo preview, tints/shades", gradient: "from-rose-500 to-violet-500", emoji: "🎨", status: "live" },
  { id: "mapa-portugal", title: "Mapa de Portugal", category: "interactive", type: "Explorador Geográfico", description: "20 distritos SVG, 3 modos de cor, info panel com gastronomia e monumentos", gradient: "from-green-600 to-red-500", emoji: "🗺️", status: "live" },
  { id: "drum-machine", title: "Drum Machine", category: "interactive", type: "Instrumento Musical", description: "16-step sequencer, 8 drums sintetizados, swing, tap tempo, 4 presets", gradient: "from-pink-600 to-purple-600", emoji: "🥁", status: "live" },
  { id: "text-analyzer", title: "Analisador de Texto", category: "interactive", type: "Ferramenta", description: "Stats em tempo real, Flesch gauge, word frequency, keyword density, transformações", gradient: "from-teal-500 to-cyan-400", emoji: "📊", status: "live" },
  { id: "sorting-visualizer", title: "Visualizador de Sorting", category: "interactive", type: "Educativo CS", description: "6 algoritmos animados (Bubble, Merge, Quick, Heap...), step-by-step, comparison table", gradient: "from-blue-600 to-red-500", emoji: "📈", status: "live" },
  { id: "css-playground", title: "CSS Playground", category: "interactive", type: "Dev Tool", description: "Editor CSS visual com box-shadow dinâmico, 8 presets (glassmorphism, neumorphism...)", gradient: "from-violet-500 to-fuchsia-500", emoji: "🎯", status: "live" },
  { id: "maze-solver", title: "Labirinto", category: "interactive", type: "Jogo & Algoritmos", description: "Gerador de labirintos + 3 solvers (BFS, DFS, A*), player mode com WASD", gradient: "from-emerald-600 to-lime-500", emoji: "🏰", status: "live" },
  { id: "json-formatter", title: "JSON Formatter", category: "interactive", type: "Dev Tool", description: "Tree view colapsável, JSONPath hover, syntax highlighting, dark/light, search", gradient: "from-amber-500 to-orange-500", emoji: "{ }", status: "live" },
  { id: "guitar-tuner", title: "Afinador de Guitarra", category: "interactive", type: "Ferramenta Musical", description: "Afinador com referência Web Audio, 5 afinações, biblioteca de 30+ acordes", gradient: "from-amber-700 to-red-600", emoji: "🎸", status: "live" },

  // ═══ ORGANIC FLOW (1) ═══
  { id: "descomplicai-organic", title: "Descomplicai Organic", category: "creative", type: "Redesign Concept", description: "Versão organic flow — tons terrosos, formas curvas SVG, texturas naturais, botânico e humano", gradient: "from-green-300 to-amber-200", emoji: "🌿", status: "live" },

  // ═══ COMING SOON — REDESIGN CONCEPTS (3) ═══
  { id: "descomplicai-aurora", title: "Descomplicai Aurora", category: "creative", type: "Redesign Concept", description: "Versão aurora — luzes do norte, gradientes etéreos, transições suaves", gradient: "from-blue-800 to-teal-400", emoji: "🌌", status: "dev" },
  { id: "descomplicai-cristal", title: "Descomplicai Cristal", category: "creative", type: "Redesign Concept", description: "Versão cristal — formas geométricas, reflexos de luz, paleta gelada", gradient: "from-cyan-200 to-blue-300", emoji: "💎", status: "dev" },
  { id: "descomplicai-florescer", title: "Descomplicai Florescer", category: "creative", type: "Redesign Concept", description: "Versão florescer — botânico, pétalas, crescimento orgânico", gradient: "from-pink-300 to-green-300", emoji: "🌸", status: "dev" },
] as const satisfies ReadonlyArray<Project>;

export type ProjectId = (typeof projectDefinitions)[number]["id"];

export const projects: Project[] = projectDefinitions.map((project) => ({ ...project }));

export type PortfolioTrack = "client" | "concept" | "lab" | "internal";

export type ProjectSector =
  | "hospitality"
  | "wine_tourism"
  | "healthcare"
  | "fitness_wellness"
  | "local_services"
  | "beauty_personal_care"
  | "personal_brand"
  | "education"
  | "developer_tools"
  | "creative_tech";

export type ProjectFormat =
  | "website"
  | "multi_page_site"
  | "pwa"
  | "portfolio"
  | "design_system"
  | "tool"
  | "simulator"
  | "game"
  | "storytelling"
  | "interactive_experience";

export type ProjectLifecycle = "published" | "draft" | "archived" | "hidden";
export type ProjectVariantKind = "standalone" | "collection" | "variant";

type ProjectTaxonomyDefaults = {
  track: PortfolioTrack;
  sectors: readonly ProjectSector[];
  formats: readonly ProjectFormat[];
};

export type ProjectTaxonomySeed = {
  track?: PortfolioTrack;
  sectors?: readonly ProjectSector[];
  formats?: readonly ProjectFormat[];
  lifecycle?: ProjectLifecycle;
  seriesId?: string;
  variantOf?: ProjectId;
  variantKind?: ProjectVariantKind;
  variantLabel?: string;
  notes?: readonly string[];
};

export type ProjectTaxonomy = {
  track: PortfolioTrack;
  sectors: readonly ProjectSector[];
  formats: readonly ProjectFormat[];
  lifecycle: ProjectLifecycle;
  legacyCategory: ProjectCategory;
  variantKind: ProjectVariantKind;
  seriesId?: string;
  variantOf?: ProjectId;
  variantLabel?: string;
  notes: readonly string[];
};

const projectCategoryTaxonomyDefaults = {
  restaurant: { track: "client", sectors: ["hospitality"], formats: ["website"] },
  health: { track: "client", sectors: ["healthcare"], formats: ["website"] },
  interactive: { track: "lab", sectors: ["creative_tech"], formats: ["tool"] },
  food: { track: "client", sectors: ["wine_tourism"], formats: ["website"] },
  creative: { track: "concept", sectors: ["creative_tech"], formats: ["interactive_experience"] },
  fitness: { track: "client", sectors: ["fitness_wellness"], formats: ["website"] },
  sports: { track: "client", sectors: ["fitness_wellness"], formats: ["website"] },
  services: { track: "client", sectors: ["local_services"], formats: ["website"] },
} as const satisfies Readonly<Record<ProjectCategory, ProjectTaxonomyDefaults>>;

export const draftProjectRouteIds = [] as const;

export type DraftProjectRouteId = (typeof draftProjectRouteIds)[number];

const projectTaxonomySeedDefinitions: Partial<Record<ProjectId, ProjectTaxonomySeed>> = {
  bfitfam: {
    formats: ["website", "pwa"],
    sectors: ["fitness_wellness"],
    track: "client",
  },
  "ondas-academy": {
    sectors: ["fitness_wellness"],
  },
  futuro: {
    formats: ["portfolio", "interactive_experience"],
    sectors: ["personal_brand", "creative_tech"],
  },
  seeds: {
    formats: ["storytelling"],
  },
  "descomplicai-brutalist": {
    seriesId: "descomplicai-redesigns",
  },
  "descomplicai-editorial": {
    seriesId: "descomplicai-redesigns",
  },
  "descomplicai-glassmorphism": {
    seriesId: "descomplicai-redesigns",
  },
  "vindima-selvagem": {
    sectors: ["wine_tourism"],
    notes: ["Mantido em category='food' para compatibilidade com os filtros atuais."],
  },
  "quintas-estrelas": {
    sectors: ["wine_tourism"],
    notes: ["Mantido em category='food' para compatibilidade com os filtros atuais."],
  },
  "rota-dos-vinhos": {
    sectors: ["wine_tourism"],
    notes: ["Mantido em category='food' para compatibilidade com os filtros atuais."],
  },
  "vinho-na-rua": {
    sectors: ["wine_tourism"],
    notes: ["Mantido em category='food' para compatibilidade com os filtros atuais."],
  },
  "ninika-tours": {
    sectors: ["wine_tourism"],
    formats: ["multi_page_site"],
    notes: ["Mantido em category='food' para compatibilidade com os filtros atuais."],
  },
  "design-system": {
    formats: ["design_system"],
    lifecycle: "published",
    track: "internal",
  },
  meiocheio: {
    sectors: ["hospitality", "wine_tourism"],
  },
  ribeirosanto: {
    formats: ["multi_page_site"],
    sectors: ["wine_tourism"],
    notes: ["A categoria legada continua 'restaurant' até a UI pública migrar para sector/track."],
  },
  "rabbit-hole": {
    formats: ["storytelling", "interactive_experience"],
  },
  "zeff-pizza": {
    seriesId: "zeff-pizza",
    variantKind: "collection",
  },
  "zeff-pizza-pirate": {
    seriesId: "zeff-pizza",
    variantKind: "variant",
    variantLabel: "Pirate Tavern",
    variantOf: "zeff-pizza",
  },
  "zeff-pizza-sun": {
    seriesId: "zeff-pizza",
    variantKind: "variant",
    variantLabel: "Figueira Sun",
    variantOf: "zeff-pizza",
  },
  "zeff-pizza-artisan": {
    seriesId: "zeff-pizza",
    variantKind: "variant",
    variantLabel: "Roman Artisan",
    variantOf: "zeff-pizza",
  },
  "friseursalon-awat-chalak": {
    sectors: ["beauty_personal_care"],
    notes: ["A categoria legada continua 'restaurant' até a taxonomia pública ser separada por sector."],
  },
  "dentalkid-v2": {
    seriesId: "dentalkid",
    variantKind: "variant",
    variantLabel: "Fresh Palette",
    variantOf: "dentalkid",
  },
  "descomplicai-cosmos": {
    seriesId: "descomplicai-redesigns",
  },
  "descomplicai-jardim": {
    seriesId: "descomplicai-redesigns",
  },
  "descomplicai-terminal": {
    seriesId: "descomplicai-redesigns",
  },
  "descomplicai-brisa": {
    seriesId: "descomplicai-crowdfunding",
  },
  "descomplicai-semente": {
    seriesId: "descomplicai-crowdfunding",
  },
  "descomplicai-horizonte": {
    seriesId: "descomplicai-crowdfunding",
  },
  "descomplicai-horizonte-v2": {
    seriesId: "descomplicai-crowdfunding",
  },
  "descomplicai-mare": {
    seriesId: "descomplicai-crowdfunding",
  },
  "descomplicai-pomar": {
    seriesId: "descomplicai-crowdfunding",
  },
  "descomplicai-ceu": {
    seriesId: "descomplicai-crowdfunding",
  },
  "jaime-silva": {
    formats: ["portfolio"],
    sectors: ["personal_brand", "creative_tech"],
  },
  "jardim-algarvio-premium": {
    seriesId: "jardim-algarvio",
    variantKind: "variant",
    variantLabel: "Premium",
  },
  "jardim-algarvio-local": {
    seriesId: "jardim-algarvio",
    variantKind: "variant",
    variantLabel: "Local SEO",
  },
  "jardim-algarvio-organic": {
    seriesId: "jardim-algarvio",
    variantKind: "variant",
    variantLabel: "Organic",
  },
  "descomplicai-organic": {
    seriesId: "descomplicai-redesigns",
  },
};

export const projectTaxonomySeeds: Partial<Record<string, ProjectTaxonomySeed>> = {
  ...projectTaxonomySeedDefinitions,
};

function buildProjectTaxonomy(project: Project): ProjectTaxonomy {
  const projectId = project.id as ProjectId;
  const defaults = projectCategoryTaxonomyDefaults[project.category];
  const seed = projectTaxonomySeedDefinitions[projectId];

  return {
    track: seed?.track ?? defaults.track,
    sectors: seed?.sectors ?? defaults.sectors,
    formats: seed?.formats ?? defaults.formats,
    lifecycle: seed?.lifecycle ?? "published",
    legacyCategory: project.category,
    variantKind: seed?.variantKind ?? "standalone",
    seriesId: seed?.seriesId,
    variantOf: seed?.variantOf,
    variantLabel: seed?.variantLabel,
    notes: seed?.notes ?? [],
  };
}

export const projectTaxonomyById = Object.fromEntries(
  projects.map((project) => [project.id, buildProjectTaxonomy(project)]),
) as Record<ProjectId, ProjectTaxonomy>;

const projectPreviewImageDefinitions = {
  bfitfam: "/previews/bfitfam.jpg",
  "tasca-dentro": "/previews/tasca-dentro.jpg",
  futuro: "/previews/futuro.jpg",
  seeds: "/previews/seeds.jpg",
  "ondas-academy": "/previews/ondas-academy.jpg",
} as const satisfies Partial<Record<ProjectId, string>>;

export const projectPreviewImages: Partial<Record<string, string>> = {
  ...projectPreviewImageDefinitions,
};

export const featuredProjectIds = [
  "ribeirosanto",
  "ninika-tours",
  "clinica-vasco-da-gama",
  "bijou-restaurante",
  "futuro",
  "design-system",
] as const satisfies ReadonlyArray<ProjectId>;

export const featuredProjects = featuredProjectIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project));

export type ProjectFilterId =
  | "all"
  | "restaurant"
  | "health"
  | "interactive"
  | "food"
  | "creative"
  | "fitness"
  | "services";

export type ProjectFilterGroup = "all" | "sector" | "discipline";

export type ProjectFilterDefinition = {
  id: ProjectFilterId;
  label: string;
  description: string;
  group: ProjectFilterGroup;
  legacyCategories: readonly ProjectCategory[];
};

export const projectFilterDefinitions = [
  { id: "all", label: "Todos", description: "Todos os projetos publicados.", group: "all", legacyCategories: [] },
  { id: "restaurant", label: "Restauração", description: "Restaurantes, bares, cafés e conceitos de hospitalidade.", group: "sector", legacyCategories: ["restaurant"] },
  { id: "health", label: "Saúde", description: "Clínicas, medicina e marcas de saúde.", group: "sector", legacyCategories: ["health"] },
  { id: "interactive", label: "Interativo", description: "Ferramentas, simuladores, jogos e experiências exploratórias.", group: "discipline", legacyCategories: ["interactive"] },
  { id: "food", label: "Vinho & Gastronomia", description: "Experiências vínicas, enoturismo e propostas gastro.", group: "sector", legacyCategories: ["food"] },
  { id: "creative", label: "Criativo & 3D", description: "Concepts, portfolios imersivos e experiências visuais.", group: "discipline", legacyCategories: ["creative"] },
  { id: "fitness", label: "Fitness & Desporto", description: "Projetos de treino, bem-estar e desporto.", group: "sector", legacyCategories: ["fitness", "sports"] },
  { id: "services", label: "Serviços", description: "Negócios locais e serviços especializados.", group: "sector", legacyCategories: ["services"] },
] as const satisfies ReadonlyArray<ProjectFilterDefinition>;

const projectFilterCategoryMap: Readonly<Record<Exclude<ProjectFilterId, "all">, readonly ProjectCategory[]>> = {
  restaurant: ["restaurant"],
  health: ["health"],
  interactive: ["interactive"],
  food: ["food"],
  creative: ["creative"],
  fitness: ["fitness", "sports"],
  services: ["services"],
};

export function matchesProjectFilter(project: Project, filterId: ProjectFilterId) {
  if (filterId === "all") return true;

  return projectFilterCategoryMap[filterId].includes(project.category);
}

export function getProjectsByFilter(filterId: ProjectFilterId) {
  return projects.filter((project) => matchesProjectFilter(project, filterId));
}

export const projectFilters = projectFilterDefinitions.map((filter) => ({
  ...filter,
  count: filter.id === "all" ? projects.length : getProjectsByFilter(filter.id).length,
}));

export const projectCount = projects.length;
export const liveProjectCount = projects.filter((project) => project.status === "live").length;
export const showcaseCategoryCount = projectFilters.filter(
  (filter) => filter.id !== "all" && filter.count > 0,
).length;
