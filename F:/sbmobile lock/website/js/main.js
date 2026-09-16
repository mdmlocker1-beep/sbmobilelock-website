/* ===========================================
   SB MOBILE LOCK — MAIN JAVASCRIPT
   =========================================== */

// ── PRELOADER ──────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 600);
    }
  }, 1800);
});

// ── NAVBAR SCROLL ──────────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Scrolled state
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top
  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link highlight
  highlightActiveNav();
});

function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ── HAMBURGER MENU ─────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── REVEAL ON SCROLL ───────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── HERO PARTICLES ─────────────────────────
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const colors = ['rgba(0,194,255,0.4)', 'rgba(10,110,189,0.3)', 'rgba(255,255,255,0.5)'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 3;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 10;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;

    container.appendChild(particle);
  }
}

createParticles();

// ── HERO SCREEN CAROUSEL ───────────────────
const heroScreens = [
  '../app screen/login page.jpg',
  '../app screen/Screenshot_20260916_135655_SB Lock Retailer.jpg',
  '../app screen/Screenshot_20260916_135721_SB Lock Retailer.jpg',
  '../app screen/Screenshot_20260916_135729_SB Lock Retailer.jpg',
];

let heroScreenIndex = 0;
const heroScreenImg = document.getElementById('hero-screen-img');

if (heroScreenImg) {
  setInterval(() => {
    heroScreenIndex = (heroScreenIndex + 1) % heroScreens.length;
    heroScreenImg.style.opacity = '0';
    heroScreenImg.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      heroScreenImg.src = heroScreens[heroScreenIndex];
      heroScreenImg.style.opacity = '1';
    }, 400);
  }, 3000);
}

// ── SCREENSHOT LIGHTBOX ────────────────────
const screenshots = [
  { src: '../app screen/login page.jpg', label: 'Login Page' },
  { src: '../app screen/Screenshot_20260916_135655_SB Lock Retailer.jpg', label: 'Dashboard' },
  { src: '../app screen/Screenshot_20260916_135721_SB Lock Retailer.jpg', label: 'Device Management' },
  { src: '../app screen/Screenshot_20260916_135729_SB Lock Retailer.jpg', label: 'EMI Tracking' },
  { src: '../app screen/Screenshot_20260916_135739_SB Lock Retailer.jpg', label: 'Remote Control' },
  { src: '../app screen/Screenshot_20260916_135745_SB Lock Retailer.jpg', label: 'Alerts Panel' },
  { src: '../app screen/Screenshot_20260916_135806_SB Lock Retailer.jpg', label: 'Device Details' },
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = screenshots[index].src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function changeLightbox(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + screenshots.length) % screenshots.length;
  const img = document.getElementById('lightbox-img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = screenshots[currentLightboxIndex].src;
    img.style.opacity = '1';
    img.style.transition = 'opacity 0.3s ease';
  }, 200);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') changeLightbox(1);
  if (e.key === 'ArrowLeft') changeLightbox(-1);
});

// ── FAQ ACCORDION ──────────────────────────
function toggleFaq(id) {
  const item = document.getElementById(id);
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('open');
  }
}

// ── CONTACT FORM (Web3Forms) ───────────────
async function handleFormSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  const form = document.getElementById('contact-form');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    });

    const result = await response.json();

    if (result.success) {
      btn.textContent = '✓ Message Sent Successfully!';
      btn.style.background = '#25D366';
      btn.style.borderColor = '#25D366';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 5000);
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (error) {
    console.error('Form error:', error);
    btn.textContent = '✗ Failed — Try WhatsApp Instead';
    btn.style.background = '#EF4444';
    btn.style.borderColor = '#EF4444';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      // Fallback: open WhatsApp
      const name = document.getElementById('form-name').value;
      const phone = document.getElementById('form-phone').value;
      const message = document.getElementById('form-message').value;
      const waText = encodeURIComponent(`Hello SB Mobile Lock,\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`);
      window.open(`https://wa.me/918513872639?text=${waText}`, '_blank');
    }, 3000);
  }
}

// ── FEATURE CARD STAGGER ───────────────────
document.querySelectorAll('.feature-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

// ── SMOOTH HOVER NUMBER COUNTER ────────────
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  const startVal = 0;

  function step(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Trigger counters when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const statNums = entry.target.querySelectorAll('.stat-num');
      const targets = [500, 10000, 99.9];
      const suffixes = ['+', '+', '%'];

      statNums.forEach((el, i) => {
        if (i === 2) {
          // For 99.9%
          setTimeout(() => {
            let count = 0;
            const interval = setInterval(() => {
              count += 1;
              el.textContent = (count / 10).toFixed(1) + '%';
              if (count >= 999) clearInterval(interval);
            }, 2);
          }, i * 200);
        } else {
          setTimeout(() => animateCounter(el, targets[i], suffixes[i]), i * 200);
        }
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── GLOBAL EXPOSE ──────────────────────────
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeLightbox = changeLightbox;
window.toggleFaq = toggleFaq;
window.handleFormSubmit = handleFormSubmit;

console.log('%cSB Mobile Lock Website Loaded ✓', 'color: #0A6EBD; font-weight: bold; font-size: 14px;');
