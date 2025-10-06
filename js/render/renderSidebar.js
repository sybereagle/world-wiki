import { createElement, clearElement } from "../utils/domUtils.js";

export function renderSidebar(container, pages) {
  clearElement(container);

  const categories = {};
  pages.forEach(page => {
    if (!categories[page.category]) categories[page.category] = [];
    categories[page.category].push(page);
  });

  Object.entries(categories).forEach(([catName, catPages]) => {
    const catLi = createElement("li", { class: "category" });

    const catHeader = createElement("div", { class: "category-header" }, catName);
    catHeader.addEventListener("click", () => catLi.classList.toggle("collapsed"));

    const ul = createElement("ul");
    catPages.forEach(p => {
      const li = createElement("li", {}, createElement("a", { href: `#page/${p.id}` }, p.title));
      ul.appendChild(li);
    });

    catLi.appendChild(catHeader);
    catLi.appendChild(ul);
    container.appendChild(catLi);
  });
}

