import fs from 'fs'
import path from 'path'
import stream from 'stream'
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


function generateInputFilePath(filepath) {
    const dirPath = path.dirname(filepath)
    return path.join(dirPath, 'input.txt')

}

export function executeScripts(cmd, filename, exec, filepath) {
    console.log(`${Term.Bright}Changes detected in ${filename} excuting with the ${exec}${Term.Reset}`)
    console.log(`${Term.Bright}Execution started at Process ID ${process.pid} ${Term.Reset}`)

    console.log(`${Term.Bright}----------------------------${Term.Reset}`)


    const INPUT_FILE = generateInputFilePath(filepath)

    try {
        const subprocess = child_process.exec(cmd, { shell: true, timeout: 10000 })

        const isInput = fs.existsSync(INPUT_FILE)

        if (!isInput) {
            return
        }

        const inputFileData = fs.readFileSync(INPUT_FILE)
        const stdinStream = new stream.Readable()
        stdinStream.push(inputFileData)
        stdinStream.push(null)
        stdinStream.pipe(subprocess.stdin)

        let errFlag = false
        subprocess.stdout.on('data', stdout => {
            console.log(stdout)
        })

        subprocess.stderr.on('data', err => {
            errFlag = true
            console.log(err)
        })
        subprocess.stdout.on('close', () => {
            console.log(`${Term.Bright}----------------------------${Term.Reset}`)
            errFlag ? console.log(`${Term.Bright}Execution Ended with Error`) : console.log(`${Term.Bright}Execution Ended ${Term.Reset}`)
        })

    } catch (err) {
        console.log(err)

    }
}