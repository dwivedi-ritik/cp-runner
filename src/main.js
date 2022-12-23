import child_process from "child_process"
import chokidar from 'chokidar'
import { getFileExtension, getExecutables } from './utils.js'
import { NothingToWatch } from './errors.js'

function argumentParser(args) {
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

const args = process.argv.splice(2)

const parsedArgs = argumentParser(args)

if (parsedArgs['--watch'].length === 0)
    throw new NothingToWatch()

const watcher = chokidar.watch(parsedArgs['--watch'], {
    ignored: parsedArgs['--ignore'].length > 0 ? parsedArgs['--ignore'].join("") : "node_modules"
})

watcher.on('change', (path, event) => {
    const file = getFileExtension(path)
    const getExec = getExecutables()
    const exec = getExec[file.type] //get the executable 
    console.log(`changes detected in ${file.filename} excuting with the ${exec}`)
    // Till now just added exec
    console.log("Execution started")

    child_process.exec(`${exec} ${file.filepath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(error.message)
            return
        }

        if (stderr) {
            console.error(stderr)
            return
        }

        console.log(stdout)
        console.log("Execution Ended")
    })
});
