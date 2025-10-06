export function initRouter(pages, mainContainer) {
  function route() {
    const hash = window.location.hash.substring(1);
    const page = pages.find(p => p.id === hash);

    if (!hash) {
      import('./renderCards.js').then(module => module.renderCards(pages, mainContainer));
    } else {
      import('./renderPage.js').then(module => module.renderPage(page, mainContainer));
    }
  }

  window.addEventListener('hashchange', route);
  window.addEventListener('load', route);
}
