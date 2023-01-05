// import { loadFromLocalStorage } from './global-functions';

// function storageHost(CoctailsId) {
//   console.log(loadFromLocalStorage());
// }

// storageHost(CoctailsId);

import axios from 'axios';

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('CoctailsId');
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

const cocktailId = loadFromLocalStorage();

async function firstSearchId(ele) {
  try {
    const result = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
    );
    console.log(result);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

firstSearchId();
