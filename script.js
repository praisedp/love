// ===== script.js =====

document.addEventListener('DOMContentLoaded', () => {
    // Create floating hearts
    createFloatingHearts();
    
    // Music player functionality
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicToggle.classList.remove('playing');
        } else {
            music.play();
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
        celebrate(musicToggle);
    });

    // Typing effect for the subtitle
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    setTimeout(typeWriter, 1500);

    // Surprise overlay logic
    const overlay  = document.getElementById('surprise-overlay');
    const openBtn  = document.getElementById('open-surprise');
    const message  = document.getElementById('surprise-message');
    
    if (overlay && openBtn && message) {
        openBtn.addEventListener('click', () => {
            celebrate(openBtn);

            // Start playing music when surprise is opened
            music.play();
            musicToggle.classList.add('playing');
            isPlaying = true;
            
            setTimeout(() => {
                openBtn.style.display = 'none';
                message.classList.add('show');
                createCelebrationParticles();

                // Start typing animation for surprise text
                startSurpriseTyping();
            }, 500);
        });

        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                celebrate(continueBtn);
                setTimeout(() => {
                    overlay.classList.add('hide');
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        window.scrollTo({
                            top: document.querySelector('.container').offsetTop,
                            behavior: 'smooth'
                        });
                    }, 700);
                }, 300);
            });
        }
    }

    // Add sparkles to timeline items periodically
    setInterval(addSparkles, 2000);
});

// Typing animation for surprise message
function startSurpriseTyping() {
    const surpriseTextElement = document.querySelector('.main-surprise-text');
    const fullText = "I can't believe its been 6 months together.\nYou have no idea how grateful I am to have you.\nI thank God everyday for giving you to me and for all the little moments we spent together.";
    
    // Clear the text initially
    surpriseTextElement.innerHTML = '';
    
    let i = 0;
    function typeChar() {
        if (i < fullText.length) {
            if (fullText.charAt(i) === '\n') {
                surpriseTextElement.innerHTML += '<br>';
            } else {
                surpriseTextElement.innerHTML += fullText.charAt(i);
            }
            i++;
            setTimeout(typeChar, 50); // Adjust speed here (50ms per character)
        } else {
            // Show continue button after typing is complete
            setTimeout(() => {
                const continueBtn = document.getElementById('continue-btn');
                if (continueBtn) {
                    continueBtn.style.display = 'inline-block';
                    continueBtn.style.animation = 'popIn 0.5s ease-out forwards';
                }
            }, 500);
        }
    }
    
    // Start typing after a small delay
    setTimeout(typeChar, 800);
}

// Celebration helper
function celebrate(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;
    
    createCelebrationParticles(centerX, centerY);
    element.classList.add('celebrating');
    setTimeout(() => element.classList.remove('celebrating'), 1000);
}

// Create celebration particles
function createCelebrationParticles(x = window.innerWidth / 2, y = window.innerHeight / 2) {
    const container = document.getElementById('celebration-particles');
    container.classList.add('active');
    createParticleExplosion(x, y);
    setTimeout(() => container.classList.remove('active'), 1500);
}

// Floating hearts generator
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }, 1000);
}

// Periodic sparkles
function addSparkles() {
    const items = document.querySelectorAll('.timeline-content');
    if (!items.length) return;
    const randomItem = items[Math.floor(Math.random() * items.length)];
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className  = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top  = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 1 + 's';
        randomItem.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }
}

// Particle explosion physics
function createParticleExplosion(x, y) {
    const container = document.getElementById('celebration-particles');
    const colors = ['#ff69b4', '#4da6ff', '#ffd700', '#9370db', '#ff6b6b', '#4ecdc4'];
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top  = y + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const angle = (2 * Math.PI * i) / 25;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        particle.style.animation = 'particleExplode 1.5s ease-out forwards';
        particle.style.setProperty('--tx', vx + 'px');
        particle.style.setProperty('--ty', vy + 'px');
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
    }
}

// Lightbox functionality
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.timeline-image').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxOverlay.classList.add('show');
    });
});

lightboxClose.addEventListener('click', () => {
    lightboxOverlay.classList.remove('show');
});

lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
        lightboxOverlay.classList.remove('show');
    }
});

// Inject animation CSS
const style = document.createElement('style');
style.textContent = `
@keyframes particleExplode {
    0%   { transform: scale(0) rotate(0deg)   translate(0, 0); opacity: 1; }
    100% { transform: scale(1) rotate(720deg) translate(var(--tx), var(--ty)); opacity: 0; }
}
.celebrating { animation: celebrate 0.6s ease-in-out !important; }
@keyframes celebrate {
    0%,100% { transform: scale(1) rotate(0deg); }
    25%     { transform: scale(1.1) rotate(-5deg); }
    50%     { transform: scale(1.05) rotate(0deg); }
    75%     { transform: scale(1.1) rotate(5deg); }
}`;
document.head.appendChild(style);