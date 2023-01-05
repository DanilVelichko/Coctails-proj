import axios from 'axios';
import { refs, fetchEl, point, counter } from './refs.js';
import { renderCard,formatScreenRender, cleanHTML, cleanPagination } from './global-functions.js';
import { createPagination } from './pagination.js';
const heroRefs = {
  searchByAbc: document.querySelector('.hero-search'),
  overlayBtn: document.querySelector('.hero-btn'),
  titleGallery: document.querySelector('.gallery__title'),
  boxPicture: document.querySelector('.gallery__no-find-box'),
};
heroRefs.searchByAbc.addEventListener('click', onSearch);

export let elBtn = '';
  
  async function onSearch(e) {
    elBtn = e.target.textContent;
    heroRefs.overlayBtn.innerHTML = `${elBtn}<span class="hero-btn--arrow"></span>`;

    formatScreenRender(galleryMarkup);

    // Рендерим Пагинацию под галереей карточек //
    let pagination = await createPagination(elBtn);

    point.paginationDiv.innerHTML = pagination;
    console.log(await createPagination(elBtn));
}

export async function galleryMarkup(i) {
  cleanHTML();
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
  heroRefs.titleGallery.innerHTML = "Sorry, we didn't find any cocktail for you";
  heroRefs.boxPicture.style.display = "block";
  cleanPagination();
}
