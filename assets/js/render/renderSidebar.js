export function renderSidebar(pages) {
  const sidebar = document.getElementById("sidebar-pages");
  sidebar.innerHTML = "";

  const categories = {};
  pages.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  for (const [category, catPages] of Object.entries(categories)) {
    const catLi = document.createElement("li");
    catLi.className = "category";

    const header = document.createElement("div");
    header.className = "category-header";
    header.textContent = category;

    // Expand/collapse toggle
    header.addEventListener("click", () => catLi.classList.toggle("collapsed"));

    const ul = document.createElement("ul");
    catPages.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#page/${p.id}">${p.title}</a>`;
      ul.appendChild(li);
    });

    catLi.appendChild(header);
    catLi.appendChild(ul);
    sidebar.appendChild(catLi);
  }
}

