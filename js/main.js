import { loadPages } from "./api/dataLoader.js";
import { initRouter } from "./router.js";
import { renderSidebar } from "./render/renderSidebar.js";
import { renderSearchField } from "./render/renderSearchField.js";
import { initBackButton } from "./ui/backButton.js";
import { initSidebar } from "./ui/sidebar.js";
import { select } from "./utils/domUtils.js";

// Path to pages JSON relative to index.html
var pagesJSON = "data/pages.json";

/** Initialize the SPA **/
function initApp() {
  loadPages(pagesJSON).then(function(pages) {
    if (!pages || pages.length === 0) {
      console.error("No pages loaded.");
      return;
    }

    // Initialize router
    var router = initRouter(pages);

    // Render sidebar links
    var sidebarLinksContainer = select("#sidebar-links");
    if (sidebarLinksContainer) {
      renderSidebar(sidebarLinksContainer, pages);
    }

    // Render search field
    renderSearchField(pages);

    // Initialize back-home button with dynamic visibility
    var backButtonController = initBackButton(function() {
      router.navigate(null);
    }, function() {
      var content = select("#page-content");
      if (!content) return true;
      return content.querySelectorAll(".card").length > 0;
    });

    // Update back button visibility after each navigation
    document.addEventListener("navigate", function() {
      if (backButtonController) {
        backButtonController.updateVisibility();
      }
    });

    // Initialize sidebar toggle and overlay
    initSidebar();

  }).catch(function(error) {
    console.error("Error initializing app:", error);
  });
}

// Ensure DOM is fully loaded before initializing
document.addEventListener("DOMContentLoaded", function() {
  initApp();
});

