import { API } from './api.js';
import { Generator } from './htmlGen.js';

function qS(selector) {
  return document.querySelector(selector);
}

/**
 * Class containing all our functionality when certain events are triggered
 */
export class EventListener {
  /**
   * This function is called whenever the user wishes to
   * search for a user's repositories. It creates HTML for each repository.
   *
   * @param {EventObject} e Object containing all data regarding the event
   */
  static async search(e) {
    qS('main').classList.add('triple');
    qS('main').classList.remove('double');
    const value = qS('header input').value;
    Generator.clear();
    const repos = await API.search(value);
    repos.forEach((repo) => {
        Generator.repoCard(repo);
    });
  }

  /**
   * This function is called whenever the user wishes to
   * view all the forks of a chosen repository. It creates HTML for all forks.
   *
   * @param {EventObject} e Object containing all data regarding the event
   */
  static async forks(e) {
    if (e.target.classList.contains('url')) {
      e.preventDefault();
      qS('main').classList.remove('triple');
      qS('main').classList.add('double');
      const href = e.target.href;
      Generator.clear();
      const forks = await API.forks(href);
      const mainManifest = await API.manifest(href);
      if (mainManifest.status != 'error') {
        await forks.forEach(async (fork) => {
          await Generator.forkCard(fork, mainManifest);
        });
      } else {
        qS('main').classList.remove('double');
        qS('main').insertAdjacentHTML('beforeend',
        `<h1>${mainManifest.message}</h1>`);
      }
    }
  }

  /*
   * This function is called whenever the user creates a new comment
   * on a chosen fork inside of a repository. It creates a new comment
   * on the selected fork.
   *
   * @param {EventObject} e Object containing all data regarding the event
   */
  static async comment(e) {
    e.preventDefault();
    const comment = e.target.querySelector('input.comment').value;
    e.target.querySelector('input.comment').value = '';
    const status = e.target.querySelector('input[type="radio"]:checked').value;
    const id = e.target.querySelector('input[type="hidden"]').value;
    await API.createComment(comment, status, id);
    Generator.commentCard(comment, status, e.target.parentNode);
  }
}
