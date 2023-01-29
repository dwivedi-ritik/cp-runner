#!/usr/bin/env node
import main from "./src/index.js"

const args = process.argv.splice(2)
main(args)