import { refs, fetchEl, point, counter } from './refs.js';
import axios from 'axios';
import { elBtn } from './hero-letters-filter.js';

export async function createPagination(letter) {
  const pageSize = counter.desktop;
  const data = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${letter}`);
  // const data = await response.json();
  console.log(data.data.drinks);
  const totalResults = data.data.drinks.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  console.log('Total results', totalResults);
  console.log('Totalpages', totalPages);
  let pagination = '';
  let currentPage = 1;
  
  // Add a "Previous" button if necessary
  if (currentPage > 1) {
    pagination += '<button class="pagination__button" onclick="goToPage(' + (currentPage - 1) + ')">Previous</button>';
  }
  
  // Add page buttons
  for (let k = 1; k <= totalPages; k++) {
    pagination += '<button class="pagination__button" onclick="goToPage(' + k + ')"';
    if (k === currentPage) {
      pagination += ' class="pagination__button current"';
    }
    pagination += '>' + k + '</button>';
  }
  
  // Add a "Next" button if necessary
  if (currentPage < totalPages) {
    pagination += '<button class="pagination__button" onclick="goToPage(' + (currentPage + 1) + ')">Next</button>';
  }
  
  if (totalPages == 0) {
    cleanPagination();
  }
  return pagination;
}


// const letter = 'a';
// const currentPage = 1;
// const pagination = createPagination(letter, currentPage);
// document.querySelector('.pagination').innerHTML = pagination;


console.log('Подключена страница Pagination');