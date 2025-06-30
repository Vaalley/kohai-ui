import type { SearchResults } from "./types.ts";
import { browser } from "$app/environment";
import { writable } from "svelte/store";

// store for search results using $state rune
export const searchResults = $state<SearchResults>({ data: [] });

// store for mobile state using writable store
export const isMobile = writable(false);

if (browser) {
	const checkMobile = () => {
		// deno-lint-ignore no-explicit-any
		isMobile.set((globalThis as any).innerWidth <= 768);
	};
	checkMobile();
	globalThis.addEventListener("resize", checkMobile);
}
