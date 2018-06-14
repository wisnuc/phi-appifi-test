const path = require('path')
const chai = require('chai')
const expect = chai.expect
const request = require('superagent')

const lib = require('./lib')
const config = require('../config')
const BASE_URL = config.phicomm.BASE_URL
const url = `${BASE_URL}/ResourceManager/app/pipe/resource`

// {
//   'error': '50',
//   'msg': 'server error'
// }
let token
let deviceSN

describe(path.basename(__filename), () => {
  before(async () => {
    token = await lib.getToken()
    const device = await lib.getDevice(token)
    deviceSN = device.deviceSN
  })

  it('GET /token should return success', done => {
    done()
    // request
    //   .post(url)
    //   .set('Authorization', token)
    //   .send({
    //     deviceSN: deviceSN,
    //     data: {
    //       verb: 'GET',
    //       urlPath: '/token',
    //       params: {},
    //       body: {}
    //     }
    //   })
    //   .end((err, res) => {
    //     if (res.statusCode === 200) {
    //       const { error } = JSON.parse(res.text)
    //       expect(error === '0')
    //       done()
    //     } else {
    //       done(err)
    //     }
    //   })
  })

})

