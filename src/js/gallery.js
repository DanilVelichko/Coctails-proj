import axios from "axios";

import { refs, fetchEl, point } from './refs.js';

async function galleryMarkup() {
    clearHTML();
    try {
        const response = await axios.get(refs.randomCoctailApi);

        console.log(response.data.drinks[0]);
        point.galleryUl.insertAdjacentHTML('beforeend', renderCard(response.data.drinks[0]));
      
    } catch (error) {
        console.dir(error);
    }
}



function renderCard({ strDrinkThumb, strDrink }) {
return `
  <li class="gallery__coctail_box">
        // <picture class="gallery__coctail_img">
        //   <source
        //     srcset="
        //       ${strDrinkThumb}/preview (350x350 pixels) 1x,
        //       ${strDrinkThumb}/preview (350x350 pixels) 2x
        //     "
        //     media="(max-width: 1280px)"
        //     type="image/png"
        //   />
        //   <source
        //     srcset="
        //       ${strDrinkThumb}/preview (350x350 pixels) 1x,
        //       ${strDrinkThumb}/preview (350x350 pixels) 2x
        //     "
        //     media="(max-width: 768px)"
        //     type="image/png"
        //   />
        //   <source
        //     srcset="
        //       ${strDrinkThumb}/preview (350x350 pixels) 1x,
        //       ${strDrinkThumb}/preview (350x350 pixels) 2x
        //     "
        //     media="(max-width: 480px)"
        //     type="image/png"
        //   />

          <img
            src="${strDrinkThumb}"
            alt="${strDrink}"
          />
        // </picture>

        <h3 class="gallery__coctail_box-name">${strDrink}</h3>
        <div class="gallery__coctail_box-buttons">
          <button class="button__learn">Learn More</button>

          <button class="button__add">
            Add to
            <img
              class="heart__button"
              src="/src/images/Heart-white.svg"
              alt="Heart red and white"
            />
          </button>
        </div>
      </li>
`;
  

}

function clearHTML() {
    point.galleryUl.innerHTML = '';
   
}
galleryMarkup();