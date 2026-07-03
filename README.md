# Floriografia — ARG de aniversário

Site-jogo de mistério/romance para um presente de aniversário, com 10 fases
sequenciais (0–9) inspiradas no livro *Floriografia* (Jessica Roux). A cada
fase resolvida, uma flor é adicionada ao buquê.

Stack: HTML/CSS/JS puro, sem build step, sem dependências. Basta abrir
`index.html` num servidor estático (ou até direto no navegador, com ressalvas
de CORS ao carregar módulos — veja "Como rodar" abaixo).

## Estrutura

```
index.html            shell da página (hero, buquê, container da fase, finale)
css/style.css          todo o estilo visual
js/
  phases.js            dados de cada fase — é aqui que você vai trabalhar mais
  main.js               orquestra: renderiza a fase atual, valida resposta, avança
  inventory.js           renderiza a barra do buquê + popup de significado da flor
  validation.js           hashing SHA-256 + checagem de resposta
  storage.js              progresso salvo em localStorage (dá pra fechar e voltar depois)
tools/hash-generator.html  ferramenta interna pra gerar o hash de cada resposta
assets/flowers/            (vazio) — ícones/ilustrações de flores, se quiser trocar o SVG placeholder
assets/media/               (crie conforme precisar) — imagens/áudio/vídeo de cada fase
```

## Como desenvolver uma fase

Cada fase é um objeto dentro do array `PHASES` em [`js/phases.js`](js/phases.js):

```js
{
  id: 3,
  title: "Fase 3",
  flower: { name: "Jasmim", color: "#...", meaning: "Significado vitoriano da flor" },
  enigmaHTML: `<p>Texto do enigma. Pode ter HTML simples (parágrafos, ênfase, etc).</p>`,
  media: { type: "image", src: "assets/media/fase-3.jpg" }, // ou "audio" | "video" | null
  answerHash: "cole aqui o hash gerado",
}
```

O template da fase (título, área de enigma, mídia, input, botão, mensagem de
erro) é sempre o mesmo — ele é montado automaticamente por `renderPhase()` em
`js/main.js`. Você só edita os dados.

### Gerando o hash da resposta

A resposta nunca fica em texto puro no código (pra ela não conseguir "inspecionar
elemento" e ler a resposta). Em vez disso, cada fase guarda o hash SHA-256 da
resposta esperada.

1. Abra `tools/hash-generator.html` no navegador.
2. Digite a resposta correta da fase.
3. Copie o hash gerado e cole em `answerHash`.

A fase 0 já vem com um exemplo funcional (resposta: "saudade") pra você
conferir que o fluxo completo funciona antes de escrever suas próprias fases.

**Sobre "segurança":** isso impede uma espiada casual pelo código-fonte, mas
como é tudo client-side, alguém suficientemente determinado ainda poderia
tentar quebrar o hash por força bruta (principalmente se a resposta for uma
palavra comum). Isso é aceitável pro objetivo aqui (evitar spoiler, não
proteger segredo de estado). Se um dia você quiser validação de verdade
server-side, veja "Backend opcional" abaixo — a troca é de uma linha.

### Respostas "perdoáveis"

A checagem ignora maiúsculas/minúsculas, espaços nas pontas e acentos (então
"Saudade", " saudade " e "saudáde" contam como a mesma resposta). Isso é
normalizado em `normalize()`, presente tanto em `js/validation.js` quanto em
`tools/hash-generator.html` — **se mudar um, mude o outro**, ou os hashes vão
deixar de bater.

## Backend opcional

A estrutura já está pronta para trocar a validação local por uma chamada a um
backend simples, sem mexer no resto do app. Basta, antes de `js/main.js`
carregar (por exemplo em uma tag `<script>` no `index.html`), definir:

```html
<script>
  window.ARG_CONFIG = { backendUrl: "https://seu-backend.exemplo.com" };
</script>
```

Quando `backendUrl` está definido, `checkAnswer()` (em `js/validation.js`) faz
um `POST` para `{backendUrl}/validate` com `{ phaseId, answer }` e espera de
volta `{ correct: true|false }`, em vez de comparar hashes no navegador.

## Progresso salvo

O progresso (fase atual + flores coletadas) fica em `localStorage`, então ela
pode fechar a aba e continuar de onde parou. Pra testar do zero, ou pular pra
uma fase específica enquanto você desenvolve, abra o console do navegador:

```js
ARG_DEV.reset()       // zera tudo
ARG_DEV.goTo(4)        // pula direto pra fase 4 (marca 0-3 como resolvidas)
ARG_DEV.unlockAll()    // resolve o jogo inteiro, útil pra ver a tela final
```

## Como rodar

Módulos ES (`type="module"`) não carregam via `file://` em todos os
navegadores. Rode um servidor estático simples na pasta do projeto, por
exemplo:

```bash
npx serve .
# ou
python -m http.server 8000
```

E abra `http://localhost:8000`.

## Deploy

É um site 100% estático — funciona em GitHub Pages, Netlify, Vercel (modo
estático) ou qualquer hospedagem simples, sem servidor próprio necessário
(a menos que você configure o backend opcional acima).

## Estilo visual

A paleta e a tipografia usadas aqui (parchment/verde-floresta, serifada
romântica + sans-serif limpa, cards arredondados flutuando sobre um fundo
ilustrado) vêm das referências salvas em
`.claude/skills/design-inspiration/`. Se quiser ajustar o visual, comece
adicionando mais imagens de referência lá (por exemplo, páginas reais do
livro *Floriografia*) antes de mexer direto no CSS.
