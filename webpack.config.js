const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const path = require( 'path' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const autoprefixer = require( 'autoprefixer' );
const { join } = require( 'path' );
const camelCaseDash = string => string.replace( /-([a-z])/g, ( match, letter ) => letter.toUpperCase() );

const externals = [
	'components',
	'api-fetch',
	'edit-post',
	'element',
	'plugins',
	'editor',
	'block-editor',
	'blocks',
	'hooks',
	'utils',
	'date',
	'data',
	'i18n',
].reduce(
	( externals, name ) => ( {
		...externals,
		[ `@wordpress/${ name }` ]: `wp.${ camelCaseDash( name ) }`,
	} ),
	{
		wp: 'wp',
		ga: 'ga', // Old Google Analytics.
		gtag: 'gtag', // New Google Analytics.
		react: 'React', // React itself is there in Gutenberg.
		jquery: 'jQuery', // import $ from 'jquery'; // Use jQuery from WP after enqueuing it.
		'react-dom': 'ReactDOM',
		lodash: 'lodash', // Lodash is there in Gutenberg.
		bastetBlocksGlobal: 'bastetBlocksGlobal', // import globals from 'bastetBlocksGlobal'; // Localized data.
	}
);



const extractConfig = {
	use: [
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {sourceMap: true},
		}, {
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					sourceMap: true,
					plugins: [
						autoprefixer( {
							overrideBrowserslist: [
								'>1%',
								'last 4 versions',
								'Firefox ESR',
								'not ie < 9',
							],
							flexbox: 'no-2009',
						} ),
					],
				},
			}
		},{
			loader: 'sass-loader',
			options: {
				additionalData: '@import "./src/common.scss";\n',
				sourceMap: true
			},
		}]
};

module.exports = {
	mode,
	devtool: 'source-map',
	entry: './src/blocks.js',
	output: {
		path: __dirname +'/dist',
		filename: 'blocks.build.js',
		publicPath: "/dist/"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				common: false,
				editor: {
					name: 'editor',
					test: /editor\.s[ac]ss$/i,
					chunks: 'all',
					enforce: true
				},
				style: {
					name: 'style',
					test: /style\.s[ac]ss$/i,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react', {
							"include": [
								"@babel/plugin-proposal-object-rest-spread"
							]
						},{
							"plugins": [
								["@babel/plugin-proposal-decorators", { "legacy": true }],
								"@babel/plugin-proposal-function-sent",
								"@babel/plugin-proposal-export-namespace-from",
								"@babel/plugin-proposal-numeric-separator",
								"@babel/plugin-proposal-throw-expressions",
								"@babel/plugin-transform-spread",
								"@babel/plugin-syntax-dynamic-import",
								"@babel/plugin-syntax-import-meta",
								["@babel/plugin-proposal-class-properties", { "loose": true }],
								"@babel/plugin-proposal-json-strings",
								"@babel/plugin-proposal-object-rest-spread"
							]
						}]
					}
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				exclude: [
					path.resolve(__dirname, './node_modules'),
				],
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '../',
						publicPath: '/images/',
					},
				},
			},
			{
				test: /\.s?css$/,
				exclude: /(node_modules|bower_components)/,
				use: extractConfig.use
			},

		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'blocks.[name].build.css',
			chunkFilename: 'blocks.[name].build.css',
		}),
	],
	stats: 'normal',
	watch: false,
	externals: externals,
};
