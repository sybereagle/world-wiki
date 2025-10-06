export function renderPage(page) {
  const main = document.getElementById("main-content");
  main.innerHTML = `
    <h2>${page.title}</h2>
    ${page.image ? `<img src="${page.image}" alt="${page.title}">` : ""}
    ${page.content}
    ${page.lastUpdated ? `<small>Last updated: ${page.lastUpdated}</small>` : ""}
    <p><a href="#home">← Back to Homepage</a></p>
  `;
}

