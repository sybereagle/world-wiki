import { qs, clearElement } from "../utils/domUtils.js";
import { formatDate } from "../utils/formatUtils.js";

export function renderPage(page) {
  const main = qs("#main-content");
  clearElement(main);

  main.appendChild(document.createElement("h2")).textContent = page.title;

  const imgSrc = page.image || page.placeholderUrl || "";
  if (imgSrc) {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = page.title;
    img.onerror = () => {
      if (page.placeholderUrl) img.src = page.placeholderUrl;
    };
    main.appendChild(img);
  }

  const contentDiv = document.createElement("div");
  contentDiv.innerHTML = page.content || "<p>No content available.</p>";
  main.appendChild(contentDiv);

  if (page.lastUpdated) {
    const last = document.createElement("small");
    last.textContent = `Last updated: ${formatDate(page.lastUpdated)}`;
    main.appendChild(last);
  }

  const backLink = document.createElement("p");
  backLink.innerHTML = `<a href="#home">← Back to Homepage</a>`;
  main.appendChild(backLink);
}

