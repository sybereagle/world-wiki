export function renderCards(pages, container) {
  container.innerHTML = ''; // Clear previous content
  pages.forEach(page => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${page.img}" alt="${page.title}" />
      <h3>${page.title}</h3>
      <p>${page.desc}</p>
    `;
    card.addEventListener('click', () => {
      window.location.hash = `#${page.id}`;
    });
    container.appendChild(card);
  });
}
