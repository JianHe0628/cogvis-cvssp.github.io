/* CogVis — main.js */
(function () {
  'use strict';

  /* ---- Nav scroll behaviour ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      })
    );
  }

  /* ---- Active nav link ---- */
  const currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '');
    if (href && currentPath.endsWith(href)) a.classList.add('active');
    if ((href === '' || href === 'index.html') && (currentPath === '' || currentPath.endsWith('/'))) {
      a.classList.add('active');
    }
  });

  /* ---- BibTeX copy button ---- */
  const copyBtn = document.querySelector('.copy-btn');
  const bibtex  = document.querySelector('.bibtex-block');
  if (copyBtn && bibtex) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(bibtex.innerText).then(() => {
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyBtn.innerHTML = '&#x2398; Copy BibTeX'; }, 2000);
      }).catch(() => {
        const range = document.createRange();
        range.selectNodeContents(bibtex);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      });
    });
  }

  /* ---- Scroll-reveal (lightweight) ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }
})();
