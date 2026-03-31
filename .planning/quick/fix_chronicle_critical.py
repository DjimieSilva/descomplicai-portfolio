# -*- coding: utf-8 -*-
path = r'C:\Users\jdsds\Desktop\Projetos\portfolio\app\projetos\rpg-chronicle\page.tsx'
content = open(path, 'r', encoding='utf-8').read()

fixes = [
    # CRITICAL: Fix category key mismatch (experiencias -> experiências)
    ('  experiencias: "', '  experiências: "'),
    # Fix the floating badge text
    ('{filteredTools.length} experiencias', '{filteredTools.length} experiências'),
    # Fix restaurant count: 17 -> 25
    ('value="17+"', 'value="25"'),
    # Fix Rosa Amelia accent
    ('"Marisqueira Rosa Amelia"', '"Marisqueira Rosa Amélia"'),
    # Fix tool count: 30+ -> 50+
    ('30+ ferramentas e experiências', '50+ ferramentas e experiências'),
    ('"30+ Tools"', '"50+ Tools"'),
    ('value="30+"', 'value="50+"'),
    # Fix 52K consistency (all should have +)
    ('"52K Linhas"', '"52K+ Linhas"'),
    # Fix Distrito da Saude heading (the one the script missed)
    ('Distrito da Saude', 'Distrito da Saúde'),
    # Fix Laboratorio heading (remaining)
    # Already handled by first script
]

count = 0
for old, new in fixes:
    if old in content and old != new:
        content = content.replace(old, new)
        count += 1

open(path, 'w', encoding='utf-8').write(content)
print(f"Applied {count} critical data fixes to RPG Chronicle")
