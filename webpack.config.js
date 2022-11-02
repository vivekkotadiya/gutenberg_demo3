/**
 * WordPress dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

const path = require('path');
const fs = require('fs');

const scripts = ['tbblocks-main'];

const tbblocksEntries = fs
	.readdirSync(path.resolve(process.cwd(), 'src'))
	.filter((file) => file.startsWith('blocks-'));

const tbblocksChunks = tbblocksEntries.reduce(
	(a, file) => ({
		...a,
		['tb' + file.replace('.js', '')]: path.resolve(
			process.cwd(),
			`src/${file}`
		),
	}),
	{}
);

module.exports = {
	...defaultConfig,
	entry: {
		...tbblocksChunks,

		...scripts.reduce((memo, script) => {
			memo[`js/${script}`] = path.resolve(
				process.cwd(),
				'src',
				'js',
				`${script}.js`
			);
			return memo;
		}, {}),
	},

	output: {
		...defaultConfig.output,
		path: path.resolve(process.cwd(), 'dist/'),
		publicPath: 'auto',
	},
};
