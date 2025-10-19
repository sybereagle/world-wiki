/** Initializes the search input in the sidebar **/
import { select } from "../utils/domUtils.js";
import { renderSearch } from "./renderSearch.js";

/** Initialize search bar **/
/** There is only one parameter: pages, which is an array **/
export function renderSearchField(pages) {
  var searchBar = select("#searchBar");

  if (!searchBar) return;

  searchBar.addEventListener("input", function() {
    var term = searchBar.value;
    var contentContainer = select("#page-content");
    renderSearch(contentContainer, pages, term);
  });
}
