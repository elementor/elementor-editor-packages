import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import path from 'path';

const packages = [
	{
		name: '@elementor/ui',
		location: path.resolve(__dirname, './packages/ui'),
		input: 'src/index.js',
	},
];

export default packages.map((packageDeclaration) => {
	return {
		input: path.resolve(
			packageDeclaration.location,
			packageDeclaration.input
		),
		external: ['react', 'react-dom'],
		output: [
			{
				file: path.resolve(
					packageDeclaration.location,
					'build/index.es.js'
				),
				format: 'esm',
				sourcemap: true,
			},
			{
				file: path.resolve(
					packageDeclaration.location,
					'build/index.js'
				),
				format: 'cjs',
				sourcemap: true,
			},
		],
		plugins: [
			babel({ babelHelpers: 'bundled' }),
			commonjs(),
			peerDepsExternal(),
		],
	};
});
