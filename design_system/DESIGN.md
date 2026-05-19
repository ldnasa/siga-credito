# Siga Crédito — Design System
**Versão 1.0** · Out/2025 · Correspondente bancário digital · Londrina/PR

> Banco de bairro digital. Confiável e perto. Sério, mas acessível.
> Cada decisão visual abaixo serve a um único objetivo: fazer um brasileiro
> com pressa e medo de golpe sentir que pode confiar — sem letra miúda,
> sem festa de oferta, sem frieza bancária.

---

## 1. Paleta de Cores

Derivada do guia de marca oficial: vermelho institucional do "i" do logo + preto + cinza-azulado pétreo + creme quente. **A cor de destaque (CTA WhatsApp) é a única que vibra** — efeito Von Restorff. Tudo mais é institucional calmo.

```css
:root {
  /* Marca — núcleo */
  --brand-red: #C01920;        /* primária institucional — selos, links, ícones-chave */
  --brand-red-deep: #8E1218;   /* hover/pressed do vermelho */
  --brand-red-soft: #F7E5E6;   /* fundo de aviso institucional */
  --brand-ink: #1E1E1F;        /* preto da marca — texto, headlines */
  --brand-stone: #ADBBC8;      /* cinza-azulado — divisores, ilustrações */
  --brand-cream: #F0E4CC;      /* creme — fundos calmos, blocos de descanso */

  /* CTA — acento vibrante reservado (WhatsApp / Simular) */
  --cta-green: #1FAA59;        /* verde WhatsApp institucional, calibrado */
  --cta-green-deep: #178A48;   /* hover/pressed */
  --cta-green-soft: #E4F5EC;   /* halo / focus ring */

  /* Neutros quentes (NÃO cinza frio de SaaS) */
  --bg: #FBF8F3;               /* background base — branco-creme */
  --surface: #FFFFFF;          /* cards, modais */
  --surface-2: #F4EEDF;        /* seções alternadas (ritmo) */
  --surface-ink: #14110E;      /* fundo escuro institucional, quente */
  --border: #E6DFCF;           /* borda padrão — bege quente */
  --border-strong: #C9BFA8;    /* borda destacada */

  /* Texto */
  --text: #1E1E1F;             /* corpo */
  --text-muted: #5A554C;       /* secundário, com tom quente */
  --text-subtle: #8B8579;      /* terciário, captions */
  --text-on-dark: #FBF8F3;
  --text-on-red: #FFFFFF;
  --text-on-green: #FFFFFF;

  /* Semânticos */
  --success: #1FAA59;
  --warning: #B8770E;          /* âmbar amadeirado — não amarelo gritante */
  --danger:  #B23A2A;          /* terracota — não vermelho de pânico */
  --info:    #2F6E8F;          /* azul institucional discreto */
}
```

**Regras**: vermelho da marca **nunca** preenche botões grandes (evita visual de site agressivo de empréstimo). Vermelho aparece em ícones, números, selos pequenos, sublinhados, barras de seção. CTA principal = sempre verde WhatsApp.

---

## 2. Tipografia

**Pareamento display + texto** com personalidade institucional. Proibidos: Inter, Roboto, Arial, Helvetica, Open Sans.

- **Display — Geist (400/600/700):** sans geométrica com personalidade, desenhada pela Vercel. Tracking apertado nos títulos grandes. Usada em H1/H2 e em números grandes (taxas, valores).
- **Texto — General Sans (400/500/600):** sans humanista, legibilidade alta em jornadas longas (FAQ, regulatório, blog).
- **Mono — JetBrains Mono (500):** apenas para CPF mascarado, números de protocolo, copy de cláusula.

```css
:root {
  --font-display: "Geist", "Söhne", system-ui, sans-serif;
  --font-text:    "General Sans", "Söhne", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;

  /* Escala (mobile → desktop via clamp) */
  --fs-display: clamp(2.5rem, 6vw, 4.5rem);   /* hero */
  --fs-h1:      clamp(2rem, 4.5vw, 3.25rem);
  --fs-h2:      clamp(1.625rem, 3vw, 2.25rem);
  --fs-h3:      1.5rem;     /* 24 */
  --fs-h4:      1.25rem;    /* 20 */
  --fs-h5:      1.125rem;   /* 18 */
  --fs-h6:      1rem;       /* 16 */
  --fs-lead:    1.1875rem;  /* 19 — subtítulo de seção */
  --fs-body:    1.0625rem;  /* 17 — corpo padrão (público adulto, mobile) */
  --fs-small:   0.9375rem;  /* 15 */
  --fs-caption: 0.8125rem;  /* 13 */
  --fs-label:   0.75rem;    /* 12 — uppercase tracked */

  /* Line height generoso no corpo, apertado no display */
  --lh-tight: 1.05;
  --lh-snug:  1.2;
  --lh-body:  1.65;
  --lh-loose: 1.75;

  /* Tracking */
  --tr-tight:  -0.025em;   /* H1/H2 grandes */
  --tr-snug:   -0.01em;    /* H3-H6 */
  --tr-normal: 0;
  --tr-wide:   0.08em;     /* labels uppercase */
}

h1, .h1 { font: 600 var(--fs-h1)/var(--lh-tight) var(--font-display); letter-spacing: var(--tr-tight); }
h2, .h2 { font: 600 var(--fs-h2)/var(--lh-snug) var(--font-display); letter-spacing: var(--tr-tight); }
h3, .h3 { font: 600 var(--fs-h3)/var(--lh-snug) var(--font-text); letter-spacing: var(--tr-snug); }
.lead   { font: 400 var(--fs-lead)/var(--lh-body) var(--font-text); color: var(--text-muted); }
body    { font: 400 var(--fs-body)/var(--lh-body) var(--font-text); color: var(--text); text-wrap: pretty; }
.label  { font: 600 var(--fs-label)/1 var(--font-text); letter-spacing: var(--tr-wide); text-transform: uppercase; }
```

---

## 3. Espaçamento e Grid

Base 4px. Container 1280px. Mobile-first.

```css
:root {
  --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px;
  --s-5: 20px; --s-6: 24px; --s-8: 32px; --s-10: 40px;
  --s-12: 48px; --s-16: 64px; --s-20: 80px; --s-24: 96px; --s-32: 128px;

  --container: 1280px;
  --container-pad: clamp(20px, 5vw, 56px);

  /* Padding vertical de seção */
  --section-y-sm: clamp(48px, 8vw, 80px);
  --section-y-md: clamp(64px, 10vw, 112px);
  --section-y-lg: clamp(80px, 12vw, 144px);

  --grid-gap: clamp(16px, 2vw, 32px);
}
.container { max-width: var(--container); margin-inline: auto; padding-inline: var(--container-pad); }
.grid-12   { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--grid-gap); }
```

**Ritmo entre seções**: alterne `--bg` (creme claro) → `--surface` (branco) → `--surface-2` (creme médio) → `--surface-ink` (preto institucional, raro, para depoimento ou prova social). Nunca duas seções iguais consecutivas.

---

## 4. Componentes Base

