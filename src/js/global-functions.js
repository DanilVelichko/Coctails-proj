import { refs, fetchEl, point, counter } from './refs.js';

export const renderCard = ({ strDrinkThumb, strDrink, idDrink }) => {
    return `
  <li class="gallery__coctail_box">
        <picture class="gallery__coctail_img">
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

        <h3 class="gallery__coctail_box-name">${strDrink}</h3>
        <div class="gallery__coctail_box-buttons">
          <button class="button__learn">Learn More</button>

          <button class="button__add">
            Add to
            <img
              class="heart__button"

              src="./images/Heart-white.svg"
              alt="Heart"
             
            /><div class="coctailsId visually-hidden">${idDrink}</div>
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

// FOR LOCAL STORAGE //

export const saveInLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

export const loadFromLocalStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

console.log('Global functions')