// main.js
import { $, createElement, clearElement } from './utils/domUtils.js';
import { renderSidebarLinks } from './render/renderSidebar.js';
import { renderSearchField } from './render/renderSearchField.js';
import { loadData } from './api/dataLoader.js';
import { initRouter } from './router.js';
import { renderSearch } from './render/renderSearch.js';
import { initBackButton } from './ui/backButton.js';
import { initSidebar } from './ui/sidebar.js';

document.addEventListener('DOMContentLoaded', function () {
  var contentEl = $('content');

  if (!contentEl) {
    console.error('Main content container not found!');
    return;
  }

  loadData().then(function (pages) {
    if (!pages || pages.length === 0) return;

    if (window.location.search.indexOf('debug=true') !== -1) {
      window.pages = pages;
      console.log('Debug mode: window.pages', pages);
    }

    var searchInput = renderSearchField('sidebar');
    renderSidebarLinks(pages);

    initRouter(pages, contentEl);

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        var query = e.target.value.toLowerCase();
        renderSearch(pages, query, contentEl);
      });
    }

    initBackButton();
    initSidebar();
  }).catch(function (err) {
    console.error('Error initializing pages:', err);
  });
});
