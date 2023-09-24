export const GET_PODCASTS = `
	query GetPodcasts {
		podcasts {
			id
			title
			description
			url
			image
		}
	}
`;

export const GET_PODCAST = `
    query GetPodcast($id: ID!) {
        podcast(id: $id) {
            id
            title
			description
			url
			image
			episodes {
				id
				title
				description
				url
			}
        }
    }
`;

export const ADD_PODCAST = `
  mutation AddPodcast($addPodcastInput: AddPodcastInput!) {
    addPodcast(addPodcastInput: $addPodcastInput) {
		id
		title
		description
		url
		image
    }
  }
`;
