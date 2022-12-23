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

console.log(process.argv.splice(2))