import { API } from './api.js';

function qS(selector) {
  return document.querySelector(selector);
}

qS('header input').addEventListener('keydown', (e) => {
  if(e.code != 'Enter') return;
  const value = qS('header input').value;
  API.search(value);
})

qS('main').addEventListener('click', (e)  => {
  if(e.target.classList.contains('forks')) {
    const href = e.target.href
    API.forks(href)
  }
})