### 4.1 Botões — 3 níveis × 3 tamanhos
```css
.btn { display:inline-flex; align-items:center; gap:var(--s-2);
  font: 600 var(--fs-body)/1 var(--font-text); letter-spacing:-0.005em;
  border-radius: var(--r-md); transition: all 180ms ease-out;
  border:1px solid transparent; cursor:pointer; }
.btn-sm { height:40px; padding:0 var(--s-4); font-size:var(--fs-small); }
.btn-md { height:48px; padding:0 var(--s-5); }
.btn-lg { height:56px; padding:0 var(--s-6); font-size:var(--fs-lead); }

/* PRIMÁRIO = WhatsApp (único verde) */
.btn-primary { background: var(--cta-green); color: var(--text-on-green); }
.btn-primary:hover  { background: var(--cta-green-deep); transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }
.btn-primary:focus-visible { outline:3px solid var(--cta-green-soft); outline-offset:2px; }

/* SECUNDÁRIO — preto institucional */
.btn-secondary { background: var(--brand-ink); color: var(--text-on-dark); }
.btn-secondary:hover { background: #2C2A26; }

/* TERCIÁRIO — ghost com sublinhado de marca */
.btn-ghost { background: transparent; color: var(--brand-ink); border-color: var(--border-strong); }
.btn-ghost:hover { background: var(--surface-2); }

.btn:disabled { opacity:.5; cursor:not-allowed; }
.btn[aria-busy="true"] .btn-label { visibility:hidden; }
```
Botão primário **sempre carrega ícone do WhatsApp à esquerda** (`<svg> + texto`).

### 4.2 Cards
- **default**: `background: var(--surface); border:1px solid var(--border); border-radius: var(--r-md); padding: var(--s-6);`
- **destacado**: borda esquerda 4px `var(--brand-red)`, fundo `var(--bg)`. Usado para produto em foco, FAQ aberta, depoimento principal.
- **sutil**: apenas `1px solid var(--border)`, sem sombra, fundo transparente. Usado em listas densas.

### 4.3 Inputs
```css
.input { height:52px; padding: 0 var(--s-4); border-radius: var(--r-sm);
  border:1.5px solid var(--border-strong); background: var(--surface);
  font: 500 var(--fs-body) var(--font-text); }
.input:focus  { border-color: var(--brand-ink); outline:3px solid var(--cta-green-soft); }
.input[aria-invalid="true"] { border-color: var(--danger); }
.input:disabled { background: var(--surface-2); color: var(--text-subtle); }
.input-label  { display:block; margin-bottom:var(--s-2); font:600 var(--fs-small) var(--font-text); }
.input-help   { margin-top:var(--s-2); font: var(--fs-caption) var(--font-text); color:var(--text-muted); }
.input-error  { color: var(--danger); }
```
Aplicável a `<input>`, `<select>` (com chevron customizado em `--brand-ink`) e `<textarea>` (min-height 120px).

### 4.4 Badges (selos institucionais)
```css
.badge { display:inline-flex; align-items:center; gap:var(--s-2);
  height:28px; padding:0 var(--s-3); border-radius:999px;
  font:600 var(--fs-caption) var(--font-text); letter-spacing:.02em; }
.badge-trust  { background: var(--brand-red-soft); color: var(--brand-red-deep); }   /* "Correspondente bancário regulamentado" */
.badge-time   { background: var(--surface-2); color: var(--brand-ink); }              /* "Atendimento 24h" */
.badge-secure { background: var(--cta-green-soft); color: var(--cta-green-deep); }    /* "Sigilo total" */
```

### 4.5 Accordion (FAQ)
Estado fechado: linha `1px solid var(--border)` + chevron rotacionado. Aberto: ícone gira 180°, conteúdo desliza com `max-height` + `opacity` em **220ms ease-out**. Pergunta sempre em `--font-text 600`, resposta em `--font-text 400` `--lh-loose`.

---

## 5. Elevação e Sombras

Sombra com tinta vermelho-institucional diluída — não preto puro. Profundidade quente, não digital crua.

```css
:root {
  --shadow-sm: 0 1px 2px rgba(30,18,18,.04), 0 2px 6px rgba(192,25,32,.04);
  --shadow-md: 0 4px 8px rgba(30,18,18,.05), 0 12px 24px rgba(192,25,32,.06);
  --shadow-lg: 0 8px 16px rgba(30,18,18,.06), 0 24px 48px rgba(192,25,32,.08);
  --shadow-xl: 0 12px 24px rgba(30,18,18,.08), 0 32px 64px rgba(31,170,89,.18); /* WhatsApp flutuante = halo verde */
}
```
Uso: `sm` em cards · `md` em hover de card / dropdown · `lg` em modais · `xl` exclusivo no FAB do WhatsApp.

---

## 6. Border Radius

```css
:root {
  --r-sm: 6px;    /* inputs, botões pequenos, badges */
  --r-md: 10px;   /* botões grandes, cards */
  --r-lg: 18px;   /* modais, blocos destacados, hero */
  --r-full: 999px;/* avatar, pílulas, FAB */
}
```

---

## 7. Motion

```css
:root { --dur: 220ms; --dur-slow: 320ms; --ease: cubic-bezier(.2,.7,.2,1); }
* { transition-timing-function: var(--ease); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
}
```
Apenas `transform` e `opacity`. Hover em botões: `translateY(-1px)`. Hover em card destacado: sombra de `sm`→`md`. Sem parallax, sem scroll-jacking.

---

## 8. Anti-Generic Guardrails

- ❌ Não usar vermelho como fundo de botão grande (visual de empréstimo agressivo). Vermelho = institucional, em pequenas doses.
- ❌ Não usar gradiente roxo/azul em fundo escuro (cara de IA).
- ❌ Não usar grid uniforme de cards `bg-white + shadow-md + rounded-lg` repetido página inteira. Variar densidade, peso, fundo.
- ❌ Não usar ilustrações vetoriais de pessoas felizes abstratas.
- ❌ Não usar Material Icons em círculos coloridos. Usar ícones em linha (1.5px), monocromáticos, em `--brand-ink` ou `--brand-red`.
- ❌ Não usar uma única fonte na página. Display Fraunces + Texto General Sans, sempre.
- ❌ Não usar hero centralizado com CTA gigante centralizado. Preferir layout assimétrico esquerda-pesado, com prova social ao lado.
- ❌ Não usar copy "OFERTA IMPERDÍVEL", "ÚLTIMA CHANCE", contagem regressiva, ícone de fogo.

---

## 9. Aplicação da Narrativa da Marca

**"Banco de bairro digital — confiável e perto"** se traduz em:
- Tipografia com Geist (sans com personalidade) usada com tracking apertado e peso 700 nos displays — firmeza institucional sem cair em Inter/Roboto genéricos.
- Creme `--bg` no lugar de branco puro — fundo de papel, não de aplicativo.
- Vermelho `--brand-red` aparecendo onde um banco usaria azul — marcação humana, não corporativa.
- Fotos reais de atendentes reais (não stock), com nome + tempo de casa abaixo.
- Endereço físico de Londrina sempre visível no rodapé. CNPJ em fonte legível, não escondido.

**Componente "Selo de Compromisso Anti-Golpe"** (não banner de alerta):
Card de fundo `--brand-cream`, borda 1px `--border-strong`, ícone de aperto-de-mão à esquerda em `--brand-red`, texto em duas linhas: título `H4 600` "A Siga nunca pede depósito antecipado" + corpo `--fs-small`. Sem cor de aviso, sem ícone de exclamação. **É um juramento, não um susto.**

