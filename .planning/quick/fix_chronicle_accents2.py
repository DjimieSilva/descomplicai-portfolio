# -*- coding: utf-8 -*-
path = r'C:\Users\jdsds\Desktop\Projetos\portfolio\app\projetos\rpg-chronicle\page.tsx'
content = open(path, 'r', encoding='utf-8').read()

replacements = [
    # Remaining accents from audit round 2
    ('tanto bate ate que fura', 'tanto bate até que fura'),
    ('Esta arvore plantada representa cada projeto concluido', 'Esta árvore plantada representa cada projeto concluído'),
    ('o que construi com elas', 'o que construí com elas'),
    ('O melhor restaurante e aquele que ainda nao foi criado', 'O melhor restaurante é aquele que ainda não foi criado'),
    ('Escreve o codigo o mais', 'Escreve o código o mais'),
    ('Escreve este codigo:', 'Escreve este código:'),
    ('Escreve o codigo aqui', 'Escreve o código aqui'),
    ('Comecar jogo', 'Começar jogo'),
    ('Comecar desafio', 'Começar desafio'),
    ('Memoria de receitas', 'Memória de receitas'),
    ('Visualizador de audio', 'Visualizador de áudio'),
    ('Clima e emocoes', 'Clima e emoções'),
    ('Escreve e pre-visualiza', 'Escreve e pré-visualiza'),
    ('ja somos amigos', 'já somos amigos'),
    # English to Portuguese
    ('"Speed Reader"', '"Leitor Relâmpago"'),
    ('"Mobile Explorer"', '"Explorador Móvel"'),
    ('Technical Skills', 'Competências Técnicas'),
    ('Creative Skills', 'Competências Criativas'),
    # Fix "tela" (BR) to "ecrã" (PT-PT)
    ('numa tela mobile', 'num ecrã mobile'),
    # Service descriptions - make them human
    ('"Sites modernos, rápidos e responsivos com Next.js e React"', '"O site que mereces — rápido, bonito, e funciona no telemóvel da tua avó."'),
    ('"Identidade visual completa para o teu negócio"', '"A tua marca ganha cara, voz e personalidade própria."'),
    ('"Aplicações interativas e ferramentas personalizadas"', '"Ferramentas que resolvem problemas reais — tipo as 30+ que já construí."'),
    ('"Fluxos automatizados com IA para poupar tempo"', '"A IA trata do chato. Tu tratas do que importa."'),
    ('"Estratégia digital e otimização de processos"', '"Um café, uma conversa, e um plano que faz sentido."'),
    ('"Acompanhamento personalizado para devs e empreendedores"', '"Já estive onde tu estás. Vamos encurtar o caminho juntos."'),
    # Fix subtitle
    ('Uma jornada pelo universo da inteligência artificial', 'Uma jornada pelo código, pela comida e pelas pessoas'),
    # Process step
    ('label: "Build"', 'label: "Construir"'),
    # Restaurant descs English->PT
    ('"Beach lounge & sunset"', '"Lounge de praia & pôr do sol"'),
    ('"Surf school & bar"', '"Escola de surf & bar"'),
    ('"Camping & restaurant"', '"Campismo & restaurante"'),
    # Terminal easter egg
    ('explorer of code', 'explorador de código'),
]

count = 0
for old, new in replacements:
    if old in content and old != new:
        content = content.replace(old, new)
        count += 1

open(path, 'w', encoding='utf-8').write(content)
print(f"Applied {count} additional fixes to RPG Chronicle")
