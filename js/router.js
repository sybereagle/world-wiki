import { renderCards } from './render/renderCards.js';
import { renderPage } from './render/renderPage.js';

export function initRouter(pages, mainContainer) {
  function handleRoute() {
    const hash = window.location.hash.slice(1); // remove #
    const page = pages.find(p => p.id === hash);

    if (page) {
      renderPage(page, mainContainer);
    } else {
      // Default: show all pages as cards
      renderCards(pages, mainContainer);
    }
  }

  // Listen for hash changes and run once on load
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
