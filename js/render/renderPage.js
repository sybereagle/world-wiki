export function renderPage(page, container) {
  if (!page) {
    container.innerHTML = '<p>Page not found.</p>';
    return;
  }

  container.innerHTML = `
    <h2>${page.title}</h2>
    <img src="${page.img}" alt="${page.title}">
    <p>${page.desc}</p>
  `;
}
