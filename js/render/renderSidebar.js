export function renderSidebar(pages, container) {
  container.innerHTML = '<ul></ul>';
  const ul = container.querySelector('ul');

  pages.forEach(page => {
    const li = document.createElement('li');
    li.textContent = page.title;
    li.addEventListener('click', () => window.location.hash = `#${page.id}`);
    ul.appendChild(li);
  });
}
