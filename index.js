'use strict'

const request = require('request-promise')

module.exports = class Slack {
  // Class constructor
  constructor(slackToken) {
    // Check if token is provided
    // and throw an error if it's not
    if (!slackToken)
      throw new Error('Token is required.')

    // Save token
    this.token = slackToken

    // Also save an API url
    // This can be in a private var in `_apiCall` function, but we are saving it
    // here because of the consistence with ws url
    this.apiUrl = 'https://slack.com/api/'
  }

  login() {

  }

  _apiCall(apiMethod, params) {
    let requestParams = params || {}

    return request({
      uri:    this.apiUrl + apiMethod,
      method: 'POST',
      body:   requestParams
    })
  }
}
