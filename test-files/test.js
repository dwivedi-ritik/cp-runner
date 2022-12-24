// import child_process from 'child_process'

// // const child_process = require("child_process")


// child_process.exec('python test-files/check1.py', (error, stdout, stderr) => {
//     if (error) {
//         console.log("executing error")
//         console.log(error.message)
//     } else if (stdout) {
//         console.log("executing output")

//         console.log(stdout)
//     } else {
//         console.log("executing std error")

//         console.log(stderr)
//     }

// })

// console.log(process.argv.splice(2))

function solvePromise() {
    return new Promise((resolve, reject) => {
        let sum = 0
        for (let i = 0; i < 10e8; i++) {
            sum += i
        }
        console.log("sum executed")
        resolve(sum)
    })
}

console.log("Lets check up and")
// (async () => {
//     console.log("Runing up")
//     const ans = await solvePromise()
//     console.log("Last proces")
// })()

// console.log("\x1b[44m 102033 \x1b[0m")




