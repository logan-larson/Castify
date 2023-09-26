import { UserMutations, UserQueries} from "./users.js"
import { PodcastMutations, PodcastQueries} from "./podcasts.js"

export const resolvers = {
	Query: {
		...UserQueries,
		...PodcastQueries
	},
	Mutation: {
		...UserMutations,
		...PodcastMutations
	}
}