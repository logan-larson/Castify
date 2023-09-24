import { UserMutations, UserQueries} from "./users.js"

export const resolvers = {
	Query: {
		...UserQueries
	},
	Mutation: {
		...UserMutations
	}
}