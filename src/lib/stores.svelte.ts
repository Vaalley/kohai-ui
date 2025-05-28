import type { Profile, SearchResults } from "./types.ts";

export const searchResults = $state<SearchResults>({ data: [] });

export const profile = $state<Profile>({ isLoggedIn: false });
