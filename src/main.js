import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages, itemsPerPage } from './js/pixabay-api';
import createMarkup from './js/render-functions';

const toggleVisibility = (element, isVisible) => {
  element.classList.toggle('is-visible', isVisible);
  if (element === galleryRenderer.moreBtn) {
    element.disabled = !isVisible;
  }
};
const showLoadMore = () => toggleVisibility(galleryRenderer.moreBtn, true);
const hideLoadMore = () => toggleVisibility(galleryRenderer.moreBtn, false);
const showLoader = () => toggleVisibility(galleryRenderer.loader, true);
const hideLoader = () => toggleVisibility(galleryRenderer.loader, false);

const iziToastConfig = {
  color: 'red',
  position: 'topRight',
  timeout: 3000,
  progressBar: false,
};
const popups = {
  show(message) {
    iziToast.show({
      ...iziToastConfig,
      message,
    });
  },
  emptyQueryError() {
    this.show('❌ Please enter a search query');
  },
  reachedLimitError() {
    this.show(`❌ We're sorry, but you've reached the end of search results.`);
  },
  noResultsError() {
    this.show(
      '❌ Sorry, there are no images matching your search query. Please try again!'
    );
  },
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
  e.preventDefault();
  hideLoadMore();
  page = 1;
  currentQuery = e.target.elements['search-input'].value.trim().toLowerCase();
  galleryRenderer.gallery.innerHTML = '';

  if (!currentQuery) {
    hideLoadMore();
    popups.emptyQueryError();
    return;
  }

  galleryRenderer.form.reset();
  showLoader();

  getImages(currentQuery, page)
    .then(data => {
      hideLoader();
      if (!data.hits.length) {
        popups.noResultsError();
        return;
      }

      galleryRenderer.gallery.insertAdjacentHTML(
        'beforeend',
        createMarkup(data.hits)
      );

      if (data.totalHits > itemsPerPage) {
        showLoadMore();
      }
      lightbox.refresh();
    })
    .catch(error => {
      popups.show(`❌ ${error.message}`);
    });
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
      hideLoader();
      galleryRenderer.gallery.insertAdjacentHTML(
        'beforeend',
        createMarkup(data.hits)
      );

      if (data.totalHits > itemsPerPage * page) {
        showLoadMore();
        const galleryCard = document.querySelector('.gallery-item');
        const cardHeight = galleryCard.getBoundingClientRect().height;
        window.scrollBy({
          left: 0,
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      } else {
        popups.reachedLimitError();
      }
      lightbox.refresh();
    })
    .catch(error => {
      hideLoader();
      popups.show(`❌ ${error.message}`);
    });
}
