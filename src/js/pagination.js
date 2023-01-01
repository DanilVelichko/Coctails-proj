import { refs, fetchEl, point, counter } from './refs.js';

async function createPagination(letter, currentPage) {
  const pageSize = 10;
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${letter}&p=${currentPage}`);
  const data = await response.json();
  const totalResults = data.totalResults;
  const totalPages = Math.ceil(totalResults / pageSize);
  
  let pagination = '';
  
  // Add a "Previous" button if necessary
  if (currentPage > 1) {
    pagination += '<button onclick="goToPage(' + (currentPage - 1) + ')">Previous</button>';
  }
  
  // Add page buttons
  for (let i = 1; i <= totalPages; i++) {
    pagination += '<button onclick="goToPage(' + i + ')"';
    if (i === currentPage) {
      pagination += ' class="current"';
    }
    pagination += '>' + i + '</button>';
  }
  
  // Add a "Next" button if necessary
  if (currentPage < totalPages) {
    pagination += '<button onclick="goToPage(' + (currentPage + 1) + ')">Next</button>';
  }
  
  return pagination;
}


const letter = 'a';
const currentPage = 3;
const pagination = await createPagination(letter, currentPage);
document.getElementById('pagination').innerHTML = pagination;
