// 1.Getting file extensions
// 2.Parsing default config and user config
// 3.Mapping file executables with the file extentions
import { InvalidFileName } from './errors.js'

export function getFileExtension(filename) { //? Reading file header will be expensive
    let splitContent = filename.split(".")
    if (splitContent.length === 0 || splitContent.length === 1) {
        throw new InvalidFileName()
    }
    return splitContent[splitContent.length - 1]
}