**Depoimentos**: print real de WhatsApp (mockup com bolha verde do WhatsApp + horário + check duplo azul) + foto de perfil real + primeiro nome + cidade. **Nunca** card corporativo com aspas estilizadas e foto stock.

---

## 10. Heurísticas de Uso

- **Cor primária (vermelho) vs CTA (verde)**: vermelho marca a marca (logo, ícones-chave, números, sublinhados de palavra-chave). Verde é único e exclusivo do CTA WhatsApp/Simular. Nunca inverter.
- **Card destacado vs default**: destacado quando há **escolha ativa do usuário** (produto que ele veio procurar) ou prova social principal. Default para o resto. Nunca >2 destacados na mesma seção.
- **Hierarquia de CTA por seção**: 1 primário (verde, WhatsApp) + no máximo 2 secundários (preto, "ver mais" / "simular sem WhatsApp"). Terciário/ghost livre em navegação.
- **FAB WhatsApp**: sempre `position: fixed; bottom: var(--s-6); right: var(--s-6);` — círculo 64px, `--cta-green`, ícone branco, `--shadow-xl`. Nunca esconder em scroll. Em mobile, deslocar acima de `safe-area-inset-bottom`.
- **Densidade**: páginas de produto = densidade média (corpo 17px, line-height 1.65). Blog = densidade baixa (corpo 19px, line-height 1.75, max-width 68ch). FAQ regulatório = densidade média, com tipografia mono nas cláusulas.

---

## 11. Icon Library

**Escolha: Lucide.** Stroke 1.75px, traço humano com terminações arredondadas, geometria honesta sem ser geométrica demais. Phosphor é bonita mas tem peso "design boutique" que destoa da seriedade institucional; Tabler é ótima mas pesa pra fintech genérica; Heroicons (sólida) é Material disfarçado. Lucide tem o equilíbrio certo: clareza sem frieza, próxima do tom "banco de bairro digital".

**Regras inegociáveis:**
- Stroke uniforme **1.75px** (default da Lucide).
- Cor: `currentColor` — herda de `--text`, `--brand-red` ou `--brand-ink` por contexto. Nunca colorir ícone de azul, roxo, amarelo.
- **Nunca misturar bibliotecas.** Se faltar um ícone na Lucide, desenhar um SVG seguindo as mesmas métricas (stroke 1.75, linecap round, linejoin round, viewBox 24×24). Não importar de Phosphor/Tabler/Heroicons no meio do caminho.
- Nunca usar ícone dentro de círculo colorido preenchido (visual Material Design).

```css
:root {
  --icon-sm: 16px;   /* dentro de badges, inline em texto */
  --icon-md: 20px;   /* botões, lista de FAQ */
  --icon-lg: 24px;   /* ícone-título de card */
  --icon-xl: 32px;   /* selo de compromisso, FAB interno */
}
.icon { width: var(--icon-md); height: var(--icon-md); stroke-width: 1.75; }
```

**Mapa de uso (nome exato da Lucide):**

| Função | Ícone Lucide |
|---|---|
| Telefone (CTA 0800) | `phone` |
| WhatsApp (CTA principal) | `message-circle-more` *(complementar com glifo oficial WhatsApp em SVG próprio quando for o botão verde — esse só tem versão de marca)* |
| Cadeado / segurança | `lock` |
| Escudo / selo anti-golpe | `shield-check` |
| Check de vantagens / requisitos | `check` |
| Alerta regulatório | `info` |
| Aviso de risco | `triangle-alert` |
| Casa / fatura de luz | `house-plug` (fallback: `lightbulb`) |
| Pessoas / família (Bolsa Família) | `users-round` |
| Maleta de trabalho (CLT) | `briefcase-business` |
| Cofre / FGTS | `piggy-bank` |
| Documento (RG, comprovante) | `file-text` |
| Celular (assinar pelo app) | `smartphone` |
| Pix / dinheiro recebido | `banknote-arrow-down` (fallback: `landmark`) |
| Estrela (depoimentos) | `star` |
| Mais / expandir FAQ | `chevron-down` |
| Seta direita (CTA secundário) | `arrow-right` |
| Localização (Londrina) | `map-pin` |
| Calendário (parcelas, prazos) | `calendar-days` |
| Atendimento 24h | `clock` |
| Aperto de mão (compromisso) | `handshake` |
| Selo verificado (correspondente regulamentado) | `badge-check` |

---

## 12. Elementos Gráficos

### 12.1 Patterns / texturas

Dois patterns sutis, ambos em SVG inline via `data:url`. **Opacidade entre 0.04 e 0.08.** Sempre por cima de `--surface-2` ou `--surface-ink`, nunca por cima de `--bg` puro (gera ruído visual em mobile baixa-resolução).

**Pattern A — Grade de pontos finos** (organização, firmeza). Uso: cabeçalho de seção institucional, fundo do bloco "sobre a Siga".

```css
.pattern-dots {
  background-color: var(--surface-2);
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='2' cy='2' r='1' fill='%231E1E1F' opacity='0.08'/></svg>");
  background-size: 24px 24px;
}
```

**Pattern B — Linhas diagonais de papelaria** (sensação de carimbo, documento oficial). Uso: bloco do selo anti-golpe, rodapé com endereço físico.

```css
.pattern-stripes {
  background-color: var(--brand-cream);
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0 6px,
    rgba(192,25,32,0.05) 6px 7px
  );
}
```

**Onde NÃO usar:** dentro de cards (compete com conteúdo), em hero principal (rouba peso da headline), em fundos de input (ilegível), em mais de uma seção consecutiva.

### 12.2 Ilustrações

**Decisão estratégica: o site não tem ilustração vetorial em hero ou card de produto.** Lugar de imagem é fotografia real ou composição tipográfica (número grande em Geist + label curto). Ponto.

Ilustrações pontuais permitidas **apenas** em:
- **Estados vazios** (FAQ sem resultado de busca, formulário enviado, página 404).
- **Confirmações** (proposta enviada, simulação salva).

**Estilo obrigatório:** linha fina 1.75px (mesma da Lucide), monocromática em `--brand-red` ou `--brand-ink`, viewBox quadrado, **máximo 64×64px**, sem preenchimento de cor, sem sombra, sem gradiente. Pessoas, **se aparecerem**, são esquemáticas (silhueta de uma única linha) — nunca rosto detalhado, nunca expressão facial.

**Proibido:**
- Personagens 3D estilo Memoji / Bigmoji.
- Pessoas vetoriais "happy abstract" (estilo Storyset, Undraw, Humaaans).
- Cenas isométricas com casa + nuvem + cifrão flutuante.

### 12.3 Fotografia

A fotografia é o veículo principal de "banco de bairro digital — gente real, vida real". Toda decisão fotográfica responde a uma pergunta: *isso poderia ter sido tirado por um cliente nosso, com o celular dele?* Se sim, está no caminho.

