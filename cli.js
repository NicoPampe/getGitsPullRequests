#!/usr/bin/env node
import { getLastMergedPrNumber } from './index.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv

if (!argv.gitUrl) {
  throw new Error("Must provide a github url")
} else {
  console.log(await getLastMergedPrNumber(argv.gitUrl));
}
