import { renderPage } from "./render/renderPage.js";
import { renderCards } from "./render/renderCards.js";
import { qs } from "./utils/domUtils.js";

export function setupRouter(pages) {
  function route() {
    const hash = window.location.hash || "#home";

    if (hash === "#home") {
      renderCards(qs("#main-content"), pages);
      return;
    }

    const pageId = hash.replace("#page/", "");
    const page = pages.find(p => p.id === pageId);

    if (page) {
      renderPage(page);
    } else {
      qs("#main-content").innerHTML = "<h2>404 - Page Not Found</h2>";
    }
  }

  window.addEventListener("hashchange", route);
  route(); // Run on page load
}

