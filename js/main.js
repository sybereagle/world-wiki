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
  if (toggle && sidebar) {
        const openSidebar = function() {
            sidebar.classList.add('visible');
            overlay.classList.add('active');
            toggle.classList.add('active'); // rotates and moves toggle
            toggle.textContent = '✕'; // change to close icon
        };
        
        const closeSidebar = function() {
            sidebar.classList.remove('visible');
            overlay.classList.remove('active');
            toggle.classList.remove('active'); // reset toggle
            toggle.textContent = '☰'; // change to hamburger icon
        };
        
        const toggleSidebar = function() {
            if (window.innerWidth <= 900) {
                // 🟢 Mobile behavior
                if (sidebar.classList.contains('visible')) {
                   closeSidebar();
                } else {
                    openSidebar();
                }
            } else {
                // 🟦 Desktop behavior
                sidebar.classList.toggle('collapsed');
                toggle.classList.toggle('desktop-active');
            }
        };
        
        // Single unified event listener
        toggle.addEventListener('click', toggleSidebar);
        
        // Close sidebar if overlay is clicked
        overlay.addEventListener('click', function() {
            if (window.innerWidth <= 900) closeSidebar();
        });
        
        // Close sidebar when navigating a link
        sidebar.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && window.innerWidth <= 900) {
                closeSidebar();
            };
        });
        
        // --- Handle window resizing ---
        const handleResize = function() {
            if (window.innerWidth > 900) {
                overlay.classList.remove('active');
                sidebar.classList.remove('visible');
                toggle.classList.remove('active');
                toggle.textContent = '☰';
            } else {
                sidebar.classList.remove('hidden'); // ensure it's visible baseline for mobile
            };
        };
        
        window.addEventListener('resize', handleResize);
    };
});
