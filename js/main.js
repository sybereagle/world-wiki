import { loadData } from './api/dataLoader.js';
import { renderSidebar } from './render/renderSidebar.js';
import { initRouter } from './router.js';

const mainContainer = document.getElementById('content');
const sidebarContainer = document.getElementById('sidebar');

(async function init() {
  const pages = await loadData();
  renderSidebar(pages, sidebarContainer);
  initRouter(pages, mainContainer);

  // Optional: search logic here
})();
