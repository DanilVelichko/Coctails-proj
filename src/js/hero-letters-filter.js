import axios from 'axios';
import { refs, point } from './refs.js';
import { renderCard, formatScreenRender, cleanHTML, cleanPagination} from './global-functions.js';
import { createPagination, pagRefs } from './pagination.js';

// document.addEventListener('DOMContentLoaded', () => {
const heroRefs = {
  searchByAbc: document.querySelector('.hero-search'),
  overlayBtn: document.querySelector('.hero-btn'),
  overlayArrow: document.querySelector('.hero-btn--arrow'),
  titleGallery: document.querySelector('.gallery__title'),
  boxPicture: document.querySelector('.gallery__no-find-box'),
}; 
 // },false )
  heroRefs.searchByAbc.addEventListener('click', onSearch);

export let elBtn = '';

async function onSearch(e) {
    elBtn = e.target.textContent;
    heroRefs.overlayBtn.innerHTML = `${elBtn}<span class="hero-btn--arrow"></span>`;
    heroRefs.overlayBtn.classList.add('active-btn');
    formatScreenRender(galleryMarkup);
    
    // Рендерим Пагинацию под галереей карточек //
    pagRefs.pagContainer.classList.remove('visually-hidden');
    point.paginationDiv.innerHTML = await createPagination(elBtn);
    // doCurrentClass(e);
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
  pagRefs.pagContainer.classList.add('visually-hidden');
}
