// Simplifies DOM manipulation
export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === "class") el.className = value;
    else if (key === "dataset") {
      Object.entries(value).forEach(([dKey, dVal]) => (el.dataset[dKey] = dVal));
    } else if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.substring(2), value);
    } else {
      el.setAttribute(key, value);
    }
  });
  (Array.isArray(children) ? children : [children]).forEach(child => {
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else if (child instanceof Node) el.appendChild(child);
  });
  return el;
}

export function clearElement(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

