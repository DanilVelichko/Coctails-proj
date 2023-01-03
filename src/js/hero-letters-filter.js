import axios from 'axios';
import { refs, fetchEl, point, counter } from './refs.js';


const heroRefs = {
  searchByAbc: document.querySelector('.hero-search'),
  overlayBtn: document.querySelector('.hero-btn'),
  titleGallery: document.querySelector('.gallery__title'),
  boxPicture: document.querySelector('.gallery__no-find-box'),
};
heroRefs.searchByAbc.addEventListener('click', onSearch);

let elBtn = ''
  
  function onSearch(e) {
    elBtn = e.target.textContent;
    heroRefs.overlayBtn.innerHTML = `${elBtn}<span class="hero-btn--arrow"></span>`;

  formatScreenRender();
};

function formatScreenRender() {
  if (window.matchMedia('(min-width: 1280px)').matches) {
    for (let i = 0; i < counter.desktop; i++) {
      galleryMarkup(i);
    }
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    for (let i = 0; i < counter.tablet; i++) {
      galleryMarkup(i);
    }
  } else if (window.matchMedia('(max-width: 767px)').matches) {
    for (let i = 0; i < counter.mobile; i++) {
      galleryMarkup(i);
    }
  } else {
  }
}

async function galleryMarkup(i) {
  point.galleryUl.innerHTML = '';
  try {
    const url = await axios.get(`${refs.ferstLetterSearch}${elBtn}`);
    point.galleryUl.insertAdjacentHTML('beforeend', renderMarkup(url.data.drinks[i]));

    heroRefs.titleGallery.innerHTML = 'Searching results';
    heroRefs.boxPicture.style.display = 'none';
  } catch (error) {
    if (point.galleryUl.textContent === '') onErrorFind();
  }
}

function renderMarkup({ strDrinkThumb, strDrink }) {
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

              src="./images/Heart-white.svg"
              alt="Heart"

            />
          </button>
        </div>
      </li>
`;
}

function onErrorFind() {
  heroRefs.titleGallery.innerHTML = "Sorry, we didn't find any cocktail for you"
  heroRefs.boxPicture.style.display = "block"
}

