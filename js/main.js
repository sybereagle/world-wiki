import { renderSidebarLinks } from './render/renderSidebar.js';
import { renderSearchField } from './render/renderSearchField.js';
import { loadPlaceholders } from './api/dataLoader.js';
import { initRouter } from './router.js';
import { renderSearch } from './render/renderSearch.js';

document.addEventListener('DOMContentLoaded', async () => {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const contentEl = document.getElementById('content');

  // Load page data
  const pages = await loadPlaceholders();

  if (window.location.search.includes('debug=true')) {
    window.pages = pages;
    console.log('Debug mode: window.pages', pages);
  }

  // Render search field + sidebar links
  const searchInput = renderSearchField();
  renderSidebarLinks(pages);

  // SPA routing
  initRouter(pages, contentEl);

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      const filtered = pages.filter(page => {
        const title = page.title ? page.title.toLowerCase() : '';
        const desc = page.desc ? page.desc.toLowerCase() : '';
        return title.includes(query) || desc.includes(query);
      });
      renderSearch(filtered, contentEl);
    });
  }

  // Sidebar toggle
  if (toggle && sidebar) {
    const openSidebar = function() {
      sidebar.classList.add('visible');
      overlay.classList.add('active');
      toggle.classList.add('active');
      toggle.textContent = '✕';
    };

    const closeSidebar = function() {
      sidebar.classList.remove('visible');
      overlay.classList.remove('active');
      toggle.classList.remove('active');
      toggle.textContent = '☰';
    };

    const toggleSidebar = function() {
      if (window.innerWidth <= 900) {
        // Mobile
        if (sidebar.classList.contains('visible')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      } else {
        // Desktop with slide animations
        if (!sidebar.classList.contains('hidden') && !sidebar.classList.contains('slide-out')) {
          sidebar.classList.remove('slide-in');
          sidebar.classList.add('slide-out');

          sidebar.addEventListener('animationend', function handler(e) {
            if (e.animationName === 'slideOutRight') {
              sidebar.style.display = 'none';
              sidebar.classList.remove('slide-out');
              sidebar.classList.add('hidden');
              sidebar.removeEventListener('animationend', handler);
            }
          });
        } else if (sidebar.classList.contains('hidden')) {
          sidebar.style.display = 'block';
          sidebar.classList.remove('hidden');
          sidebar.classList.remove('slide-out');
          sidebar.classList.add('slide-in');

          sidebar.addEventListener('animationend', function handler(e) {
            if (e.animationName === 'slideInRight') {
              sidebar.classList.remove('slide-in');
              sidebar.removeEventListener('animationend', handler);
            }
          });
        }
        toggle.classList.toggle('desktop-active');
      }
    };

    toggle.addEventListener('click', toggleSidebar);

    overlay.addEventListener('click', function() {
      if (window.innerWidth <= 900) closeSidebar();
    });

    sidebar.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' && window.innerWidth <= 900) closeSidebar();
    });

    const handleResize = function() {
      if (window.innerWidth > 900) {
        overlay.classList.remove('active');
        sidebar.classList.remove('visible');
        toggle.classList.remove('active');
        toggle.textContent = '☰';
        sidebar.style.display = 'block';
        sidebar.classList.remove('hidden', 'slide-out', 'slide-in');
      } else {
        sidebar.classList.remove('hidden');
      }
    };

    window.addEventListener('resize', handleResize);
  }
});

