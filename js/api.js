import { oauth } from './config.js'             

export class API {

  static async search(value) {
    const response = await fetch(`https://api.github.com/users/${value}/repos${oauth}`, );
    const data = await response.json(); 
    return data;
  }
  
  static async forks(href) {
    const response = await fetch(href + oauth);
    const data = await response.json();
    return data;
  }

  static async forkedFile(url) {
    const response = await fetch(url + '/contents/.manifest.json' + oauth);
    const data = await response.json();
    if(data.message == "Not Found") return 'Unable to find .manifest.json file'
    const decoded = JSON.parse(atob(data.content));
    const responseAF = await fetch(url + `/contents/${decoded["filePath"]}` + oauth);
    const actualData = await responseAF.json();
    if(actualData.message == "Not Found") return 'Unable to find file specified in .manifest.json'
    return atob(actualData.content);
  }
}