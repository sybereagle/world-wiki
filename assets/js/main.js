function loadComponent(containerSelector, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.querySelector(containerSelector).innerHTML = data;
    })
    .catch(error => console.error(`Error loading ${filePath}:`, error));
}

document.addEventListener("DOMContentLoaded", () => {
  // Load reusable components
  loadComponent("#header", "components/header.html");
  loadComponent("#sidebar", "components/sidebar.html");
  loadComponent("#footer", "components/footer.html");

  // Load homepage cards
  const cardsContainer = document.getElementById("cards-container");
  if (cardsContainer) {
    fetch("data/placeholders.json")
      .then(response => response.json())
      .then(data => {
        data.pages.forEach(page => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
            <h3>${page.title}</h3>
            <p>${page.description}</p>
            <a href="${page.link}">View Page</a>
          `;
          cardsContainer.appendChild(card);
        });
      })
      .catch(error => console.error("Error loading pages JSON:", error));
  }

  // Load sidebar pages dynamically
  const sidebarContainer = document.getElementById("sidebar-pages");
  if (sidebarContainer) {
    fetch("data/placeholders.json")
      .then(response => response.json())
      .then(data => {
        // Group pages by category
        const categories = {};
        data.pages.forEach(page => {
          if (!categories[page.category]) categories[page.category] = [];
          categories[page.category].push(page);
        });

        // Render pages in sidebar
        for (const [category, pages] of Object.entries(categories)) {
          const catTitle = document.createElement("li");
          catTitle.innerHTML = `<strong>${category}</strong>`;
          sidebarContainer.appendChild(catTitle);

          pages.forEach(page => {
            const pageItem = document.createElement("li");
            pageItem.innerHTML = `<a href="${page.link}">${page.title}</a>`;
            sidebarContainer.appendChild(pageItem);
          });
        }
      })
      .catch(error => console.error("Error loading sidebar pages:", error));
  }
});

