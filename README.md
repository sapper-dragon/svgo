# @sapper-dragon/svgo

Decorate your [Sapper](https://sapper.svelte.dev/) project with SVGO.

`@sapper-dragon/svgo` utilizes [SVGO](https://github.com/svg/svgo) under the surface, which is a tool for optimizing Scalable Vector Graphics files.

## Installation

```
npm install @sapper-dragon/svgo --save-dev
# or
yarn add @sapper-dragon/svgo --dev
```

## Usage

This project requires the [@sapper-dragon/trimmings](https://github.com/sapper-dragon/trimmings) lib, so look there first for instructions, then come back. 💫

`@sapper-dragon/svgo` converts files from an `SVGO` folder and outputs them to optimized and importable `*.svelte` files and static `*.svg` files.

### Config

You can place a `trimmings.config.js` file in the root of your project to set configutations. These are the defaults:

```js
export default {
	svgo: {
		input: 'src/trimmings/svgo', // path to watch *.svg files
		filter: /\.(svg)$/, // pattern for files to watch
		outputSvelte: 'src/routes/_svg', // svelte output path
		outputStatic: 'static/svg', // static output path
	},
	// ... additional settings from other @sapper-dragon packages...
}
```
