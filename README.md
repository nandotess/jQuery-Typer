# jQuery Plugin: jQuery Typer
* A simple jQuery plugin for a slick typing effect
* Was originally developed for [LayerVault](http://layervault.com) by [Kelly Sutton](http://kellysutton.com)
* Was originally forked from [github.com/kontur/jquery.typer.js](https://github.com/kontur/jquery.typer.js)
* Plugin entire recoded with jQuery plugin development boilerplate: [github.com/jquery-boilerplate/jquery-boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate)
* Now it's possible have many instances from types, each one with its configurations
* NPM, Bower, Gulp

## Example
https://jquery-typer-js.nandotess.com/example/example.html

## Install NPM
https://nodejs.org/en/

## Install NPM modules
`npm install`

This will run the package.json file and download the list of modules to a "node_modules" folder in the template.

## Install Bower modules
`bower install`

This will run the bower.json file and download the list of modules to a "bower_components" folder in the template.

## Gulp Commands
`gulp deploy`

This will deploy all files inside "dist" folder in the template.

`gulp server`

This will deploy all files inside "dist" folder in the template, run server localhost and watch changes in "app" folder.

## Usage

```javascript
$('[data-typer-targets]').typer();
```

That code will start the effect on all elements with the `data-typer-targets` attribute.

You obviously need to supply it with some source data. The `data-typer-targets` attribute can be either a comma-separated string or a piece of JSON.

### Options

There are some options that are available to you as well:

```javascript
// Defaults
{
  highlightSpeed: 20, // ms
  typeSpeed: 100, // ms
  clearDelay: 500, // ms
  typeDelay: 200, // ms
  typerInterval: 2000, // ms
  highlightEverything: true, // true/false
  typerDataAttr: 'data-typer-targets',
  backgroundColor: 'auto', // CSS background-color
  highlightColor: 'auto', // CSS color
  typerOrder: 'sequential' // sequential/random
}
```
