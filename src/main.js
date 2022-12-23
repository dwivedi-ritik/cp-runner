import chokidar from 'chokidar'
import { getFileExtension, getExecutables } from './utils.js'
// Pass as command line argument or use it from the user config 
const FOLDER = "test-files" //Parent directory
const EXECUTABLE = "python"

const watcher = chokidar.watch(FOLDER, {
    ignored: "node_modules"
})

watcher.on('change', (path, event) => {
    const filetype = getFileExtension(path)
    const getExec = getExecutables()
    const exec = getExec[filetype.type]
    if (!exec) {
        throw
    }
    console.log(exec)
});
