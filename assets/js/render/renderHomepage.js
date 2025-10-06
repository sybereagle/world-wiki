export function renderHomepageCards(pages) {
  const main = document.getElementById("main-content");
  main.innerHTML = `
    <h2>Welcome to the World Wiki!</h2>
    <p>Explore all pages below.</p>
    <div id="cards-container" class="cards-container"></div>
  `;
  const container = document.getElementById("cards-container");

  pages.forEach(page => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      ${page.image ? `<img src="${page.image}" alt="${page.title}">` : ""}
      <h3>${page.title}</h3>
      <p>${page.description}</p>
      ${page.lastUpdated ? `<small>Last updated: ${page.lastUpdated}</small>` : ""}
      <a href="#page/${page.id}">View Page</a>
    `;
    container.appendChild(card);
  });
}

