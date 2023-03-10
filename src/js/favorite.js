import axios from 'axios';
import { STORAGE_KEY } from './refs';

const refs = {
  buttonStart: document.querySelector('.favorite__link__cocktails'),
  heroSection: document.querySelector('.hero-view'),
  gallerySection: document.querySelector('.gallery-view'),
  favoriteSection: document.querySelector('.favorite-coctails-view'),
  favorite: document.querySelector('.favorite'),
  ulFlex: document.querySelector('.favorite__flex'),
  // removeId: document.querySelector('.favorite__border removeId'),
};

console.log(refs.ulFlex);

refs.buttonStart.addEventListener('click', loadFromLocalStorage);

function loadFromLocalStorage() {
  refs.heroSection.classList.add('visually-hidden');
  refs.gallerySection.classList.add('visually-hidden');
  refs.favoriteSection.classList.remove('visually-hidden');
  getStorage();
}

function getStorage() {
  const serializedState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (serializedState.length === 0) {
    const create = `
    <p class="cocktails_text">
      You haven't added any favorite cocktails yet
    </p>
  `;
    refs.favorite.insertAdjacentHTML('beforeend', create);
  } else {
    serializedState.forEach(element => {
      firstSearchId(element);
    });
  }
}

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
  const { strDrinkThumb, strDrink, idDrink } = drinks;
  const create = `
    <li class="favorite__border removeId">
    <picture class="favorite__img">
          <source
            srcset="
              ${strDrinkThumb} 1x,
              ${strDrinkThumb} 2x
            "
            media="(max-width: 1280px)"
            type="image/png"
          />
          <source
            srcset="
              ${strDrinkThumb} 1x,
              ${strDrinkThumb} 2x
            "
            media="(max-width: 768px)"
            type="image/png"
          />
          <source
            srcset="
              ${strDrinkThumb} 1x,
              ${strDrinkThumb} 2x
            "
            media="(max-width: 480px)"
            type="image/png"
          />
          <img
            src="${strDrinkThumb}"
            alt="${strDrink}"
          />
        </picture>
      <h2 class="favorite__cocktail-name">${strDrink}</h2>
      <div class="favorite__cocktail-buttons">
        <button class="favorite__learn button__learn">Learn More</button>
        
        <button class="favorite__remove button__remove_mobile" data-id =${idDrink}>
          Remove
                  <svg
                width="21"
                height="19"
                viewBox="0 0 21 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 19L8.9775 17.6332C3.57 12.7978 0 9.60872 0 5.69482C0 2.50572 2.541 0 5.775 0C7.602 0 9.3555 0.838692 10.5 2.16403C11.6445 0.838692 13.398 0 15.225 0C18.459 0 21 2.50572 21 5.69482C21 9.60872 17.43 12.7978 12.0225 17.6436L10.5 19Z"
                  fill="#FD5103"
                />
                <path
                  d="M10.5 17L9.2675 15.921C4.89 12.1035 2 9.58583 2 6.49591C2 3.9782 4.057 2 6.675 2C8.154 2 9.5735 2.66213 10.5 3.70845C11.4265 2.66213 12.846 2 14.325 2C16.943 2 19 3.9782 19 6.49591C19 9.58583 16.11 12.1035 11.7325 15.9292L10.5 17Z"
                  fill="#FCFCFC"
                />
        </button>
      </div>
    </li>
  `;
  refs.ulFlex.insertAdjacentHTML('beforeend', create);
}

refs.ulFlex.addEventListener('click', event => {
  if (event.target.innerText === 'Remove') {
    removeCocktail(event);
  } else if (event.target.innerText === 'Learn More') {
    console.log('?????? ???????????? Modal!');
  }
});

function removeCocktail(event) {
  const allCardId = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  // allCardId.forEach(element => {
  //   // console.dir(element);
  // });
  const cardId = event.target.dataset.id;
  const newFav = allCardId.filter(ele => ele !== cardId);
  removeCocktailId(newFav, cardId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newFav));
}

function removeCocktailId(element, id) {
  console.log(element.length !== localStorage.getItem(STORAGE_KEY).length);
  if (element.length !== localStorage.getItem(STORAGE_KEY).length) {
    const btn = document.querySelector(`[data-id="${id}"`);
    const liEl = btn.closest('li');

    // const arr = Array.from(liEl);
    // arr.find(el => console.log('el :>> ', el.dataset.id));
    // liEl.classList.add('visually-hidden');
    liEl.remove();
    // getStorage();
  }
}
