// Load reusable components
function loadComponent(containerSelector, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.querySelector(containerSelector).innerHTML = data;
    })
    .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// Inject components
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header", "components/header.html");
  loadComponent("#sidebar", "components/sidebar.html");
  loadComponent("#footer", "components/footer.html");
});

