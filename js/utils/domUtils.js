/**
 * domUtils.js
 * Utility functions to simplify DOM manipulation
 * No arrow functions used, fully ES5/ES6 compatible
 */

/* -------------------- Element Selectors -------------------- */

/**
 * Select a single element by selector
 * @param {string} selector
 * @param {HTMLElement|Document} context
 * @returns {HTMLElement|null}
 */
function select(selector, context) {
  context = context || document;
  return context.querySelector(selector);
}

/**
 * Select all elements matching a selector
 * @param {string} selector
 * @param {HTMLElement|Document} context
 * @returns {NodeListOf<HTMLElement>}
 */
function selectAll(selector, context) {
  context = context || document;
  return context.querySelectorAll(selector);
}

/* -------------------- Element Creation -------------------- */

/**
 * Create a new element with optional attributes, classes, and content
 * @param {string} tag
 * @param {Object} options
 * @returns {HTMLElement}
 */
function createElement(tag, options) {
  var el = document.createElement(tag);

  if (options) {
    if (options.classes) {
      if (Array.isArray(options.classes)) {
        options.classes.forEach(function(cls) { el.classList.add(cls); });
      } else {
        el.classList.add(options.classes);
      }
    }

    if (options.attrs) {
      for (var key in options.attrs) {
        if (options.attrs.hasOwnProperty(key)) {
          el.setAttribute(key, options.attrs[key]);
        }
      }
    }

    if (options.text) {
      el.textContent = options.text;
    }

    if (options.html) {
      el.innerHTML = options.html;
    }
  }

  return el;
}

/* -------------------- Class Helpers -------------------- */

/**
 * Add one or more classes to an element
 * @param {HTMLElement} el
 * @param {string|string[]} classes
 */
function addClass(el, classes) {
  if (Array.isArray(classes)) {
    classes.forEach(function(cls) { el.classList.add(cls); });
  } else {
    el.classList.add(classes);
  }
}

/**
 * Remove one or more classes from an element
 * @param {HTMLElement} el
 * @param {string|string[]} classes
 */
function removeClass(el, classes) {
  if (Array.isArray(classes)) {
    classes.forEach(function(cls) { el.classList.remove(cls); });
  } else {
    el.classList.remove(classes);
  }
}

/**
 * Toggle between two classes on an element
 * @param {HTMLElement} el
 * @param {string} classA
 * @param {string} classB
 */
function toggleClassPair(el, classA, classB) {
  if (el.classList.contains(classA)) {
    el.classList.replace(classA, classB);
  } else if (el.classList.contains(classB)) {
    el.classList.replace(classB, classA);
  } else {
    // Optional: if neither class exists, add classA by default
    el.classList.add(classA);
  }
}

/* -------------------- Content Helpers -------------------- */

/**
 * Set text content of an element
 * @param {HTMLElement} el
 * @param {string} text
 */
function setText(el, text) {
  el.textContent = text;
}

/**
 * Set inner HTML of an element
 * @param {HTMLElement} el
 * @param {string} html
 */
function setHTML(el, html) {
  el.innerHTML = html;
}

/**
 * Clear all children from an element
 * @param {HTMLElement} el
 */
function clear(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/* -------------------- Append / Prepend -------------------- */

/**
 * Append one or more elements to a parent
 * @param {HTMLElement} parent
 * @param {...HTMLElement} children
 */
function append(parent) {
  for (var i = 1; i < arguments.length; i++) {
    parent.appendChild(arguments[i]);
  }
}

/**
 * Prepend one or more elements to a parent
 * @param {HTMLElement} parent
 * @param {...HTMLElement} children
 */
function prepend(parent) {
  for (var i = 1; i < arguments.length; i++) {
    parent.insertBefore(arguments[i], parent.firstChild);
  }
}

/* -------------------- Exports -------------------- */
export {
  select,
  selectAll,
  createElement,
  addClass,
  removeClass,
  toggleClassPair,
  setText,
  setHTML,
  clear,
  append,
  prepend
};

