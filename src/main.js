import chokidar from 'chokidar'
import { getFileExtension, getExecutables, argumentParser, executeScripts } from './utils.js'
import { compilerExtn } from './constants.js'
import { NothingToWatch } from './errors.js'

// const args = process.argv.splice(2)


export default function main(args) {

    const parsedArgs = argumentParser(args)
    if (parsedArgs['--watch'].length === 0)
        throw new NothingToWatch()

    const watcher = chokidar.watch(parsedArgs['--watch'], {
        ignored: parsedArgs['--ignore'].length > 0 ? parsedArgs['--ignore'].join("") : "node_modules" //Hehe 
    })

    watcher.on('change', (path, event) => { //? Event for detecting changes in directory
        const file = getFileExtension(path)
        if (!file) return
        const getExec = getExecutables()
        const exec = getExec[file.type] //get the executable

        if (!exec) {
            return
        }
        let cmd = `${exec} ${file.filepath}`
        if (compilerExtn.hasOwnProperty(file.type)) {
            compilerExtn[file.type].executeScript(file.filepath, file.filename)
        } else {
            executeScripts(cmd, file.filename, exec, file.filepath)
        }
    });
}


