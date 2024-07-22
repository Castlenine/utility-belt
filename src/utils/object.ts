/* Utility functions for object manipulation */

/*
 * Checks whether a given object is empty.
 *
 * An object is considered empty if it has no own enumerable string-keyed properties.
 * This does not include properties inherited through the prototype chain.
 *
 * @param object - The object to check for emptiness.
 *
 * @returns `true` if the object is empty, `null`, or `undefined`, otherwise `false`.
 */
const isObjectEmpty = (object: object | null | undefined): boolean => {
	if (object == null) return true;

	return Object.keys(object).length === 0;
};

/*
 * Counts the occurrences of a specific value for a given key in an array of objects.
 *
 * This function iterates through each object in the array and checks the value associated with the specified key.
 * If the value matches the `valueToCount`, it increments a count.
 *
 * @param arrayOfObjectsToCount - An array of objects to be processed.
 * @param keyName - The key to look for in each object.
 * @param valueToCount - The value to count within the objects. Can be of any type.
 *
 * @returns The total number of times `valueToCount` occurs in `keyName` across all objects in the array.
 */
const countValueInArrayOfObjects = (
	arrayOfObjectsToCount: Array<Record<string, unknown>>,
	keyName: string,
	valueToCount: unknown,
): number => {
	return arrayOfObjectsToCount.reduce((count, object) => {
		// eslint-disable-next-line security/detect-object-injection
		return object[keyName] === valueToCount ? count + 1 : count;
	}, 0);
};

export { isObjectEmpty, countValueInArrayOfObjects };
