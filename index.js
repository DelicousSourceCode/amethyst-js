const { fetch } = require('undici')
const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const { RequestBodyObject, OptionsObject } = require('./lib/params')

class Server {
  /**
   * Creates a new server
   * ~~~
   * const server = new Server(3000)
   * ~~~
   * @param {OptionsObject} options 
   */
  constructor(options) {
    this.#options = options
    this.#port = options.port
    this.req
    this.res
    this.#routers = []
    this.#server = http.createServer((req, res) => {
      this.req = req
      this.res = res
      // this.#routers.forEach(router => {
      //   if (req.url == router) {

      //   }
      // })
    })
    this.#server.listen(this.#port, err => {
      if (err) throw err
    })
    console.log(this.#port)
  }
  /**
   * Creates a GET request
   * @param {string} path Path for the request
   * @param {RequestBodyObject} load Info that is passed to the responder, defaults to an empty object
   */
  GET(uri, load = {}) {
    // const resFn = await fetch(path, {
    //   method: 'GET',
    //   body: load,
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8'
    //   }
    // })
    const reqFn = http.request({
      hostname: 'localhost',
      port: this.#port,
      path: uri,
      method: 'GET'
    })
    const req = {
      statusCode: this.req.statusCode,
      statusText: this.req.statusMessage,
      url
    }
    const res = {
      statusCode: this.res.statusCode,
      statusText: this.res.statusMessage,
      /**
       * Creates a DOM node; this can be an element, some text, or some whitespace
       * @param {string} data
       * @param {(err: Error) => void} onerror
       */
      createNode: (data, onerror) => this.res.write(data, onerror),
      /**
       * Creates metadata for the server (e. g. ```Content-type```)
       * @param {string} data
       * @param {(err: Error) => void} onerror
       */
      createMetadata: (data, onerror) => this.res.writeHead(data, onerror),
      /**
       * Includes view data from a file
       * @param {string} dirname 
       */
      useFile: dirname => {
        const dir = path.join(
          __dirname, this.#options.root == undefined
          ? 'src'
          : this.#options.root, dirname
        )
        this.res.writeHead(200, 'OK', { 'Content-type': 'text/html' })
        fs.readFile(dir, (err, data) => {
          if (err) {
            this.res.writeHead(404, 'File not found', { 'Content-type': 'text/html' })
            this.res.write('<p style="color: red; font-family: monospace;">Error: file not found</p>')
          } else {
            this.res.write(data)
          }
          this.res.end()
        })
      }
    }
    return req, res
  }
}

module.exports = {
  Server
}

const server = new Server({ port: 3000 })
server.GET('/').useFile('index.html')