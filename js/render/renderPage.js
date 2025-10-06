export function renderPage(page, container) {
  container.innerHTML = `
    <article class="wiki-page">
      <h2>${page.title}</h2>
      <img src="${page.img}" alt="${page.title}">
      ${page.content}
    </article>
  `;
}
