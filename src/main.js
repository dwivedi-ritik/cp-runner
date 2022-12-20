import chokidar from 'chokidar'
import fs from 'fs'
import path from 'path'

const FOLDER = "src" //Parent directory
const EXECUTABLE = "python"


const watcher = chokidar.watch(FOLDER, {
    ignored: "node_modules"
})

watcher.on('change', (event, path) => {
    console.log(event, path);
});
