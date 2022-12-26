import fs from 'fs'
import path from 'path'
import os from 'os'
import child_process from 'child_process'
import util from 'util'

const exec = util.promisify(child_process.exec)


const fileContent = fs.readFileSync('./config.json')
const configPath = path.join(os.homedir(), '.config', 'cp-runner')

const configJson = JSON.parse(fileContent)

let execsObj = configJson.extensions;

const validateCmd = (cmd) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { stdout, stderr } = await exec(cmd, { timeout: 2000 })
        } catch (e) {
            if (e.code === 127) { //command not found code in linux
                resolve(false)
            } else {
                resolve(true)
            }
        }

    });

};

(async function () {
    for (let [key, val] of Object.entries(execsObj)) {
        if (! await validateCmd(val)) {
            console.log(`${val} is missing , removing from the configuration`)
            delete configJson.extensions[key]
        }
    }

})()

fs.mkdir(configPath, (err) => {
    if (!err) return
    if (err.code === 'EEXIST') {
        console.warn('Config already exists')
        return
    }
})

fs.writeFileSync(path.join(configPath, 'config.json'), JSON.stringify(configJson))
