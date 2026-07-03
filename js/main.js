import { PHASES, FINALE_MESSAGE } from "./phases.js?v=2";
import { loadProgress, saveProgress, resetProgress } from "./storage.js?v=2";
import { checkAnswer } from "./validation.js?v=2";
import { renderBouquet, initFlowerPopup } from "./inventory.js?v=2";
import { paintVines } from "./vine-art.js?v=1";

// Grow this page's vines before anything below tries to animate them —
// paintVines() fills the empty <svg class="nature-branch">/<svg class="intro-vine-corner">
// containers from index.html with a fresh procedural vine (see js/vine-art.js).
paintVines();

const phaseRoot = document.getElementById("phase-root");
const heroEl = document.getElementById("hero");
const bouquetEl = document.getElementById("bouquet");
const finaleEl = document.getElementById("finale");
const introEl = document.getElementById("intro");
const appEl = document.getElementById("app");
const natureLayer = document.getElementById("nature-layer");
const introStartBtn = document.getElementById("intro-start-btn");

const phaseCompletePopup = document.getElementById("phase-complete-popup");
const phaseCompleteTitle = document.getElementById("phase-complete-title");
const phaseCompleteMedia = document.getElementById("phase-complete-media");
const phaseCompleteMeaning = document.getElementById("phase-complete-meaning");
const phaseCompleteMessage = document.getElementById("phase-complete-message");
const phaseCompleteNext = document.getElementById("phase-complete-next");

let progress = loadProgress();

function animateNatureLayer() {
  const ntl = gsap.timeline({
    onComplete: () => natureLayer.classList.add("in-bloom"),
  });

  // Procedural vines mean a lot more small elements than the old hand-placed
  // set (~2 stems x 6 branches, a handful of leaves each) — staggers are
  // tuned down accordingly so the whole scene still finishes growing quickly.
  ntl.to('.n-vine', {
    strokeDashoffset: 0,
    duration: 2.6,
    ease: "power2.inOut",
    stagger: 0.09
  }, 0);

  ntl.fromTo('.n-leaf', {
    opacity: 0,
    scale: 0,
    rotation: -45,
    transformOrigin: "0px 0px"
  }, {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.9,
    ease: "elastic.out(1, 0.6)",
    stagger: { each: 0.02, from: "random" }
  }, 0.9);

  ntl.fromTo('.n-flower', {
    opacity: 0,
    scale: 0,
    rotation: -90
  }, {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 1.1,
    ease: "back.out(1.6)",
    stagger: 0.09
  }, 1.6);
}

function initIntro() {
  // Mostra a intro apenas se estiver no começo do jogo (fase 0 e nenhuma flor)
  if (progress.currentPhase === 0 && progress.collectedFlowerIds.length === 0) {
    introEl.hidden = false;
    appEl.hidden = true;
    
    // Preparar o título para animação letra por letra, sem quebrar palavras
    const titleEl = document.getElementById("intro-title");
    const titleParts = titleEl.textContent.split(/(\s+)/);
    let titleHtml = "";
    titleParts.forEach(part => {
      if (!part.trim()) {
        titleHtml += part;
      } else {
        const letters = part.split('').map(c => `<span class="letter">${c}</span>`).join('');
        titleHtml += `<span style="display: inline-block; white-space: nowrap;">${letters}</span>`;
      }
    });
    titleEl.innerHTML = titleHtml;

    // Preparar os textos dos parágrafos para animação (cada letra isolada, mas agrupada por palavra para não quebrar a linha)
    const pEls = document.querySelectorAll(".intro__card p");
    pEls.forEach(p => {
      let newHtml = "";
      p.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Divide preservando os espaços em branco
          const parts = node.textContent.split(/(\s+)/);
          parts.forEach(part => {
            if (!part.trim()) {
              newHtml += part;
            } else {
              const letters = part.split('').map(c => `<span class="text-letter">${c}</span>`).join('');
              newHtml += `<span style="display: inline-block; white-space: nowrap;">${letters}</span>`;
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          newHtml += node.outerHTML;
        }
      });
      p.innerHTML = newHtml;
    });

    // Animar as imagens laterais, o título, o texto e os SVGs simultaneamente com GSAP
    const tl = gsap.timeline();

    // 1. Imagens laterais (Somente Girassois, espelhando o da direita)
    tl.to('.intro-lateral', {
      opacity: 0.7,
      x: 0,
      scaleY: 1,
      scaleX: (i, el) => el.classList.contains('intro-lateral--right') ? -1 : 1,
      duration: 3,
      ease: "power3.out",
      startAt: { 
        x: (i, el) => el.classList.contains('intro-lateral--left') ? -30 : 30,
        scaleY: 1.05,
        scaleX: (i, el) => el.classList.contains('intro-lateral--right') ? -1.05 : 1.05
      }
    }, 0);

    // 2. Crescimento das vinhas (SVG)
    tl.to('.vine-branch', {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power1.inOut"
    }, 1);

    // 3. Animação do título
    tl.fromTo('.intro__title .letter', {
      opacity: 0,
      y: '1.2em',
      rotationZ: -10,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      rotationZ: 0,
      scale: 1,
      duration: 2,
      ease: "elastic.out(1, 0.6)",
      stagger: 0.08
    }, 1.5);

    // 4. Folhas do SVG
    tl.fromTo('.vine-leaf', {
      opacity: 0,
      scale: 0,
      rotation: -30,
      transformOrigin: "0px 0px"
    }, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.6)",
      stagger: 0.04
    }, 2);

    // 5. Frutos e Flores do SVG
    tl.fromTo('.vine-berry', {
      opacity: 0,
      scale: 0
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.05
    }, 2.5);

    // 6. Texto dos parágrafos
    tl.fromTo('.intro__card p .text-letter', {
      opacity: 0,
      y: 8
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "sine.out",
      stagger: 0.025
    }, 2.5);
    
    introStartBtn.addEventListener("click", () => {
      gsap.to('.intro', {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          introEl.hidden = true;
          appEl.hidden = false;
          if(natureLayer) natureLayer.hidden = false;
          // Anima o app principal surgindo
          gsap.fromTo('.app', {
            opacity: 0,
            y: 20
          }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          });
          animateNatureLayer();
        }
      });
    });
  } else {
    introEl.hidden = true;
    appEl.hidden = false;
    if(natureLayer) natureLayer.hidden = false;
    animateNatureLayer();
  }
}

