/** Filters and renders search results **/
import { renderCards } from "./renderCards.js";

/** Filter pages by search query and render cards **/
/** There are three parameters: container, pages, and searchTerm **/
/** container: an HTML element **/
/** pages: an array **/
/** searchTerm: a string **/
export function renderSearch(container, pages, searchTerm) {
  var filtered = [];
  searchTerm = searchTerm.toLowerCase();

  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    if (page.title.toLowerCase().indexOf(searchTerm) !== -1 || 
        (page.desc && page.desc.toLowerCase().indexOf(searchTerm) !== -1)) {
      filtered.push(page);
    }
  }

  renderCards(container, filtered);
}
