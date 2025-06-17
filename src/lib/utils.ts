import type { RequestEvent } from "@sveltejs/kit";

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

export async function getUser(event: RequestEvent) {
	const cookieHeader = event.request.headers.get("cookie") || "";

	// We cannot use credentials: "include" because it will not send the cookies
	// So instead we manually send the cookies
	const response = await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/auth/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Cookie": cookieHeader,
		},
	});

	if (response.ok) {
		const data = await response.json();
		return data.user;
	} else {
		return null;
	}
}
