export function renderSidebar(pages, container) {
  container.innerHTML = '';

  const categories = [...new Set(pages.map(p => p.category))];

  categories.forEach(cat => {
    const catTitle = document.createElement('h4');
    catTitle.textContent = cat;
    container.appendChild(catTitle);

    const ul = document.createElement('ul');

    pages.filter(p => p.category === cat).forEach(page => {
      const li = document.createElement('li');
      li.textContent = page.title;
      li.dataset.tags = page.tags.join(',');
      li.addEventListener('click', () => window.location.hash = `#${page.id}`);
      ul.appendChild(li);
    });

    container.appendChild(ul);
  });
}