**Mood**
- Pessoas brasileiras de classe C, faixa etária 30–65 anos, fenótipo diverso (negro, pardo, branco, indígena). Nunca um único biotipo.
- Ambientes cotidianos brasileiros: cozinha de azulejo dos anos 90, sala com sofá puído mas limpo, balcão de atendimento simples, garagem aberta com o portão de ferro, ponto de ônibus.
- Expressões autênticas: olhar atento, alívio ao receber notícia boa, concentração ao ler documento, sorriso pequeno e curto. **Nunca** sorriso de comercial de margarina.

**Luz**
- Luz natural diurna, lateral, vinda de janela. Hora dourada bem-vinda.
- Sombras suaves, sem flash duro, sem light box de estúdio.
- Sem subexposição dramática nem alto contraste de fashion editorial.

**Composição**
- Enquadramento próximo: rosto 60–80% do frame, ou mãos manipulando objeto (fatura de luz, celular, caneta).
- Olhar fora da câmera na maioria dos casos (lendo a fatura, olhando o celular). Olhar pra câmera só quando for retrato direto de depoimento.
- Profundidade de campo razoável (f/2.8 a f/4) — fundo legível mas suavemente desfocado, jamais bokeh extremo.

**Tratamento**
- Saturação reduzida em ~10–15%.
- Curva de contraste suave em S, sem esmagar pretos.
- Sem grão pesado, sem filtro vintage, sem viragem de cor (teal & orange proibido).
- Tom geral levemente quente, alinhado a `--brand-cream` no fundo.

**Banco de imagens necessário:**
1. **Hero institucional** — atendente da Siga ao telefone/headset, expressão atenta, escritório simples.
2. **Hero conta de luz** — mão segurando fatura de Copel/Cemig, geladeira ao fundo desfocada.
3. **Hero Bolsa Família** — mãe na cozinha com criança, celular na mão.
4. **Hero CLT** — trabalhador com camisa de uniforme (operário, balconista, motorista), em pausa.
5. **Hero FGTS** — pessoa 40–55 anos sentada à mesa, planilha manuscrita ou caderno.
6. **Sobre/equipe** — equipe pequena (5–8 pessoas) em escritório de Londrina, ambiente real, não pose corporativa.
7. **Depoimento placeholder** — retrato 1:1 de cliente real, fundo desfocado de casa.

**Proibido:**
- Modelo profissional sorrindo com laptop em escritório de vidro.
- Ambiente Silicon Valley, open space, sofá colorido, plantas em vasos brancos.
- Cliente segurando cartão de crédito no ar como troféu.
- Foto preto-e-branco sem motivo narrativo.
- Foto com texto burned-in.

---

## 13. Prompts para AI Image Generator

Use estes prompts enquanto a fotografia real não for produzida. **Sempre revisar resultado** antes de publicar — se sair americano, redondinho, com sorriso de stock, descartar.

**Diretrizes globais (incluir em todos):**
- Pessoas brasileiras, fenótipo diverso (negro, pardo, branco), 30–65 anos.
- Ambientes brasileiros: azulejo, móveis simples, janela com cortina de tecido.
- Câmera: full-frame, lente 50mm ou 85mm, abertura f/2.8–f/4.
- Luz: natural, lateral, hora dourada ou diurna suave.
- Pós: saturação −10%, contraste suave, tom levemente quente.
- Fotorrealismo editorial documental, **não** comercial publicitário.

### 13.1 Hero institucional (atendente humano)
> Atendente brasileira de cerca de 35 anos, cabelo cacheado castanho preso, headset discreto, camisa lisa, em pequeno escritório com parede pintada de creme claro, computador desatualizado mas limpo, expressão atenta ouvindo cliente, olhar fora da câmera, luz natural lateral de janela à esquerda, fundo levemente desfocado. Fotografia editorial documental, lente 85mm f/2.8, saturação reduzida, tom quente.
> **Midjourney:** `--ar 16:9 --style raw --stylize 100`
> **Nano Banana / GPT-Image:** prompt acima literal, instrução adicional "no stock photo aesthetic, no fake smile, no glass office, brazilian setting".

### 13.2 Hero conta de luz
> Mão de mulher brasileira de aproximadamente 50 anos segurando fatura de energia elétrica brasileira (Copel ou Cemig), unhas curtas, anel simples de ouro, mesa de fórmica com xícara de café pela metade, geladeira branca dos anos 2000 desfocada ao fundo, luz natural de cozinha de manhã. Foco nas mãos e no documento, rosto cortado.
> **Midjourney:** `--ar 16:9 --style raw --stylize 100`

### 13.3 Hero Bolsa Família
> Mãe brasileira parda, 35 anos, cozinha modesta com azulejo branco anos 90, criança de 6 anos sentada à mesa fazendo lição, ela em pé olhando o celular com expressão concentrada e aliviada. Luz natural quente de janela. Sem sorriso forçado, momento real do dia.
> **Midjourney:** `--ar 16:9 --style raw --stylize 100`

### 13.4 Hero CLT
> Homem brasileiro negro, 45 anos, uniforme azul de manutenção predial com nome bordado, em pausa do trabalho num corredor de prédio comercial simples, sentado em banco, celular na mão, expressão pensativa. Luz dura de iluminação de teto suavizada por janela ao fundo. Realismo cotidiano.
> **Midjourney:** `--ar 16:9 --style raw --stylize 100`

### 13.5 Hero FGTS
> Mulher brasileira branca, 55 anos, óculos de leitura, sentada à mesa de jantar de madeira escura, caderno espiral aberto com anotações manuscritas de números, calculadora antiga ao lado, xícara de chá, sala de estar simples ao fundo. Expressão concentrada planejando finanças. Luz de fim de tarde entrando pela janela.
> **Midjourney:** `--ar 16:9 --style raw --stylize 100`

### 13.6 Sobre / equipe (escritório Londrina)
> Equipe de 7 pessoas brasileiras de fenótipos diversos, idades entre 25 e 50, em escritório modesto de correspondente bancário em Londrina, paredes brancas com quadro de avisos, mesas com computadores comuns, ambiente iluminado por luz natural de janela grande, todos em postura de trabalho real (não pose de foto corporativa). Algumas pessoas sentadas, outras de pé conversando.
> **Midjourney:** `--ar 3:2 --style raw --stylize 100`

### 13.7 Placeholder de depoimento
> Retrato fechado de cliente brasileiro, fenótipo a definir por depoimento, idade entre 30 e 60, em ambiente residencial simples (sofá com manta, parede com porta-retrato), olhar direto para a câmera, expressão calma e sincera, sem sorriso forçado. Luz natural de janela lateral. Enquadramento 1:1 do peito para cima.
> **Midjourney:** `--ar 1:1 --style raw --stylize 100`

**Anti-padrões a banir explicitamente em qualquer prompt:**
`stock photo`, `corporate`, `glass office`, `silicon valley`, `model`, `studio lighting`, `polished smile`, `headset call center generic`, `american setting`, `teal and orange grading`, `lens flare`, `bokeh extreme`.

---

## 14. Sistema de Animação e Motion

> **Princípio guia:** animação serve à hierarquia visual e ao sentimento de "feito com cuidado" — nunca à decoração. Se um efeito não ajuda o usuário a entender ou priorizar algo, ele não entra. O público da Siga acessa via celular em conexão muitas vezes fraca — **peso de motion é peso de carregamento.**

