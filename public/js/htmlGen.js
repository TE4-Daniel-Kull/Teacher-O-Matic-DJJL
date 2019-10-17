import { API } from './api.js';
import { EventListener } from './event.js';

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
        const dataDiv = qS('main');
        const repoTemplate = iN('template#repo-card');
        for (const [key, value] of Object.entries(repo)) {
            if (repoTemplate.querySelector(`.${key}`)) {
								if (repoTemplate.querySelector(`.${key}`).tagName == 'A') {
									repoTemplate.querySelector(`.${key}`).href = value;
								} else {
                    repoTemplate.querySelector(`.${key}`).innerHTML = value;
                }
            }
        }
        dataDiv.appendChild(repoTemplate);
    }

    static async forkCard(fork, mainManifest) {
				const subManifest = await API.manifest(fork.url);
				const codeSnippet = await API.fileContent(fork.url, subManifest['filePath']); // eslint-disable-line max-len
				const testResults = runTests(mainManifest, subManifest.functionSpan, codeSnippet); // eslint-disable-line max-len
        const dataDiv = qS('main');
        const forkTemplate = iN('template#fork-card');
				testResults.forEach((res) => {
					const li = document.createElement('li');
					li.innerHTML = `Test "${res.desc}": ${res.status ? 'Passed' : 'Failed'}`; // eslint-disable-line max-len
					forkTemplate.querySelector('ul.tests').appendChild(li);
				});
        forkTemplate.querySelector('h3.owner').innerHTML = fork.owner.login + '/' + fork.name; // eslint-disable-line max-len
        forkTemplate.querySelector('code.code-snippet').innerHTML = codeSnippet;
        forkTemplate.querySelector('a.html_url').href = fork.html_url;
        hljs.highlightBlock(forkTemplate.querySelector('pre code')); // eslint-disable-line no-undef, max-len
        dataDiv.appendChild(forkTemplate);
        forkTemplate.querySelector('form').addEventListener('submit', () => {
					EventListener.comment(event);
				});
    }

    static commentCard(comment, status, forkCard) {
        const commentElement = iN('template#comment');
        let icon;
        switch (status) {
            case '200':
                icon = 'done';
                break;
            case '406':
                icon = 'replay';
                break;
            default:
                icon = 'visibility_off';
        }
        commentElement.querySelector('i').innerHTML = icon;
        commentElement.querySelector('p').innerHTML = comment;
        forkCard.querySelector('.comments').prepend(commentElement);
    }
}

function runTests(testData, span, code) {
	const testResults = [];
	const args = testData.functionParameters;
	code = code.split('\n').slice(span[0]-1, span[1]).join('');
	if (code.length > 1) {
		const func = new Function(args.join(','), code);
		testData.tests.forEach((test) => {
			const output = func(...test.arguments);
			testResults.push({
				desc: test.description,
				expected: test.expected,
				received: output,
				status: output == test.expected,
			});
		});
	}
	return testResults;
}
