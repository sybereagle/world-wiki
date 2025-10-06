// js/router.js
import { renderCards } from './render/renderCards.js';
import { renderPage } from './render/renderPage.js';

export function initRouter(pages, mainContainer) {
  function handleRoute() {
    const hash = window.location.hash.slice(1); // remove #
    const page = pages.find(p => p.id === hash);

    if (page) {
      renderPage(page, mainContainer);
    } else {
      renderCards(pages, mainContainer);
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // fire immediately
}
