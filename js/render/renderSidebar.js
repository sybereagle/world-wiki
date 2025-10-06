export function renderSidebar(pages, container) {
  container.innerHTML = '';
  const ul = document.createElement('ul');
  pages.forEach(page => {
    const li = document.createElement('li');
    li.textContent = page.title;
    li.addEventListener('click', () => {
      window.location.hash = `#${page.id}`;
    });
    ul.appendChild(li);
  });
  container.appendChild(ul);
}
