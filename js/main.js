// main.js — handles rendering publications and speeches + PWA install flow

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  } catch (err) {
    console.warn('Failed to load', path, err);
    return [];
  }
}

function renderPublications(list) {
  const el = document.getElementById('publications-list-inner') || document.getElementById('publications-list');
  if (!el) return;
  if (!list || list.length === 0) {
    el.innerHTML = '<p>No publications available.</p>';
    return;
  }
  el.innerHTML = '';
  list.forEach(pub => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<div class="d-flex w-100 justify-content-between"><h5 class="mb-1">${pub.title}</h5><small class="text-muted">${pub.year}</small></div><p class="mb-1">${pub.description || ''}</p><small class="text-muted">${pub.venue}</small>`;
    el.appendChild(li);
  });
}

function renderSpeeches(list) {
  const el = document.getElementById('speeches-list');
  if (!el) return;
  if (!list || list.length === 0) {
    el.innerHTML = '<p>No speeches available.</p>';
    return;
  }
  el.innerHTML = '';
  list.forEach(s => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<h5 class="mb-1">${s.title}</h5><small class="text-muted">${s.event} — ${s.date}</small><p class="mb-1">${s.excerpt || ''}</p>`;
    el.appendChild(li);
  });
}

async function init() {
  const pubs = await loadJSON('data/publications.json');
  renderPublications(pubs);
  const speeches = await loadJSON('data/speeches.json');
  renderSpeeches(speeches);

  // Service worker registration
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('sw.js');
      console.log('Service worker registered');
    } catch (err) {
      console.warn('Service worker failed', err);
    }
  }

  // PWA install button handling
  let deferredPrompt;
  const installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.hidden = false;
  });
  if (installBtn) installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log('install choice', choice);
    deferredPrompt = null;
    installBtn.hidden = true;
  });

  // Photo modal handling (photos.html)
  try {
    const thumbs = document.querySelectorAll('.photo-thumb');
    if (thumbs && thumbs.length) {
      thumbs.forEach(t => {
        t.style.cursor = 'pointer';
        t.addEventListener('click', () => {
          const title = t.getAttribute('data-title') || '';
          const desc = t.getAttribute('data-desc') || '';
          const src = t.getAttribute('src');
          const modalTitle = document.getElementById('photoModalTitle');
          const modalImg = document.getElementById('photoModalImg');
          const modalDesc = document.getElementById('photoModalDesc');
          if (modalTitle) modalTitle.textContent = title;
          if (modalImg) { modalImg.src = src; modalImg.alt = title; }
          if (modalDesc) modalDesc.textContent = desc;
          const modalEl = document.getElementById('photoModal');
          if (modalEl) {
            // Use Bootstrap Modal when available
            if (window.bootstrap && bootstrap.Modal) {
              const modal = new bootstrap.Modal(modalEl);
              modal.show();
            } else {
              // Fallback: simple show/hide by toggling classes and backdrop
              showFallbackModal(modalEl);
            }
          }
        });
      });
    }
  } catch (err) {
    // ignore if modal not present
  }
}

// Fallback modal helpers (used if Bootstrap JS is not available)
function showFallbackModal(modalEl) {
  if (!modalEl) return;
  // prevent multiple backdrops
  if (!document.querySelector('.modal-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    document.body.appendChild(backdrop);
  }
  modalEl.classList.add('show');
  modalEl.style.display = 'block';
  modalEl.setAttribute('aria-modal', 'true');
  modalEl.removeAttribute('aria-hidden');

  // attach close handlers for fallback
  const closeBtns = modalEl.querySelectorAll('[data-bs-dismiss="modal"], .btn-close');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => hideFallbackModal(modalEl), { once: true });
  });
  // clicking backdrop closes
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) backdrop.addEventListener('click', () => hideFallbackModal(modalEl), { once: true });
}

function hideFallbackModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('show');
  modalEl.style.display = 'none';
  modalEl.setAttribute('aria-hidden', 'true');
  modalEl.removeAttribute('aria-modal');
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) backdrop.remove();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM already ready
  init();
}
