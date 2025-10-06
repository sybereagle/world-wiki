// js/render/renderSidebar.js

/**
 * Renders the sidebar links dynamically.
 * @param {Array} pages - Array of page objects {id, title, desc}
 * @param {string} containerId - The ID of the sidebar container
 */
export function renderSidebarLinks(pages, containerId = 'sidebar') {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Remove previous nav if it exists
  const oldNav = container.querySelector('nav');
  if (oldNav) oldNav.remove();

  // Create nav container
  const nav = document.createElement('nav');
  nav.className = 'sidebar-links';

  pages.forEach(page => {
    const link = document.createElement('a');
    link.href = `#${page.id}`;
    link.textContent = page.title;
    nav.appendChild(link);
  });

  container.appendChild(nav);
}

