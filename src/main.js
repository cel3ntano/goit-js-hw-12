import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getImages from './js/pixabay-api.js';
import createMarkup from './js/render-functions';

const galleryRenderer = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

galleryRenderer.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  galleryRenderer.gallery.innerHTML = '';

  const searchQuery = e.target.elements['search-input'].value
    .trim()
    .toLowerCase();

  if (!searchQuery) {
    iziToast.show({
      message: '❌ Please enter a search query',
      color: 'red',
      position: 'topRight',
      timeout: 2000,
      progressBar: false,
    });
  } else {
    galleryRenderer.form.reset();
    galleryRenderer.loader.classList.add('is-open');
    getImages(searchQuery)
      .then(data => {
        if (!data.hits.length) {
          galleryRenderer.loader.classList.remove('is-open');
          iziToast.show({
            message:
              '❌ Sorry, there are no images matching your search query. Please try again!',
            color: 'red',
            position: 'topRight',
            timeout: 2000,
            progressBar: false,
          });
        } else {
          galleryRenderer.loader.classList.remove('is-open');
          const markup = createMarkup(data.hits);
          const lightbox = new SimpleLightbox('.gallery-item-image a', {
            captionsData: 'alt',
            captionDelay: 250,
          });
          galleryRenderer.gallery.insertAdjacentHTML('beforeend', markup);

          lightbox.refresh();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
