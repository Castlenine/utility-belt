import { configDefaults, defineConfig } from 'vitest/config';

const IS_CI = process.env.CI === 'true';

export default defineConfig({
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: [
			...configDefaults.exclude,
			'**/node_modules/**',
			'**/**.{idea,git,cache,output,temp,tmp,backup,bak,local,local-backup}**/**',
		],
		reporters: ['verbose'],
		globals: true,
		environment: 'node',
		silent: false,
		coverage: {
			enabled: !IS_CI,
			provider: 'istanbul',
			all: false,
			reportsDirectory: './test-results-vitest',
			reporter: ['json', ['html', { subdir: 'html' }]],
			reportOnFailure: true,
		},
	},
});
