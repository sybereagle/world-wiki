import { loadData } from './api/dataLoader.js';
import { renderSidebar } from './render/renderSidebar.js';
import { initRouter } from './router.js';
import { renderSearch } from './render/renderSearch.js';

// Debug mode automatically enabled for localhost or file://
const DEBUG = window.location.hostname === 'localhost' || window.location.protocol === 'file:';
const params = new URLSearchParams(window.location.search);
if (params.get('debug') === 'true') {
  window.DEBUG = true;
}

const mainContainer = document.getElementById('content');
const sidebarContainer = document.getElementById('sidebar');
const searchInput = document.getElementById('searchBar');

(async function init() {
  const pages = await loadData();

  // Expose data globally only if debugging
  if (DEBUG) {
    console.log('%c[Wiki Debug Mode] Global variable "placeholders" is available for inspection.', 'color: limegreen;');
    window.placeholders = pages;
  }

  renderSidebar(pages, sidebarContainer);
  initRouter(pages, mainContainer);

  // Search input logic
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
      import('./render/renderCards.js').then(module => module.renderCards(filtered, mainContainer));
    }
  });
})();
