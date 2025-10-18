import { clearElement } from '../utils/domUtils.js';
import { renderCards } from './renderCards.js';

export function renderSearch(pages, query, container) {
  if (!container) return;

  var filtered = [];

  for (var i = 0; i < pages.length; i++) {
    var p = pages[i];
    var match = (p.title && p.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
                (p.desc && p.desc.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
                (p.tags && p.tags.some(function (tag) {
                  return tag.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                }));
    if (match) filtered.push(p);
  }

  clearElement(container);

  if (filtered.length === 0) {
    container.innerHTML = '<p>No results found.</p>';
    return;
  }

  renderCards(filtered, container);
}
