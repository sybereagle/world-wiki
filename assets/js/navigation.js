export function setupNavigation(pages) {
  window.addEventListener("hashchange", () => routeToPage(pages));
  routeToPage(pages); // Load page on first load

  function routeToPage(pages) {
    const hash = window.location.hash;
    if (!hash || hash === "#home") {
      import('./render.js').then(module => module.renderHomepageCards(pages));
      return;
    }

    const pageId = hash.replace("#page/", "");
    const page = pages.find(p => p.id === pageId);
    if (page) {
      import('./render.js').then(module => module.renderPage(page));
    } else {
      const main = document.getElementById("main-content");
      main.innerHTML = `<h2>404 - Page Not Found</h2><p>The requested page does not exist.</p>`;
    }
  }
}

