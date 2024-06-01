import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages, itemsPerPage } from './js/pixabay-api';
import createMarkup from './js/render-functions';

const galleryRenderer = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  moreBtn: document.querySelector('.load-more-button'),
};

galleryRenderer.form.addEventListener('submit', onSubmit);
galleryRenderer.moreBtn.addEventListener('click', onLoadMore);
let currentQuery = '';
let page;
function onSubmit(e) {
  page = 1;
  e.preventDefault();
  galleryRenderer.gallery.innerHTML = '';
  const searchQuery = e.target.elements['search-input'].value
    .trim()
    .toLowerCase();
  currentQuery = searchQuery;
  if (!searchQuery) {
    galleryRenderer.moreBtn.classList.remove('is-visible');
    iziToast.show({
      message: '❌ Please enter a search query',
      color: 'red',
      position: 'topRight',
      timeout: 2000,
      progressBar: false,
    });
  } else {
    galleryRenderer.form.reset();
    galleryRenderer.loader.classList.add('is-visible');

    getImages(searchQuery, page)
      .then(data => {
        if (!data.hits.length) {
          galleryRenderer.loader.classList.remove('is-visible');
          iziToast.show({
            message:
              '❌ Sorry, there are no images matching your search query. Please try again!',
            color: 'red',
            position: 'topRight',
            timeout: 2000,
            progressBar: false,
          });
        } else {
          galleryRenderer.loader.classList.remove('is-visible');
          galleryRenderer.gallery.insertAdjacentHTML(
            'beforeend',
            createMarkup(data.hits)
          );
          if (data.totalHits <= itemsPerPage) {
            return;
          }
          galleryRenderer.moreBtn.classList.add('is-visible');
        }
        lightbox.refresh();
      })
      .catch(error => {
        alert(error.message);
      });
  }
}

const lightbox = new SimpleLightbox('.gallery-item-image a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onLoadMore() {
  page += 1;
  galleryRenderer.moreBtn.disabled = true;
  galleryRenderer.moreBtn.classList.remove('is-visible');
  galleryRenderer.loader.classList.add('is-visible');

  getImages(currentQuery, page)
    .then(data => {
      galleryRenderer.gallery.insertAdjacentHTML(
        'beforeend',
        createMarkup(data.hits)
      );
      galleryRenderer.moreBtn.disabled = false;
      galleryRenderer.moreBtn.classList.add('is-visible');
      galleryRenderer.loader.classList.remove('is-visible');

      if (data.totalHits >= itemsPerPage * page) {
        galleryRenderer.moreBtn.classList.add('is-visible');
        const galleryCard = document.querySelector('.gallery-item');
        const cardHeight = galleryCard.getBoundingClientRect().height;
        window.scrollBy({
          left: 0,
          top: cardHeight * 2,
          behavior: 'smooth',
        });
        lightbox.refresh();

        return;
      }
      galleryRenderer.moreBtn.classList.remove('is-visible');
      iziToast.show({
        message: `❌ We're sorry, but you've reached the end of search results.`,
        color: 'red',
        position: 'topRight',
        timeout: 2000,
        progressBar: false,
      });
    })
    .catch(error => {
      alert(error.message);
    });
}
