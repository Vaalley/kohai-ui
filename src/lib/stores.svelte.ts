import type { SearchResults } from "./types.ts";
import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const searchResults = $state<SearchResults>({ data: [] });

export const isMobile = writable(false);

if (browser) {
	const checkMobile = () => {
		isMobile.set(globalThis.innerWidth <= 768);
	};
	checkMobile();
	globalThis.addEventListener("resize", checkMobile);
}
