/* =========================================================
   2secondhook.com — JavaScript
   ========================================================= */

(function () {
  'use strict';

  /* ---- Sticky Nav ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile Nav Toggle ---- */
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Scroll-reveal (lightweight) ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(el => io.observe(el));
  }

  /* ---- Contact Form (Formspree) ---- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  if (form) {
    // Warn developer if Formspree ID has not been configured
    if (form.action && form.action.includes('YOUR_FORM_ID')) {
      console.warn(
        '2SecondHook: Contact form is not yet configured.\n' +
        'Replace YOUR_FORM_ID in pricing.html with your Formspree form ID.\n' +
        'See https://formspree.io to create a free account.'
      );
    }
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          form.style.display = 'none';
          if (successMsg) successMsg.style.display = 'block';
        } else {
          const json = await res.json();
          const msg = (json && json.errors)
            ? json.errors.map(err => err.message).join(', ')
            : 'Something went wrong. Please try again.';
          alert(msg);
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      } catch {
        alert('Network error. Please check your connection and try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  /* ---- Pricing CTA smooth scroll to form ---- */
  document.querySelectorAll('a[href="#contact"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.getElementById('contact');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