function goToPhaseWithoutReset(phaseId) {
  progress.currentPhase = phaseId;
  saveProgress(progress);
  renderCurrentState();
}

function mediaHTML(media) {
  if (!media || !media.type || !media.src) return "";
  switch (media.type) {
    case "image":
      return `<img src="${media.src}" alt="">`;
    case "audio":
      return `<audio controls src="${media.src}"></audio>`;
    case "video":
      return `<video controls src="${media.src}"></video>`;
    default:
      return "";
  }
}

/** Renders the standard phase template for a given phase config. */
function renderPhase(phase) {
  phaseRoot.innerHTML = `
    <div class="phase-card">
      <p class="phase-card__eyebrow">Fase ${phase.id} de ${PHASES.length - 1}</p>
      <h2 class="phase-card__title">${phase.title}</h2>
      <div class="phase-card__enigma">${phase.enigmaHTML}</div>
      <div class="phase-card__media">${mediaHTML(phase.media)}</div>
      <form class="phase-form" id="phase-form" autocomplete="off">
        <input
          class="phase-form__input"
          id="phase-answer"
          type="text"
          placeholder="Sua resposta..."
          aria-label="Sua resposta"
          required
        />
        <button class="phase-form__submit" type="submit">Desvendar</button>
      </form>
      <p class="phase-feedback" id="phase-feedback" role="status"></p>
    </div>
  `;

  const form = document.getElementById("phase-form");
  const input = document.getElementById("phase-answer");
  const feedback = document.getElementById("phase-feedback");
  const submitBtn = form.querySelector(".phase-form__submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const value = input.value;
    if (!value.trim()) return;

    submitBtn.disabled = true;
    feedback.textContent = "";
    feedback.removeAttribute("data-state");

    const correct = await checkAnswer(phase, value);

    submitBtn.disabled = false;

    if (correct) {
      feedback.dataset.state = "success";
      feedback.textContent = "Correto... a flor se abre.";
      onPhaseSolved(phase);
    } else {
      feedback.dataset.state = "error";
      feedback.textContent = "Resposta incorreta, tente olhar mais de perto...";
    }
  });

  // Inicializa Draggable para as fotos da fase 3, caso existam
  if (typeof Draggable !== "undefined" && document.querySelector(".draggable-polaroid")) {
    Draggable.create(".draggable-polaroid", {
      type: "x,y",
      bounds: "body",
      edgeResistance: 0.65
    });
  }

  // Inicializa o Carrossel da fase 5
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const carouselImages = document.querySelectorAll('.carousel-img');
  
  if (nextBtn && prevBtn && carouselImages.length > 0) {
    let currentIndex = 0;
    
    // Assegura que todas comecem invisíveis, exceto a primeira
    gsap.set(carouselImages, { opacity: 0 });
    gsap.set(carouselImages[0], { opacity: 1 });

    const rotateCarousel = (dir) => {
      const currentImg = carouselImages[currentIndex];
      currentIndex = (currentIndex + dir + carouselImages.length) % carouselImages.length;
      const nextImg = carouselImages[currentIndex];
      
      gsap.to(currentImg, { opacity: 0, duration: 0.4 });
      gsap.to(nextImg, { opacity: 1, duration: 0.4 });
    };
    
    nextBtn.addEventListener('click', () => rotateCarousel(1));
    prevBtn.addEventListener('click', () => rotateCarousel(-1));
  }

  // Lógica da Fase 7: Flores Draggable soltas com Encaixe (hitTest)
  const p7DraggablesElements = document.querySelectorAll('.p7-draggable');
  if (p7DraggablesElements.length > 0) {
    const slots = document.querySelectorAll('.p7-slot');
    
    const p7Draggables = Draggable.create(".p7-draggable", {
      type: "x,y",
      onPress: function() {
        gsap.set(this.target, { zIndex: 100 });
        
        // Limpa o slot se a flor estava nele
        slots.forEach(slot => {
          if (slot.dataset.filledBy === this.target.dataset.flower) {
            slot.dataset.filledBy = "";
          }
        });
      },
      onRelease: function() {
        gsap.set(this.target, { zIndex: 10 });
        let snapped = false;

        for (let i = 0; i < slots.length; i++) {
          const slot = slots[i];
          if (this.hitTest(slot, "50%")) {
            // Se o slot estiver vazio, encaixa!
            if (!slot.dataset.filledBy) {
              const targetRect = this.target.getBoundingClientRect();
              const slotRect = slot.getBoundingClientRect();
              
              const dx = slotRect.left - targetRect.left;
              const dy = slotRect.top - targetRect.top;
              
              gsap.to(this.target, {
                x: "+=" + dx,
                y: "+=" + dy,
                rotation: 0,
                duration: 0.2
              });
              
              slot.dataset.filledBy = this.target.dataset.flower;
              snapped = true;
              break;
            }
          }
        }
        
        checkPhase7Win();
      }
    });
    
    function checkPhase7Win() {
      const correctOrder = [
        "amor-perfeito",
        "camomila",
        "clematite",
        "dalia",
        "flor-de-laranjeira",
        "lilas",
        "lirio-do-vale"
      ];
      
      let allCorrect = true;
      for (let i = 0; i < slots.length; i++) {
        if (slots[i].dataset.filledBy !== correctOrder[i]) {
          allCorrect = false;
          break;
        }
      }
      
      if (allCorrect) {
        const successDiv = document.getElementById('phase7-success');
        successDiv.classList.remove('hidden');
        
        // Animação GSAP da revelação da Zínia
        gsap.fromTo(successDiv,
          { opacity: 0, scale: 0.5, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.2 }
        );
        
        p7Draggables.forEach(d => d.disable());
      }
    }
  }
}

