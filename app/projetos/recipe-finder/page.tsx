"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "Todos" | "Sopas" | "Peixes" | "Carnes" | "Doces" | "Petiscos";
type Difficulty = "Fácil" | "Médio" | "Difícil";

interface Recipe {
  id: number;
  name: string;
  emoji: string;
  category: Exclude<Category, "Todos">;
  difficulty: Difficulty;
  time: string;
  servings: number;
  ingredients: string[];
  steps: string[];
  funFact: string;
}

const RECIPES: Recipe[] = [
  {
    id: 1,
    name: "Caldo Verde",
    emoji: "🥬",
    category: "Sopas",
    difficulty: "Fácil",
    time: "35 min",
    servings: 6,
    ingredients: [
      "500g de couve galega finamente fatiada",
      "500g de batata descascada e cortada",
      "1 chouriço de carne",
      "1 cebola grande",
      "3 dentes de alho",
      "4 colheres de sopa de azeite",
      "Sal e pimenta q.b.",
      "1,5 litros de água",
    ],
    steps: [
      "Refoga a cebola e o alho picados no azeite até ficarem transparentes.",
      "Adiciona as batatas cortadas em cubos e cobre com a água. Tempera com sal e pimenta.",
      "Cozinha em lume médio durante 20 minutos até as batatas estarem bem macias.",
      "Retira o chouriço (se cozinhaste junto) e tritura a sopa com varinha mágica.",
      "Adiciona a couve galega fatiada finamente e cozinha mais 5 minutos.",
      "Serve com rodelas de chouriço por cima e um fio de azeite.",
    ],
    funFact:
      "O Caldo Verde é considerado um dos pratos mais emblemáticos de Portugal e é obrigatório nas festas populares de junho, especialmente no São João no Porto.",
  },
  {
    id: 2,
    name: "Bacalhau à Brás",
    emoji: "🐟",
    category: "Peixes",
    difficulty: "Médio",
    time: "45 min",
    servings: 4,
    ingredients: [
      "500g de bacalhau demolhado e desfiado",
      "500g de batata palha",
      "6 ovos",
      "2 cebolas médias",
      "3 dentes de alho",
      "Azeite q.b.",
      "Salsa fresca picada",
      "Azeitonas pretas",
      "Sal e pimenta q.b.",
    ],
    steps: [
      "Refoga as cebolas e alho laminados em azeite abundante até dourarem.",
      "Adiciona o bacalhau desfiado e cozinha 5 minutos a mexer.",
      "Junta a batata palha e mistura tudo muito bem.",
      "Bate os ovos com sal e pimenta e deita sobre a mistura.",
      "Mexe em lume brando até os ovos ficarem cremosos mas não secos.",
      "Finaliza com salsa picada e azeitonas pretas. Serve imediatamente.",
    ],
    funFact:
      "Diz a lenda que esta receita foi criada por um tasqueiro lisboeta chamado Braz, que inventou o prato para aproveitar sobras de bacalhau. Hoje é um dos pratos mais pedidos nos restaurantes portugueses.",
  },
  {
    id: 3,
    name: "Francesinha",
    emoji: "🥪",
    category: "Carnes",
    difficulty: "Difícil",
    time: "90 min",
    servings: 2,
    ingredients: [
      "4 fatias de pão de forma",
      "200g de bife de vaca",
      "2 salsichas frescas",
      "100g de fiambre",
      "200g de queijo flamengo fatiado",
      "1 lata de cerveja",
      "200ml de caldo de carne",
      "2 colheres de sopa de molho de tomate",
      "1 chouriço",
      "Manteiga, sal, pimenta",
      "1 colher de chá de piri-piri",
    ],
    steps: [
      "Prepara o molho: mistura a cerveja, caldo de carne, molho de tomate e piri-piri. Deixa ferver 20 minutos até engrossar.",
      "Grelha o bife, as salsichas e o chouriço temperados com sal e pimenta.",
      "Monta a sandes: fatia de pão, fiambre, bife, salsichas, chouriço, outra fatia de pão.",
      "Cobre completamente com as fatias de queijo, incluindo os lados.",
      "Vai ao forno a 200°C por 10 minutos até o queijo derreter e alourar.",
      "Serve numa travessa funda com o molho bem quente por cima. Opcional: ovo estrelado por cima.",
    ],
    funFact:
      "A Francesinha nasceu no Porto nos anos 1950, criada por Daniel da Silva, que trouxe a inspiração do Croque-Monsieur francês após viver em Paris e Bélgica. Hoje é símbolo gastronómico do Porto.",
  },
  {
    id: 4,
    name: "Pastel de Nata",
    emoji: "🥐",
    category: "Doces",
    difficulty: "Difícil",
    time: "75 min",
    servings: 12,
    ingredients: [
      "500g de massa folhada",
      "500ml de leite gordo",
      "6 gemas de ovo",
      "200g de açúcar",
      "50g de farinha de trigo",
      "1 pau de canela",
      "Casca de limão",
      "Canela em pó e açúcar em pó para servir",
    ],
    steps: [
      "Faz um xarope com o açúcar, água, canela e casca de limão. Deixa arrefecer.",
      "Dissolve a farinha no leite frio e leva ao lume até engrossar, mexendo sempre.",
      "Retira do lume, deixa arrefecer ligeiramente e junta as gemas e o xarope. Mistura bem.",
      "Corta a massa folhada em rolos, forra as formas de pastel pressionando com os polegares.",
      "Enche as formas com o creme até 3/4.",
      "Assa em forno muito quente (300°C ou máximo) por 12-15 minutos até aparecerem manchas escuras.",
    ],
    funFact:
      "Os Pastéis de Nata foram criados pelos monges do Mosteiro dos Jerónimos em Belém antes de 1820. A receita original mantém-se secreta e só é produzida na Antiga Confeitaria de Belém, que serve mais de 20.000 pastéis por dia.",
  },
  {
    id: 5,
    name: "Arroz de Marisco",
    emoji: "🦐",
    category: "Peixes",
    difficulty: "Médio",
    time: "60 min",
    servings: 4,
    ingredients: [
      "300g de arroz carolino",
      "500g de amêijoas",
      "300g de gambas",
      "200g de mexilhão",
      "1 sapateira (opcional)",
      "2 tomates maduros",
      "1 cebola",
      "4 dentes de alho",
      "1 dl de vinho branco",
      "Coentros frescos",
      "Azeite, sal, pimenta",
      "1 litro de caldo de peixe",
    ],
    steps: [
      "Abre as amêijoas e mexilhões em vinho branco. Reserva o líquido.",
      "Refoga a cebola e alho no azeite. Adiciona o tomate pelado e picado.",
      "Junta o arroz e refoga 2 minutos. Adiciona o vinho e deixa evaporar.",
      "Vai adicionando o caldo de peixe quente aos poucos, como um risotto.",
      "A meio da cozedura junta as gambas e os restantes mariscos.",
      "Deve ficar malandrinho (com bastante caldo). Finaliza com coentros frescos.",
    ],
    funFact:
      "O arroz malandrinho é uma arte portuguesa — a palavra 'malandrinho' descreve o ponto perfeito do arroz, nem seco nem ensopado, mas rico em caldo cremoso e aromático.",
  },
  {
    id: 6,
    name: "Bifana",
    emoji: "🥩",
    category: "Carnes",
    difficulty: "Fácil",
    time: "30 min",
    servings: 4,
    ingredients: [
      "600g de bifanas (escalopes de porco finos)",
      "4 pãezinhos portugueses (papo-seco)",
      "6 dentes de alho",
      "1 dl de vinho branco",
      "1 colher de sopa de banha ou manteiga",
      "Piri-piri a gosto",
      "Sal, pimenta e colorau",
      "Mostarda (opcional)",
    ],
    steps: [
      "Marina as bifanas no vinho, alho esmagado, piri-piri, colorau, sal e pimenta pelo menos 30 minutos.",
      "Aquece a banha ou manteiga numa frigideira larga em lume forte.",
      "Frita as bifanas rapidamente (1-2 min cada lado) no lume alto para não endurecer.",
      "Adiciona a marinada à frigideira e deixa reduzir 2-3 minutos.",
      "O molho deve ficar bem concentrado e picante.",
      "Serve nas papo-secos abertas com bastante molho. Opcional: mostarda.",
    ],
    funFact:
      "A bifana é o snack nacional de Portugal e o melhor combate ao ressaco. A versão mais famosa vem de Vendas Novas no Alentejo, onde a receita é guardada com tanto zelo como qualquer segredo de estado.",
  },
  {
    id: 7,
    name: "Açorda",
    emoji: "🍞",
    category: "Sopas",
    difficulty: "Fácil",
    time: "25 min",
    servings: 4,
    ingredients: [
      "400g de pão alentejano (duro, de véspera)",
      "4 ovos",
      "6 dentes de alho",
      "Coentros frescos abundantes",
      "Azeite extra virgem generoso",
      "Sal grosso",
      "Água quente q.b.",
      "Opcional: camarão ou bacalhau",
    ],
    steps: [
      "Pisa no almofariz os alhos com sal grosso até formar uma pasta.",
      "Adiciona os coentros frescos e continua a pisar. Junta o azeite.",
      "Parte o pão em pedaços numa tigela funda.",
      "Deita água a ferver sobre o pão com o refogado de alho e coentros.",
      "Deixa o pão absorver bem a água. Deve ficar com consistência de papa.",
      "Escalfa os ovos por cima e serve com um fio generoso de azeite.",
    ],
    funFact:
      "A açorda é o prato da sobrevivência alentejana — nasceu da necessidade de aproveitar o pão seco. Hoje é considerada iguaria e representa a filosofia do desperdício zero na culinária portuguesa.",
  },
  {
    id: 8,
    name: "Cozido à Portuguesa",
    emoji: "🍲",
    category: "Carnes",
    difficulty: "Difícil",
    time: "180 min",
    servings: 8,
    ingredients: [
      "500g de carne de vaca (peito)",
      "1 frango",
      "300g de chouriço de carne",
      "200g de morcela",
      "200g de farinheira",
      "500g de toucinho entremeado",
      "300g de orelha e/ou focinho de porco",
      "500g de cenouras",
      "500g de batatas",
      "1 couve portuguesa",
      "300g de grão de bico",
      "Arroz carolino para acompanhar",
    ],
    steps: [
      "Na véspera, demolha o grão de bico. Coloca as carnes salgadas em água fria.",
      "Começa pela carne de vaca — cobre com água fria e leva ao lume. Retira a espuma.",
      "Após 1h30, junta o frango, toucinho e orelha.",
      "Passados 30 minutos, junta os enchidos e o grão.",
      "Nos últimos 20 minutos, adiciona as cenouras, batatas e couve.",
      "Serve separadamente: primeiro o caldo com arroz, depois as carnes e legumes.",
    ],
    funFact:
      "O Cozido à Portuguesa é considerado o prato nacional mais completo — um banquete em si mesmo que atravessa todas as classes sociais. Cada região tem a sua versão, sendo o de Lafões, em Viseu, particularmente famoso.",
  },
  {
    id: 9,
    name: "Frango Piri-Piri",
    emoji: "🌶️",
    category: "Carnes",
    difficulty: "Médio",
    time: "90 min",
    servings: 4,
    ingredients: [
      "1 frango inteiro (1,5kg) ou 8 coxas",
      "10 piri-piris frescos ou secos",
      "6 dentes de alho",
      "Sumo de 2 limões",
      "100ml de azeite",
      "1 colher de sopa de colorau doce",
      "Sal grosso",
      "Salsa fresca",
      "Opcional: pimentos",
    ],
    steps: [
      "Prepara o molho piri-piri: tritura os piri-piris, alho, sal, sumo de limão, colorau e azeite.",
      "Abre o frango ao meio (em borboleta) pressionando firmemente o peito.",
      "Esfrega bem o molho por todo o frango, incluindo por baixo da pele.",
      "Marina pelo menos 4 horas (idealmente de véspera) no frigorífico.",
      "Grelha na brasa em lume médio, virando frequentemente e pincelando com molho.",
      "Demora 45-60 minutos. Serve com arroz branco e pão para o molho.",
    ],
    funFact:
      "O frango piri-piri ganhou fama mundial através das colónias portuguesas em África, especialmente Moçambique e Angola. A palavra 'piri-piri' vem do suaíli e significa 'pimenta'. Hoje é embaixador da gastronomia luso-africana.",
  },
  {
    id: 10,
    name: "Leite-Creme",
    emoji: "🍮",
    category: "Doces",
    difficulty: "Fácil",
    time: "30 min",
    servings: 6,
    ingredients: [
      "1 litro de leite gordo",
      "6 gemas de ovo",
      "200g de açúcar",
      "50g de farinha maisena",
      "Casca de limão",
      "1 pau de canela",
      "Açúcar amarelo para queimar",
      "Canela em pó",
    ],
    steps: [
      "Ferve o leite com a casca de limão e canela. Deixa arrefecer ligeiramente.",
      "Bate as gemas com o açúcar até ficarem esbranquiçadas e cremosas.",
      "Adiciona a maisena e mistura bem. Junta o leite morno aos poucos.",
      "Leva ao lume em banho-maria, mexendo constantemente até engrossar.",
      "Distribui pelas taças e deixa arrefecer.",
      "Antes de servir, polvilha com açúcar amarelo e queima com o maçarico até caramelizar.",
    ],
    funFact:
      "Ao contrário do que muitos pensam, o Leite-Creme não é a mesma coisa que o Crème Brûlée francês — é mais cremoso, com farinha maisena e tem sabor mais suave. É um dos doces de colher mais amados em Portugal.",
  },
  {
    id: 11,
    name: "Sardinhas Assadas",
    emoji: "🐟",
    category: "Peixes",
    difficulty: "Fácil",
    time: "20 min",
    servings: 4,
    ingredients: [
      "12 sardinhas frescas",
      "Sal grosso abundante",
      "Azeite extra virgem",
      "Pão de milho",
      "Pimento verde assado",
      "Tomate maduro",
      "Cebola",
      "Vinagre e azeite para a salada",
    ],
    steps: [
      "Limpa as sardinhas mas deixa a cabeça e escamas (protegem durante a grelha).",
      "Cobre generosamente com sal grosso e deixa 10 minutos.",
      "Aquece a grelha até estar bem quente, quase a fumar.",
      "Grelha as sardinhas 4-5 minutos de cada lado sem mexer.",
      "Prepara a salada de tomate, cebola e pimento.",
      "Serve as sardinhas com a salada e pão de milho para absorver a gordura.",
    ],
    funFact:
      "As Sardinhas Assadas são o símbolo máximo das Festas de Lisboa em junho. Diz-se que o cheiro das sardinhas a assar é o verdadeiro perfume de Lisboa. Os portugueses comem mais de 15.000 toneladas de sardinha por ano.",
  },
  {
    id: 12,
    name: "Pataniscas de Bacalhau",
    emoji: "🍳",
    category: "Petiscos",
    difficulty: "Fácil",
    time: "40 min",
    servings: 4,
    ingredients: [
      "400g de bacalhau demolhado e desfiado",
      "200g de farinha",
      "3 ovos",
      "150ml de leite",
      "1 cebola pequena picada",
      "Salsa fresca picada",
      "Sal e pimenta",
      "Óleo para fritar",
      "Arroz de feijão para acompanhar",
    ],
    steps: [
      "Prepara a massa: mistura a farinha, ovos e leite até obter uma pasta lisa.",
      "Tempera com sal, pimenta, cebola e salsa.",
      "Junta o bacalhau desfiado e mistura bem para incorporar na massa.",
      "Aquece o óleo numa frigideira. Deve estar bem quente.",
      "Deita colheradas da massa no óleo e frita 3-4 minutos de cada lado até dourarem.",
      "Escorre em papel absorvente e serve com arroz de feijão.",
    ],
    funFact:
      "As Pataniscas são o petisco por excelência das tascas lisboetas. Antigamente eram vendidas nas ruas de Lisboa por 'peixeiras' ambulantes. A palavra 'patanisca' tem origem obscura mas alguns linguistas ligam-na ao árabe.",
  },
];

