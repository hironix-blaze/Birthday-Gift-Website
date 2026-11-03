"use strict";

// =====================================
// PAGE 1: INTRODUCTION
// =====================================

const nextButton = document.getElementById("nextButton");

if (nextButton) {
    nextButton.addEventListener("click", () => {
        window.location.href = "next.html";
    });
}

// =====================================
// PAGE 2: SURPRISE QUESTION
// =====================================

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

if (yesButton) {
    yesButton.addEventListener("click", () => {
        window.location.href = "surprise.html";
    });
}

if (noButton) {
    noButton.addEventListener("click", () => {
        alert("you cannot refuse >:[");
    });
}

// =====================================
// PAGE 3: OPEN THE SLIDESHOW
// =====================================

const startSlideshow = document.getElementById("startSlideshow");
const surpriseIntro = document.getElementById("surpriseIntro");
const slideshow = document.getElementById("slideshow");

if (startSlideshow && surpriseIntro && slideshow) {
    startSlideshow.addEventListener("click", () => {
        surpriseIntro.hidden = true;
        slideshow.hidden = false;

        updateSlide();

        slideshow.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    });
}

// =====================================
// PAGE 3: SLIDESHOW ELEMENTS
// =====================================

const slides = document.querySelectorAll(".photo-slide");
const slideDots = document.querySelectorAll(".slide-dot");

const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

const slideCount = document.getElementById("slideCount");
const messageButton = document.getElementById("messageButton");

let currentSlide = 0;

// =====================================
// UPDATE SLIDESHOW
// =====================================

function updateSlide() {
    if (slides.length === 0) {
        return;
    }

    currentSlide = Math.max(0, Math.min(currentSlide, slides.length - 1));

    slides.forEach((slide, index) => {
        const isActive = index === currentSlide;

        slide.classList.toggle("active", isActive);

        slide.setAttribute("aria-hidden", String(!isActive));
    });

    slideDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });

    if (slideCount) {
        slideCount.textContent = `${currentSlide + 1} / ${slides.length}`;
    }

    if (prevSlide) {
        prevSlide.disabled = currentSlide === 0;
    }

    if (nextSlide) {
        nextSlide.hidden = currentSlide === slides.length - 1;
    }

    if (messageButton) {
        messageButton.hidden = currentSlide !== slides.length - 1;
    }
}

// =====================================
// PREVIOUS SLIDE
// =====================================

if (prevSlide) {
    prevSlide.addEventListener("click", () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    });
}

// =====================================
// NEXT SLIDE
// =====================================

if (nextSlide) {
    nextSlide.addEventListener("click", () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlide();
        }
    });
}

// =====================================
// PAGE 3: GO TO MESSAGE PAGE
// =====================================

if (messageButton) {
    messageButton.addEventListener("click", () => {
        window.location.href = "message.html";
    });
}

// =====================================
// PAGE 4: OPEN THE BIRTHDAY LETTER
// =====================================

const openLetterButton = document.getElementById("openLetterButton");

const letterIntro = document.getElementById("letterIntro");

const letterContent = document.getElementById("letterContent");

const letterAudio = document.getElementById("letterAudio");

if (openLetterButton && letterIntro && letterContent) {
    openLetterButton.addEventListener("click", () => {
        // Hide introduction
        letterIntro.hidden = true;

        // Reveal the letter
        letterContent.hidden = false;

        // Start the background music
        if (letterAudio) {
            letterAudio.play().catch((error) => {
                console.warn("Audio could not start automatically. Use the Play button.", error);
            });
        }

        // Scroll to the letter
        letterContent.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    });
}

// =====================================
// PAGE 4: RESTART WEBSITE
// =====================================

const restartButton = document.getElementById("restartButton");

if (restartButton) {
    restartButton.addEventListener("click", () => {
        // Stop the music before leaving
        if (letterAudio) {
            letterAudio.pause();
            letterAudio.currentTime = 0;
        }

        window.location.href = "index.html";
    });
}

// =====================================
// INITIALIZE SLIDESHOW
// =====================================

updateSlide();
