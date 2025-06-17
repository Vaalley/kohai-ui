import type { Handle, RequestEvent } from "@sveltejs/kit";

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
				console.log("User authenticated:", response);
			} else {
				console.log("Authentication failed, clearing session");
				event.cookies.delete("access_token", { path: "/", httpOnly: true });
				event.cookies.delete("refresh_token", { path: "/", httpOnly: true });
			}
		} catch (error: unknown) {
			console.error("Error during authentication:", error);
			// Clear invalid session on error
			event.cookies.delete("access_token", { path: "/", httpOnly: true });
			event.cookies.delete("refresh_token", { path: "/", httpOnly: true });
		}
	}

	// Resolve the event with the updated locals
	const response = await resolve(event);
	return response;
};

async function getUser(event: RequestEvent) {
	const cookieHeader = event.request.headers.get("cookie") || "";

	const response = await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/auth/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Cookie": cookieHeader, // Forward the cookies manually
		},
	});

	if (response.ok) {
		const data = await response.json();
		return data.user;
	} else {
		return null;
	}
}
