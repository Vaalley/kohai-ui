import type { Component } from "svelte";

// Add type declaration for the user in the event locals
declare global {
	namespace App {
		interface Locals {
			user?: {
				id: string;
				email: string;
				username: string;
				isadmin: boolean;
				created_at: string;
				updated_at: string;
				last_login: string;
			};
		}
	}
}

export type ProfileMenuLink = {
	label: string;
	url: string;
	icon: Component;
};

export type SearchResults = {
	data: {
		name: string;
		slug: string;
	}[];
};

export type Profile = {
	isLoggedIn: boolean;
};
