// js/render/renderSearchField.js

/**
 * Renders the search input at the top of the sidebar.
 * @param {string} containerId - The ID of the sidebar container
 * @returns {HTMLInputElement} - The search input element
 */
export function renderSearchField(containerId = 'sidebar') {
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Remove previous search if it exists
  const oldSearch = container.querySelector('#sidebar-search');
  if (oldSearch) oldSearch.remove();

  const searchWrapper = document.createElement('div');
  searchWrapper.id = 'sidebar-search';

  const input = document.createElement('input');
  input.id = 'searchBar';
  input.type = 'text';
  input.placeholder = 'Search...';
  input.setAttribute('aria-label', 'Search pages');

  searchWrapper.appendChild(input);
  container.prepend(searchWrapper); // Add to top of sidebar

  return input;
}

