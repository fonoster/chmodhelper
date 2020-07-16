#!/usr/bin/env node
const chokidar = require('chokidar')
const fs = require('fs')

chokidar.watch('/data', { ignoreInitial: true }).on('add', path => {
  console.log(`File ${path} has been added. Changing mode to 0755`)
  // TODO: Make this a parameter
  if (path.endsWith('.js')) fs.chmodSync(path, 0755)
})