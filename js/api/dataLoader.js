let cachedData = null;

export async function loadData(url = "data/pages.json") {
  if (cachedData) return cachedData;
  try {
    const res = await fetch(url);
    const json = await res.json();
    cachedData = json.pages;
    return cachedData;
  } catch (err) {
    console.error("Failed to load data:", err);
    return [];
  }
}

