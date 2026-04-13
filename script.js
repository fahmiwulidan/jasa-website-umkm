// Scroll Animation 
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // If a mobile menu is open, close it after navigation
    const mobileMenu = document.getElementById('mobile-menu');
    const navToggle = document.querySelector('.nav-toggle');
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      if (typeof closeMenu === 'function') closeMenu();
    }
  });
});

// Mobile menu toggle logic (modern)
(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.querySelector('.mobile-backdrop');

  if (!navToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.removeAttribute('hidden');
    // small delay to allow CSS transition
    requestAnimationFrame(() => mobileMenu.classList.add('open'));
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const firstLink = mobileMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  window.closeMenu = function closeMenu() {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // After transition, hide for accessibility
    const handler = () => {
      mobileMenu.setAttribute('hidden', '');
      mobileMenu.removeEventListener('transitionend', handler);
    };
    mobileMenu.addEventListener('transitionend', handler);
    navToggle.focus();
  };

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu(); else openMenu();
  });

  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileMenu.classList.contains('open')) closeMenu();
    }
  });

  // Ensure menu closed when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
})();