const CATEGORIES: Category[] = ["Todos", "Sopas", "Peixes", "Carnes", "Doces", "Petiscos"];

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Fácil: "bg-green-100 text-green-700",
  Médio: "bg-amber-100 text-amber-700",
  Difícil: "bg-red-100 text-red-700",
};

const CATEGORY_COLORS: Record<Exclude<Category, "Todos">, string> = {
  Sopas: "bg-blue-100 text-blue-700",
  Peixes: "bg-teal-100 text-teal-700",
  Carnes: "bg-orange-100 text-orange-700",
  Doces: "bg-pink-100 text-pink-700",
  Petiscos: "bg-purple-100 text-purple-700",
};

export default function RecipeFinderPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    return RECIPES.filter((r) => {
      const matchesCategory = activeCategory === "Todos" || r.category === activeCategory;
      const matchesSearch =
        search === "" ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const openRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCheckedIngredients(new Set());
  };

  const closeRecipe = () => {
    setSelectedRecipe(null);
    setCheckedIngredients(new Set());
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fef3c7" }}>
      {/* Header */}
      <div className="pt-12 pb-8 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-stone-800 mb-2"
        >
          Receitas Portuguesas 🍳
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-stone-500 mb-8"
        >
          Encontra a receita perfeita
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-lg mx-auto relative"
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-xl">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisa por receita ou categoria..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-amber-200 bg-white shadow-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-red-400 transition-colors text-base"
          />
        </motion.div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 justify-center px-4 pb-8">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i + 0.3 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 border-2 ${
              activeCategory === cat
                ? "border-red-400 text-white shadow-md scale-105"
                : "border-amber-200 bg-white text-stone-600 hover:border-red-300 hover:scale-102"
            }`}
            style={
              activeCategory === cat
                ? { backgroundColor: "#ef4444", borderColor: "#ef4444" }
                : {}
            }
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-center text-sm text-stone-500 mb-4 px-4">
        {filtered.length === RECIPES.length
          ? `${RECIPES.length} receitas`
          : `${filtered.length} de ${RECIPES.length} receitas`}
      </div>

      {/* Recipe Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-stone-400"
            >
              <p className="text-5xl mb-4">🤷</p>
              <p className="text-lg">Nenhuma receita encontrada</p>
              <p className="text-sm mt-1">Tenta outro nome ou categoria</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
                  onClick={() => openRecipe(recipe)}
                  className="bg-white rounded-2xl p-5 cursor-pointer border-2 border-amber-100 hover:border-red-200 transition-colors shadow-sm"
                >
                  <div className="text-5xl mb-3 text-center">{recipe.emoji}</div>
                  <h3 className="font-bold text-stone-800 text-base mb-3 text-center leading-snug">
                    {recipe.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${DIFFICULTY_COLORS[recipe.difficulty]}`}
                    >
                      {recipe.difficulty}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${CATEGORY_COLORS[recipe.category]}`}
                    >
                      {recipe.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-xs text-stone-500">
                    <span>⏱ {recipe.time}</span>
                    <span>👥 {recipe.servings} pessoas</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeRecipe}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-8 md:bottom-8 md:w-[680px] z-50 bg-white md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div
                className="px-6 pt-6 pb-5 text-white relative flex-shrink-0"
                style={{ backgroundColor: "#ef4444" }}
              >
                <button
                  onClick={closeRecipe}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
                >
                  ✕
                </button>
                <div className="text-5xl mb-2">{selectedRecipe.emoji}</div>
                <h2 className="text-2xl font-bold">{selectedRecipe.name}</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                    {selectedRecipe.difficulty}
                  </span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                    ⏱ {selectedRecipe.time}
                  </span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                    👥 {selectedRecipe.servings} pessoas
                  </span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                    {selectedRecipe.category}
                  </span>
                </div>
              </div>

              {/* Modal Body (scrollable) */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {/* Ingredients */}
                <section>
                  <h3 className="font-bold text-stone-800 text-base mb-3 flex items-center gap-2">
                    <span className="text-lg">🛒</span> Ingredientes
                    <span className="text-xs text-stone-400 font-normal ml-1">
                      (clica para marcar)
                    </span>
                  </h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, i) => (
                      <motion.li
                        key={i}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleIngredient(i)}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            checkedIngredients.has(i)
                              ? "border-red-400 text-white text-xs"
                              : "border-stone-300 group-hover:border-red-300"
                          }`}
                          style={
                            checkedIngredients.has(i)
                              ? { backgroundColor: "#ef4444", borderColor: "#ef4444" }
                              : {}
                          }
                        >
                          {checkedIngredients.has(i) && "✓"}
                        </span>
                        <span
                          className={`text-sm transition-all ${
                            checkedIngredients.has(i)
                              ? "line-through text-stone-400"
                              : "text-stone-700"
                          }`}
                        >
                          {ingredient}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </section>

                {/* Steps */}
                <section>
                  <h3 className="font-bold text-stone-800 text-base mb-3 flex items-center gap-2">
                    <span className="text-lg">👨‍🍳</span> Preparação
                  </h3>
                  <ol className="space-y-3">
                    {selectedRecipe.steps.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-3"
                      >
                        <span
                          className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold"
                          style={{ backgroundColor: "#ef4444" }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-sm text-stone-700 leading-relaxed">{step}</p>
                      </motion.li>
                    ))}
                  </ol>
                </section>

                {/* Fun Fact */}
                <section>
                  <div className="rounded-2xl p-4 border-l-4" style={{ backgroundColor: "#fef3c7", borderLeftColor: "#ef4444" }}>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                      Sabias que...
                    </p>
                    <p className="text-sm text-stone-700 leading-relaxed italic">
                      {selectedRecipe.funFact}
                    </p>
                  </div>
                </section>

                {/* Bottom padding for mobile */}
                <div className="h-4" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
