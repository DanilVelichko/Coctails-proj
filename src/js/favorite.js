import axios from 'axios';
import { STORAGE_KEY } from './refs';

const favoriteCards = document.querySelector('.favorite__flex');

let STORAGE_KEY = [];

function loadFromLocalStorage() {
  if (STORAGE_KEY !== undefined) {
    const serializedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    serializedState.forEach(ele => firstSearchId(ele));
    console.log('yhoooooo!');
    return;
  } else {
    console.log('DONE!!!');
  }
}

loadFromLocalStorage();

async function firstSearchId(ele) {
  try {
    const result = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ele}`
    );
    cocktailIdMarkup(result);
  } catch (error) {
    console.error('Get state error:', error.message);
  }
}

function cocktailIdMarkup(id) {
  const drinks = id.data.drinks[0];
  const { strDrinkThumb, strDrink } = drinks;
  const create = `<ul class="favorite__border">
    <li>
      <img
        class="favorite__img"
        src=${strDrinkThumb}
        alt=${strDrink}
      />
      <h2 class="favorite__cocktail-name">${strDrink}</h2>
      <div class="favorite__cocktail-buttons">
        <button class="favorite__learn button__learn">Learn More</button>

        <button class="favorite__remove button__remove_mobile">
          Remove
                      <svg width="21" height="19" viewBox="0 0 21 19" fill="orang" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 19L8.9775 17.6332C3.57 12.7978 0 9.60872 0 5.69482C0 2.50572 2.541 0 5.775 0C7.602 0 9.3555 0.838692 10.5 2.16403C11.6445 0.838692 13.398 0 15.225 0C18.459 0 21 2.50572 21 5.69482C21 9.60872 17.43 12.7978 12.0225 17.6436L10.5 19Z" fill="#FD5103"/>
<path d="M10.5 17L9.2675 15.921C4.89 12.1035 2 9.58583 2 6.49591C2 3.9782 4.057 2 6.675 2C8.154 2 9.5735 2.66213 10.5 3.70845C11.4265 2.66213 12.846 2 14.325 2C16.943 2 19 3.9782 19 6.49591C19 9.58583 16.11 12.1035 11.7325 15.9292L10.5 17Z" fill="#FCFCFC"/>
</svg>
        </button>
      </div>
    </li>
  </ul>
  `;
  favoriteCards.insertAdjacentHTML('beforeend', create);
}
