import { executeScripts } from "./utils.js"


// Object will handle the execution logic
export const compilerExtn = {
    c: {
        executeScript: (filepath, filename) => {
            const cmd = `gcc -o main ${filepath} && ./main`
            executeScripts(cmd, filename, 'gcc', filepath)
        }
    },
    cpp: {
        executeScript: (filepath, filename) => {
            const cmd = `g++ -o main ${filepath} && ./main`
            executeScripts(cmd, filename, 'g++', filepath)
        }
    },
    java: {
        executeScript: (filepath, filename) => { //Execute script for specific language
            let [file, ext] = filename.split('.')
            let capitalizeFilename = file.at(0).toUpperCase() + file.slice(1)

            const cmd = `javac ${filepath} -d . && java ${capitalizeFilename}`
            executeScripts(cmd, filename, 'java', filepath) // This should not be hardcoded
        }
    }
}


export const Term = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    FgGray: "\x1b[90m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
    BgGray: "\x1b[100m",
}

