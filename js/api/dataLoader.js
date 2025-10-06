export async function loadData() {
  try {
    const response = await fetch('data/placeholders.json');
    if (!response.ok) throw new Error('Failed to fetch JSON');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error loading data:', err);
    return [];
  }
}

