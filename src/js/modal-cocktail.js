import { refs, fetchEl, point, counter, localStorageArr, favorites } from './refs.js';
import axios from 'axios';

const modalCocktail = document.querySelector('.modal-cocktail');
const overlayCocktail = document.querySelector('.overlay');
const btnCloseModalCocktail = document.querySelector('.close-modal-cocktail');
const btnOpenModalCocktail = document.querySelector('.show-modal-cocktail');

export const openModalCoctail = async (idCocktail) => {
  modalCocktail.classList.remove('hidden');
  overlayCocktail.classList.remove('hidden');

  await modalMarkupCocktail(idCocktail);
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

const modalMarkupCocktail = async (idCocktail) => {
  try {
    const url = await axios.get(`${refs.idApiSearch}${idCocktail}`);
      console.log(url.data.drinks)
    point.modalRenderBoxCocktail.insertAdjacentHTML('beforeend', renderModalCocktail(url.data.drinks[i]) );
    
    

  } catch (error) {
    
  }

};

const renderModalCocktail = ({strMeasure1, idDrink, strDrink, strInstructions, strDrinkThumb }) => {
  return `
   <h1 class="Coctails-title">${strDrink}</h1>
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
      <ul class="Coctails-list">
        <li class="">
          <a href="" class="Coctails-link"> ✶ Ice </a>
        </li>
        <li class="">
          <a href="" class="Coctails-link"> ✶ 1 ounce gin </a>
        </li>
        <li class="">
          <a href="" class="Coctails-link"> ✶ 1 ounce Campari </a>
        </li>
        <li class="">
          <a href="" class="Coctails-link"> ✶ 1 ounce sweet vermouth </a>
        </li>
        <li class="">
          <a href="" class="Coctails-link"> ✶ Garnish: orange peel </a>
        </li>
      </ul>
      <button type="button" class="Add-button">Add to favorite</button>
    </div>
`;
}

console.log("JS page Modal Cockteil")