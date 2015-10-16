'use strict'

const test  = require('tape')
    , mock  = require('./requests/mock')
    , Slack = require('../index')

const SLACK_TOKEN     = 'xoxp-1111111111-1111111111-11111111111-1111111111'
    , BOT_TOKEN       = 'xoxb-11111111111-111111111111111111111111'
    , INVALID_TOKEN   = 'xoxp-0000000000-0000000000-00000000000-0000000000'

test('Connection tests', (t) => {
  t.plan(2)

  t.throws(() => { new Slack() }, Error, 'throws an error if there\'s no token')

  let slack = new Slack(SLACK_TOKEN, false)

  t.ok(slack instanceof Slack, 'creates an instance of Slack if token is present')
})

test('Login tests', (t) => {
  t.plan(3)

  new Slack(SLACK_TOKEN)
    .then(response => 
      t.ok(response.ok, 'auto-login works'))

  new Slack(SLACK_TOKEN, false)
    .login()
    .then(response => 
      t.ok(response.ok, 'chained login works'))

  new Slack(INVALID_TOKEN)
    .catch(message => 
      t.ok(message === 'invalid_auth', 'invalid token throws an error'))
})

test('API test', (t) => {
  t.plan(2)

  var slack = new Slack(SLACK_TOKEN, false)

  slack.apiTest()
    .then(response =>
      t.ok(reposnse.ok, 'API test returns ok: true'))
  
  slack.authTest()
    .then(response =>
      t.ok(reposnse.ok, 'Auth test returns ok: true'))
})

test('Channels test', (t) => {
  t.plan(1)
})

test('Chats test', (t) => {
  t.plan(1)
})

test('Emoji test', (t) => {
  t.plan(1)
})

test('Files test', (t) => {
  t.plan(1)
})

test('Groups test', (t) => {
  t.plan(1)
})

test('IM test', (t) => {
  t.plan(1)
})

test('Pins test', (t) => {
  t.plan(1)
})

test('Reactions test', (t) => {
  t.plan(1)
})

test('Search test', (t) => {
  t.plan(1)
})

test('Stars test', (t) => {
  t.plan(1)
})

test('Teams test', (t) => {
  t.plan(1)
})

test('Users test', (t) => {
  t.plan(1)
})
