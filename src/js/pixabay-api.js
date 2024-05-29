export default getImages;

function getImages(query) {
  const BASE_URL = 'https://pixabay.com/';
  const END_POINT = 'api/';
  const headers = {};
  const params = new URLSearchParams({
    key: '11118529-f58244b993118eb30b9529deb',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 21,
  });
  const url = `${BASE_URL}${END_POINT}?${params}`;
  return fetch(url, { headers }).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
