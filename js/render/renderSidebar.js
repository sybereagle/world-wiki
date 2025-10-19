/** Generates sidebar links dynamically **/
import { createElement, append } from "../utils/domUtils.js";

/** Render sidebar links **/
/** There are two parameters: sidebarContainer and pages **/
/** sidebarContainer: an HTML element **/
/** pages: an array of page objects {title, id} **/
export function renderSidebar(sidebarContainer, pages) {
  sidebarContainer.innerHTML = "";

  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    var link = createElement("a", { text: page.title, attrs: { href: "#" } });

    (function(idCopy, linkCopy) {
      linkCopy.addEventListener("click", function(e) {
        e.preventDefault();
        var event = new CustomEvent("navigate", { detail: { pageId: idCopy } });
        document.dispatchEvent(event);
      });
    })(page.id, link);

    append(sidebarContainer, link);
  }
}

