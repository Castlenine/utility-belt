/* Helpers utility functions for delay */

/*
 * Delays the execution of subsequent code for a specified number of milliseconds.
 * Unlike a normal `setTimeout`, `delay` does not wait for the call stack to be empty.
 * This function returns a promise that resolves after the specified delay.
 *
 * @param milliseconds - The number of milliseconds to delay execution.
 *
 * @returns A promise that resolves after the specified delay period.
 * If milliseconds is negative or not a number, the promise resolves immediately.
 *
 * @example
 * await delay(1000); // Waits for 1 second
 * await delay(5000); // Waits for 5 seconds
 *
 * @remarks
 * This function is useful when you want to introduce a fixed-time delay without the need to wait for the call stack to become empty.
 * Remember to use `await` when calling this function to ensure the delay is respected in asynchronous flows.
 */
const delay = (milliseconds: number): Promise<void> => {
	if (!Number.isFinite(milliseconds) || milliseconds < 0) {
		console.error('Delay must be a non-negative number');

		return Promise.resolve();
	}

	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default delay;
