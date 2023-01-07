import axios from 'axios';
import { refs, fetchEl, point, counter, favorites } from './refs.js';
import { renderCard, formatScreenRender, cleanHTML, cleanPagination, renderButtonInternals, formatScreenRenderGallery } from './global-functions.js';
import { createPagination } from './pagination.js';
const heroRefs = {
  searchByAbc: document.querySelector('.hero-search'),
  overlayBtn: document.querySelector('.hero-btn'),
  overlayArrow: document.querySelector('.hero-btn--arrow'),
  titleGallery: document.querySelector('.gallery__title'),
  boxPicture: document.querySelector('.gallery__no-find-box'),
};
heroRefs.searchByAbc.addEventListener('click', onSearch);

export let elBtn = '';
  async function onSearch(e) {
    elBtn = e.target.textContent;
    heroRefs.overlayBtn.innerHTML = `${elBtn}<span class="hero-btn--arrow"></span>`;
    activeStileBtn()
    formatScreenRender(galleryMarkup);

    // Рендерим Пагинацию под галереей карточек //
    point.paginationDiv.innerHTML = await createPagination(elBtn);
    console.log(await createPagination(elBtn));
    // doCurrentClass(e);
}

export async function galleryMarkup(i) {
  cleanHTML();
  try {
    const url = await axios.get(`${refs.ferstLetterSearch}${elBtn}`);
    point.galleryUl.insertAdjacentHTML('beforeend', renderCard(url.data.drinks[i]));
    
    heroRefs.titleGallery.innerHTML = 'Searching results';
    heroRefs.boxPicture.style.display = 'none';

    addBtnListener(id, (e) => {
          if (favorites.includes(drink.idDrink)) {
            favorites.splice(favorites.indexOf(drink.idDrink), 1);
          } else {
            favorites.push(drink.idDrink);
          }
          console.log(favorites);
          e.target.innerHTML = renderButtonInternals(drink.idDrink);
    });

  } catch (error) {
    if (point.galleryUl.textContent === '') onErrorFind();
  }
}

function onErrorFind() {
  heroRefs.titleGallery.innerHTML = "Sorry, we didn't find any cocktail for you";
  heroRefs.boxPicture.style.display = "block";
  cleanPagination();
}

function activeStileBtn() {
  heroRefs.overlayBtn.classList.add('active-btn')

}