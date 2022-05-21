const http = require('http')

/**
 * @typedef {'error'|'data'|'pause'|'exit'|'readible'|'resume'} ServerEvent
 */

class Request {
  constructor(serverReq) {
    this.serverReq = serverReq
    this.statusCode = serverReq.statusCode
    this.statusMessage = serverReq.statusMessage
    this.url = serverReq.url
    this.headers = serverReq.headers
  }
  /**
   * Listens for an event on the server
   * ~~~
   * server.addEventListener('error', () => console.log('Error!'))
   * @param {ServerEvent} event Event to listen to
   * @param {(e:any|null) => void} listener Callback function for when the event is dispatched
   */
  addEventListener(event, listener) {
    this.serverReq.on(event, listener)
  }

}

class Response {
  constructor(serverRes) {
    /**
     * @param {http.IncomingMessage} serverReq 
     */
    this.statusCode = serverRes.statusCode
    this.statusText = serverRes.statusMessage
  }
  /**
   * Creates a DOM node; this can be an element, some text, or some whitespace
   * @param {string} data
   * @param {(err: Error) => void} onerror
   */
  createNode(data, onerror) {
     serverRes.write(data, onerror)
  }
   /**
    * Creates metadata for the server (e. g. ```Content-type```)
    * @param {string} data
    * @param {(err: Error) => void} onerror
    */
   createMetadata(data, onerror) {
     serverRes.writeHead(data, onerror)
  }
   /**
    * Includes view data from a file
    * @param {string} dirname 
    */
   useFile(dirname) {
     const dir = path.join(
       __dirname, this.#options.root == undefined
       ? 'src'
       : this.#options.root, dirname
     )
     serverRes.writeHead(200, 'OK', { 'Content-type': 'text/html' })
     fs.readFile(dir, (err, data) => {
       if (err) {
         serverRes.writeHead(404, 'File not found', { 'Content-type': 'text/html' })
         serverRes.write('<p style="color: red; font-family: monospace;">Error: file not found</p>')
       } else {
         serverRes.write(data)
       }
       serverRes.end()
     })
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
  Response,
  OptionsObject,
  RequestBodyObject
}