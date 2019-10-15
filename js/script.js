import { API } from './api.js';
import { Generator } from './htmlGen.js';

function qS(selector) {
  return document.querySelector(selector);
}

qS('header input').addEventListener('keydown', async (e) => {
  if(e.code != 'Enter') return;
  const value = qS('header input').value;
  Generator.clear()
  const repos = await API.search(value)
  repos.forEach(repo => {
      Generator.repoCard(repo)
  });
})

qS('main').addEventListener('click', async (e)  => {
  if(e.target.classList.contains('forks')) {
    const href = e.target.href;
    API.forks(href);
  }
})