Quatro categorias, cada uma com regras de uso E regras de não-uso. Duas decisões estratégicas (text animations e WebGL) são **proibições deliberadas**, não omissões.

### 14.1 Micro-interações

Estado responde ao gesto. Sutis, rápidas, físicas. Confirmam ao usuário que o sistema ouviu — e param por aí.

**Onde usar:**

- **Hover de botão** — lift de 1px + sombra mais pronunciada, 200ms ease-out.
- **Focus visible em inputs** — anel suave da cor primária, 2px, sem deslocamento.
- **Card hover** — elevação sutil de 2px, **sem mudança de escala** (escalar texto desfoca a leitura).
- **FAB WhatsApp** — pulso suave a cada 8 segundos, com janela de descanso. Chama atenção sem ser invasivo.
- **Accordion FAQ** — rotação de 45° do `+` para `×`, 200ms.

**Onde NÃO usar:**

- Em elementos não-interativos (parágrafos, headlines, divisores). Hover em coisa que não clica gera ruído cognitivo.
- Em ícones decorativos do corpo da página.
- Em badges e selos institucionais (devem parecer estampados, não interativos).

```css
/* Botão — hover sutil */
.btn {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out, background-color 200ms ease-out;
}
.btn:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn:active { transform: translateY(0); transition-duration: 80ms; }

/* Focus visible — inputs e botões */
:focus-visible {
  outline: 2px solid var(--cta-green);
  outline-offset: 2px;
  border-radius: var(--r-sm);
}

/* Card hover — elevação sem escala */
.card {
  transition: transform 220ms ease-out, box-shadow 220ms ease-out;
}
.card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }

/* FAB WhatsApp — pulso com pausa */
@keyframes wa-pulse {
  0%, 70%, 100% { box-shadow: 0 8px 24px rgba(31,170,89,.35), 0 0 0 0 rgba(31,170,89,.5); }
  78%           { box-shadow: 0 8px 24px rgba(31,170,89,.35), 0 0 0 14px rgba(31,170,89,0); }
  86%           { box-shadow: 0 8px 24px rgba(31,170,89,.35), 0 0 0 0 rgba(31,170,89,0); }
}
.fab { animation: wa-pulse 8s ease-out infinite; }
@media (prefers-reduced-motion: reduce) { .fab { animation: none; } }

/* Accordion — ícone + → × */
.acc-trigger .icon { transition: transform 200ms ease-out; }
.acc-item[open] .acc-trigger .icon { transform: rotate(45deg); }
```

### 14.2 Scroll reveal / fade-ins

**Padrão único** para a marca inteira — opacity 0→1 + translateY(16px→0). Sem variações criativas. Consistência > virtuosismo.

- **Duração:** 400–600ms, ease-out.
- **Stagger:** 80–120ms entre elementos do mesmo grupo.
- **Trigger:** IntersectionObserver, threshold 0.15.

**Onde usar:**

- Cards de produto na home.
- Blocos de "Como Funciona" (passo 1, 2, 3 — stagger natural).
- Grid de números/stats institucionais.
- Cards de depoimento.

**Onde NÃO usar:**

- **Hero** — conteúdo principal precisa estar visível imediatamente. Animar a primeira coisa que o usuário vê é hostil.
- **Navegação / topbar.**
- **CTA flutuante WhatsApp.**
- **FAQ accordion** — a mecânica do clique já é a animação.

```css
/* Estado inicial — aplicado via classe, nunca direto no elemento */
.reveal { opacity: 0; transform: translateY(16px); transition: opacity 500ms ease-out, transform 500ms ease-out; }
.reveal.is-visible { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

```js
// reveal.js — vanilla, sem dependência
const els = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    const group = entry.target.closest('[data-reveal-group]');
    const siblings = group ? [...group.querySelectorAll('.reveal')] : [entry.target];
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${Math.min(idx, 6) * 100}ms`;
    entry.target.classList.add('is-visible');
    io.unobserve(entry.target);
  });
}, { threshold: 0.15 });
els.forEach(el => io.observe(el));
```

### 14.3 Text animations

> **Decisão: NÃO usar text animations no projeto Siga Crédito.**

**Justificativa:** público com pressa, conexão fraca, necessidade de comunicação direta. Animar texto retarda a percepção da mensagem e contradiz o tom institucional. Letra que "monta" é letra que demora a ler.

**Exceção única possível** (avaliar caso a caso): contagem animada nos stats numéricos institucionais (R$ 60mi liberados, 7 anos de operação, ~1.000 atendimentos/dia) ao entrar no viewport. Implementação simples com `requestAnimationFrame`, sem biblioteca. Duração máxima 1.2s, ease-out, dispara uma vez só.

**Proibido fora dos stats numéricos:** typewriter, split-text, blur-in, scrambling, gradient-sliding em headline, qualquer biblioteca de text-fx.

```js
// counter.js — exceção única, leve, sem dependência
function animateCount(el, target, duration = 1200) {
  const start = performance.now();
  const fmt = new Intl.NumberFormat('pt-BR');
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    el.textContent = fmt.format(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
```

### 14.4 WebGL

> **Decisão: NÃO usar WebGL no projeto Siga Crédito.**

**Justificativa:** público mobile-heavy com dispositivos low-end comuns na base, conexão limitada, necessidade de TTI baixo. WebGL adiciona peso de runtime, risco de quebra silenciosa em GPUs antigas e zero benefício de conversão para o perfil de usuário. Um shader bonito que trava 1s no carregamento custa mais leads do que rende em percepção de marca.

**Alternativas para profundidade visual** (já cobertas no design system):

- Gradientes CSS suaves entre tons da paleta (creme → branco, ink → ink-soft).
- Patterns SVG sutis (`pattern-dots`, `pattern-stripes`) com opacidade entre 0.04 e 0.08.
- Layered backgrounds com transparência baixa e blur leve em camadas decorativas estáticas.
- Sombras com tinta vermelha diluída (já no token `--shadow-*`) para profundidade quente.

### 14.5 Motion anti-patterns

Sete proibições absolutas. Quebra qualquer uma = rejeitar PR.

1. **Nunca `transition: all`.** Definir as propriedades específicas — `transform`, `opacity`, `box-shadow`, `background-color`. `all` é caro e dispara em mudanças invisíveis.
2. **Nunca animar `width`, `height`, `top`, `left`, `margin`.** Apenas `transform` e `opacity`. Layout-thrashing trava o main thread em mobile.
3. **Nunca parallax pesado em scroll.** Público mobile sofre com scroll-linked transforms; a maioria dos cenários quebra em iOS Safari de qualquer forma.
4. **Nunca animação contínua sem pausa.** O pulso do FAB tem janela de descanso entre ciclos. Animação infinita-sem-respiro vira ruído visual e drena bateria.
5. **Nunca scroll-jacking.** Quebra navegação por teclado, leitores de tela e o gesto natural do usuário. É hostil — não é "experiência imersiva".
6. **Nunca autoplay de carrosséis com motion intenso.** Se houver carrossel (preferir não ter), só avança em interação. Auto-rotate é roubo de atenção.
7. **Nunca animar texto principal de hero ou CTAs.** Atrasa a decisão de compra. A headline existe pra ser lida em 200ms — não pra performar.

