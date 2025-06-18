import { type Cookies, redirect } from "@sveltejs/kit";

export const load = ({ locals, cookies }: { locals: App.Locals; cookies: Cookies }) => {
	// Make the fetch call directly
	// await fetch(`${import.meta.env.VITE_KOHAI_API_URL}/auth/logout`, {
	// 	method: "POST",
	// 	credentials: "include",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// })
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 			toast.error("Logout failed");
	// 			return;
	// 		}
	// 		toast.success("Logout successful");
	// 	})
	// 	.catch(() => {
	// 		toast.error("Logout failed");
	// 	});

	// Clear local user state
	locals.user = undefined;

	// Explicitly delete cookies on the SvelteKit side
	cookies.delete("access_token", { path: "/" });
	cookies.delete("refresh_token", { path: "/" });

	throw redirect(302, "/"); // Use throw redirect as it's required for redirects in load functions
};
