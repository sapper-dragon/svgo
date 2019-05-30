const exec = require('util').promisify(require('child_process').exec)
const { readFile, writeFile } = require('fs').promises
import SVGO from 'svgo'
import { plugins } from './plugins'
import { magenta, red } from 'ansi-colors'

const svgoSvelte = new SVGO({ plugins: plugins.svelte, js2svg: { pretty: true, indent: '	' } })
const svgoStatic = new SVGO({ plugins: plugins.static, js2svg: { pretty: true, indent: '	' } })

export const change = async({ config, filepath }) => {
	try {
		const { input, filter, outputSvelte, outputStatic } = config.svgo

		if (!outputSvelte && !outputStatic) {
			console.log('~>', red('No svg paths set! You need to set either an `outputSvelte` or `outputStatic` path in your config file.\n'))
			return
		}

		console.log('~>', magenta('Cleaning up svg file:'), filepath)

		const content = await readFile(`${input}/${filepath}`, 'utf8')
		if (outputSvelte) {
			const svelteSvg = (await svgoSvelte.optimize(content)).data
			const path = `${outputSvelte}/${filepath.replace(filter, '.svelte')}`
			await writeFile(path, svelteSvg)
			console.log(`    ${path}`)
		}
		if (outputStatic) {
			const staticSvg = (await svgoStatic.optimize(content)).data
			const path = `${outputStatic}/${filepath}`
			await writeFile(path, staticSvg)
			console.log(`    ${path}`)
		}
		console.log()
	} catch (error) {
		console.error(`exec error: ${error}`)
	}
}

export const remove = async({ config, filepath }) => {
	const { filter, outputSvelte, outputStatic } = config.svgo
	if (!outputSvelte && !outputStatic) {
		console.log('~>', red('No svg paths set! You need to set either an `outputSvelte` or `outputStatic` path in your config file.\n'))
		return
	}

	try {
		console.log('~>', magenta('Removing svg files:'), filepath)

		if (outputSvelte) {
			const path = `${outputSvelte}/${filepath.replace(filter, '.svelte')}`
			const { stdout } = await exec(`rm -f ${path}`)
			if (stdout) { console.log(stdout) }
			console.log(path.replace('rm -f ', '    '))
		}
		if (outputStatic) {
			const path = `${outputStatic}/${filepath}`
			const { stdout } = await exec(`rm -f ${path}`)
			if (stdout) { console.log(stdout) }
			console.log(path.replace('rm -f ', '    '))
		}

	} catch (error) {
		console.error(`error: ${error}`)
	}
	console.log()
}
