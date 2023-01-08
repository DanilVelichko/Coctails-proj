
import { refs, fetchEl, point, counter, localStorageArr, favorites } from './refs.js';
import {learnId} from './favorite-button'
import axios from 'axios';
import { learnId } from './favorite-button.js';

const modalCocktail = document.querySelector('.modal-cocktail');
const overlayCocktail = document.querySelector('.overlay');
const btnCloseModalCocktail = document.querySelector('.close-modal-cocktail');
const btnOpenModalCocktail = document.querySelector('.show-modal-cocktail');

export const openModalCoctail = async () => {
  modalCocktail.classList.remove('hidden');
  overlayCocktail.classList.remove('hidden');

};

const closeModalCoctail =  () => {
  modalCocktail.classList.add('hidden');
  overlayCocktail.classList.add('hidden');
};

btnOpenModalCocktail.addEventListener('click', openModalCoctail);
btnCloseModalCocktail.addEventListener('click', closeModalCoctail);
overlayCocktail.addEventListener('click', closeModalCoctail);

document.addEventListener('keydown', function (e) {
  console.log(e.key);

  if (e.key === 'Escape' && !modalCocktail.classList.contains('hidden')) {
    closeModal();
  }
});

export const modalMarkupCocktail = async (learnId) => {
  try {

    const url = await axios.get(`${refs.idApiSearch}${learnId}`);
    console.log(url);
    point.modalRenderBoxCocktail.insertAdjacentHTML('beforeend', renderModalCocktail(url.data.drinks[0]));

    
  } catch (error) {
    
  
  }
};

export function renderModalCocktail ({strMeasure1, idDrink, strDrink, strInstructions, strDrinkThumb }) {
  let render = `<h1 class="Coctails-title">${strDrink}</h1>
      <h2 class="Coctails-instractions">Instructions:</h2>
      <p class="Coctails-description">
        ${strInstructions}
      </p>
      <img
        src="${strDrinkThumb}"
        alt="${strDrink}"
        width="280px"
        height="280px"
        class="Coctails-pic"
      />
      <h2 class="Coctails-ingredients">INGREDIENTS</h2>
      <p class="Per-cocktail">Per cocktail</p>
      <ul class="Coctails-list">`; 
  if (idDrink) { render +=`
        <li class="">
          <a href="" class="Coctails-link"> ✶ Ice </a>
        </li>`;
}
  if (idDrink) { render +=
    `<li class="">
          <a href="" class="Coctails-link"> ✶ 1 ounce gin </a>
        </li>`}
        if (idDrink) {`<li class="">
          <a href="" class="Coctails-link"> ✶ 1 ounce Campari </a>
        </li>`}
  if (idDrink) {
    `<li class="">
          <a href="" class="Coctails-link"> ✶ 1 ounce sweet vermouth </a>
        </li>`}
  if (idDrink) { render +=
    `<li class="">
          <a href="" class="Coctails-link"> ✶ Garnish: orange peel </a>
        </li>`}
  render += `</ul>
      <button type="button" class="Add-button">Add to favorite</button>
    </div>
`;
return render;
}

console.log("JS page Modal Cockteil");
