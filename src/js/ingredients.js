console.log('hello');

import axios from 'axios';
import { STORAGE_KEY, localStorageArr } from './refs';

// 
// console.log(localStorageArr);

function loadFromLocalStorage() {
  const serializedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(localStorageArr);
  if (localStorageArr.length === 0) {
    const create = `
    <p class="ingredients_text">
      You haven't added any favorite ingredients yet
    </p>
  `;
    document
      .querySelector('.favor-ingredients')
      .insertAdjacentHTML('beforeend', create);
  } else {
    for (let i = 0; i < localStorageArr.length; i++) {
      const element = localStorageArr[i];
      console.log(element);
      firstSearchId(element);
    }
  }
}

loadFromLocalStorage();

async function firstSearchId(ele) {
  try {
    const result = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552`
    );
    ingredientsIdMarkup(result);
  } catch (error) {
    console.error('Get state error:', error.message);
  }
}

function ingredientsIdMarkup(id) {
  const drinks = id.data.drinks[0];
  console.log(drinks);

  //   const { strDrinkThumb, strDrink } = drinks;

  //   const create = `<div class="favor-ingredients__cards">
  //     <ul class="favor-ingredients__border">
  //       <li>
  //         <h2 class="favor-ingredients__cocktail-name">Campari</h2>
  //         <p class="favor-ingredients__ingredients-name">Liqueur</p>
  //         <div class="favor-ingredients__cocktail-buttons">

  //           <button class="favor-ingredients__learn button__learn">
  //             Learn More
  //           </button>

  //           <button class="favor-ingredients__remove button__remove_mobile">
  //             Remove
  //           </button>

  //         </div>
  //       </li>
  //     </ul>
  //   </div>
  // `;
  //   document
  //     .querySelector('.favorite__flex')
  //     .insertAdjacentHTML('beforeend', create);
}
