A small node app that detect the changes in the files and run them with their executables.
it can come handy to people who do alot of competative programming or leetcodes

```shell
$ node src/main.js --watch dirs/paths --ignore dirs/paths
```
![meme3](https://user-images.githubusercontent.com/58474947/209993420-a149ce4b-515a-40b7-a066-4fca10ea6c4c.gif)

## Installation

```shell
$ npm install -g cp-runnner 
```
then setup configuration
```shell
$ node setup.js 
```
you can manually setup configuration at this path
`$HOME/.config/cp-runner/config.json`

## Note 
For stdin create filename as `input.txt` and paste your inputs there.
Result will be shown on the terminal window

## Setup in Linux
- run `node setup.js`
- add alias of full path of `src/main.js` in your shell profile 

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


Feel free to contribute 🍻 




