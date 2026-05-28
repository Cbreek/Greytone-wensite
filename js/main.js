/* GREYTONE STUDIO — Main JS */

const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

(function markActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .stagger-children')
  .forEach(el => animObserver.observe(el));

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling && b.nextElementSibling.classList.remove('open');
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      answer && answer.classList.add('open');
    }
  });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    galleryItems.forEach(item => {
      const match = cat === 'all' || item.dataset.category === cat;
      item.style.opacity = '0';
      item.style.transform = 'scale(0.97)';
      setTimeout(() => {
        item.style.display = match ? '' : 'none';
        if (match) requestAnimationFrame(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; });
      }, 180);
    });
  });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm));
    const subject = encodeURIComponent('Commission Inquiry — ' + (data.subject || 'New Request'));
    const body = encodeURIComponent(
      'Name: ' + (data.name || '') + '\n' +
      'Email: ' + (data.email || '') + '\n' +
      'Phone: ' + (data.phone || '') + '\n\n' +
      'Subject: ' + (data.subject || '') + '\n' +
      'Size: ' + (data.size || '') + '\n' +
      'Timeline: ' + (data.timeline || '') + '\n' +
      'Budget: ' + (data.budget || '') + '\n\n' +
      'Message:\n' + (data.message || '')
    );
    window.location.href = 'mailto:hello@greytonestudio.com?subject=' + subject + '&body=' + body;
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
