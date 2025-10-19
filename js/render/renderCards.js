/** Renders homepage wiki article cards **/
import { createElement, append } from "../utils/domUtils.js";
import { helpers, applyHelpers } from "../utils/formatUtils.js";

/** Render a grid of cards inside a container **/
/** There are three parameters: container, pages, and onCardClick **/
/** Container Parameter: an HTML element **/
/** Pages Parameter: an Array of page objects {title, desc, img, id} **/
/** onCardClick Parameter: a callback function for when a card is clicked **/
export function renderCards(container, pages) {
  container.innerHTML = "";
  var grid = createElement("div", { classes: ["card-grid", helpers.grid.grid] });
  append(container, grid);

  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];

    var card = createElement("div", { classes: ["card", helpers.shadow.sm, helpers.flex.flex, helpers.flex.column] });
    var title = createElement("h3", { classes: ["card-title"], text: page.title });
    var desc = createElement("p", { classes: ["card-desc"], text: page.desc });
    
    // Add image if available
    if (page.img) {
        var img = createElement("img", { classes: ["card-img"] });
        img.src = page.img;
        img.alt = page.title || "Wiki card image";
        append(card, img);
    }

    append(card, title, desc);
    append(grid, card);

    // Click navigates to article page
    (function(cardCopy, idCopy) {
      cardCopy.addEventListener("click", function() {
        var event = new CustomEvent("navigate", { detail: { pageId: idCopy } });
        document.dispatchEvent(event);
      });
    })(card, page.id);
  }
}
