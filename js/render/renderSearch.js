export function renderSearch(pages, query, container) {
  const filtered = pages.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.desc.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  container.innerHTML = '';
  if (filtered.length === 0) {
    container.innerHTML = '<p>No results found.</p>';
    return;
  }

  import('./renderCards.js').then(module => module.renderCards(filtered, container));
}
