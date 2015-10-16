'use strict'

const request     = require('request-promise')
    , querystring = require('querystring')

module.exports = class Slack {
  // The Slack class constructor
  constructor(slackToken, autoLogin) {
    // Check if token is provided and throw an error if it's not
    if (!slackToken)
      throw new Error('Token is required.')

    // Until node adds support for default params this is done like this
    if (typeof autoLogin === 'undefined') {
      autoLogin = true
    }

    // Save the token
    this.token = slackToken

    // Also save an API url
    // This can be in a private var in `_apiCall` function, but we are saving it
    // here because of the consistence with ws url
    this.apiUrl = 'https://slack.com/api/'

    // Check if autologin is set and login if it is
    if (autoLogin)
      return this.login()

    return this
  }

  // The Slack login method
  login(simpleLatest, noUnreads) {
    const apiMethod = 'rtm.start'

    let params = {}

    if (simpleLatest)
      params['simple_latest'] = simpleLatest

    if (noUnreads)
      params['no_unreads'] = noUnreads

    return this._apiCall(apiMethod, params)
      .then(response => {

        // Save web socket url for the events
        this.wsUrl = response.url

        // Save info about the current user
        this._self = response.self

        // Save info about the team
        this._team = response.team

        // Save a list of all user objects
        this._users = response.users

        // Save a list of all channel objects visible to the authenticated user
        this._channels = response.channels
    
        // Save a list of all group objects, one for every group the 
        // authenticated user is in
        this._groups = response.groups
    
        // Save a list of IM objects, one for every direct message channel
        // visible to the authenticated user
        this._ims = response.ims

        // Save the details of the integrations set up on this team
        this._bots = response.bots

        return response
      })

  }

  apiTest() {}

  authTest() {}

  // Internal API call method
  _apiCall(apiMethod, params) {
    // Check if params are passed or init them
    let requestParams = params || {}

    // Add a token to the params
    requestParams.token = this.token

    let options = {
      uri:    this.apiUrl + apiMethod,
      method: 'POST',
      body:   querystring.stringify(requestParams)
    }

    // And return a promise
    return request(options)
      // But since Slack always returns `status: 200` we just intercept the 
      // response and throw an error if `ok` is `false`
      .then(rawResponse => {
        let response = JSON.parse(rawResponse)
        if (!response.ok)
          throw response.error
        // Otherwise we just return full response
        return response
      })
  }
}
