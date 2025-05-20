/**
 * Creates a debounced version of a function that delays its execution until after
 * the specified delay has elapsed since the last time it was invoked.
 *
 * @param fn - The function to debounce
 * @param delay - The number of milliseconds to delay, defaults to 300
 * @returns A debounced version of the original function
 *
 * @example
 * const debouncedSearch = debounce(handleSearch, 500);
 * // Will only execute handleSearch after 500ms of inactivity
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
	fn: T,
	delay = 300,
): (...args: Parameters<T>) => void {
	let timeout: number | undefined;

	return function (this: unknown, ...args: Parameters<T>) {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
}
