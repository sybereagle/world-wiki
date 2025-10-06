// js/render/renderCards.js
export function renderCards(pages, container) {
  if (!container) {
    console.error('renderCards: No container found');
    return;
  }

  container.innerHTML = ''; // Clear

  const grid = document.createElement('div');
  grid.className = 'card-grid';

  pages.forEach(page => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${page.img}" alt="${page.title}">
      <h3>${page.title}</h3>
      <p>${page.desc}</p>
    `;
    card.addEventListener('click', () => {
      window.location.hash = `#${page.id}`;
    });
    grid.appendChild(card);
  });

  container.appendChild(grid);
}
