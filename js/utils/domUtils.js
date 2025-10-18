export function $(id) {
  if (!id) return null;
  return document.getElementById(id);
}

export function createElement(tag, attrs, children) {
  attrs = attrs || {};
  children = children || [];

  var el = document.createElement(tag);

  for (var key in attrs) {
    if (!attrs.hasOwnProperty(key)) continue;

    var value = attrs[key];
    if (key === 'className') el.className = value;
    else if (key === 'text') el.textContent = value;
    else if (key === 'html') el.innerHTML = value;
    else el.setAttribute(key, value);
  }

  for (var i = 0; i < children.length; i++) {
    el.appendChild(children[i]);
  }

  return el;
}

export function clearElement(el) {
  if (!el) return;
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
