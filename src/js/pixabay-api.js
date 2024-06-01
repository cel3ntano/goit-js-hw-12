import axios from 'axios';
export { getImages, itemsPerPage };

let itemsPerPage = 15;
async function getImages(query, page = 1) {
  const BASE_URL = 'https://pixabay.com/';
  const END_POINT = 'api/';
  const { data } = await axios.get(`${BASE_URL}${END_POINT}`, {
    params: {
      key: '11118529-f58244b993118eb30b9529deb',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: itemsPerPage,
      page,
    },
  });
  return data;
}
