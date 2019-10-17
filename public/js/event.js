import { API } from './api.js';
import { Generator } from './htmlGen.js';

function qS(selector) {
  return document.querySelector(selector);
}

export class EventListeners {

  static async search(e) {
    if(e.code != 'Enter') return;
    qS('main').classList.add('triple');
    qS('main').classList.remove('double');
    const value = qS('header input').value;
    Generator.clear();
    const repos = await API.search(value);
    repos.forEach(repo => {
        Generator.repoCard(repo);
    });
  }

  static async forks(e) {
    if(e.target.classList.contains('forks_url')) {
      e.preventDefault();
      qS('main').classList.remove('triple');
      qS('main').classList.add('double');
      const href = e.target.href;
      Generator.clear();
      const forks = await API.forks(href);
      await forks.forEach(async fork => {
        await Generator.forkCard(fork);
      })
    }
  }

}