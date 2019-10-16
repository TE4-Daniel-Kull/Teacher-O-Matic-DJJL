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
        forkTemplate.querySelector('h3.owner').innerHTML = fork.owner.login + '/' + fork.name;
        forkTemplate.querySelector('code.code-snippet').innerHTML = codeSnippet;
        forkTemplate.querySelector('a.html_url').href = fork.html_url;
        hljs.highlightBlock(forkTemplate.querySelector('pre code'));
        dataDiv.appendChild(forkTemplate);
    }

}