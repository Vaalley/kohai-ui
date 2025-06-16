import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	console.log("hooks.server.ts:", event.url.pathname);

	const user = getuser();
	if (user) {
		event.locals.user = user;
	}

	const response = await resolve(event);
	return response;
};

async function getuser() {
	const user = await fetch(import.meta.env.VITE_KOHAI_API_URL + "/auth/me", {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Not authenticated");
			}
			return response.json();
		})
		.then((data) => {
			console.log("user data: ", data);
			return data.user;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
	return user;
}
