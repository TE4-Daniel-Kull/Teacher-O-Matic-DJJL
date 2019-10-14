import { API } from './api.js';

function qS(selector) {
  return document.querySelector(selector);
}

qS('input').addEventListener('keydown', async (e) => {
  if(e.code != 'Enter') return
  await API.search()
})