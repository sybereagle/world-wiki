export function setupSearchAndFilter(pages) {
  const searchBar = document.getElementById("search-bar");
  if (!searchBar) return;

  searchBar.addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    const filteredPages = pages.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.tags && p.tags.join(" ").toLowerCase().includes(query))
    );
    import('./render.js').then(module => {
      module.renderSidebar(filteredPages);
      module.renderHomepageCards(filteredPages);
    });
  });
}

