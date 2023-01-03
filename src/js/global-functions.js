import { refs, fetchEl, point, counter } from './refs.js';

export const renderCard = ({ strDrinkThumb, strDrink }) => {
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
};
  

export const formatScreenRender =  (yourFetchFunction) => {
    if (window.matchMedia("(min-width: 1280px)").matches) {
        for (let i = 0; i < counter.desktop; i++) {
            yourFetchFunction();
        }
        
    }

    else if (window.matchMedia("(min-width: 768px)").matches) {
        for (let i = 0; i < counter.tablet; i++) {
            yourFetchFunction();
        }
      
    }
    else if (window.matchMedia("(max-width: 480px)").matches) {
        for (let i = 0; i < counter.mobile; i++) {
            yourFetchFunction();
        }
        
    } else {
        

    }
};

export const cleanHTML = () => {
    point.galleryUl.innerHTML = '';
};