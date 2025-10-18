import { createElement } from '../utils/domUtils.js';

export function renderSearchField(containerId) {
  containerId = containerId || 'sidebar';
  var container = document.getElementById(containerId);
  if (!container) return null;

  var oldSearch = container.querySelector('#sidebar-search');
  if (oldSearch) oldSearch.remove();

  var input = createElement('input', {
    id: 'searchBar',
    type: 'text',
    placeholder: 'Search...',
    'aria-label': 'Search pages'
  });

  var wrapper = createElement('div', { id: 'sidebar-search' }, [input]);
  container.prepend(wrapper);

  return input;
}
