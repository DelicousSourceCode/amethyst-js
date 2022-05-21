const { fetch } = require('undici')
const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const { Request, Response, RequestBodyObject, OptionsObject } = require('./lib/params')

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
    this.#req
    this.#res
    this.#routers = []
    this.#server = http.createServer((req, res) => {
      this.#req = req
      this.#res = res
      // this.#routers.forEach(router => {
      //   if (req.url == router) {

      //   }
      // })
    })
    this.req = new Request(this.#req)
    this.res = new Response(this.#res)
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
  }
}

module.exports = {
  Server
}

const server = new Server({ port: 3000 })
server.GET('/')