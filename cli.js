#!/usr/bin/env node
import { getLastMergedPrNumber } from './index.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv

if (!argv.owner || !argv.repo) {
  throw new Error("Must provide a GitHub repo and owner")
} else {
  console.log(await getLastMergedPrNumber(argv.owner, argv.repo));
}
