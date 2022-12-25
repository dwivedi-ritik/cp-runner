import chokidar from 'chokidar'

import { getFileExtension, getExecutables, argumentParser, executeScripts } from './utils.js'
import { compilerExtn } from './constants.js'
import { NothingToWatch } from './errors.js'

const args = process.argv.splice(2)

const parsedArgs = argumentParser(args)

if (parsedArgs['--watch'].length === 0)
    throw new NothingToWatch()

const watcher = chokidar.watch(parsedArgs['--watch'], {
    ignored: parsedArgs['--ignore'].length > 0 ? parsedArgs['--ignore'].join("") : "node_modules" //Hehe 
})

watcher.on('change', (path, event) => { //? Event for detecting changes in directory
    const file = getFileExtension(path)
    const getExec = getExecutables()
    const exec = getExec[file.type] //get the executable

    let cmd = `${exec} ${file.filepath}`
    if (compilerExtn.hasOwnProperty(file.type)) {
        cmd += `${compilerExtn[file.type].postCmd}`
    }
    executeScripts(cmd, file.filename, exec)
});

