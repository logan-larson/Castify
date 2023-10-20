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

export const GET_PODCAST_DETAILS = `
	query PodcastDetails($where: PodcastWhere, $options: EpisodeOptions) {
		podcasts(where: $where) {
			id
			title
			image
			description
			episodes(options: $options) {
				id
				title
				description
				releaseDate
				duration
				url
				image
			}
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
				image
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
