'use strict'

const nock        = require('nock')
    , fs          = require('fs')
    , path        = require('path')
    , querystring = require('querystring')

const SLACK_TOKEN     = 'xoxp-1111111111-1111111111-11111111111-1111111111'
    , BOT_TOKEN       = 'xoxb-11111111111-111111111111111111111111'
    , INVALID_TOKEN   = 'xoxp-0000000000-0000000000-00000000000-0000000000'

let loginSuccess = fs.readFileSync(path.resolve(__dirname, 'login', 'success.json'), 'UTF-8')
let tokenError   = fs.readFileSync(path.resolve(__dirname, 'general', 'invalid-token.json'), 'UTF-8')
let apiTest      = fs.readFileSync(path.resolve(__dirname, 'general', 'api-test.json'), 'UTF-8')
let authTest     = fs.readFileSync(path.resolve(__dirname, 'general', 'auth-test.json'), 'UTF-8')

let mock = nock('https://slack.com/api/')
  // ...
  .post('/rtm.start', querystring.stringify({
    token: SLACK_TOKEN
  }))
  .reply(200, loginSuccess)
  
  // ...
  .post('/rtm.start', querystring.stringify({
    token: SLACK_TOKEN
  }))
  .reply(200, loginSuccess)
  
  // ...
  .post('/api.test', querystring.stringify({
    token: SLACK_TOKEN
  }))
  .reply(200, apiTest)
  
  // ...
  .post('/auth.test', querystring.stringify({
    token: SLACK_TOKEN
  }))
  .reply(200, authTest)

module.exports = mock
