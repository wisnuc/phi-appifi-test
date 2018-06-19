const path = require('path')
const chai = require('chai')
const expect = chai.expect
const request = require('superagent')

const lib = require('./lib')
const file = require('./file')
const config = require('../config')
const BASE_URL = config.phicomm.BASE_URL
const url = `${BASE_URL}/ResourceManager/app/pipe/resource`

// {
//   'error': '50',
//   'msg': 'server error'
// }
let token
let deviceSN
let fileHash

describe(path.basename(__filename), () => {
  before(async () => {
    token = await lib.getToken()
    const device = await lib.getDevice(token)
    deviceSN = device.deviceSN
    fileHash = await file.getHash()
  })

  it('download file should return success', done => {
    // get drive uuid
    request
      .post(`${BASE_URL}/ResourceManager/app/pipe/command`)
      .set('Authorization', token)
      .send({
        deviceSN: deviceSN,
        data: {
          verb: 'GET',
          urlPath: '/drives',
          params: {},
          body: {}
        }
      })
      .end((err, res) => {
        if (err) return done(err)
        if (res.statusCode === 200) {
          // const result = JSON.parse(res.text).result.data.res
          const { error, result } = JSON.parse(res.text)
          expect(error).to.equal('0')
          const data = result.data.res
          let driveUUID
          for (const d of data) {
            if (d.type === 'private') {
              driveUUID = d.uuid
            }
          }
          const encodedData = encodeURIComponent(JSON.stringify({
            verb: 'POST',
            urlPath: `/drives/${driveUUID}/dirs/${driveUUID}/entries/${fileHash}`
          }))
          // upload
          request
            .get(`${url}?deviceSN=${deviceSN}&data=${encodedData}`)
            .set('Authorization', token)
            .end((err, res) => {
              if (err) return done(err)
              const { error } = JSON.parse(res.text)
              if (res.statusCode === 200) {
                expect(error).to.equal('0')
                done()
              }
            })
        }
      })
  })

})

