// Phase data — this is the file you'll edit the most as you build out each phase.
//
// There are 10 phases, ids 0 through 9 (per the brief: "começa na 0").
// Only phase 0 is filled in as a *working tutorial example* so the game is
// playable end-to-end out of the box. Phases 1–9 are empty templates: fill in
// title / flower / enigmaHTML / media / answerHash as you write each one.
//
// HOW TO SET A PHASE'S ANSWER (keeping it out of plain text):
//   1. Open tools/hash-generator.html in a browser.
//   2. Type the answer, copy the resulting SHA-256 hash.
//   3. Paste it into that phase's `answerHash` below. Never write the plain
//      answer itself anywhere in this file.
//
// FLOWER MEANINGS: these are shown to her when she taps a collected flower in
// the bouquet bar — a nice place to tie each phase back to the book's actual
// Victorian floriography entries. Swap in real meanings from "Floriografia" as
// you build each phase.

export const PHASES = [
  {
    id: 0,
    title: "Fase 0 — O Início",
    flower: {
      name: "Amor-Perfeito",
      color: "#594580",
      meaning: "'Você está sempre nos meus pensamentos'",
      completionMessage: "O nome dessa flor é tão bonito que eu não podia deixar de fora",
      image: "assets/fotos/Flores/amor-perfeito.jpg",
    },
    enigmaHTML: `
      <p>Você está sempre nos meus pensamentos...</p>
      <p>e entre as dez primeiras flores!</p>
    `,
    media: { type: null, src: "" },
    // hash for "amorperfeito"
    answerHash: "f54930bb51d8a5af18899d35359e4f5567a1402675ffef1d9536253e82ce6b46",
  },
  {
    id: 1,
    title: "Fase 1",
    flower: {
      name: "Lilás",
      color: "#b666d2",
      meaning: "'Primeiro Amor'", // Preencha o significado do Lilás aqui
      completionMessage: "Lembra daquele dia no shopping? Pois é, Lilás...", // Seu recadinho da fase 1 aqui
      image: "assets/fotos/Flores/lilas.jpg"
    },
    enigmaHTML: `
      <p style="white-space: pre-line; font-style: italic; text-align: center; margin: 0; line-height: 1.8;">
        "Eu quero ver o pôr do sol
        Lindo como ele só
        E gente pra ver e viajar
        No seu mar de raio"
      </p>
    `,
    media: { type: null, src: "" },
    // hash for "lilases"
    answerHash: "4cc7dddec101cdcf2e35db6d03ccbb26448d2ba4a60ff4bceb6b5cb67d4d62cd",
  },
  {
    id: 2,
    title: "Fase 2",
    flower: { name: "Lírio do Vale", color: "#8a9b6e", meaning: "'Retorno da felicidade.'", completionMessage: "Você me faz mais feliz a cada dia que passa.", image: "assets/fotos/Flores/lirio-do-vale.jpg" },
    enigmaHTML: `
      <div class="calendar-container">
        <p>Qual é o dia mais importante desse mês?</p>
        <div class="calendar">
          <div class="calendar-header">Julho 2026</div>
          <div class="calendar-grid">
            <div class="day-name">Dom</div><div class="day-name">Seg</div><div class="day-name">Ter</div><div class="day-name">Qua</div><div class="day-name">Qui</div><div class="day-name">Sex</div><div class="day-name">Sáb</div>
            <div class="empty-day"></div><div class="empty-day"></div><div class="empty-day"></div>
            <div class="day">1</div><div class="day">2</div>
            <div class="day" style="cursor: pointer;" onclick="document.getElementById('phase2-card').classList.remove('hidden')">3</div>
            <div class="day">4</div><div class="day">5</div><div class="day">6</div><div class="day">7</div><div class="day">8</div><div class="day">9</div><div class="day">10</div><div class="day">11</div><div class="day">12</div><div class="day">13</div><div class="day">14</div><div class="day">15</div><div class="day">16</div><div class="day">17</div><div class="day">18</div><div class="day">19</div><div class="day">20</div><div class="day">21</div><div class="day">22</div><div class="day">23</div><div class="day">24</div><div class="day">25</div><div class="day">26</div><div class="day">27</div><div class="day">28</div><div class="day">29</div><div class="day">30</div><div class="day">31</div>
          </div>
        </div>
      </div>

      <div id="phase2-card" class="phase2-card-overlay hidden" onclick="if(event.target === this) this.classList.add('hidden')">
        <div class="phase2-polaroid">
          <button class="close-card" onclick="document.getElementById('phase2-card').classList.add('hidden')">&times;</button>
          <div class="polaroid-image-container">
            <img src="assets/fotos/1771989846317.png" alt="Foto 1771989846317">
          </div>
          <div class="polaroid-caption">
            <h3 class="phase2-title-container">
              <span class="num num-3">3</span><span class="slash">/</span><span class="num num-7">7</span>
            </h3>
            <p>Sim, esse é o dia mais importante! Sabe de uma coisa? Não existem <span class="highlight-barr" onmouseover="document.getElementById('phase2-card').classList.add('animating')" onclick="document.getElementById('phase2-card').classList.add('animating')">BAR</span>reiras ou divisões entre nós.</p>
          </div>
        </div>
      </div>
    `,
    media: { type: null, src: "" },
    answerHash: "c8cb878bfeadebc00ce22dbef842ec9720340c3b72ab58fee315f5c1b4bdae6a",
  },
  {
    id: 3,
    title: "Fase 3",
    flower: { name: "Clematite", color: "#7c6fa0", meaning: "'Criatividade e Intelgiência'", completionMessage: "A sua arte, a sua criatividade e a sua inteligência me inspiram todos os dias.", image: "assets/fotos/Flores/clematite.jpg" },
    enigmaHTML: `
      <div class="phase3-container">
        <h3 class="phase3-title">Sua arte marca a nossa história</h3>
        
        <div class="easel">
          <div class="easel-legs"></div>
          <div class="easel-canvas-area">
            <div class="carousel-container">
              <img src="assets/fotos/artes/1783025277689.jpg" class="carousel-img active">
              <img src="assets/fotos/artes/1783025277734.jpg" class="carousel-img">
              <img src="assets/fotos/artes/1783025277769.jpg" class="carousel-img">
              <img src="assets/fotos/artes/1783025277862.jpg" class="carousel-img">
              <img src="assets/fotos/artes/1783025277892.jpg" class="carousel-img">
              <img src="assets/fotos/artes/1783025277923.jpg" class="carousel-img">
            </div>
            <button class="carousel-btn prev-btn" type="button">&#10094;</button>
            <button class="carousel-btn next-btn" type="button">&#10095;</button>
          </div>
        </div>

        <p class="phase3-question">Qual a cor do marca página mesmo?</p>
      </div>
    `,
    media: { type: null, src: "" },
    answerHash: "178773165f67b0bb2009e0f454156879e7000a13a6b09c65e1a019938d6ee1f0",
  },
  {
    id: 4,
    title: "Fase 4",
    flower: { name: "Camomila", color: "#d9a441", meaning: "'Força em meio a adversidade'", completionMessage: "Você é a minha calma quando eu preciso", image: "assets/fotos/Flores/camomila.jpg" },
    enigmaHTML: `
      <div class="phase4-container">
        <p class="meow-text">"Miau miau miau miau miau miau miau miau"</p>
        <p class="translation-text">Parece que a Sayuri observou profundamente algumas flores...muito profundamente.</p>
        <div class="polaroid-stack" style="position: relative; width: 250px; height: 350px; margin: 40px auto 140px;">
          <!-- Top to bottom -->
          <div class="draggable-polaroid" style="position: absolute; top: 0; left: 0; transform: rotate(-5deg); z-index: 5;">
            <div class="polaroid-image-container"><img src="assets/fotos/sayuri1.jpg" alt="Sayuri 1" draggable="false"></div>
            <div class="polaroid-caption" style="text-align: center; font-family: var(--font-display); font-size: 1.2rem; font-weight: bold; margin-top: 8px;">1</div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 0; left: 0; transform: rotate(3deg); z-index: 4;">
            <div class="polaroid-image-container"><img src="assets/fotos/sayuri2.jpg" alt="Sayuri 2" draggable="false"></div>
            <div class="polaroid-caption" style="text-align: center; font-family: var(--font-display); font-size: 1.2rem; font-weight: bold; margin-top: 8px;">2</div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 0; left: 0; transform: rotate(-2deg); z-index: 3;">
            <div class="polaroid-image-container"><img src="assets/fotos/sayuri3.jpg" alt="Sayuri 3" draggable="false"></div>
            <div class="polaroid-caption" style="text-align: center; font-family: var(--font-display); font-size: 1.2rem; font-weight: bold; margin-top: 8px;">3</div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 0; left: 0; transform: rotate(5deg); z-index: 2;">
            <div class="polaroid-image-container"><img src="assets/fotos/sayuri4.jpg" alt="Sayuri 4" draggable="false"></div>
            <div class="polaroid-caption" style="text-align: center; font-family: var(--font-display); font-size: 1.2rem; font-weight: bold; margin-top: 8px;">4</div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 0; left: 0; transform: rotate(-1deg); z-index: 1;">
            <div class="polaroid-image-container"><img src="assets/fotos/sayuri5.jpg" alt="Sayuri 5" draggable="false"></div>
            <div class="polaroid-caption" style="text-align: center; font-family: var(--font-display); font-size: 1.2rem; font-weight: bold; margin-top: 8px;">5</div>
          </div>
        </div>
      </div>
    `,
    media: { type: null, src: "" },
    answerHash: "99b6f4cec6075f80430a02929df4d315cffb4603b7592d9741fb6b46f42e4614",
  },
  {
    id: 5,
    title: "Fase 5",
    flower: { name: "Dália", color: "#c0546b", meaning: "'Amor Eterno e Compromisso.'", completionMessage: "Você me disse que queria estar comigo mesmo que fosse a distancia, esse é o meu compromisso e a prova do nosso amor", image: "assets/fotos/Flores/dalia.jpg" },
    enigmaHTML: `
      <div class="phase5-container">
        <p class="forget-me-not-text">
          Forget Me Not <span class="morse-exclamation">!</span>
        </p>
      </div>
    `,
    media: { type: null, src: "" },
    answerHash: "a079a18a4e4105b2e739f77f861b527b54296e66d1ad399ed06c9ad84de1a670",
  },
  {
    id: 6,
    title: "Fase 6",
    flower: { name: "Flor de Laranjeira", color: "#d8b465", meaning: "'Amor eterno'", completionMessage: "Pra sempre, um tempão mesmo", image: "assets/fotos/Flores/flor-de-laranjeira.jpg" },
    enigmaHTML: `
      <div class="phase6-container">
        <div class="messy-polaroids-area">
          <div class="secret-question">Qual o dia especial desses dois?</div>
          
          <div class="draggable-polaroid" style="position: absolute; top: 30px; left: 20px; transform: rotate(-12deg); z-index: 1;">
            <div class="polaroid-image-container"><img src="assets/fotos/nos/1783005439222.jpg" draggable="false"></div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 50px; left: 40px; transform: rotate(18deg); z-index: 2;">
            <div class="polaroid-image-container"><img src="assets/fotos/nos/1783005439597.jpg" draggable="false"></div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 10px; left: 50px; transform: rotate(-8deg); z-index: 3;">
            <div class="polaroid-image-container"><img src="assets/fotos/nos/1783005439648.jpg" draggable="false"></div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 60px; left: 10px; transform: rotate(5deg); z-index: 4;">
            <div class="polaroid-image-container"><img src="assets/fotos/nos/1783005439792.jpg" draggable="false"></div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 40px; left: 60px; transform: rotate(-15deg); z-index: 5;">
            <div class="polaroid-image-container"><img src="assets/fotos/nos/1783005439829.jpg" draggable="false"></div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 20px; left: 30px; transform: rotate(10deg); z-index: 6;">
            <div class="polaroid-image-container"><img src="assets/fotos/nos/1783005439943.jpg" draggable="false"></div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 70px; left: 25px; transform: rotate(-4deg); z-index: 7;">
            <div class="polaroid-image-container"><img src="assets/fotos/nos/1783005440084.jpg" draggable="false"></div>
          </div>
          <div class="draggable-polaroid" style="position: absolute; top: 35px; left: 45px; transform: rotate(7deg); z-index: 8;">
            <div class="polaroid-image-container"><img src="assets/fotos/nos/IMG-20250804-WA0019.jpg" draggable="false"></div>
          </div>
        </div>
      </div>
    `,
    media: { type: null, src: "" },
    answerHash: "c0405cfa143c7d257ca56c372cbf8920509accb34d7d3e1d60cadcaa92d98b21",
  },
  {
    id: 7,
    title: "Fase 7",
    flower: { name: "Zínia", color: "#d1667a", meaning: "'Amizade Eterna'", completionMessage: "Minha melhor amiga, grande companheira... a única com quem falo todos os dias", image: "assets/fotos/Flores/zinia.jpg" },
    enigmaHTML: `
      <div class="phase7-container">
        <p class="phase7-instructions">Organize as flores.</p>
        
        <div class="p7-workspace">
          
          <div class="p7-slots">
            <div class="p7-slot" data-index="0"></div>
            <div class="p7-slot" data-index="1"></div>
            <div class="p7-slot" data-index="2"></div>
            <div class="p7-slot" data-index="3"></div>
            <div class="p7-slot" data-index="4"></div>
            <div class="p7-slot" data-index="5"></div>
            <div class="p7-slot" data-index="6"></div>
          </div>

          <div class="p7-draggable" data-flower="lilas" style="top: 20px; left: 15%; transform: rotate(10deg);">
            <img src="assets/fotos/Flores/lilas.jpg" draggable="false">
          </div>
          <div class="p7-draggable" data-flower="amor-perfeito" style="top: 50px; left: 40%; transform: rotate(-5deg);">
            <img src="assets/fotos/Flores/amor-perfeito.jpg" draggable="false">
          </div>
          <div class="p7-draggable" data-flower="camomila" style="top: 180px; left: 10%; transform: rotate(-15deg);">
            <img src="assets/fotos/Flores/camomila.jpg" draggable="false">
          </div>
          <div class="p7-draggable" data-flower="dalia" style="top: 140px; left: 70%; transform: rotate(12deg);">
            <img src="assets/fotos/Flores/dalia.jpg" draggable="false">
          </div>
          <div class="p7-draggable" data-flower="flor-de-laranjeira" style="top: 10px; left: 80%; transform: rotate(-8deg);">
            <img src="assets/fotos/Flores/flor-de-laranjeira.jpg" draggable="false">
          </div>
          <div class="p7-draggable" data-flower="clematite" style="top: 200px; left: 50%; transform: rotate(5deg);">
            <img src="assets/fotos/Flores/clematite.jpg" draggable="false">
          </div>
          <div class="p7-draggable" data-flower="lirio-do-vale" style="top: 80px; left: 60%; transform: rotate(18deg);">
            <img src="assets/fotos/Flores/lirio-do-vale.jpg" draggable="false">
          </div>

        </div>

        <div id="phase7-success" class="phase7-success hidden">
          <p>Você encontrou o arranjo perfeito.</p>
          <img src="assets/fotos/Flores/zinia.jpg" alt="Zínia" class="zinia-reveal">
        </div>
      </div>
    `,
    media: { type: null, src: "" },
    answerHash: "fe48ca776fc574c7e2d274c0bec7394cf86497240713f7e21fae047bcb728a58",
  },
];

