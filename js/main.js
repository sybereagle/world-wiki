// js/main.js
import { loadPlaceholders } from './api/dataLoader.js';
import { initRouter } from './router.js';
import { renderSidebar } from './render/renderSidebar.js';
import { renderSearch } from './render/renderSearch.js';

// ---------------------------------------------------------
// 🧭 Debug Mode Setup
// ---------------------------------------------------------
let DEBUG = false;

// Enable debug if local or file://
if (window.location.hostname === 'localhost' || window.location.protocol === 'file:') {
  DEBUG = true;
}

// Enable debug if URL param is set (?debug=true)
const params = new URLSearchParams(window.location.search);
if (params.get('debug') === 'true') {
  DEBUG = true;
}

// ---------------------------------------------------------
// 🧱 App Initialization
// ---------------------------------------------------------
window.addEventListener('DOMContentLoaded', async () => {
  const mainContainer = document.getElementById('content');
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const searchInput = document.getElementById('searchBar');
  const overlay = document.getElementById('overlay');

  if (!mainContainer) {
    console.error('No <main id="content"> found in DOM');
    return;
  }
  
  // 1. Load Data
  const pages = await loadPlaceholders();

  // Debug mode for console
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('debug') === 'true') {
    window.pages = pages;
    console.log('Debug mode: window.pages is available', pages);
  }

  // 2. Render sidebar & SPA
  renderSidebar(pages, sidebar);
  initRouter(pages, mainContainer);
  
  // 3. Sidebar toggle for mobile
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('visible');
      overlay.classList.toggle('active');
    });
  }
  
  // close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (
      sidebar.classList.contains('visible') &&
      !sidebar.contains(e.target) &&
      e.target !== toggle
    ) {
      sidebar.classList.remove('visible');
      overlay.classList.remove('active');
    }
  });
  
  // Search bar logic
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query === '') {
      window.location.hash = '';
    } else {
      renderSearch(pages, query, mainContainer);
    }
  });
  
  // Sidebar tag filtering
  sidebar.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI' && e.target.dataset.tags) {
      const tags = e.target.dataset.tags.split(',');
      const filtered = pages.filter(p => p.tags.some(t => tags.includes(t)));
      import('./render/renderCards.js').then(module =>
        module.renderCards(filtered, mainContainer)
      );
    }
  });
});
