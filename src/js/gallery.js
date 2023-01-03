import axios from "axios";
import debounce from 'debounce';
import { renderCard, formatScreenRender, cleanHTML } from "./global-functions.js";
import { refs, fetchEl, point, counter } from './refs.js';

const debouncedRender = debounce(formatScreenRender(galleryMarkup), 1000);


async function galleryMarkup() {
    cleanHTML();
    try {
        const response = await axios.get(refs.randomCoctailApi);
        point.galleryUl.insertAdjacentHTML('beforeend', renderCard(response.data.drinks[0]));
      
    } catch (error) {
        console.dir(error);
    }
}

debouncedRender();
window.addEventListener('resize', debouncedRender);