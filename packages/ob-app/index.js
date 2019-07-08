#!/usr/bin/env node
'use strict'

const program = require('commander')

program
  .version(require('./package').version)
  .usage('<command> [options]')
  .parse(process.argv);

program
  .command('init <app-name>')
  .description('create a new project')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)
    require('./lib/init')(name, options)
  })

program.parse(process.argv)


if(!program.args.length){
  program.help()
}


function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}