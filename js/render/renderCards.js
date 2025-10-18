import { createElement, clearElement } from '../utils/domUtils.js';

export function renderCards(pages, container) {
  if (!container) return;
  clearElement(container);

  var grid = createElement('div', { className: 'card-grid' });

  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    var card = createElement('div', { className: 'card' }, [
      createElement('img', { src: page.img, alt: page.title }),
      createElement('h3', { text: page.title }),
      createElement('p', { text: page.desc || '' })
    ]);

    (function (pageId) {
      card.addEventListener('click', function () {
        window.location.hash = '#' + pageId;
      });
    })(page.id);

    grid.appendChild(card);
  }

  container.appendChild(grid);
}
