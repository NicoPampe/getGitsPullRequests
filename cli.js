#!/usr/bin/env node
import { getLastMergedPrNumber, getLastMergedPrRef } from './index.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
  .usage('usage: $0 <command> [options]')
  .option('owner', {
    describe: 'The GitHub owner.'
  })
  .option('repo', {
    describe: 'The GitHub repo.'
  })
  .demandOption(['owner', 'repo'], 'Must provide a GitHub repo and owner')
  .command('lastPrNumber', 'Get the last merged PR number.', () => {}, async (argv) =>
    console.log(await getLastMergedPrNumber(argv.owner, argv.repo))
  )
  .command('lastPrRef', 'Get the last merged PR ref branch name.', () => {}, async (argv) =>
    console.log(await getLastMergedPrRef(argv.owner, argv.repo))
  )
  .help()
  .argv