function onPhaseSolved(phase) {
  if (!progress.collectedFlowerIds.includes(phase.id)) {
    progress.collectedFlowerIds.push(phase.id);
  }
  progress.currentPhase = phase.id + 1;
  saveProgress(progress);

  renderBouquet(progress.collectedFlowerIds, { justCollectedId: phase.id });

  setTimeout(() => {
    showPhaseComplete(phase);
  }, 1200);
}

function showPhaseComplete(phase) {
  phaseCompleteTitle.textContent = phase.flower.name || "Flor Encontrada!";
  phaseCompleteMeaning.textContent = phase.flower.meaning;
  phaseCompleteMessage.textContent = phase.flower.completionMessage || "";
  phaseCompletePopup.style.setProperty("--flower-accent", phase.flower.color || "var(--color-primary)");

  if (phase.flower.image) {
    phaseCompleteMedia.innerHTML = `<img src="${phase.flower.image}" alt="${phase.flower.name}">`;
  } else {
    phaseCompleteMedia.innerHTML = "";
  }

  phaseCompletePopup.hidden = false;

  phaseCompleteNext.onclick = () => {
    phaseCompletePopup.hidden = true;
    renderCurrentState();
  };
}

function renderFinale() {
  phaseRoot.innerHTML = "";
  heroEl.hidden = true;
  bouquetEl.querySelector(".bouquet__label").textContent = "buquê completo";
  finaleEl.hidden = false;
  document.getElementById("finale-text").innerHTML = FINALE_MESSAGE;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.reveal-item').forEach((item) => {
      gsap.fromTo(item, 
        { opacity: 0, y: 50 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }
}

function renderCurrentState() {
  const phase = PHASES.find((p) => p.id === progress.currentPhase);
  if (!phase) {
    renderFinale();
    return;
  }
  finaleEl.hidden = true;
  heroEl.hidden = false;
  renderPhase(phase);
}

// --- dev helpers (not part of the game UI, for your own testing while building) ---
// Open the browser console and call e.g. ARG_DEV.reset() or ARG_DEV.goTo(3).
window.ARG_DEV = {
  reset() {
    resetProgress();
    location.reload();
  },
  goTo(phaseId) {
    progress = { currentPhase: phaseId, collectedFlowerIds: PHASES.filter((p) => p.id < phaseId).map((p) => p.id) };
    saveProgress(progress);
    location.reload();
  },
  unlockAll() {
    progress = { currentPhase: PHASES.length, collectedFlowerIds: PHASES.map((p) => p.id) };
    saveProgress(progress);
    location.reload();
  },
};

// --- boot ---
initFlowerPopup(goToPhaseWithoutReset);
renderBouquet(progress.collectedFlowerIds);
renderCurrentState();
initIntro();
