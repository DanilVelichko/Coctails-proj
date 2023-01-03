import axios from 'axios';
import { refs, fetchEl, point, counter } from './refs.js';

const heroRefs = {
  searchByAbc: document.querySelector('.hero-search'),
  overlayBtn: document.querySelector('.hero-btn'),
};
heroRefs.searchByAbc.addEventListener('click', onSearch);

function onSearch(e) {
  const elBtn = e.target.textContent;
  heroRefs.overlayBtn.innerHTML = `${elBtn}<span class="hero-btn--arrow"></span>`;

  gallerySearchCard(elBtn);
}

async function gallerySearchCard(elBtn) {
  point.galleryUl.innerHTML = '';
  try {
    const url = await axios.get(
      `${refs.ferstLetterSearch}${elBtn}`
    );
    renderMarkup(url.data.drinks);
  } catch (error) {
    console.log(error);
  }
}

function renderMarkup(card) {
  const markup = card
    .map(({ strDrinkThumb, strDrink }) => {
      return `
  <li class="gallery__coctail_box">
        <picture class="gallery__coctail_img">
          <source
            srcset="
              ${strDrinkThumb}/preview(350x350 pixels) 1x,
              ${strDrinkThumb}/preview(350x350 pixels) 2x
            "
            media="(max-width: 1280px)"
            type="image/png"
          />
          <source
            srcset="
              ${strDrinkThumb}/preview(350x350 pixels) 1x,
              ${strDrinkThumb}/preview(350x350 pixels) 2x
            "
            media="(max-width: 768px)"
            type="image/png"
          />
          <source
            srcset="
              ${strDrinkThumb}/preview(350x350 pixels) 1x,
              ${strDrinkThumb}/preview(350x350 pixels) 2x
            "
            media="(max-width: 480px)"
            type="image/png"
          />

          <img
            src="${strDrinkThumb}"
            alt="${strDrink}"
          />
        </picture>

        <h3 class="gallery__coctail_box-name">${strDrink}</h3>
        <div class="gallery__coctail_box-buttons">
          <button class="button__learn">Learn More</button>

          <button class="button__add">
            Add to
            <img
              class="heart__button"

              src="/images/Heart-white.svg"
              alt="Heart"

            />
          </button>
        </div>
      </li>
`
    }).join('');

  point.galleryUl.insertAdjacentHTML('beforeend', markup);
}

