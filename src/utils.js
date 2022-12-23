import fs from 'fs'
import path from 'path'
import { homedir } from 'os'

const __dirname = process.cwd()

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
    const USER_CONFIG = path.join(homedir(), 'config', 'cp-runner', 'userConf.json')
    return fs.existsSync(USER_CONFIG) ? USER_CONFIG : path.join(__dirname, 'config.json')
}

export function getExecutables() {
    const confPath = getConf()
    const file = fs.readFileSync(confPath)
    const configuration = JSON.parse(file)
    return configuration.extensions
}
