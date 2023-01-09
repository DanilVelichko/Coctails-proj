import { refs, fetchEl, point, counter, localStorageArr, favorites } from './refs.js';
import {learnId} from './favorite-button';
import axios from 'axios';
import { saveInLocalStorage } from './global-functions.js';
import { ingredPoints, onIngredient, ingr } from './modal-ingredients.js';


export const modalCocktail = document.querySelector('.modal-cocktail');
const overlayCocktail = document.querySelector('.overlay');
const btnCloseModalCocktail = document.querySelector('.close-modal-cocktail');
const btnOpenModalCocktail = document.querySelector('.show-modal-cocktail');
let idDrinkModal = 0;

export const openModalCoctail = async () => {
  modalCocktail.classList.remove('hidden');
  overlayCocktail.classList.remove('hidden');

};

const closeModalCoctail =  () => {
  modalCocktail.classList.add('hidden');
  overlayCocktail.classList.add('hidden');
  point.modalRenderBoxCocktail.innerHTML = '';
};

btnOpenModalCocktail.addEventListener('click', openModalCoctail);
btnCloseModalCocktail.addEventListener('click', closeModalCoctail);
overlayCocktail.addEventListener('click', closeModalCoctail);

document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'Escape' && !modalCocktail.classList.contains('hidden')) {
    closeModalCoctail();
    point.modalRenderBoxCocktail.innerHTML = '';
  }
});

export const modalMarkupCocktail = async () => {
  
  try {
    const url = await axios.get(`${refs.idApiSearch}${learnId}`);
    point.modalRenderBoxCocktail.insertAdjacentHTML('beforeend', renderModalCocktail(url.data.drinks[0]));
    document.addEventListener("click", onFavoriteModal);
    
  } catch (error) {
    
  }


};

export function renderModalCocktail ({strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, idDrink, strDrink, strInstructions, strDrinkThumb, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5 }) {
  idDrinkModal = idDrink;
  ingr.one = strIngredient1;
  ingr.two = strIngredient2;
  ingr.three = strIngredient3;
  ingr.four = strIngredient4;
  ingr.five = strIngredient5;

  if (strDrink.length > 25) {
    let render = `<h1 class="Coctails-title" style="font-size: 30px">${strDrink}</h1>
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
  if (strIngredient1) { render +=`
        <li class="">
          <p href="#" class="Coctails-link"> ✶ ${strMeasure1} ${strIngredient1} </p>
        </li>`;
}
  if (strIngredient2) { render +=
    `<li class="">
          <a href="#" class="Coctails-link"> ✶ ${strMeasure2} ${strIngredient2}</a>
        </li>`}
  if (strIngredient3) {
    `<li class="">
          <a href="#" class="Coctails-link"> ✶ ${strMeasure3} ${strIngredient3} </a>
        </li>`;
}
  if (strIngredient4) {
    `<li class="">
          <a href="#" class="Coctails-link"> ✶ ${strMeasure4} ${strIngredient4} </a>
        </li>`;
}
  if (strIngredient5) {
    render +=
    `<li class="#">
          <a href="" class="Coctails-link"> ✶ ${strMeasure5} ${strIngredient5} </a>
        </li>`;
}
  render += `</ul>
      <button type="button" class="Add-button">Add to favorite</button>
    </div>
`;
   } else {
    render = `<h1 class="Coctails-title">${strDrink}</h1>
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
    if (strIngredient1) { render +=`
        <li class="">
          <a href="#" class="Coctails-link"> ✶ ${strMeasure1} ${strIngredient1} </a>
        </li>`;
}
  if (strIngredient2) { render +=
    `<li class="">
          <a href="#" class="Coctails-link"> ✶ ${strMeasure2} ${strIngredient2}</a>
        </li>`}
  if (strIngredient3) {
    `<li class="">
          <a href="#" class="Coctails-link"> ✶ ${strMeasure3} ${strIngredient3} </a>
        </li>`;
}
  if (strIngredient4) {
    `<li class="">
          <a href="#" class="Coctails-link"> ✶ ${strMeasure4} ${strIngredient4} </a>
        </li>`;
}
  if (strIngredient5) {
    render +=
    `<li class="">
          <a href="#" class="Coctails-link"> ✶ ${strMeasure5} ${strIngredient5} </a>
        </li>`;
}
  render += `</ul>
      <button type="button" class="Add-button">Add to favorite</button>
    </div>
`;
  }
  
  // console.log(render);
return render;
}

const onFavoriteModal = (e) => {
  const element = idDrinkModal;
  const getName = e.target.textContent;
  if (getName === 'Add to favorite' || getName === 'Remove from favorite') {

    if (/^\d{5}$/.test(element) || /^\d{6}$/.test(element)) {
      if (!localStorageArr.includes(element)) {
        localStorageArr.push(element);
        e.target.textContent = 'Remove from favorite';
      } else {
        const index = localStorageArr.indexOf(element);
        if (index > -1) {
          localStorageArr.splice(index, 1);
        }
        e.target.textContent = 'Add to favorite';
      }
      saveInLocalStorage('CoctailsId', localStorageArr);
    }
    console.log("Click FavIdDrink", idDrinkModal);
  }
  if ((getName.includes(ingr.one) || 
    getName.includes(ingr.two) || 
    getName.includes(ingr.three) || 
    getName.includes(ingr.four) || 
    getName.includes(ingr.five)) && getName.length < 20) {
    onIngredient(getName);

    } 
};

