import { oauth } from './config.js'             

export class API {

  static async search(value) {
    const response = await fetch(`https://api.github.com/users/${value}/repos${oauth}`, );
    const data = await response.json(); 
    return data;
  }
  

  static async forks(href) {
    const response = await fetch(href + oauth, options);
    const data = await response.json();
    return data;
  }

}