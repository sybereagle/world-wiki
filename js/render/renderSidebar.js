import { createElement, clearElement } from '../utils/domUtils.js';

export function renderSidebarLinks(pages, containerId) {
  containerId = containerId || 'sidebar';
  var container = document.getElementById(containerId);
  if (!container) return;

  var oldNav = container.querySelector('nav');
  if (oldNav) clearElement(oldNav);

  var nav = createElement('nav', { className: 'sidebar-links' });

  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    var link = createElement('a', { href: '#' + page.id, text: page.title });
    nav.appendChild(link);
  }

  container.appendChild(nav);
}
