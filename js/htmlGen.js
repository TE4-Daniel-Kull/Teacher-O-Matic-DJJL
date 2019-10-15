import { API } from './api.js'

function qS(selector) {
    return document.querySelector(selector);
  }

function iN(selector) {
    return document.importNode(qS(selector).content, true).firstElementChild;
}

export class Generator {
    static clear() {
        qS('main').innerHTML = '';
    }

    static repoCard(repo) {
        const dataDiv = qS('main')
        const repoTemplate = iN('template#repo-card')
        for (const [key, value] of Object.entries(repo)) {
            if(repoTemplate.querySelector(`.${key}`)) {
                if(repoTemplate.querySelector(`.${key}`).tagName == 'A') repoTemplate.querySelector(`.${key}`).href = value;
                else {
                    repoTemplate.querySelector(`.${key}`).innerHTML = value;
                }
            }
        }
        dataDiv.appendChild(repoTemplate);
    }

    static async forkCard(fork) {
        const codeSnippet = await API.forkedFile(fork.url);
        if(!codeSnippet) return
        const dataDiv = qS('main');
        const forkTemplate = iN('template#fork-card');
        for (const [key,value] of Object.entries(fork)){
           if(forkTemplate.querySelector(`.${key}`)){
               const textNode = document.createTextNode(value);
               forkTemplate.querySelector(`.${key}`).appendChild(textNode);
           }
        }
        forkTemplate.querySelector('code.code-snippet').innerHTML = codeSnippet
        dataDiv.appendChild(forkTemplate);
    }

}