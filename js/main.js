import { loadData } from './api/dataLoader.js';
import { renderSidebar } from './render/renderSidebar.js';
import { initRouter } from './router.js';
import { renderSearch } from './render/renderSearch.js';

const mainContainer = document.getElementById('content');
const sidebarContainer = document.getElementById('sidebar');
const searchInput = document.getElementById('searchBar');

(async function init() {
  const pages = await loadData();

  renderSidebar(pages, sidebarContainer);
  initRouter(pages, mainContainer);

  // Search by input
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query === '') {
      window.location.hash = '';
    } else {
      renderSearch(pages, query, mainContainer);
    }
  });

  // Optional: click tag filtering from sidebar
  sidebarContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI' && e.target.dataset.tags) {
      const tags = e.target.dataset.tags.split(',');
      const filtered = pages.filter(p => p.tags.some(t => tags.includes(t)));
      import('./render/renderCards.js').then(module => module.renderCards(filtered, mainContainer));
    }
  });
})();

