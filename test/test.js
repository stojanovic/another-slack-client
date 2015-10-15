'use strict'

const test  = require('tape')
    , Slack = require('../index')

const SLACK_TOKEN     = 'xoxp-1111111111-1111111111-11111111111-1111111111'
    , BOT_TOKEN       = 'xoxb-11111111111-111111111111111111111111'
    , INVALID_TOKEN   = 'xoxp-0000000000-0000000000-00000000000-0000000000'

test('Connection tests', function(t) {
  t.plan(2)

  t.throws(() => { new Slack() }, Error, 'throws an error if there\'s no token')

  let slack = new Slack(SLACK_TOKEN)

  t.ok(slack instanceof Slack, 'creates an instance of Slack if token is present')
})
