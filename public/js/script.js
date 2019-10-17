import { EventListener } from './event.js'

function qS(selector) {
  return document.querySelector(selector);
}

qS('header input').addEventListener('keydown', () => {EventListener.search(event)});

qS('main').addEventListener('click', ()  => {EventListener.forks(event)});