**Regra mestra de acessibilidade:** todo bloco de motion respeita `prefers-reduced-motion: reduce`. Sem exceção.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 15. Acessibilidade

> **Princípio guia:** o público da Siga inclui pessoas idosas, com baixa visão, em celular barato sob luz solar direta. Acessibilidade aqui não é checklist regulatório — é condição mínima pra **virar lead**. Se o aposentado de 67 anos não consegue ler o valor da parcela, ele não simula. E o concorrente que ele vai ligar é golpista.

### 15.1 Contraste

- **Texto corrido**: mínimo **4.5:1** (WCAG AA). Validar todo par texto/fundo. Especialmente vigilante: `--text-muted` (#5A554C) sobre `--brand-cream` (#F0E4CC) — borderline, só usar em texto auxiliar acima de 16px.
- **Componentes UI** (bordas, ícones, foco): mínimo **3:1**.
- **Vermelho `--brand-red` sobre branco**: 7.1:1 ✓. Sobre `--brand-cream`: 5.8:1 ✓. **Nunca** vermelho sobre cinza-azulado `--brand-stone` (3.9:1, falha em texto pequeno).
- Verde `--cta-green` sobre branco: 3.4:1. **Não usar verde como cor de texto** — só como background de CTA com texto branco (12.1:1 ✓).

### 15.2 Foco e teclado

```css
:focus-visible {
  outline: 2px solid var(--cta-green);
  outline-offset: 2px;
  border-radius: var(--r-sm);
}
```

- Todo elemento interativo (botão, link, input, accordion-trigger, FAB) recebe `:focus-visible` com anel verde 2px e offset 2px.
- **Nunca** `outline: none` sem substituto. Nunca.
- Navegação por teclado obrigatória em: menu superior (Tab/Enter/Esc), accordion FAQ (Tab/Enter/Space), modais (trap focus + Esc fecha), simulador (Tab linear, sem armadilhas).
- Skip link `<a class="skip" href="#main">Pular para o conteúdo</a>` no topo, visível apenas no foco.

### 15.3 Touch targets

- **Mínimo 44×44px** em qualquer alvo tocável (Apple HIG). Confortável: 48×48px.
- Botões `.btn-sm` (40px) **só** em desktop ou em barras secundárias. Nunca como CTA principal mobile.
- Espaçamento mínimo entre alvos adjacentes: **8px** (gap-2). FAB sempre acima de `safe-area-inset-bottom`.

### 15.4 Hierarquia semântica

- **Um único `<h1>` por página**. É o nome do produto/serviço, não a tagline.
- `<h2>` para seções principais (uma por bloco visual de seção).
- `<h3>` para subseções; nunca pular níveis (`<h2>` direto pra `<h4>` quebra leitor de tela).
- Listas: usar `<ul>`/`<ol>` real, não `<div>` com bullets CSS.
- Landmarks: `<header>`, `<nav>`, `<main id="main">`, `<aside>`, `<footer>`. Apenas um `<main>` por página.

### 15.5 Imagens

- **Alt text obrigatório** em toda imagem informativa. Padrão para Siga:
  - Foto institucional: `alt="Carla, atendente da Siga, ao telefone com cliente"`.
  - Logo de parceiro: `alt="Banco Pan"` (não "logo do Banco Pan").
  - Ícone de produto numa lista: `alt="Conta de luz"` (descreve função, não forma).
- Decorativas (pattern de fundo, foto puramente estética ao lado de texto que já explica tudo): `alt=""` + `role="presentation"`.
- **Nunca** alt="imagem", "foto", "banner".

### 15.6 Formulários

- **Labels visíveis** sempre. Placeholder NÃO substitui label (some ao digitar; idoso esquece o que era o campo).
- Erros associados via `aria-describedby="<id-do-erro>"` + `aria-invalid="true"`.
- Mensagem de erro humana (ver seção 17 · Microcopy), não código de erro.
- Campos obrigatórios marcados com `*` visível + texto "campo obrigatório" em legenda no topo do form.
- `autocomplete` apropriado: `autocomplete="tel-national"` em telefone, `autocomplete="email"` em e-mail. Brasileiro de classe C usa muito o autopreenchimento do navegador — economiza 40% do tempo de form.

### 15.7 Movimento

- Toda animação respeita `prefers-reduced-motion: reduce` (snippet global na seção 14.5).
- Reveal e contagem de stats: simplesmente aparecem em estado final, sem transição.
- FAB pulsante: para o pulso.

---

## 16. Responsividade e Breakpoints

> **Princípio guia:** mobile-first **sério**, não "desktop primeiro reduzido". 78% do público da Siga acessa por celular, muitos com tela 5.5", muitos com plano de dados limitado. Desenhar primeiro para 375×667 (iPhone SE) e expandir para cima.

### 16.1 Tokens de breakpoint

```css
--bp-sm:  640px;   /* telefone grande / phablet */
--bp-md:  768px;   /* tablet vertical */
--bp-lg:  1024px;  /* tablet horizontal / laptop pequeno */
--bp-xl:  1280px;  /* desktop padrão */
--bp-2xl: 1536px;  /* desktop grande */
```

Uso de media queries: `@media (min-width: 768px) { … }`. **Sempre `min-width`** (mobile-first), nunca `max-width` como base.

### 16.2 Tipografia fluida

- `--fs-display`, `--fs-h1`, `--fs-h2` usam `clamp()` (já no token). Cresce contínua com viewport.
- `--fs-body` permanece **17px** em todos os breakpoints — não diminuir em mobile (idoso já está com dificuldade).
- `--fs-small` mínimo 15px em mobile (subir para 14px só em texto auxiliar de rodapé).

### 16.3 Grids por componente

| Componente | Mobile (<768) | Tablet (md) | Desktop (lg+) |
|---|---|---|---|
| Cards de produto (Home) | 1 coluna | 2 colunas | **4 colunas** |
| Cards de vantagens | 1 coluna | 2 colunas | 3 colunas |
| Comparativo CLT (tabela) | scroll horizontal | scroll horizontal | tabela completa |
| FAQ | 1 coluna full | 1 coluna max-width 720px | idem |
| Depoimentos | scroll horizontal carousel sem auto-play | grid 2 col | grid 3 col |

### 16.4 Navegação

- **Menu hambúrguer** abaixo de `lg` (1024px). Drawer que entra pela direita, full-height, com lista vertical de itens em `--fs-h4` (alvo grande).
- **Menu horizontal** a partir de `lg`. Dropdowns com `popover` API (HTML nativo, leve).
- **0800 visível no header** apenas a partir de `xl` (1280px). Em mobile, o número aparece no FAB secundário e no rodapé.
- **CTA "Simular pelo WhatsApp"** sempre visível no header, mesmo em mobile (encolhe para ícone + "Simular").

### 16.5 Imagens responsivas

```html
<picture>
  <source media="(min-width: 1024px)" srcset="hero-luz-1280.avif" type="image/avif">
  <source media="(min-width: 1024px)" srcset="hero-luz-1280.webp" type="image/webp">
  <source media="(min-width: 640px)" srcset="hero-luz-768.avif" type="image/avif">
  <img src="hero-luz-375.jpg" alt="Mulher segurando fatura de energia" loading="eager" width="375" height="240">
</picture>
```

- Hero: `loading="eager"` + `fetchpriority="high"`.
- Tudo abaixo da dobra: `loading="lazy"` + `decoding="async"`.

### 16.6 FAB WhatsApp por viewport

- Desktop (≥md): 64×64px, `bottom: var(--s-6); right: var(--s-6);`.
- Mobile: 52×52px, `bottom: max(var(--s-4), env(safe-area-inset-bottom)); right: var(--s-4);`.
- **Nunca** sumir em scroll. **Nunca** atrás de modal/cookie banner.

---

## 17. Tone of Voice e Microcopy

> **Princípio guia:** o público da Siga já levou cantada de banco grande, gerente educado, IA fingindo gente. **Conversa de amigo inteligente** ganha. Não amigo "descolado" — amigo que estudou finanças e ainda lembra como é não ter R$ 200 na conta dia 28.

### 17.1 Cinco mandamentos

1. **Direto, sem rodeios.** "Empréstimo na conta de luz, de R$ 400 a R$ 4.000, no Pix em 24h." Não "soluções de crédito personalizadas".
2. **Confiante, não arrogante.** "A gente faz isso há 11 anos." Não "líderes de mercado".
3. **Benefício > feature.** "Sem consulta ao SPC" antes de "análise de crédito alternativa".
4. **Honestidade radical.** "Pra empréstimo de R$ 4.000 a parcela vai ser R$ 280 por 24 meses. CET 6.2% ao mês." Mostrar o número difícil; é o que separa correspondente sério de golpista.
5. **Empatia sem condescendência.** Falar de "negativado" sem suavizar com "passando por momento financeiro desafiador". Tratar adulto como adulto.

### 17.2 Padrões de microcopy

**Botões — verbo de ação na primeira pessoa do cliente.**

| ✅ Sim | ❌ Não |
|---|---|
| Simular pelo WhatsApp | Saiba mais |
| Quero esse → | Clique aqui |
| Ligar grátis | Enviar |
| Ver minha simulação | Continuar |
| Falar com atendente | Submit |

**Placeholders — exemplo real, nunca instrução.**

| ✅ Sim | ❌ Não |
|---|---|
| (43) 99999-0000 | Digite seu telefone |
| seu@email.com | Insira seu email |
| 000.000.000-00 | Digite seu CPF |
| Conta um pouco do seu caso… | Mensagem |

**Mensagens de erro — humana, com saída.**

| ✅ Sim | ❌ Não |
|---|---|
| Esse e-mail não parece válido. Confere a digitação? | Erro: campo inválido |
| CPF incompleto. Falta o último dígito. | Invalid CPF |
| A gente não conseguiu enviar. Pode tentar de novo? | Network error |

**Mensagens de sucesso — confirmar + próximo passo.**

| ✅ Sim | ❌ Não |
|---|---|
| Recebemos. A gente te chama em até 1 hora no WhatsApp. | Formulário enviado com sucesso. |
| Simulação salva. Vamos seguir pelo WhatsApp? | Sucesso! |

**Estados vazios — explicar + oferecer ação.**

| ✅ Sim | ❌ Não |
|---|---|
| Ainda sem artigos nesta categoria. A gente publica novidade toda semana — volta sexta. | Nenhum resultado encontrado. |
| Sua busca não bateu com nada por aqui. Tenta "FGTS" ou "consignado"? | No results. |

### 17.3 Lista de palavras proibidas

Banidas em copy do site, blog, e-mail marketing, atendimento WhatsApp:

- "inovador", "disruptivo", "empoderador", "revolucionário"
- "soluções" como substantivo genérico ("oferecemos soluções")
- "líder de mercado", "referência no setor", "número 1"
- "bem-vindo ao nosso site", "navegue pelo menu"
- "nós acreditamos", "nossa missão é", "nossos valores"
- "simplesmente", "facilmente", "rapidamente" (advérbios vazios)
- "rápido" sem número anexo. **Sempre** "em até 24h", "em 1h30", "em 30 minutos".
- Jargão sem tradução: "CET", "IOF", "amortização", "parcela post-fixada". Usar **uma vez** com explicação ("CET — o custo total, com tudo: juros, IOF, seguro") e depois pode reusar.

### 17.4 Tom em situações sensíveis

- **Negativado**: "Mesmo com nome no SPC, a gente avalia." Não "mesmo passando por dificuldades".
- **Recusa de crédito**: "Hoje a análise não aprovou pelo banco X. Vamos tentar pelo banco Y? Leva 24h." Sempre dar próximo passo, nunca "infelizmente não foi possível".
- **Cobrança de dívida em atraso**: "Sua parcela venceu há 4 dias. Quer renegociar pelo WhatsApp?" Direto, sem ameaça, com saída.

---

## 18. Estados de Componentes

> **Princípio guia:** estado é comunicação. Cada estado responde a uma pergunta do usuário: *"está carregando?"* / *"deu certo?"* / *"e agora?"*. Estado mal desenhado faz o usuário recarregar a página — em conexão 3G, recarregar custa lead.

### 18.1 Loading

- **Skeleton** para listas e cards de conteúdo (blog, FAQ filtrada). Shimmer sutil, gradiente animado em loop.
- **Spinner** apenas em ações inline curtas (botão "Enviando…"). Nunca como tela cheia em produto principal.
- **Sem loading próprio para simulação** — o usuário sai pro WhatsApp, então a página apenas mostra "Abrindo o WhatsApp…" por 2s e redireciona.

```css
.skeleton {
  background: linear-gradient(90deg, var(--surface-2) 0%, var(--bg) 50%, var(--surface-2) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  border-radius: var(--r-sm);
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
```

### 18.2 Empty state

- Ícone Lucide `inbox` ou `search-x` em `--text-subtle`, 32px.
- Título em `<h3>` H4 600.
- Microcopy explicando + CTA secundário ("Voltar pra Home", "Falar com atendente").
- **Nunca** ilustração genérica de astronauta perdido / caixa vazia desenhada.

### 18.3 Error state

- Ícone `triangle-alert` em `--warning` (não vermelho — vermelho é marca, não medo).
- Mensagem humana (ver microcopy).
- Botão primário **de recuperação** ("Tentar de novo") + secundário ("Falar com a gente").
- **Nunca** "Erro 500", "Network failure", stacktrace.

### 18.4 Success state

- Ícone `check-circle` em `--cta-green`.
- Confirmação curta + **próximo passo concreto com prazo**.
- Botão "Voltar para Home" como saída opcional.

### 18.5 Disabled

```css
.btn[aria-disabled="true"], .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

- Sempre `aria-disabled="true"` (leitor de tela ignora `disabled` em alguns casos).
- Nunca disable um botão sem explicar por quê em `aria-describedby`.

### 18.6 Validação inline

- Erro aparece **on blur**, não on input (não corrigir o usuário enquanto ele ainda digita — frustrante).
- Sucesso silencioso (sem ✓ verde piscando — distrai).

---

## 19. Performance Budget

> **Princípio guia:** o cliente da Siga abre o site no 3G de bairro com sinal de 2 barrinhas, segurando o celular com a mão suja de óleo da fritura. Página pesada = lead perdido. Performance aqui é **conversão**, não vaidade técnica.

### 19.1 Budgets

| Métrica | Limite |
|---|---|
| **Peso total da página** (HTML + CSS + JS + fonts + above-fold images) | **1.2 MB** |
| Hero image | 150 KB (AVIF/WebP, fallback JPG) |
| JavaScript total (parsed) | 80 KB |
| CSS (Tailwind purged ou stack próprio) | 50 KB |
| Fonts | 2 famílias × 3 weights = ~120 KB |
| **Tempo até interativo (TTI) em 3G simulada** | < 4s |

### 19.2 Core Web Vitals — alvos

- **LCP < 2.0s** (mais agressivo que o "good" do Google de 2.5s).
- **CLS < 0.1**.
- **INP < 200ms**.

Justificativa do LCP agressivo: público classe C, 3G real do interior, dispositivos Android 6 anos antigos. Padrão de mercado é "passou no Lighthouse com Wifi" — não basta.

### 19.3 Bibliotecas — banidas

- jQuery, Bootstrap CSS/JS.
- Lottie (peso de animação não justifica).
- Three.js, p5.js, qualquer canvas/WebGL (já proibido na seção 14.4).
- GSAP (overhead grande para o que precisamos — CSS dá conta).
- Carrossel pesado: Slick, Swiper full. **Permitido**: Swiper modular só com `Slides` + `Navigation`, ou implementação CSS pura com `scroll-snap`.
- AOS sem fallback `prefers-reduced-motion`.

### 19.4 Bibliotecas — permitidas (com cota)

- HTMX (~14 KB) para interações sem SPA framework.
- Alpine.js (~15 KB) para reatividade local.
- Vanilla JS para tudo o resto.

### 19.5 Fontes

- Máximo **2 famílias** (Geist + General Sans, conforme seção 2).
- `font-display: swap` obrigatório.
- `<link rel="preconnect">` para Google Fonts e `wa.me`.
- `<link rel="preload" as="font" type="font/woff2" crossorigin>` para o weight do hero.
- Subsetting Latin Extended (incluir caracteres `ç ã õ á é í ó ú â ê ô`). Sem CJK, sem Cirílico.

### 19.6 Imagens

- Formato preferencial: **AVIF**, fallback **WebP**, último fallback **JPG progressivo**.
- `loading="lazy"` em tudo abaixo da dobra.
- `decoding="async"`.
- `width` e `height` explícitos sempre (evita CLS).
- Nunca PNG para foto. PNG só para logo SVG não disponível.

---

## 20. SEO Técnico

> **Princípio guia:** SEO da Siga compete com correspondentes golpistas e blogs farma de "5 melhores empréstimos 2025". Vencer é ser **especificamente útil + tecnicamente impecável**. E sanitizar tudo — o site legado da Siga já foi alvo de injeção de spam SEO indonésio (links de carros em Medan na home), o que afundou o domínio no Google.

### 20.1 Meta titles — padrão por página

Estrutura: **[Produto + benefício específico] — [diferencial numérico] | Siga Crédito**. Limite 60 caracteres.

| Página | Title |
|---|---|
| Home | Siga Crédito — Empréstimo digital pra quem o banco não atende \| Londrina/PR |
| Conta de Luz | Empréstimo na conta de luz — De R$ 400 a R$ 4.000 no Pix em 24h \| Siga |
| Bolsa Família | Empréstimo Bolsa Família pelo Caixa Tem — até R$ 700 sem desconto \| Siga |
| CLT | Empréstimo consignado CLT — taxas a partir de [X]%, em até 48× \| Siga |
| FGTS | Empréstimo FGTS Saque-Aniversário — até R$ 29 mil no Pix em 1h30 \| Siga |
| Sobre | Sobre a Siga Crédito — Correspondente bancário em Londrina há 11 anos |
| Contato | Falar com a Siga — WhatsApp, 0800 e endereço em Londrina/PR |

### 20.2 Meta descriptions

- 150–160 caracteres.
- Inclui palavra-chave principal + número concreto + CTA implícito.
- Exemplo (Conta de Luz): *"Empréstimo na conta de luz de R$ 400 a R$ 4.000, parcelas de 6 a 18 meses no boleto da Copel. Sem consulta SPC/Serasa. Pix em até 24h. Simule no WhatsApp."*

### 20.3 Open Graph + Twitter

```html
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:image" content="https://sigacredito.com.br/og/conta-de-luz.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://sigacredito.com.br/conta-de-luz">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">
```

Imagem OG por landing (não reusar a da home) — preview no WhatsApp/Telegram é decisivo, link compartilhado no grupo da família.

### 20.4 Schema.org

- **Home**: `Organization` (com `address` físico de Londrina, `telephone`, `sameAs` redes sociais).
- **Landing de produto**: `FinancialProduct` ou `LoanOrCredit` com `interestRate`, `amount`, `loanTerm`, `feesAndCommissionsSpecification`.
- **FAQ**: `FAQPage` com cada Q/A em `Question`/`Answer`.
- **Posts de blog**: `Article` com `author`, `datePublished`, `dateModified`, `image`.
- **Páginas internas**: `BreadcrumbList`.

### 20.5 URLs

Padrão: lowercase, hyphenated, sem stop words.

```
/                       Home
/conta-de-luz          Empréstimo na conta de luz
/bolsa-familia         Empréstimo Bolsa Família
/clt                    Consignado CLT
/fgts                   FGTS Saque-Aniversário
/sobre                  Sobre
/contato                Contato
/blog                   Blog index
/blog/{slug}           Post individual
```

- `<link rel="canonical">` em **toda** página, apontando para a URL definitiva (sem query, sem trailing slash inconsistente).
- Redirect 301 do legado WordPress (`/?p=123`) para a URL nova.

### 20.6 Sitemap, robots, hreflang

- `sitemap.xml` na raiz, atualizado por build, submetido ao Google Search Console.
- `robots.txt`:
  ```
  User-agent: *
  Disallow: /assets/
  Disallow: /wp-admin/
  Disallow: /wp-content/uploads/private/
  Sitemap: https://sigacredito.com.br/sitemap.xml
  ```
- `<link rel="alternate" hreflang="pt-BR" href="…">`. Sem versão internacional planejada.

### 20.7 Anti-spam — prioridade crítica

O domínio atual da Siga **tem injeção SEO ativa** — links de carros em Medan, Indonésia, indexados na home pelo Google. Isso afundou ranking. Plano de blindagem:

- **Sanitização server-side** de todo input de formulário (contato, comentário de blog se houver). Allowlist de tags, escape HTML.
- **Honeypot** em formulários: campo `<input type="text" name="website" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px">`. Bot preenche, validação rejeita.
- **Rate limit** por IP no endpoint de submissão (5 req/min).
- **CSP estrita**: `default-src 'self'; script-src 'self' 'sha256-…'; img-src 'self' https://wa.me data:;`.
- **WAF** (Cloudflare ou similar) com regras OWASP ativas.
- **Verificação semanal** com `site:sigacredito.com.br otomotif OR mobil OR medan` no Google. Se aparecer qualquer resultado, reset imediato + auditoria.
- Migração do legado WordPress para stack atual remove 90% da superfície de ataque (plugins eram o vetor).
