import { type Cookies, redirect } from "@sveltejs/kit";

export const load = ({ locals, cookies }: { locals: App.Locals; cookies: Cookies }) => {
	locals.user = undefined;
	cookies.delete("access_token", { path: "/" });
	cookies.delete("refresh_token", { path: "/" });
	throw redirect(302, "/");
};
