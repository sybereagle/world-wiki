export async function loadData() {
  try {
    const response = await fetch('data/placeholders.json');
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