// Shown on the closing screen once phase 7 is solved. Personalize freely.
export const FINALE_MESSAGE = `
  <div class="finale-message-container">
    <div class="finale-letter">
      <div class="finale-intro reveal-item">
        <p>Uau! Você conseguiu mesmo!</p>
        <p>Bom, eu sabia que você ia conseguir, se não qual seria o ponto de programar essa tela?</p>
        <p>Enfim, você chegou no final mesmo, e acho que eu prometi uma terceira parte do presente… então, tá bom, aqui vai:</p>
        <p>Olha, eu estive pensando no que eu poderia fazer como recompensa para grande ganhadora, descobridora dos enigmas. Então eu percebi que estava na hora de retribuir todas as cartas que eu recebi, escritas com tanto carinho. Agora é minha vez.</p>
        <p>Como tudo isso foi temático de flores, você deve ter percebido que as respostas dos enigmas tinham um significado, então esse buquê digital é minha carta de amor pra você.</p>
        <p class="finale-note">(Eu recomendaria colocar uma playlist do Tim Bernardes enquanto você lê, mas sem as tristes)</p>
      </div>

      <div class="finale-flower-sections">
        <div class="finale-flower-section reveal-item">
          <div class="finale-flower-img-container left">
            <img src="assets/fotos/Flores/amor-perfeito.jpg" class="finale-flower-img" alt="Amor Perfeito">
          </div>
          <div class="finale-flower-text-content">
            <h3 class="finale-flower-title">Amor Perfeito</h3>
            <h4 class="finale-flower-meaning">'Você está sempre nos meus pensamentos'</h4>
            <p>Eu escolhi essa flor porque era muito óbvia. O seu significado, o seu nome. Amor perfeito.</p>
            <p>Eu escolhi essa flor porque era muito óbvia. O seu significado, o seu nome. Amor perfeito.</p>
            <p><div class="finale-inline-polaroid right" style="transform: rotate(4deg);"><img src="assets/fotos/ela/1783005439484.jpg"></div>Olha, pra mim é isso que você representa. Eu nunca imaginaria encontrar alguém que me completa da forma que você completa, que encaixaria perfeitamente em tudo. E você é essa pessoa. Muito além do que eu poderia imaginar. Você está sempre nos meus pensamentos, tudo que eu faço agora tem você. Presente na minha vida, impactando minhas decisões, mesmo sem que você perceba, mesmo que você não esteja presente fisicamente, eu não consigo imaginar um futuro sem você, e por isso, você sempre está nos meus pensamentos.</p>
          </div>
        </div>

        <div class="finale-flower-section reverse reveal-item">
          <div class="finale-flower-img-container right">
            <img src="assets/fotos/Flores/lilas.jpg" class="finale-flower-img" alt="Lilás">
          </div>
          <div class="finale-flower-text-content">
            <h3 class="finale-flower-title align-right">Lilás</h3>
            <h4 class="finale-flower-meaning align-right">'Primeiro Amor'</h4>
            <p>Escolhendo as flores, folheando o livro, eu bati os olhos em “Lilas” e imediatamente me lembrei de quando você comprou o disco. De como naquele dia eu via você com admiração, admirando seus gostos, sua personalidade. Naquele dia parece que a luz do sol deixava tudo mais colorido. Provavelmente era só você. Você brilhava no meio de um monte de motoqueiros e rockeiros numa feira de discos. Quando você comprou um disco de jazz aleatório e disse que só ia ouvir quando tivesse seu próprio toca-discos, eu sabia que eu tinha que estar junto com você quando acontecesse (aconteceu mais rápido do que parecia na época).</p>
            <p>Escolhendo as flores, folheando o livro, eu bati os olhos em “Lilas” e imediatamente me lembrei de quando você comprou o disco. De como naquele dia eu via você com admiração, admirando seus gostos, sua personalidade. Naquele dia parece que a luz do sol deixava tudo mais colorido. Provavelmente era só você. Você brilhava no meio de um monte de motoqueiros e rockeiros numa feira de discos. Quando você comprou um disco de jazz aleatório e disse que só ia ouvir quando tivesse seu próprio toca-discos, eu sabia que eu tinha que estar junto com você quando acontecesse (aconteceu mais rápido do que parecia na época).</p>
            <p><div class="finale-inline-polaroid left" style="transform: rotate(-5deg);"><img src="assets/fotos/ela/1783005439743.jpg"></div>Naquela noite em que estávamos no meu quarto, com as luzes azuis, quando eu disse que te amava pela primeira vez, foi de fato a primeira vez. Eu nunca disse pra ninguém. Só pra você. Porque só você me traz a sensação de que o meu coração não cabe mais no peito. Você é o meu primeiro amor; meu único amor.</p>
          </div>
        </div>

        <div class="finale-flower-section reveal-item">
          <div class="finale-flower-img-container left">
            <img src="assets/fotos/Flores/lirio-do-vale.jpg" class="finale-flower-img" alt="Lírio do Vale">
          </div>
          <div class="finale-flower-text-content">
            <h3 class="finale-flower-title">Lírio do Vale</h3>
            <h4 class="finale-flower-meaning">'Retorno da felicidade'</h4>
            <p>Eu sempre falei pra você que eu sou alguém muito melancólico, triste… mas na verdade, acho que as coisas mudaram um pouco. Depois que eu te conheci, os dias são mais coloridos.</p>
            <p>Eu sempre falei pra você que eu sou alguém muito melancólico, triste… mas na verdade, acho que as coisas mudaram um pouco. Depois que eu te conheci, os dias são mais coloridos.</p>
            <p><div class="finale-inline-polaroid right" style="transform: rotate(3deg);"><img src="assets/fotos/ela/1783005439854.jpg"></div>Eu fico tão empolgado em te mostrar coisas que você nunca viu, comer em lugares que você nunca comeu, ouvir musicas que você nunca ouviu, filmes diferentes, sensações novas, eu quero dar pra você só um pouco, retribuir nem que seja só um pouco da alegria que você me dá. No final das contas, seu nome é “a que traz felicidade”, e você não poderia ter um nome melhor. Beatriz.</p>
          </div>
        </div>

        <div class="finale-flower-section reverse reveal-item">
          <div class="finale-flower-img-container right">
            <img src="assets/fotos/Flores/clematite.jpg" class="finale-flower-img" alt="Clematite">
          </div>
          <div class="finale-flower-text-content">
            <h3 class="finale-flower-title align-right">Clematite</h3>
            <h4 class="finale-flower-meaning align-right">'Criatividade e Inteligência'</h4>
            <p>Eu nunca vou cansar de te dizer o quão incrível você é artisticamente falando. Eu não falo da boca pra fora quando digo que você é a maior desenhista que eu conheço. Eu amo seu traço, admiro desacreditado de quão habilidosa você é. E digo de novo, você é muito, muito boa, e eu espero genuinamente que você use sua arte pra alcançar todos os corações que você conseguir. Que você sempre coloque um pedaço da sua alma pros outros devorarem.</p>
            <p>Eu nunca vou cansar de te dizer o quão incrível você é artisticamente falando. Eu não falo da boca pra fora quando digo que você é a maior desenhista que eu conheço. Eu amo seu traço, admiro desacreditado de quão habilidosa você é. E digo de novo, você é muito, muito boa, e eu espero genuinamente que você use sua arte pra alcançar todos os corações que você conseguir. Que você sempre coloque um pedaço da sua alma pros outros devorarem.</p>
            <p><div class="finale-inline-polaroid left" style="transform: rotate(-4deg);"><img src="assets/fotos/ela/1783005439879.jpg"></div>Mas não é só isso que eu tenho pra dizer. A sua criatividade não se limita aos desenhos, aos papéis, colagem, cortes e recortes, pinturas. Você tem ideias tão boas, as vezes só te explicar um problema é suficiente pra você pensar numa saída. Você se subestima demais quanto à sua criatividade e especialmente quanto à sua inteligência. Você é inteligente, você é observadora, você dá atenção aos detalhes. Você se esforça e chega lá. Você é fora da curva. E mesmo que você duvide, eu acredito por nós dois, porque eu consigo te ver.</p>
          </div>
        </div>

        <div class="finale-flower-section reveal-item">
          <div class="finale-flower-img-container left">
            <img src="assets/fotos/Flores/camomila.jpg" class="finale-flower-img" alt="Camomila">
          </div>
          <div class="finale-flower-text-content">
            <h3 class="finale-flower-title">Camomila</h3>
            <h4 class="finale-flower-meaning">'Força em meio a adversidade'</h4>
            <p>Você é a minha força em meio a adversidade. Tantas vezes que estive cansado, frustrado, derramando minhas lágrimas, e você estava lá. Ouvindo, me consolando, me abraçando. Olha esse ano não tem sido fácil. Não mesmo. Perder minha avó não foi fácil. Morar “sozinho” não é fácil. Falhar nos estágios é muito frustrante. Olhar pro futuro é aterrorizante. Olhar pra dentro as vezes é realmente dolorido.</p>
            <p>Você é a minha força em meio a adversidade. Tantas vezes que estive cansado, frustrado, derramando minhas lágrimas, e você estava lá. Ouvindo, me consolando, me abraçando. Olha esse ano não tem sido fácil. Não mesmo. Perder minha avó não foi fácil. Morar “sozinho” não é fácil. Falhar nos estágios é muito frustrante. Olhar pro futuro é aterrorizante. Olhar pra dentro as vezes é realmente dolorido.</p>
            <p><div class="finale-inline-polaroid right" style="transform: rotate(6deg);"><img src="assets/fotos/ela/1783005439910.jpg"></div>Mas você sempre está lá. E você me dá mais um motivo pra olhar pra frente, pra me arrumar e te ligar no fim do dia. Tem dias que eu genuinamente to sem forças pra ligar, mas depois que eu te ligo, as coisas melhoram. Mesmo quando você está triste, poder estar lá por você me move pra frente também. Olhar para o futuro e saber que você vai estar comigo me leva a querer ser melhor. E eu, se puder, também quero ser sua força na adversidade.</p>
          </div>
        </div>

        <div class="finale-flower-section reverse reveal-item">
          <div class="finale-flower-img-container right">
            <img src="assets/fotos/Flores/dalia.jpg" class="finale-flower-img" alt="Dália">
          </div>
          <div class="finale-flower-text-content">
            <h3 class="finale-flower-title align-right">Dália</h3>
            <h4 class="finale-flower-meaning align-right">'Amor Eterno e Compromisso'</h4>
            <p>Quando você passou na faculdade, quando nós saímos pra ir no Tauste, você disse que estava com medo de que eu não fosse querer continuar. Olha, eu confesso que fui pego de surpresa, e parecia meio que a situação de filme. Mas quando eu saí da faculdade, eu sabia o que eu tinha que fazer. Eu sabia que eu estava disposto a enfrentar a distância por você. Porque você valia a pena. Porque a força da distância não podia ser mais forte que a força que nos aproximava.</p>
            <p>Quando você passou na faculdade, quando nós saímos pra ir no Tauste, você disse que estava com medo de que eu não fosse querer continuar. Olha, eu confesso que fui pego de surpresa, e parecia meio que a situação de filme. Mas quando eu saí da faculdade, eu sabia o que eu tinha que fazer. Eu sabia que eu estava disposto a enfrentar a distância por você. Porque você valia a pena. Porque a força da distância não podia ser mais forte que a força que nos aproximava.</p>
            <p><div class="finale-inline-polaroid left" style="transform: rotate(-6deg);"><img src="assets/fotos/ela/1783005439991.jpg"></div>E ainda bem que eu fiz isso. Ainda bem que você topou essa loucura comigo. Vale cada dia. Vale cada minuto separado. Vale a pena porque nós sabemos que nossa conexão, o nosso compromisso, é muito maior do que algumas centenas de quilômetros. Mais forte do que ônibus quebrados, horários incompatíveis. Esse é o nosso compromisso. E eu sei que um dia, tudo isso vai passar. Mas o amor continua e continuará, e nesse dia, nós vamos saber que nós vencemos uma montanha bem grande, e que podemos superar qualquer desafio.</p>
          </div>
        </div>

        <div class="finale-flower-section reveal-item">
          <div class="finale-flower-img-container left">
            <img src="assets/fotos/Flores/flor-de-laranjeira.jpg" class="finale-flower-img" alt="Flor de Laranjeira">
          </div>
          <div class="finale-flower-text-content">
            <h3 class="finale-flower-title">Flor de Laranjeira</h3>
            <h4 class="finale-flower-meaning">'Amor eterno'</h4>
            <p>Eu acho que essa flor é óbvia também. Eu te amo. E vou te amar hoje, amanhã, depois de amanhã, depois de depois de amanhã e daqui um mês, um ano, dois anos, cinco anos, anos.</p>
            <p>Eu acho que essa flor é óbvia também. Eu te amo. E vou te amar hoje, amanhã, depois de amanhã, depois de depois de amanhã e daqui um mês, um ano, dois anos, cinco anos, anos.</p>
            <p><div class="finale-inline-polaroid right" style="transform: rotate(5deg);"><img src="assets/fotos/ela/1783005440021.jpg"></div>Enfim, para sempre, que é bastante tempo. Um dos principais motivos de eu ter escolhido essa flor é porque a ilustração é muito bonita. Que nem você. Você é linda como uma flor de laranjeira. Simples assim.</p>
          </div>
        </div>

        <div class="finale-flower-section reverse reveal-item">
          <div class="finale-flower-img-container right">
            <img src="assets/fotos/Flores/zinia.jpg" class="finale-flower-img" alt="Zínia">
          </div>
          <div class="finale-flower-text-content">
            <h3 class="finale-flower-title align-right">Zínia</h3>
            <h4 class="finale-flower-meaning align-right">'Amizade Eterna'</h4>
            <p>Assim como fala o Tim Bernardes: O que a gente quer é gostar de alguém. E quer que esse alguém goste da gente também. É a história mais velha do mundo, um destino que foi desenhado. O que mais alguém pode querer além de amar e ser amado?</p>
            <p>Assim como fala o Tim Bernardes: O que a gente quer é gostar de alguém. E quer que esse alguém goste da gente também. É a história mais velha do mundo, um destino que foi desenhado. O que mais alguém pode querer além de amar e ser amado?</p>
            <p><div class="finale-inline-polaroid left" style="transform: rotate(-3deg);"><img src="assets/fotos/ela/1783005440048.jpg"></div>Sim, é a história mais velha do mundo. Que bom que é com você. Você é a minha melhor amiga, a única pessoa com quem eu falo todos os dias da minha vida desde que começamos a conversar. A pessoa que sabe tudo sobre mim. A pessoa que está ao meu lado pra me apoiar. Graças ao bom Deus eu posso dizer que essa pessoa é minha namorada. Posso amar e me sentir profundamente amado. Posso confiar em você de olhos fechados, mesmo com tantos quilômetros de distância. Você é minha companheira e espero que você goste disso também, porque temos um bom tempo juntos ainda. Eu te amo Bia, te amo todos os dias e espero que você possa comemorar todos os seus anos junto comigo.</p>
          </div>
        </div>
      </div>

      <div class="finale-outro reveal-item">
        <p>Eu espero que você tenha gostado desse “desafio”. Espero que tenha dado algumas risadas com as fotos da Sayuri e tenha achado fofo nossas fotos juntos. Eu espero que você perceba que essas palavras não são da boca pra fora (ou dos meus dedos pra fora?). Honestamente, eu espero que tenha tido pelo menos uma ou duas lágrimas no texto final, mas se não deu, tudo bem também, eu dei meu melhor.</p>
        <p class="finale-highlight">Eu te amo. Feliz aniversário. Feliz 20 anos.</p>
        <p class="finale-awkward">(Você está lendo isso do meu lado? Talvez tenha sido meio awkward, não sei, tomara que não)</p>
      </div>
    </div>
  </div>
`;

/**
 * `media.type` accepted values: null | "image" | "audio" | "video"
 * `media.src` should be a path under assets/media/, e.g. "assets/media/fase-3.jpg"
 */
