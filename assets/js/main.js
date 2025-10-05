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
  let filteredPages = [];

  fetch("data/pages.json")
    .then(res => res.json())
    .then(data => {
      pagesData = data.pages;
      filteredPages = [...pagesData];
      renderSidebar(filteredPages);
      renderTagFilters(pagesData);
      routeToPage(pagesData);

      // Event listeners
      window.addEventListener("hashchange", () => routeToPage(pagesData));

      document.getElementById("search-bar").addEventListener("input", e => {
        const query = e.target.value.toLowerCase();
        filteredPages = pagesData.filter(p => 
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.tags && p.tags.join(" ").toLowerCase().includes(query))
        );
        renderSidebar(filteredPages);
        renderHomepageCards(filteredPages);
      });
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

// Render homepage cards
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

// Render sidebar with expandable categories
function renderSidebar(pages) {
  const sidebar = document.getElementById("sidebar-pages");
  sidebar.innerHTML = "";

  const categories = {};
  pages.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  for (const [cat, catPages] of Object.entries(categories)) {
    const catLi = document.createElement("li");
    catLi.className = "category";

    const catHeader = document.createElement("div");
    catHeader.className = "category-header";
    catHeader.textContent = cat;
    catHeader.addEventListener("click", () => {
      catLi.classList.toggle("collapsed");
    });

    const ul = document.createElement("ul");
    catPages.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#page/${p.id}">${p.title}</a>`;
      ul.appendChild(li);
    });

    catLi.appendChild(catHeader);
    catLi.appendChild(ul);
    sidebar.appendChild(catLi);
  }
}

// Render tags as filter buttons
function renderTagFilters(pages) {
  const container = document.getElementById("tag-filter-container");
  const allTags = new Set();
  pages.forEach(p => p.tags && p.tags.forEach(tag => allTags.add(tag)));
  
  container.innerHTML = `<h3>Filter by Tag</h3>`;
  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.addEventListener("click", () => {
      const filtered = pages.filter(p => p.tags && p.tags.includes(tag));
      renderSidebar(filtered);
      renderHomepageCards(filtered);
    });
    container.appendChild(btn);
  });

  // Reset button
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Show All";
  resetBtn.addEventListener("click", () => {
    renderSidebar(pages);
    renderHomepageCards(pages);
  });
  container.appendChild(resetBtn);
}

// Render single page
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

