import { driver } from "../../database/driver.js"
import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import cookie from 'cookie';

dotenv.config();

export const UserMutations = {
	async registerUser(_, { registerInput: {username, email, password} }, context) {
		const session = driver.session();

		try {
			// Check if user exists with email
			// If so throw error, emails must be unique to each user
			const result = await session.run(
				'MATCH (u:User {email: $email}) RETURN u', { email }
			);

			if (result && result.records.length > 0) {
				const user = result.records[0].get('u').properties;

				if (user) {
					throw new GraphQLError(
						'A user is already registered with the email ' + email,
						{
							extensions: {
								code: 'USER_ALREADY_EXISTS' 
							}
						}
					);
				}
			}

			//  Encrypt password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Save the user
			const createResult = await session.run(
				'CREATE (u:User { id: randomUUID(), username: $username, email: $email, password: $hashedPassword })  RETURN u',
				{ username, email, hashedPassword }
			);

			const newUser = createResult.records[0].get('u').properties;

			// Create JWT
			const token = jwt.sign(
				{ user_id: newUser.id, email },
				process.env.JWT_SECRET,
				{
					expiresIn: "2h"
				}
			)

			// Attach the JWT to the user in the DB
			const updateResult = await session.run(`
				MATCH (u:User { id: $id})
				SET u.token = $token
				RETURN u
				`,
				{
					id: newUser.id,
					token
				}
			);

			const userWithToken = updateResult.records[0].get('u').properties;

			// Set the JWT as a cookie
			const cookieOptions = {
				httpOnly: true,
				//secure: true,
				//sameSite: 'Strict',
				//domain: process.env.NODE_ENV === 'production' ? 'https://www.localhost:3000' : 'localhost',
			};

			const cookieValue = cookie.serialize('jwt', token, cookieOptions);

			context.res.setHeader('Set-Cookie', cookieValue);

			return userWithToken;

		} finally {
			session.close();
		}
	},
	async loginUser(_, { loginInput: {email, password} }, context) {

		const session = driver.session();

		try {
			// Check if user exists with email
			// If not throw error
			const result = await session.run(
				'MATCH (u:User {email: $email}) RETURN u', { email }
			);

			const user = result.records[0].get('u').properties;

			if (!user) {
				throw new GraphQLError(
					'A user does not exist with the email ' + email,
					{
						extensions: {
							code: 'USER_DOES_NOT_EXIST' 
						}
					}
				);
			}

			// Compare passwords
			const passwordsMatch = await bcrypt.compare(password, user.password);

			if (!passwordsMatch) {
				throw new GraphQLError(
					'Incorrect password',
					{
						extensions: {
							code: 'INCORRECT_PASSWORD' 
						}
					}
				);
			}

			// Create new JWT
			const token = jwt.sign(
				{ user_id: user.id, email },
				process.env.JWT_SECRET,
				{
					expiresIn: "2h"
				}
			)

			// Attach the new JWT to the user in the DB
			const updateResult = await session.run(`
				MATCH (u:User { id: $id})
				SET u.token = $token
				RETURN u
				`,
				{
					id: user.id,
					token
				}
			);

			const userWithToken = updateResult.records[0].get('u').properties;

			// Set the JWT as a cookie
			const cookieOptions = {
				httpOnly: true,
				//secure: true,
				//sameSite: 'Strict',
				//domain: process.env.NODE_ENV === 'production' ? 'https://www.localhost:3000' : 'localhost',
			};

			const cookieValue = cookie.serialize('jwt', token, cookieOptions);

			context.res.setHeader('Set-Cookie', cookieValue);

			return userWithToken;

		} finally {
			session.close();
		}
	}
}


export const UserQueries = {
	async user(_, { ID }) {

		const session = driver.session();

		try {
			const result = session.run(`
				MATCH (u: User { id: $id }) RETURN u
			`,
			{
				id: ID
			}
			);

			const user = result.records[0].get('u').properties;

			return user;

		} finally {
			session.close();
		}
	},
	async getCurrentUser(_, __, { token }) {
		if (!token) {
			return null;
		}

		const session = driver.session();

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const userId = decoded.user_id;

			const result = await session.run(
				`MATCH (u: User { id: $userId }) RETURN u`,
				{ userId }
			);

			if (!result || result.records.length === 0) {
				return null;
			}

			const user = result.records[0].get('u').properties;

			return user;

		} catch (error) {
			console.error(error);
			return null;
		} finally {
			session.close();
		}
	}
}