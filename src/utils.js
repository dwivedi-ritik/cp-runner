import fs from 'fs'
import path from 'path'
import { homedir } from 'os'
import child_process from "child_process"
import { MissingUserConfig } from "./errors.js"
import { Term } from './constants.js'

const __dirname = process.cwd() //ES6 doesn't have __dirname

export function getFileExtension(_path) { //? Reading file header will be expensive
    const pathSplit = _path.split('/')
    for (let filename of pathSplit) {
        let splitContent = filename.split(".")
        if (splitContent.length === 0 || splitContent.length === 1) {
            continue
        }
        return {
            filename,
            type: splitContent[splitContent.length - 1],
            filepath: path.join(__dirname, _path)
        }
    }

}

function getConf() {
    const USER_CONFIG = path.join(homedir(), '.config', 'cp-runner', 'config.json')
    if (fs.existsSync(USER_CONFIG)) {
        return USER_CONFIG
    } else {
        throw new MissingUserConfig()
    }
}

export function getExecutables() {
    const confPath = getConf()
    const file = fs.readFileSync(confPath)
    const configuration = JSON.parse(file)
    return configuration.extensions
}

export function argumentParser(args) {
    const flags = ["--watch", "--ignore"]
    let parsedObject = {}

    for (let flag of flags) {
        parsedObject[flag] = []
    }
    let i = 0
    while (i < args.length) {
        if (flags.includes(args[i])) {
            let j = i + 1
            while (j < args.length) {
                if (flags.includes(args[j])) break
                parsedObject[args[i]].push(args[j])
                j++
            }
            i = j
        } else {
            i++
        }
    }
    return parsedObject

}

export function executeScripts(cmd, filename, exec) {
    console.log(`${Term.Bright}Changes detected in ${filename} excuting with the ${exec}${Term.Reset}`)
    console.log(`${Term.Bright}Execution started 🥵 at Process ID ${process.pid} ${Term.Reset}`)
    console.log(`${Term.Bright}----------------------------${Term.Reset}`)
    child_process.exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(error.message)
            console.log()
            return
        }

        if (stderr) {
            console.error(stderr)
            return
        }

        console.log(stdout)
        console.log(`${Term.Bright}----------------------------${Term.Reset}`)
        console.log(`${Term.Bright}Execution Ended 💦${Term.Reset}`)
    })
}