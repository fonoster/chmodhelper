#!/usr/bin/env node
const EventsRecvr = require('@fonos/events').EventsRecvr
const logger = require('@fonos/logger').default
const fs = require('fs')
const { join } = require('path')
const { exit } = require('process')
const BASE_DIR = process.env.BASE_DIR || '/data/apps'

if (!process.env.EVENTS_BROKERS) {
  logger.log('error', 'chmodhelper [environment variable EVENTS_BROKERS is undefined]')
  exit(1)
}
const BROKERS = process.env.EVENTS_BROKERS.split(',')
const er = new EventsRecvr(BROKERS, process.env.EVENTS_QUEUE)
er.connect()

er.watchEvents(content => {
  logger.log('debug', `chmodhelper received new event [payload => ${content.toString()}]`)
  const event = JSON.parse(content.toString())
  if (event.name === 'APP_CREATED') {
    const pathToPackage = join(BASE_DIR, event.data.name, 'package.json')
    let pathToEntryPoint

    logger.log('debug', `chmodhelper received new event [pathToPackage => ${pathToPackage}]`)

    try {
      const entryPoint = require(pathToPackage).main
      pathToEntryPoint = join(BASE_DIR, event.data.name, entryPoint)
    } catch(e) {
      pathToEntryPoint = join(BASE_DIR, event.data.name, 'index.js')
    }

    if (fs.existsSync(pathToEntryPoint)) {
      fs.chmodSync(pathToEntryPoint, '0755')
      logger.log('debug', `chmodhelper [changed file ${pathToEntryPoint} mode to 0755]`)
    } else {
      logger.log('debug', `chmodhelper [unable to find entrypoint]`)
    }
  }
})
