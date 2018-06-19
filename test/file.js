const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const debug = require('debug')('app:file')

const filePath = path.join(process.cwd(), 'package.json')

module.exports = {
  getHash() {
    return new Promise((resolve, reject) => {
      const rs = fs.createReadStream(filePath)
      const fsHash = crypto.createHash('sha256')
      rs.on('data', d => {
        fsHash.update(d)
      })
      rs.on('end', () => {
        const sha256 = fsHash.digest('hex')
        resolve(sha256)
      })
      rs.on('error', err => {
        reject(err)
      })
    })
  },
  getSize() {
    return fs.lstatSync(filePath).size
  },
  getPath() {
    return filePath
  }
}
