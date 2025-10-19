/** Handles sidebar toggle, overlay, and mobile interactions **/
import { select, addClass, removeClass, toggleClassPair, setText } from "../utils/domUtils.js";

/** Initialize sidebar functionality **/
export function initSidebar() {
  var sidebar = select("#sidebar");
  var overlay = select("#overlay");
  var toggleButton = select("#sidebar-toggle");

  if (!sidebar || !overlay || !toggleButton) return;

  // Sidebar is visible by default
  addClass(sidebar, 'visible');
  addClass(overlay, 'collapsed');

  // Toggle sidebar on button click
  toggleButton.addEventListener("click", function() {
    if (sidebar.classList.contains("collapsed")) {
      toggleClassPair(sidebar, 'collapsed', 'visible');
      toggleClassPair(overlay, 'visible', 'collapsed');
      setText(toggleButton, '☰');
    } else {
      toggleClassPair(sidebar, 'visible', 'collapsed');
      toggleClassPair(overlay, 'collapsed', 'visible');
      setText(toggleButton, '×');
      // Wait for CSS transition to complete (300ms) before hiding
      setTimeout(function() {
        sidebar.style.display = "none";
      }, 300);
    }
  });

  // Clicking overlay expands sidebar
  overlay.addEventListener("click", function() {
    removeClass(sidebar, "collapsed");
    removeClass(overlay, "visible");
  });
}
