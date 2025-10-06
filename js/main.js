import { loadData } from './api/dataLoader.js';
import { renderSidebar } from './render/renderSidebar.js';
import { initRouter } from './router.js';
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
const mainContainer = document.getElementById('content');
const sidebarContainer = document.getElementById('sidebar');
const searchInput = document.getElementById('searchBar');

(async function init() {
  const pages = await loadData();

  // 👇 Ensure global access if debug is active
  if (DEBUG) {
    window.placeholders = pages;  // visible in console
    window.pages = pages;         // optional alias for convenience

    console.log(
      '%c[Wiki Debug Mode] Global variables "placeholders" and "pages" are available.',
      'color: limegreen; font-weight: bold;'
    );
  }

  renderSidebar(pages, sidebarContainer);
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
  sidebarContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI' && e.target.dataset.tags) {
      const tags = e.target.dataset.tags.split(',');
      const filtered = pages.filter(p => p.tags.some(t => tags.includes(t)));
      import('./render/renderCards.js').then(module =>
        module.renderCards(filtered, mainContainer)
      );
    }
  });
})();

