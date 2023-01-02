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
    
  
}

