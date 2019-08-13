const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const { prompt } = require('inquirer')
const fs = require('fs-extra')
const { clearConsole } = require('./utils')
const path = require('path')

const templateList = {
  "mobx-base": {
    "repo": "tonokim/mobx-base",
    "branch": ""
  },
  "mobx-base-i18n": {
    "repo": "tonokim/mobx-base",
    "branch": "#i18n"
  },
  "mobx-next": {
    "repo": "tonokim/mobx-next",
    "branch": ""
  },
  "mobx-next-i18n": {
    "repo": "tonokim/mobx-next",
    "branch": "i18n"
  },
  "mst-next": {
    "repo": "tonokim/mst-next",
    "branch": ""
  }
}

const tplLists = Object.keys(templateList)

module.exports = async (projectName, options) => {

  const targetDir = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir)
    }else {
      if (projectName === '.') {
        const { ok } = await prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: `Generate project in current directory?`
          }
        ])
        if (!ok) {
          return
        }
      }else {
        const { action } = await prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Cancel', value: false }
            ]
          }
        ])
        if (!action) {
          return
        } else if (action === 'overwrite') {
          console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
          await fs.remove(targetDir)
        }
      }

    }
  }

  const { template } = await prompt([
    {
      name: 'template',
      type: 'list',
      message: 'Please pick a template:',
      choices: tplLists
    }
  ])
  if (!template) {
    return
  } else {
    const repo = templateList[template]['repo'], branch = templateList[template]['branch']

    clearConsole()
    
    const spinner = ora('Downloading please wait...')
    spinner.start()
    download(`${repo}${branch}`, `./${projectName}`, (err) => {
      if (err) {
        console.log(chalk.red(err))
        process.exit()
      }
      spinner.stop()
      console.log(chalk.green('project init successfully!'))
    })

  }
}