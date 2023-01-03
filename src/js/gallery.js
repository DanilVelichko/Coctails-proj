import axios from "axios";
import debounce from 'debounce';
import { renderCard, formatScreenRender, cleanHTML } from "./global-functions.js";
import { refs, fetchEl, point, counter } from './refs.js';

async function galleryMarkup() {
    cleanHTML();
    try {
        const response = await axios.get(refs.randomCoctailApi);

        console.log(response.data.drinks[0]);
        point.galleryUl.insertAdjacentHTML('beforeend', renderCard(response.data.drinks[0]));
      
    } catch (error) {
        console.dir(error);
    }
}



const debouncedRender = debounce(formatScreenRender, 1000);
debouncedRender();
window.addEventListener('resize', debouncedRender);