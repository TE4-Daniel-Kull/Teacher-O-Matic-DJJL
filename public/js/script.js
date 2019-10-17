import { EventListeners } from './event.js'

function qS(selector) {
  return document.querySelector(selector);
}

qS('header input').addEventListener('keydown', () => {EventListeners.search(event)})

qS('main').addEventListener('click', ()  => {EventListeners.forks(event)})