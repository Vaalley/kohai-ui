import { redirect } from "@sveltejs/kit";

export const load = ({ locals }: { locals: { user: { isadmin: boolean } } }) => {
	const isAdmin = locals.user?.isadmin;

	if (!isAdmin) {
		throw redirect(302, "/");
	}

	return {};
};
