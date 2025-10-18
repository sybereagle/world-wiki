export function loadData() {
  return fetch('./data/data.json')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP error ' + res.status);
      return res.json();
    })
    .then(function (json) {
      return json.pages || json;
    })
    .catch(function (err) {
      console.error('Error loading data:', err);
      return [];
    });
}
