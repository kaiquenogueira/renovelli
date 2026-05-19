# Sistema de Design «Atelier» — variante clara

> **Arquivo vivo:** [`assets/design_system.html`](../../assets/design_system.html)
> Abra com um servidor estático na raiz do projeto:
> `python3 -m http.server` → `http://localhost:8000/assets/design_system.html`
> (os caminhos de imagem usam `../public/images/...`)

Este arquivo **sobrepõe** o `MASTER.md` para qualquer trabalho na linguagem clara
(ver regra de precedência no topo do `MASTER.md`).

---

## Por que «Atelier» existe

A landing principal (`src/`) usa a linguagem **escura «Vidro Líquido»** sobre
vídeo cinematográfico em movimento. O texto sobre o vídeo escuro tem contraste
ruim e prejudica a leitura.

A «Atelier» é a **releitura clara** da mesma marca: a fotografia automotiva
deixa de competir com o texto e vira *textura* — superfície de papel,
fotografia dessaturada em baixa opacidade + degradê de leitura, garantindo
legibilidade **AAA** sem perder o drama. É também a base do
`assets/design_system.html` entregue como referência de componentes.

Combinação criativa das referências em `.reference/` (não versionado):
estética branca + grid (Aura/Digital Architect), **lettering vazado**
(`-webkit-text-stroke` + `color: transparent`, de artools), beam cônico e
shimmer (animations-gemini), GSAP ScrollTrigger/flashlight/scanline (artools),
sobre os tokens reais da marca Renovelli (`src/index.css`).

## Tokens (fonte de verdade: `src/index.css`)

| Papel | Hex | Uso |
|------|-----|-----|
| Superfície | `#EAEAE5` | background principal |
| Paper soft | `#F2F1ED` | faixas, sticky headers |
| Pure | `#FFFFFF` | cards |
| Tinta / Onyx | `#0A0E12` | texto primário — **AAA** sobre paper |
| Brass | `#C9A36A` | acento decorativo, borda, hover, beam |
| Brass Deep | `#8E6E3E` | texto-acento — **AA** sobre paper |
| LED | `#3F6B8C` | highlight frio (escurecido p/ fundo claro) |
| Oxblood | `#8B2D2D` | feedback destrutivo / labels "Antes" |

**Regra de contraste:** texto de leitura sempre em `ink`; acento em texto só
com `brass-deep`; `brass` puro nunca em texto sobre claro (só decorativo).

## Tipografia

| Família | Papel | Notas |
|--------|------|-------|
| **Fraunces** (variável 9..144) | Display / editorial | `opsz 144 · SOFT 30 · WONK 1`; itálico p/ ênfase |
| **Geist** (300..900) | UI / corpo | `ss01, cv11` |
| **JetBrains Mono** | Labels, dados, marcadores | uppercase, tracking largo |
| **Great Vibes** | Assinatura decorativa | uso pontual |

Escala completa (H1→H6, body LG/MD/SM, caption/label) com `font-family /
weight / size / line-height / letter-spacing / transform` documentada
inline na seção **Tipografia** do arquivo vivo.

## Classes / JS reutilizados (mesma API das referências)

`.reveal` · `.reveal-up` · `.reveal-zoom` · `.text-reveal-wrapper/-content` ·
`.text-outline` (lettering vazado) · `.btn-beam` / `.btn-beam-content` ·
`.cta-btn` · `.flashlight-card` · `.animate-marquee` · `.bg-grid` · `.noise` ·
`.glass-panel` · `.hex-clip` / `.hex-bg` · `.scanline` ·
`updateFlashlight()` · `IntersectionObserver` (reveals) ·
`gsap` + `ScrollTrigger` (parallax + blur-out do hero).

## Seções do arquivo vivo

0. **Hero** (1ª dobra) — carrossel ken-burns, masked text-reveal + lettering
   vazado, orbes brass flutuantes, beam/CTA, flashlight card, cursor custom.
1. **Tipografia** — famílias + escala completa com specs.
2. **Cores** — swatches HEX/RGB/HSL, opacidade, gradientes, semântica, AA/AAA.
3. **Componentes** — botões, inputs, seleção, navbar, cards, modal, badges,
   tooltips, data-viz.
4. **Ícones** — grid Solar duotone (vocabulário automotivo).
5. **Movimento** — reveal-up, glow+scale, beam cônico, state-change,
   masked text-reveal.

Animações de fundo (`hex-bg` + grid + orbes), de surgimento (reveals) e de
hover (beam/flashlight/shimmer) repetem-se em **todas** as dobras.

## Checklist de entrega

Vale o mesmo checklist do `MASTER.md` — com ênfase em: contraste de leitura
≥ AAA para `ink` sobre `paper`, `prefers-reduced-motion` respeitado,
sem scroll horizontal, foco visível.
