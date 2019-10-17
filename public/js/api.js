import { oauth } from './config.js'             

export class API {

  static async search(value) {
    const response = await fetch(`https://api.github.com/users/${value}/repos${oauth}`, );
    const data = await response.json(); 
    return data;
  }
  
  static async forks(url) {
    const response = await fetch(`${url}/forks${oauth}`);
    const data = await response.json();
    return data;
  }

  static async manifest(url) {
    const response = await fetch(`${url}/contents/.manifest.json${oauth}`);
    const data = await response.json();
    if(data.message == "Not Found") return 'Unable to find .manifest.json file'
    return JSON.parse(atob(data.content));
  }

  static async fileContent(url, filePath) {
    const response = await fetch(`${url}/contents/${filePath}${oauth}`);
    const data = await response.json();
    if(data.message == "Not Found") return 'Unable to find file specified in .manifest.json'
    return atob(data.content);
  }
}