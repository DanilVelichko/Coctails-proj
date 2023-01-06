import axios from 'axios';
import { STORAGE_KEY } from './refs';

const favoriteCards = document.querySelector('.favorite__flex');

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

const cocktailId = loadFromLocalStorage();

function countCocktailId(count) {
  count.forEach(ele => {
    countId = ele;
    firstSearchId();
  });
}

countCocktailId(cocktailId);

async function firstSearchId() {
  try {
    const result = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${countId}`
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
          <img
            class="favorite__heart"
            src="./src/images/icons/Vector.png"
            alt="Heart red and white"
            width="18"
            height="18"
          />
        </button>
      </div>
    </li>
  </ul>
  `;
  favoriteCards.insertAdjacentHTML('beforeend', create);
}
