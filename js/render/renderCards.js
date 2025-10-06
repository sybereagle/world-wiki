import { createElement, clearElement } from "../utils/domUtils.js";
import { formatDate, truncateText } from "../utils/formatUtils.js";

export function renderCards(container, pages) {
  clearElement(container);

  pages.forEach(page => {
    // Determine image src
    const imgSrc = page.image || page.placeholderUrl || "";

    const cardChildren = [
      imgSrc
        ? createElement("img", {
            src: imgSrc,
            alt: page.title,
            onerror: `this.onerror=null;this.src='${page.placeholderUrl}';`
          })
        : null,
      createElement("h2", {}, page.title),
      createElement("p", {}, truncateText(page.description || "")),
      page.lastUpdated
        ? createElement("span", { class: "updated" }, `Last updated: ${formatDate(page.lastUpdated)}`)
        : null,
      createElement("a", { href: `#page/${page.id}` }, "View Page")
    ].filter(Boolean);

    const card = createElement("div", { class: "card" }, cardChildren);
    container.appendChild(card);
  });
}

