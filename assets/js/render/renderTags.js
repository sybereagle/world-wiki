import { renderSidebar } from './renderSidebar.js';
import { renderHomepageCards } from './renderHomepage.js';

export function renderTagFilters(pages) {
  const container = document.getElementById("tag-filter-container");
  const allTags = new Set();
  pages.forEach(p => p.tags && p.tags.forEach(tag => allTags.add(tag)));

  container.innerHTML = `<h3>Filter by Tag</h3>`;

  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.addEventListener("click", () => {
      const filtered = pages.filter(p => p.tags && p.tags.includes(tag));
      renderSidebar(filtered);
      renderHomepageCards(filtered);
    });
    container.appendChild(btn);
  });

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Show All";
  resetBtn.addEventListener("click", () => {
    renderSidebar(pages);
    renderHomepageCards(pages);
  });
  container.appendChild(resetBtn);
}

