A small node app that detect the changes in the files and run them with their executables.
it can come handy to people who do alot of competative programming or leetcodes

```shell
$ node src/main.js --watch dirs/paths --ignore dirs/paths
```
https://user-images.githubusercontent.com/58474947/215333309-b6e7e0aa-fbb4-4f1d-82aa-80b23e921f32.mp4

## Features
- Blazing Fast
- Customizable configuration
- Multiple language support
- Easy setup

## Installation

```shell
$ npm install -g cp-runner 
```
then setup configuration
```shell
$ node setup.js 
```
or
you can manually paste the `config.json` content at this path
`$HOME/.config/cp-runner/config.json`

## Usages
once installation done just type `cp-watch --watch directory_name` in terminal.

## Note 
For stdin create filename as `input.txt` and paste your inputs there.
Result will be shown on the terminal window


## Setup in Linux (Optional)
- run `node setup.js`
- add alias of full path of `src/main.js` in your shell profile 


## Supported Lang
- cpp
- python
- node
- java
- go


Feel free to contribute 🍻 




