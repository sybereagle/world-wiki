function loadComponent(containerSelector, filePath) {
  fetch(filePath)
    .then(res => res.text())
    .then(data => document.querySelector(containerSelector).innerHTML = data)
    .catch(err => console.error(`Error loading ${filePath}:`, err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header", "components/header.html");
  loadComponent("#sidebar", "components/sidebar.html");
  loadComponent("#footer", "components/footer.html");

  let pagesData = [];

  fetch("data/pages.json")
    .then(res => res.json())
    .then(data => {
      pagesData = data.pages;
      renderSidebar(pagesData);
      routeToPage(pagesData);
      window.addEventListener("hashchange", () => routeToPage(pagesData));
    })
    .catch(err => console.error("Error loading pages.json:", err));
});

function routeToPage(pages) {
  const hash = window.location.hash;
  const main = document.getElementById("main-content");

  if (!hash || hash === "#home") {
    renderHomepageCards(pages);
    return;
  }

  const pageId = hash.replace("#page/", "");
  const page = pages.find(p => p.id === pageId);

  if (page) {
    renderPage(page);
  } else {
    main.innerHTML = `<h2>404 - Page Not Found</h2><p>The requested page does not exist.</p>`;
  }
}

function renderHomepageCards(pages) {
  const main = document.getElementById("main-content");
  main.innerHTML = `
    <h2>Welcome to the World Wiki!</h2>
    <p>Explore all pages in this wiki below.</p>
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

function renderSidebar(pages) {
  const sidebar = document.getElementById("sidebar-pages");
  sidebar.innerHTML = "";

  const categories = {};
  pages.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  for (const [cat, catPages] of Object.entries(categories)) {
    const catTitle = document.createElement("li");
    catTitle.innerHTML = `<strong>${cat}</strong>`;
    sidebar.appendChild(catTitle);

    catPages.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#page/${p.id}">${p.title}</a>`;
      sidebar.appendChild(li);
    });
  }
}

function renderPage(page) {
  const main = document.getElementById("main-content");
  main.innerHTML = `
    <h2>${page.title}</h2>
    ${page.image ? `<img src="${page.image}" alt="${page.title}">` : ""}
    ${page.content}
    ${page.lastUpdated ? `<small>Last updated: ${page.lastUpdated}</small>` : ""}
    <p><a href="#home">← Back to Homepage</a></p>
  `;
}

