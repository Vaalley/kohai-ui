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

/**
 * Fetches the current user from the API by sending the request with the
 * cookie header. The backend automatically handles token refresh if needed.
 *
 * @param event - The request event
 * @returns The user object or null if the user is not authenticated
 */
export async function getUser(event: RequestEvent) {
	const cookieHeader = event.request.headers.get("cookie") || "";

	try {
		// We cannot use credentials: "include" because it will not send the cookies
		// So instead we manually send the cookies
		const apiUrl = import.meta.env.VITE_KOHAI_API_URL;
		const response = await fetch(`${apiUrl}/api/auth/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Cookie": cookieHeader,
				"x-api-key": import.meta.env.VITE_KOHAI_API_KEY,
			},
		});

		if (response.ok) {
			const data = await response.json();

			// Forward any Set-Cookie headers from the backend to the client
			// This handles the case where the backend refreshed tokens
			const setCookieHeader = response.headers.get("set-cookie");
			if (setCookieHeader) {
				// The backend sets cookies in the format: "name=value; HttpOnly; Path=/; Max-Age=900"
				// We need to parse this and set the cookies in the SvelteKit response
				const cookies = setCookieHeader.split(/,(?=\s*\w+\s*=)/);

				for (const cookieStr of cookies) {
					const parts = cookieStr.trim().split(";");
					const [nameValue] = parts;
					const [name, value] = nameValue.split("=");

					if (name && (name.trim() === "access_token" || name.trim() === "refresh_token")) {
						// Extract cookie options with required defaults
						const options: {
							path: string;
							httpOnly?: boolean;
							maxAge?: number;
							secure?: boolean;
							sameSite?: "strict" | "lax" | "none";
						} = {
							path: "/", // Default path required by SvelteKit
						};

						for (let i = 1; i < parts.length; i++) {
							const part = parts[i].trim().toLowerCase();
							if (part === "httponly") {
								options.httpOnly = true;
							} else if (part === "secure") {
								options.secure = true;
							} else if (part.startsWith("path=")) {
								options.path = part.split("=")[1] || "/";
							} else if (part.startsWith("max-age=")) {
								options.maxAge = parseInt(part.split("=")[1]);
							} else if (part.startsWith("samesite=")) {
								options.sameSite = part.split("=")[1] as "strict" | "lax" | "none";
							}
						}

						event.cookies.set(name.trim(), value, options);
					}
				}
			}

			return data.user;
		} else {
			// If the backend returns 401, it means both access token and refresh token are invalid
			// The backend has already cleared the cookies, so we don't need to do anything
			return null;
		}
	} catch (_error) {
		return null;
	}
}

export function getImageUrl(imageId: string, size: string = "t_cover_big"): string {
	return `https://images.igdb.com/igdb/image/upload/${size}/${imageId}.jpg`;
}
