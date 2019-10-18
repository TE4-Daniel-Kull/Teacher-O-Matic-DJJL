import {oauth} from './config.js';

/**
 * Class containing all functionality with communicating with other API:s
 */
export class API {
  /**
   * This function is called whenever the user searches for
   * all repositories owned by a user. It returns an array containing
   * data regarding all repositories.
   *
   * @param {String} value A String containing the name of
   * the owner of the repos
   *
   * @return {Array} An Array containing objects with data
   */
  static async search(value) {
    const response = await fetch(`https://api.github.com/users/${value}/repos${oauth}`, );
    const data = await response.json();
    return data;
  }

  /**
   * This function is called whenever the user wishes
   * to see all forks of a chosen repository. It returns an array
   * containing data regarding all forked repositories.
   *
   * @param {String} url A String containing the base url for all
   * API requests on a specific repository
   *
   * @return {Array} An Array containing objects with data
   */
  static async forks(url) {
    const response = await fetch(`${url}/forks${oauth}`);
    const data = await response.json();
    return data;
  }

  /**
   * This function is called whenever the user wants
   * to see forks of a chosen repository. It returns either an error object
   * or the data, as an object, inside the .manifest.json file.
   *
   * @param {String} url A String containing the base url for all
   * API requests on a specific repository
   *
   * @return {Object} An Object containing data
   */
  static async manifest(url) {
    const response = await fetch(`${url}/contents/.manifest.json${oauth}`);
    const data = await response.json();
    if (data.message == 'Not Found') {
      return {status: 'error',
              message: `Unable to find .manifest.json 
                       file in the main repository`,
             };
    }
    return JSON.parse(atob(data.content));
  }

  /**
   * This function is called whenever the .manifest.json is
   * found inside the parent repository. It returns the data
   * inside the file as a string.
   *
   * @param {String} url A String containing the base url for all
   * API requests on a specific repository
   * @param {String} filePath A String containing the
   * filepath inside the repository
   *
   * @return {String} A String displaying data
   */
  static async fileContent(url, filePath) {
    const response = await fetch(`${url}/contents/${filePath}${oauth}`);
    const data = await response.json();
    if (data.message == 'Not Found') {
      return 'Unable to find file specified in .manifest.json';
    }
    return atob(data.content);
  }
}
