import { renderCards } from './render/renderCards.js';
import { renderPage } from './render/renderPages.js';
import { clearElement } from './utils/domUtils.js';

export function initRouter(pages, mainContainer) {
  function handleRoute() {
    clearElement(mainContainer);
    var hash = window.location.hash.slice(1);
    var page = null;

    for (var i = 0; i < pages.length; i++) {
      if (pages[i].id === hash) {
        page = pages[i];
        break;
      }
    }

    if (page) {
      renderPage(page, mainContainer);
    } else {
      renderCards(pages, mainContainer);
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
