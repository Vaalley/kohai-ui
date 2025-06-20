import type { Handle } from "@sveltejs/kit";
import { getUser } from "$lib/utils";

export const handle: Handle = async ({ event, resolve }) => {
	// Get cookies from the incoming request
	const accessToken = event.cookies.get("access_token");
	const refreshToken = event.cookies.get("refresh_token");

	// If we have a session cookie, try to get the user
	if (accessToken || refreshToken) {
		try {
			const response = await getUser(event);
			if (response) {
				event.locals.user = response;
			} else {
				event.cookies.delete("access_token", { path: "/", httpOnly: true });
				event.cookies.delete("refresh_token", { path: "/", httpOnly: true });
			}
		} catch (_error: unknown) {
			// Clear invalid session on error
			event.cookies.delete("access_token", { path: "/", httpOnly: true });
			event.cookies.delete("refresh_token", { path: "/", httpOnly: true });
		}
	}

	// Resolve the event with the updated locals
	const response = await resolve(event);
	return response;
};
