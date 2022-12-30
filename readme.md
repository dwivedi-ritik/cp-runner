A small node app that detect the changes in the files and run them with their executables.
it can come handy to people who do alot of competative programming or leetcodes

```shell
$ node src/main.js --watch dirs/paths --ignore dirs/paths
```
![meme3](https://user-images.githubusercontent.com/58474947/209993420-a149ce4b-515a-40b7-a066-4fca10ea6c4c.gif)


easy setup
```shell
$ node setup.js 
```

## Setup in Linux
- run `node setup.js`
- add alias of full path of `src/main.js` in your shell profile 
```shell 
$ echo 'alias cp-watch=$(pwd)' >> ~/.zshrc
```
## Features
- Customizable configuration
- Multiple language support
- Easy node script setup

## Supported Lang
- cpp
- python
- node
- java
- go

## Note
- It cannot take standard input.
- Only detect the changes in files ( if new file created it will ignore it)





