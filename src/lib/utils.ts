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
