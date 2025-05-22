interface Results {
	data: {
		name: string;
		slug: string;
	}[];
}

interface Profile {
	isLoggedIn: boolean;
}

export const searchResults = $state<Results>({ data: [] });

export const profile = $state<Profile>({ isLoggedIn: false });
