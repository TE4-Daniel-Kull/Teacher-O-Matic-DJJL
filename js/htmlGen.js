function qS(selector) {
    return document.querySelector(selector);
  }

export class Generator {
    static clear() {
        qS('main').innerhtml = '';
    }
    static repoCard(repo) {
        const dataDiv = qS('main')
        const repoTemplate = document.importNode(qS('template#repo-card').content, true).firstElementChild;
        console.log(repoTemplate)
        for (const [key, value] of Object.entries(repo)) {
            if(repoTemplate.querySelector(`.${key}`)) {
                if(repoTemplate.querySelector(`.${key}`).tagName == 'A') repoTemplate.querySelector(`.${key}`).href = value;
                else {
                    const textNode = document.createTextNode(value)
                    repoTemplate.querySelector(`.${key}`).appendChild(textNode);
                }
            }
        }
        dataDiv.appendChild(repoTemplate);
    }

}