"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "pt" | "en";

const translations = {
  // Nav
  "nav.about": { pt: "Sobre", en: "About" },
  "nav.services": { pt: "Serviços", en: "Services" },
  "nav.pricing": { pt: "Preços", en: "Pricing" },
  "nav.results": { pt: "Resultados", en: "Results" },
  "nav.start": { pt: "Começar", en: "Start" },

  // Hero
  "hero.badge": {
    pt: "Personal Training Online · Portugal & Internacional",
    en: "Online Personal Training · Portugal & Worldwide",
  },
  "hero.tagline": { pt: "Unidos pelo foco.", en: "United by focus." },
  "hero.description": {
    pt: "Treino personalizado online com o Bethow. Planos de treino, nutrição e coaching para alcançares os teus objetivos — onde quer que estejas.",
    en: "Personalized online training with Bethow. Workout plans, nutrition and coaching to reach your goals — wherever you are.",
  },
  "hero.cta": { pt: "Começar Agora", en: "Start Now" },
  "hero.services": { pt: "Ver Serviços", en: "View Services" },

  // Marquee
  "marquee.treino": { pt: "Treino Personalizado", en: "Personalized Training" },
  "marquee.coaching": { pt: "Online Coaching", en: "Online Coaching" },
  "marquee.nutricao": { pt: "Nutrição Holística", en: "Holistic Nutrition" },
  "marquee.locais": { pt: "Casa · Ginásio · Outdoor", en: "Home · Gym · Outdoor" },
  "marquee.resultados": { pt: "Resultados Reais", en: "Real Results" },
  "marquee.comunidade": { pt: "Comunidade BFITFAM", en: "BFITFAM Community" },
  "marquee.foco": { pt: "Unidos pelo Foco", en: "United by Focus" },
  "marquee.transforma": { pt: "Transforma o teu Corpo", en: "Transform your Body" },

  // About
  "about.label": { pt: "Sobre o Bethow", en: "About Bethow" },
  "about.title1": {
    pt: "Teu corpo, do jeito que",
    en: "Your body, the way",
  },
  "about.title2": { pt: "tu quiseres", en: "you want it" },
  "about.p1": {
    pt: "Tenho o melhor trabalho do mundo, porque trabalho com amor. É gratificante poder ajudar os meus clientes a atingirem os seus objetivos.",
    en: "I have the best job in the world because I work with love. It's rewarding to help my clients achieve their goals.",
  },
  "about.p2": {
    pt: "Acredito que um estilo de vida saudável começa ao manter um corpo forte e em forma. O meu objetivo é ajudar-te a identificar os teus objetivos fitness, criar uma série de exercícios que atenda às tuas necessidades e orientar-te em todos os exercícios e treinos.",
    en: "I believe a healthy lifestyle starts with keeping a strong, fit body. My goal is to help you identify your fitness goals, create a workout plan that meets your needs and guide you through every exercise and workout.",
  },
  "about.p3": {
    pt: "Tu alcanças o que tu próprio permites. Fácil é desistir, difícil é persistir!",
    en: "You achieve what you allow yourself. Giving up is easy, persisting is hard!",
  },
  "about.tag1": { pt: "Objetivos claros", en: "Clear goals" },
  "about.tag2": { pt: "Abordagem holística", en: "Holistic approach" },
  "about.tag3": { pt: "Resultados reais", en: "Real results" },
  "about.years": { pt: "Anos de experiência", en: "Years of experience" },

  // Services
  "services.label": { pt: "Serviços", en: "Services" },
  "services.title1": {
    pt: "O caminho mais rápido para a",
    en: "The fastest path to",
  },
  "services.title2": { pt: "boa forma", en: "great shape" },
  "services.subtitle": {
    pt: "Quatro pilares para a tua transformação. Tudo personalizado, tudo online, tudo acompanhado.",
    en: "Four pillars for your transformation. Fully personalized, fully online, fully guided.",
  },

  "service.1.title": { pt: "Treino Personalizado", en: "Personalized Training" },
  "service.1.desc": {
    pt: "Programas 100% adaptados aos teus objetivos, nível e equipamento disponível. Cada treino é desenhado para ti.",
    en: "Programs 100% adapted to your goals, level and available equipment. Every workout is designed for you.",
  },
  "service.1.f1": { pt: "Plano individual", en: "Individual plan" },
  "service.1.f2": { pt: "Progressão contínua", en: "Continuous progress" },
  "service.1.f3": { pt: "Adaptável a ti", en: "Adapted to you" },

  "service.2.title": { pt: "Online Coaching", en: "Online Coaching" },
  "service.2.desc": {
    pt: "Acompanhamento contínuo à distância. Análise de forma, ajustes semanais e suporte direto comigo via WhatsApp.",
    en: "Continuous remote coaching. Form analysis, weekly adjustments and direct support from me via WhatsApp.",
  },
  "service.2.f1": { pt: "Feedback em tempo real", en: "Real-time feedback" },
  "service.2.f2": { pt: "Ajustes semanais", en: "Weekly adjustments" },
  "service.2.f3": { pt: "Suporte direto", en: "Direct support" },

  "service.3.title": { pt: "Casa · Ginásio · Outdoor", en: "Home · Gym · Outdoor" },
  "service.3.desc": {
    pt: "Não interessa onde treinas. Crio planos para casa sem equipamento, ginásio completo ou ar livre.",
    en: "It doesn't matter where you train. I create plans for home, full gym or outdoors.",
  },
  "service.3.f1": { pt: "Sem equipamento", en: "No equipment" },
  "service.3.f2": { pt: "Ginásio completo", en: "Full gym" },
  "service.3.f3": { pt: "Ao ar livre", en: "Outdoors" },

  "service.4.title": { pt: "Nutrição", en: "Nutrition" },
  "service.4.desc": {
    pt: "A transformação começa na cozinha. Orientação alimentar prática e sustentável, sem dietas radicais.",
    en: "Transformation starts in the kitchen. Practical, sustainable nutrition guidance — no extreme diets.",
  },
  "service.4.f1": { pt: "Plano alimentar", en: "Meal plan" },
  "service.4.f2": { pt: "Sustentável", en: "Sustainable" },
  "service.4.f3": { pt: "Sem extremos", en: "No extremes" },

  // Stats
  "stat.1": { pt: "Clientes Transformados", en: "Clients Transformed" },
  "stat.2": { pt: "De Experiência", en: "Of Experience" },
  "stat.3": { pt: "Taxa de Satisfação", en: "Satisfaction Rate" },
  "stat.4": { pt: "Dedicação Total", en: "Total Dedication" },

  // Pricing
  "pricing.label": { pt: "Preços", en: "Pricing" },
  "pricing.title1": { pt: "Investimento na tua", en: "Investment in your" },
  "pricing.title2": { pt: "saúde", en: "health" },
  "pricing.subtitle": {
    pt: "Sem contratos longos. Sem surpresas. Transparente e acessível.",
    en: "No long contracts. No surprises. Transparent and affordable.",
  },
  "pricing.popular": { pt: "Mais Popular", en: "Most Popular" },

  "plan.1.name": { pt: "Aula Avulsa", en: "Single Session" },
  "plan.1.desc": { pt: "Experimenta sem compromisso", en: "Try with no commitment" },
  "plan.1.cta": { pt: "Experimentar", en: "Try Now" },
  "plan.1.f1": { pt: "1 sessão de treino online", en: "1 online training session" },
  "plan.1.f2": { pt: "Plano da sessão personalizado", en: "Personalized session plan" },
  "plan.1.f3": { pt: "Acompanhamento durante a aula", en: "Guidance during session" },
  "plan.1.f4": { pt: "Sem fidelização", en: "No lock-in" },

  "plan.2.name": { pt: "Plano Mensal", en: "Monthly Plan" },
  "plan.2.desc": { pt: "20 aulas · O mais popular", en: "20 sessions · Most popular" },
  "plan.2.cta": { pt: "Começar Agora", en: "Start Now" },
  "plan.2.f1": { pt: "20 sessões de treino/mês", en: "20 training sessions/month" },
  "plan.2.f2": { pt: "Plano de treino personalizado", en: "Personalized workout plan" },
  "plan.2.f3": { pt: "Acompanhamento nutricional", en: "Nutritional guidance" },
  "plan.2.f4": { pt: "Suporte WhatsApp direto", en: "Direct WhatsApp support" },
  "plan.2.f5": { pt: "Ajustes semanais ao plano", en: "Weekly plan adjustments" },
  "plan.2.f6": { pt: "Acesso à comunidade FAM", en: "FAM community access" },

  "plan.3.name": { pt: "Premium 1:1", en: "Premium 1:1" },
  "plan.3.desc": { pt: "Acompanhamento total", en: "Full support" },
  "plan.3.cta": { pt: "Falar com Bethow", en: "Talk to Bethow" },
  "plan.3.price": { pt: "Personalizado", en: "Custom" },
  "plan.3.f1": { pt: "Treino individual exclusivo", en: "Exclusive individual training" },
  "plan.3.f2": { pt: "Plano treino + nutrição completo", en: "Full training + nutrition plan" },
  "plan.3.f3": { pt: "Check-ins diários", en: "Daily check-ins" },
  "plan.3.f4": { pt: "Eventos exclusivos BFITFAM", en: "Exclusive BFITFAM events" },
  "plan.3.f5": { pt: "Prioridade em horários", en: "Priority scheduling" },
  "plan.3.f6": { pt: "Resultados garantidos*", en: "Guaranteed results*" },

  // Testimonials
  "testimonials.label": { pt: "Testemunhos", en: "Testimonials" },
  "testimonials.title1": { pt: "A", en: "The" },
  "testimonials.title2": { pt: "fala", en: "speaks" },
  "testimonials.subtitle": {
    pt: "Histórias reais de pessoas reais que transformaram os seus corpos e as suas vidas.",
    en: "Real stories from real people who transformed their bodies and their lives.",
  },

  "testimonial.1.content": {
    pt: "Já tinha tido outros personal trainers mas para mim o Bethow foi a melhor escolha. Estou muito feliz com toda a dedicação, profissionalismo e resultados.",
    en: "I've had other personal trainers but Bethow was the best choice for me. I'm very happy with all the dedication, professionalism and results.",
  },
  "testimonial.1.role": { pt: "Cliente há 2 anos", en: "Client for 2 years" },

  "testimonial.2.content": {
    pt: "Treino online parecia impossível até começar com o Bethow. A energia dele é contagiante e os resultados falam por si. Nunca me senti tão bem.",
    en: "Online training seemed impossible until I started with Bethow. His energy is contagious and the results speak for themselves. I've never felt so good.",
  },
  "testimonial.2.role": { pt: "Online Coaching", en: "Online Coaching" },

  "testimonial.3.content": {
    pt: "O que mais gosto é a abordagem holística — não é só treino, é nutrição, mente e estilo de vida. O Bethow percebe mesmo o que cada pessoa precisa.",
    en: "What I love most is the holistic approach — it's not just training, it's nutrition, mindset and lifestyle. Bethow truly understands what each person needs.",
  },
  "testimonial.3.role": { pt: "Plano Personalizado", en: "Personalized Plan" },

  // FAQ
  "faq.label": { pt: "FAQ", en: "FAQ" },
  "faq.title": { pt: "Perguntas Frequentes", en: "Frequently Asked Questions" },

  "faq.1.q": { pt: "Preciso de equipamento para treinar?", en: "Do I need equipment to train?" },
  "faq.1.a": {
    pt: "Não! Crio planos adaptados ao que tens disponível — pode ser em casa sem nada, com elásticos, ou num ginásio completo.",
    en: "No! I create plans adapted to what you have available — at home with nothing, with bands, or at a full gym.",
  },
  "faq.2.q": { pt: "Como funcionam as aulas online?", en: "How do online sessions work?" },
  "faq.2.a": {
    pt: "Fazemos as sessões por videochamada (Zoom/WhatsApp). Eu demonstro, tu executas, e eu corrijo em tempo real. É como ter um PT no teu bolso.",
    en: "We do sessions via video call (Zoom/WhatsApp). I demonstrate, you execute, and I correct in real time. It's like having a PT in your pocket.",
  },
  "faq.3.q": { pt: "Inclui plano de nutrição?", en: "Does it include a nutrition plan?" },
  "faq.3.a": {
    pt: "Sim, nos planos mensais e premium. Crio orientação alimentar prática e sustentável — nada de dietas extremas.",
    en: "Yes, in monthly and premium plans. I create practical, sustainable nutrition guidance — no extreme diets.",
  },
  "faq.4.q": { pt: "Posso experimentar antes de me comprometer?", en: "Can I try before committing?" },
  "faq.4.a": {
    pt: "Claro! A aula avulsa de 10€ existe exatamente para isso. Experimenta sem compromisso e decide depois.",
    en: "Of course! The 10€ single session exists exactly for that. Try with no commitment and decide after.",
  },
  "faq.5.q": { pt: "Os treinos servem para iniciantes?", en: "Are workouts suitable for beginners?" },
  "faq.5.a": {
    pt: "Absolutamente. Cada plano é 100% adaptado ao teu nível. Seja a primeira vez que treinas ou já sejas avançado.",
    en: "Absolutely. Every plan is 100% adapted to your level. Whether it's your first time training or you're advanced.",
  },
  "faq.6.q": { pt: "Como funciona o pagamento?", en: "How does payment work?" },
  "faq.6.a": {
    pt: "Simples e flexível. Pagamento por transferência bancária ou MBWay antes do início de cada mês/sessão.",
    en: "Simple and flexible. Payment via bank transfer or MBWay before the start of each month/session.",
  },

  // CTA
  "cta.title": { pt: "Pronto para mudar?", en: "Ready to change?" },
  "cta.subtitle": {
    pt: "Mudar a tua vida é mais fácil do que imaginas. Entra em contacto hoje e vamos começar.",
    en: "Changing your life is easier than you think. Get in touch today and let's start.",
  },
  "cta.whatsapp": { pt: "Falar com Bethow", en: "Talk to Bethow" },
  "cta.response": { pt: "Resposta em 24h", en: "Response in 24h" },
  "cta.nocommit": { pt: "Sem compromisso", en: "No commitment" },
  "cta.free": { pt: "1ª consulta grátis", en: "Free first consultation" },

  // Footer
  "footer.desc": {
    pt: "Personal training online com o Bethow. Transformação física e mental, onde quer que estejas.",
    en: "Online personal training with Bethow. Physical and mental transformation, wherever you are.",
  },
  "footer.nav": { pt: "Navegação", en: "Navigation" },
  "footer.contact": { pt: "Contactos", en: "Contact" },
  "footer.rights": { pt: "Todos os direitos reservados.", en: "All rights reserved." },

  // WhatsApp message
  "whatsapp.message": {
    pt: "Olá Bethow! Quero saber mais sobre os treinos BFITFAM",
    en: "Hi Bethow! I want to know more about BFITFAM training",
  },

  // Language switcher
  "lang.switch": { pt: "EN", en: "PT" },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  locale: Locale;
  t: (key: TranslationKey) => string;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bfitfam-locale") as Locale;
      if (saved === "pt" || saved === "en") return saved;
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("pt")) return "pt";
      return "en";
    }
    return "pt";
  });

  const t = useCallback(
    (key: TranslationKey): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[locale] || entry.pt;
    },
    [locale]
  );

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "pt" ? "en" : "pt";
      if (typeof window !== "undefined") {
        localStorage.setItem("bfitfam-locale", next);
      }
      return next;
    });
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
