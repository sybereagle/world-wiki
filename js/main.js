import { loadData } from "./api/dataLoader.js";
import { setupRouter } from "./router.js";
import { renderSidebar } from "./render/renderSidebar.js";
import { setupSearch } from "./render/renderSearch.js";

document.addEventListener("DOMContentLoaded", async () => {
  const pages = await loadData();

  renderSidebar(document.querySelector("#sidebar-pages"), pages);
  
  // Sidebar toggle for mobile
  const sidebarToggleBtn = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  if (sidebarToggleBtn && sidebar) {
      sidebarToggleBtn.addEventListener("click", () => {
          sidebar.classList.toggle("expanded");
      });
  }

  
  setupSearch(pages);
  setupRouter(pages);
});

