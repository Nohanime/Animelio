const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next-arrow");
const backBtn = document.querySelector(".back-arrow");
const root = document.querySelector(":root");

let currentSlide = 1;
const switchSlideDuration = 1000;
const autoRotationDelay = 6000; // Délai entre chaque rotation automatique
let autoRotationTimer; // Timer pour la rotation automatique
root.style.setProperty("--duration", `${switchSlideDuration}ms`);

const handleBack = () => {
  makeSlideChanges((currentSlide - 1 + slides.length) % slides.length);
  resetAutoRotation(); // Réinitialise le timer après un clic manuel
};

const handleNext = () => {
  makeSlideChanges((currentSlide + 1) % slides.length);
  resetAutoRotation(); // Réinitialise le timer après un clic manuel
};

const makeSlideChanges = (newSlide) => {
  slides[currentSlide].classList.replace("showcase", "right");
  slides[newSlide].classList.replace("left", "showcase");

  backBtn.removeEventListener("click", handleBack);
  nextBtn.removeEventListener("click", handleNext);

  setTimeout(
    (slide, backBtn, nextBtn) => {
      slide.classList.replace("right", "left");

      backBtn.addEventListener("click", handleBack);
      nextBtn.addEventListener("click", handleNext);
    },
    switchSlideDuration,
    slides[currentSlide],
    backBtn,
    nextBtn
  );

  currentSlide = newSlide;

  console.log(`${currentSlide + 1} / ${slides.length}`);
};

// Fonction pour démarrer la rotation automatique
const startAutoRotation = () => {
  autoRotationTimer = setInterval(() => {
    handleNext();
  }, autoRotationDelay);
};

// Fonction pour réinitialiser la rotation automatique
const resetAutoRotation = () => {
  clearInterval(autoRotationTimer);
  startAutoRotation();
};

// Ajout des écouteurs d'événements
backBtn.addEventListener("click", handleBack);
nextBtn.addEventListener("click", handleNext);

// Démarrage de la rotation automatique
startAutoRotation();
