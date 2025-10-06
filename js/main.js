import { loadData } from "./api/dataLoader.js";
import { setupRouter } from "./router.js";
import { renderSidebar } from "./render/renderSidebar.js";
import { setupSearch } from "./render/renderSearch.js";

document.addEventListener("DOMContentLoaded", async () => {
  const pages = await loadData();

  renderSidebar(document.querySelector("#sidebar-pages"), pages);
  setupSearch(pages);
  setupRouter(pages);
});

