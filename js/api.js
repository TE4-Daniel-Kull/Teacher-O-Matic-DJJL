const options = {client_id: "d8e0bd6b8e516a3a6a83", 
                header: {
                  Accept: "application/vnd.github.v3+json"
                }};

export class API {

  static async search(value) {
    const response = await fetch(`https://api.github.com/users/${value}/repos`, options);
    const data = await response.json(); 
    return data;
  }

  static async forks(href) {
    const response = await fetch(href, options);
    const data = await response.json();
    return data;
  }

} 