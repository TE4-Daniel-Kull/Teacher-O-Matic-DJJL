import { EventListener } from './event.js';

function qS(selector) {
  return document.querySelector(selector);
}

qS('header form').addEventListener('submit', () => {
  event.preventDefault();
  console.log('yey')
  EventListener.search(event);
});

qS('main').addEventListener('click', () => {
  EventListener.forks(event);
});
