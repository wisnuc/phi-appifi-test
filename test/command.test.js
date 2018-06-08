const path = require('path')
const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const should = chai.should()
const request = require('superagent')

const config = require('../config')
const BASE_URL = config.phicomm.BASE_URL
const url = `${BASE_URL}/ResourceManager/app/pipe/command`

// {
//   'error': '50',
//   'msg': 'server error'
// }
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjEwIn0.eyJ1aWQiOiI4ODY0ODI2MiIsImNvZGUiOiJmZWl4dW4qMTIzLlNIXzIxNDk3NzMiLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiaXNzIjoiUGhpY29tbSIsIm5iZiI6MTUyODQ0Njk2NywiZXhwIjoxNTI4OTY1MzY3LCJyZWZyZXNoVGltZSI6IjIwMTgtMDYtMTAgMTY6MzY6MDcifQ.fr0syPeEs3W_YqPKq3-Fp8OSERhz1mDliMdX3FrquOw'
const deviceSN = '1plp0panrup3jqpdd'

describe(path.basename(__filename), () => {

  describe('have no token', () => {

  })

  describe('have token', () => {

    it('GET /device/timedate should return 200', done => {
      request
        .post(url)
        .set('Authorization', token)
        .send({
          deviceSN: deviceSN,
          data: {
            verb: 'GET',
            urlPath: '/device/timedate',
            params: {},
            body: {}
          }
        })
        .end((err, res) => {
          expect(res.statusCode === 200)
          const { error, result, msg } = JSON.parse(res.text)
          return (error === '0' && result) ? done() : done(msg)
        })
    })
  })
})
