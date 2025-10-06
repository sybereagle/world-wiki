import { renderSidebar } from "./renderSidebar.js";
import { renderCards } from "./renderCards.js";
import { qs } from "../utils/domUtils.js";

export function setupSearch(pages) {
  const searchInput = qs("#search-bar");
  if (!searchInput) return;

  searchInput.addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    const filtered = pages.filter(page => 
      page.title.toLowerCase().includes(query) ||
      page.description?.toLowerCase().includes(query) ||
      page.tags?.some(tag => tag.toLowerCase().includes(query))
    );

    renderSidebar(qs("#sidebar-pages"), filtered);
    renderCards(qs("#main-content"), filtered);
  });
}

