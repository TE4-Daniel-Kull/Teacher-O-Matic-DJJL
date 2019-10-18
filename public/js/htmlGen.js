import { API } from './api.js';
import { EventListener } from './event.js';

function qS(selector) {
    return document.querySelector(selector);
  }

function iN(selector) {
    return document.importNode(qS(selector).content, true).firstElementChild;
}

/**
 * Class containing all functionality around creating dynamic HTML elements.
 */
export class Generator {
	/**
	 * This function is called whenever the page to be cleared.
	 * It removes all current HTML from the main tag.
	 */
    static clear() {
        qS('main').innerHTML = '';
    }

		/**
		 * This function is called whenever a new repo is to be added to the page.
		 * It creates HTML depending on the given repository data.
		 *
		 * @param {Object} repo Object containing all data of the repository
		 */
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

		/**
		 * This function is called whenever a new fork is to be displayed
		 * on the page. It creates HTML depending on the given fork and
		 * data form the parent repository
		 *
		 * @param {Object} fork Object containing all data of the forked repository.
		 * @param {Object} mainManifest Object containing all data from the
		 * .manifest.json file from forked parent repository.
		 */
    static async forkCard(fork, mainManifest) {
		const subManifest = await API.manifest(fork.url);
		const codeSnippet = await API.fileContent(fork.url, subManifest['filePath']); // eslint-disable-line max-len
		const comments = await API.getComments(fork.id);
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
		forkTemplate.querySelector('input[type="hidden"]').value = fork.id;
        hljs.highlightBlock(forkTemplate.querySelector('pre code')); // eslint-disable-line no-undef, max-len
        dataDiv.appendChild(forkTemplate);
		comments.forEach((comment) => {
			Generator.commentCard(comment.message, comment.type, forkTemplate);	
		});
        forkTemplate.querySelector('form').addEventListener('submit', () => {
			EventListener.comment(event);
		});
    }

		/**
		 * This function is called whenever the user whishes to post a comment.
		 * It creates HTML depending on the comment and status.
		 *
		 * @param {String} comment A string containing the comment to be added
		 * @param {String} status A string containing the code of the
		 * image to be added to the comment
		 * @param {HTMLElement} forkCard A HTMLElement which is the fork
		 * to have a comment added
		 */
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

/**
 * This function is called whenever a new fork card is created.
 * It runs the code with all the tests in the testData objects.
 *
 * @param {Object} testData An Object containing all data required for testing
 * @param {Array} span An Array containing the first and last line
 * of the code to test
 * @param {String} code A String containing the code to test
 *
 * @return {Array} An array containing objects with data of the tests
 */
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
