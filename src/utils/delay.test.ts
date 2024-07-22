import { describe, it, expect, vi } from 'vitest';

import delay from './delay';

describe('delay function', () => {
	it('should delay execution for the specified time', async () => {
		const START = Date.now();
		await delay(100);
		const END = Date.now();
		expect(END - START).toBeGreaterThanOrEqual(100);
	});

	it('should resolve immediately for negative delay', async () => {
		const START = Date.now();
		await delay(-100);
		const END = Date.now();
		expect(END - START).toBeLessThan(50); // Allow some small execution time
	});

	it('should resolve immediately for NaN delay', async () => {
		const START = Date.now();
		await delay(NaN);
		const END = Date.now();
		expect(END - START).toBeLessThan(50); // Allow some small execution time
	});

	it('should resolve immediately for Infinity delay', async () => {
		const START = Date.now();
		await delay(Infinity);
		const END = Date.now();
		expect(END - START).toBeLessThan(50); // Allow some small execution time
	});

	it('should log an error for invalid delay', async () => {
		const CONSOLE_ERROR_SPY = vi.spyOn(console, 'error').mockImplementation(() => {});
		await delay(-100);
		expect(CONSOLE_ERROR_SPY).toHaveBeenCalledWith('Delay must be a non-negative number');
		CONSOLE_ERROR_SPY.mockRestore();
	});

	it('should work with zero delay', async () => {
		const START = Date.now();
		await delay(0);
		const END = Date.now();
		expect(END - START).toBeLessThan(50); // Allow some small execution time
	});

	it('should handle multiple delays in sequence', async () => {
		const START = Date.now();
		await delay(100);
		await delay(100);
		const END = Date.now();
		expect(END - START).toBeGreaterThanOrEqual(200);
	});
});
