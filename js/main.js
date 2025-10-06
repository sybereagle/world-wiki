import { renderSidebarLinks } from './render/renderSidebar.js';
import { renderSearchField } from './render/renderSearchField.js';
import { loadPlaceholders } from './api/dataLoader.js';
import { initRouter } from './router.js';
import { renderSearch } from './render/renderSearch.js';

document.addEventListener('DOMContentLoaded', async () => {
  const sidebar = document.getElementById('sidebar');
  const contentEl = document.getElementById('content');

  // Load page data
  const pages = await loadPlaceholders();

  if (window.location.search.includes('debug=true')) {
    window.pages = pages;
    console.log('Debug mode: window.pages', pages);
  }

  // Render search field + sidebar links
  const searchInput = renderSearchField();  // injects search input
  renderSidebarLinks(pages);               // injects links

  // SPA routing
  initRouter(pages, contentEl);

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();

      const filtered = pages.filter(function(page) {
        const title = page.title ? page.title.toLowerCase() : '';
        const desc = page.desc ? page.desc.toLowerCase() : '';
        return title.includes(query) || desc.includes(query);
      });

      renderSearch(filtered, contentEl);
    });
  }

  // Sidebar toggle for mobile
  const toggle = document.getElementById('sidebar-toggle');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('visible');
    });
  }
});

