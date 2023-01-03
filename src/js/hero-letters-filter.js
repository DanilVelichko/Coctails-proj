import axios from 'axios';
import { refs, fetchEl, point, counter } from './refs.js';
import { renderCard,formatScreenRender, cleanHTML } from './global-functions.js';

const heroRefs = {
  searchByAbc: document.querySelector('.hero-search'),
  overlayBtn: document.querySelector('.hero-btn'),
  titleGallery: document.querySelector('.gallery__title'),
  boxPicture: document.querySelector('.gallery__no-find-box'),
};
heroRefs.searchByAbc.addEventListener('click', onSearch);

let elBtn = ''
  
  function onSearch(e) {
    elBtn = e.target.textContent;
    heroRefs.overlayBtn.innerHTML = `${elBtn}<span class="hero-btn--arrow"></span>`;

  formatScreenRender(galleryMarkup);
};

async function galleryMarkup(i) {
  cleanHTML()
  try {
    const url = await axios.get(`${refs.ferstLetterSearch}${elBtn}`);
    point.galleryUl.insertAdjacentHTML('beforeend', renderCard(url.data.drinks[i]));

    heroRefs.titleGallery.innerHTML = 'Searching results';
    heroRefs.boxPicture.style.display = 'none';
  } catch (error) {
    if (point.galleryUl.textContent === '') onErrorFind();
  }
}

function onErrorFind() {
  heroRefs.titleGallery.innerHTML = "Sorry, we didn't find any cocktail for you"
  heroRefs.boxPicture.style.display = "block"
}