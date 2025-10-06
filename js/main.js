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
  const sidebar = document.getElementById('sidebar');
  const searchInput = document.getElementById('searchBar');

  if (!mainContainer) {
    console.error('No <main id="content"> found in DOM');
    return;
  }

  // ✅ 1. Load Data
  const pages = await loadPlaceholders();

  // ✅ 2. Debug mode exposure
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('debug') === 'true') {
    window.pages = pages;
    console.log('Debug mode: window.pages is available', pages);
  }

  // ✅ 3. Render Sidebar
  renderSidebar(pages, sidebar);

  // ✅ 4. Initialize Router
  initRouter(pages, mainContainer);
  
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
