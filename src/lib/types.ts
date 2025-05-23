import type { Icon } from "lucide-svelte";

export type ProfileMenuLink = {
	label: string;
	url: string;
	icon: Icon;
};

export type Results = {
	data: {
		name: string;
		slug: string;
	}[];
}

export type Profile = {
	isLoggedIn: boolean;
}