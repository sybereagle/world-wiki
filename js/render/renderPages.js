import { createElement, clearElement } from '../utils/domUtils.js';

export function renderPage(page, container) {
  if (!container || !page) return;

  clearElement(container);

  var article = createElement('article', { className: 'wiki-page' }, [
    createElement('h2', { text: page.title }),
    createElement('img', { src: page.img, alt: page.title }),
    createElement('div', { html: page.content })
  ]);

  container.appendChild(article);
}
