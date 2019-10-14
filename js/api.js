export class API {

  static async search(value) {
    const response = await fetch(`https://api.github.com/users/${value}/repos`)
    const data = await response.json()
    return data
  }

} 