/** Renders an individual wiki article page **/
import { createElement, append } from "../utils/domUtils.js";
import { helpers } from "../utils/formatUtils.js";

/** Render full article content **/
/** There are two parameters: container and pageData **/
/** Container Parameter: an HTML element **/
/** pageData Parameter: an object {title, content, img} **/
export function renderPage(container, page) {
  container.innerHTML = "";

  var articleDiv = createElement("div", { classes: ["article", helpers.bg.surface, helpers.padding.md] });
  var title = createElement("h1", { text: page.title });
  var desc = createElement("p", { text: page.desc });

  append(articleDiv, title, desc);

  if (page.content) {
    var contentDiv = createElement("div", { html: page.content });
    append(articleDiv, contentDiv);
  }

  append(container, articleDiv);
}
