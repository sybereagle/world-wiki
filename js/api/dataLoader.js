/** Fetch JSON data for the SPA **/
/** There is only one parameter: url, which is string path to a JSON file **/
export function loadPages(url) {
  return fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Failed to load pages JSON: " + response.status);
      }
      return response.json();
    })
    .then(function(data) {
      return data.pages || data;
    })
    .catch(function(error) {
      console.error(error);
      return [];
    });
}
