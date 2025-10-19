import { select, addClass, removeClass } from "../utils/domUtils.js";

/** Initialize back home button **/
// @param {Function} onBack - callback when the button is clicked
// @param {Function} isHomepage - callback that returns true if the current view is homepage
// @returns {Object} - controller with updateVisibility method
export function initBackButton(onBack, isHomepage) {
  var backButton = select("#back-home-button");

  if (!backButton) return null;

  function updateVisibility() {
    if (typeof isHomepage !== "function") return;

    if (isHomepage()) {
      addClass(backButton, "hidden");
      removeClass(backButton, "visible");
    } else {
      removeClass(backButton, "hidden");
      addClass(backButton, "visible");
    }
  }

  backButton.addEventListener("click", function() {
    if (typeof onBack === "function") {
      onBack();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateVisibility();

  return {
    updateVisibility: updateVisibility
  };
}
