import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

const createConfig = (input, output) => ({
	input,
	output: {
		file: output,
		format: 'es',
		sourcemap: true,
	},
	plugins: [
		resolve(),
		commonjs(),
		typescript({
			tsconfig: './tsconfig.json',
			exclude: ['**/*.test.*'], // Exclude test files from build
		}),
	],
	external: [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.peerDependencies || {})],
});

export default [createConfig('src/index.ts', packageJson.main), createConfig('src/modules.ts', 'dist/modules.js')];
