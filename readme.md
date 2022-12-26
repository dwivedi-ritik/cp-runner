A small node app that detect the changes in the files and run them with their executables.
it can come handy to people who do alot of competative programming or leetcodes

```shell
$ node src/main.js --watch dirs/paths --ignore dirs/paths
```

## Features
- Customizable configuration
- Easy node script setup

## Supported Lang
- cpp
- python
- node

## Setup
- run `node setup.js`
- add alias of full path of `src/main.js` in your shell profile


## Note
- Only detect the changes in files ( if new file created it will ignore it)
- There are some issues in `c`  
- It cannot take stdinput for now