import { API } from './api.js';

function qS(selector) {
  return document.querySelector(selector);
}

qS('header input').addEventListener('keydown', async (e) => {
  if(e.code != 'Enter') return
  const value = qS('header input').value
  await API.search(value)
})