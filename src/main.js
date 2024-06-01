import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages, itemsPerPage } from './js/pixabay-api';
import createMarkup from './js/render-functions';

const showLoadMore = () => {
  galleryRenderer.moreBtn.classList.add('is-visible');
  galleryRenderer.moreBtn.disabled = false;
};
const hideLoadMore = () => {
  galleryRenderer.moreBtn.classList.remove('is-visible');
  galleryRenderer.moreBtn.disabled = true;
};

const showLoader = () => {
  galleryRenderer.loader.classList.add('is-visible');
};
const hideLoader = () => {
  galleryRenderer.loader.classList.remove('is-visible');
};

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
    hideLoadMore();
    iziToast.show({
      message: '❌ Please enter a search query',
      color: 'red',
      position: 'topRight',
      timeout: 2000,
      progressBar: false,
    });
  } else {
    galleryRenderer.form.reset();
    showLoader();
    getImages(searchQuery, page)
      .then(data => {
        if (!data.hits.length) {
          hideLoader();
          iziToast.show({
            message:
              '❌ Sorry, there are no images matching your search query. Please try again!',
            color: 'red',
            position: 'topRight',
            timeout: 2000,
            progressBar: false,
          });
        } else {
          hideLoader();
          galleryRenderer.gallery.insertAdjacentHTML(
            'beforeend',
            createMarkup(data.hits)
          );
          if (data.totalHits <= itemsPerPage) {
            return;
          }
          showLoadMore();
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
  hideLoadMore();
  showLoader();
  getImages(currentQuery, page)
    .then(data => {
      galleryRenderer.gallery.insertAdjacentHTML(
        'beforeend',
        createMarkup(data.hits)
      );
      showLoadMore();
      hideLoader();

      if (data.totalHits >= itemsPerPage * page) {
        showLoadMore();
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
      hideLoadMore();
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
