// import { loadFromLocalStorage } from './global-functions';

// console.log(loadFromLocalStorage());
// console.log(serializedState);

// function load(CoctailsId) {
//   try {
//     const serializedState = localStorage.getItem(CoctailsId);
//     return serializedState === null ? undefined : JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   }
// }

// console.log(load());

function Storage() {
  const pool = JSON.parse(localStorage.getItem('CoctailsId'));
  console.log(pool);
}

Storage();
