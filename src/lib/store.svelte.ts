interface Results {
	data: {
		name: string;
		slug: string;
	}[];
}

export const searchResults = $state<Results>({ data: [] });
