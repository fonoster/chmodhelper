#!/usr/bin/env node
const EventsRecvr = require('@fonos/events').EventsRecvr
const logger = require('@fonos/logger').default
const fs = require('fs')
const { exit } = require('process')

if (!process.env.EVENTS_BROKERS) {
  logger.log('error', 'chmodhelper [environment variable EVENTS_BROKERS is undefined]')
  exit(1)
}
const BROCKERS = process.env.EVENTS_BROKERS.split(',')
const er = new EventsRecvr(BROCKERS, process.env.EVENTS_QUEUE)
er.connect()

er.watchEvents(content => {
  logger.log(`chmodhelper received new event [payload => ${content.toString()}]`)
  const event = JSON.parse(content.toString())
  if (event.name === 'APP_CREATED') {
    console.log(`chmodhelper received new event [payload => ${content.toString()}]`)
    logger.error(`chmodhelper received new event [payload => ${content.toString()}]`)
  }
})

/*chokidar.watch('/data', { ignoreInitial: true }).on('add', path => {
  console.log(`File ${path} has been added. Changing mode to 0755`)
  // TODO: Make this a parameter
  if (path.endsWith('.js')) fs.chmodSync(path, 0755)
})*/