/* ==========================================================================
   ESCAPE CLOTHING 👣 - THEME JS
   Global interactions, reveals, scroll parallax, transitions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initParallax();
  initPageTransitions();
});

/**
 * Initialize Intersection Observer for Scroll Reveals
 */
function initScrollReveals() {
  if (!window.themeSettings.enableAnimations) return;

  // Single elements reveal
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Stagger group reveals
  const staggerElements = document.querySelectorAll('.reveal-stagger');
  const staggerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Add delays to children
        const children = entry.target.children;
        Array.from(children).forEach((child, index) => {
          child.style.transitionDelay = `${index * 80}ms`;
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  staggerElements.forEach(el => staggerObserver.observe(el));
}

/**
 * Initialize Parallax Scroll variable for CSS Parallax updates
 */
function initParallax() {
  let scrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll', scrollY);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Initialize smooth page transition overlays on link click
 */
function initPageTransitions() {
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  // Intercept local link clicks
  document.querySelectorAll('a').forEach(link => {
    // Skip if external, hash links, target="_blank", or download links
    const href = link.getAttribute('href');
    if (!href || 
        href.startsWith('#') || 
        href.startsWith('javascript:') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') || 
        link.getAttribute('target') === '_blank' ||
        link.hasAttribute('download') ||
        !href.startsWith('/') && !href.includes(window.location.hostname)) {
      return;
    }

    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 300); // matches CSS transition time
    });
  });

  // Fade out on page load
  window.addEventListener('pageshow', (event) => {
    // pageshow fires on back/forward cache restore as well
    overlay.classList.remove('active');
  });
}
