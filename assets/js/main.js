import { loadComponent } from './loadComponents.js';
import { renderSidebar } from './render/renderSidebar.js';
import { renderTagFilters } from './render/renderTags.js';
import { renderHomepageCards } from './render/renderHomepage.js';
import { setupNavigation } from './navigation.js';
import { setupSearchAndFilter } from './searchAndFilter.js';

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header", "components/header.html");
  loadComponent("#sidebar", "components/sidebar.html");
  loadComponent("#footer", "components/footer.html");

  fetch("data/pages.json")
    .then(res => res.json())
    .then(data => {
      const pages = data.pages;
      renderSidebar(pages);
      renderTagFilters(pages);
      renderHomepageCards(pages);
      setupSearchAndFilter(pages);
      setupNavigation(pages);
    })
    .catch(err => console.error("Error loading pages.json:", err));
});

