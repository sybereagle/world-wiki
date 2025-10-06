// js/api/dataLoader.js
export async function loadPlaceholders() {
  try {
    const res = await fetch('./data/placeholders.json');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.pages || json; // support either {pages: []} or [] root
  } catch (err) {
    console.error('Error loading placeholders:', err);
    return [];
  }
}
