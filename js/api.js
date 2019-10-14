export class API {


  static async search(value) {
    const response = await fetch(`https://api.github.com/users/${value}/repos?client_id=d8e0bd6b8e516a3a6a83`)
    const data = await response.json()
    return data
  }

} 