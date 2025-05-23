import type { Component } from "svelte";

export type ProfileMenuLink = {
	label: string;
	url: string;
	icon: Component;
};

export type Results = {
	data: {
		name: string;
		slug: string;
	}[];
};

export type Profile = {
	isLoggedIn: boolean;
};
