import { renderPage } from "./render/renderPages.js";
import { renderCards } from "./render/renderCards.js";
import { select } from "./utils/domUtils.js";

/** Initialize SPA router **/
/** There is one parameter: pages, which is an array of page objects **/
export function initRouter(pages) {
  var contentContainer = select("#page-content");

  if (!contentContainer) return;

  /** Navigate to page by ID **/
  /** There is one parameter: pageID, which directs to homepages if it is null **/
  function navigate(pageId) {
    if (!pageId) {
      // Render homepage
      renderCards(contentContainer, pages);
    } else {
      // Find page by ID
      var page = null;
      for (var i = 0; i < pages.length; i++) {
        if (pages[i].id === pageId) {
          page = pages[i];
          break;
        }
      }

      if (page) {
        renderPage(contentContainer, page);
      } else {
        contentContainer.innerHTML = "<p>Page not found.</p>";
      }
    }
  }

  // Listen for custom navigate events
  document.addEventListener("navigate", function(e) {
    navigate(e.detail.pageId);
  });

  // Listen to hash changes (optional)
  window.addEventListener("hashchange", function() {
    var hash = window.location.hash.slice(1);
    navigate(hash || null);
  });

  // Initial render
  navigate(null);

  // Expose navigate function for programmatic routing
  return {
    navigate: navigate
  };
}
