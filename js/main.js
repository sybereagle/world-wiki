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

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query === '') {
      window.location.hash = ''; // reset to homepage
    } else {
      renderSearch(pages, query, mainContainer);
    }
  });
})();
