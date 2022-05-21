class Request {
  constructor() {
    this.statusCode
  }
}

const OptionsObject = {
  port: 3000,
  secure: false,
  root: './src'
}

const RequestBodyObject = {
  /**
   * @param {string|null} title
   * @param {string|null} content
   */
  title: '',
  content: ''
}

module.exports = {
  Request,
  OptionsObject,
  RequestBodyObject
}