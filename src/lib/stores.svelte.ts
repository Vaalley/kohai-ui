import type { Profile, Results } from "./types.ts";

export const searchResults = $state<Results>({ data: [] });

export const profile = $state<Profile>({ isLoggedIn: false });
