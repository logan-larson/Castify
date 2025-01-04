import { driver } from "../../database/driver.js"
import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from "../../utils/jwt.js";
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
				'CREATE (u:User { id: randomUUID(), username: $username, email: $email, password: $hashedPassword, createdOn: datetime() })  RETURN u',
				{ username, email, hashedPassword }
			);

			const newUser = createResult.records[0].get('u').properties;

			// Create JWT
			const token = jwt.generateToken(newUser);

			// Set the JWT as a cookie
			const cookieOptions = {
				httpOnly: true,
				//secure: true,
				//sameSite: 'Strict',
				//domain: process.env.NODE_ENV === 'production' ? 'https://www.localhost:3000' : 'localhost',
			};

			const cookieValue = cookie.serialize('jwt', token, cookieOptions);

			context.res.setHeader('Set-Cookie', cookieValue);

			return newUser;

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

			if (!result || result.records.length === 0) {
				throw new GraphQLError(
					'A user does not exist with the email ' + email,
					{
						extensions: {
							code: 'USER_DOES_NOT_EXIST' 
						}
					}
				);
			}

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
			const token = jwt.generateToken(user);

			// Set the JWT as a cookie
			const cookieOptions = {
				httpOnly: true,
				//secure: true,
				//sameSite: 'Strict',
				//domain: process.env.NODE_ENV === 'production' ? 'https://www.localhost:3000' : 'localhost',
			};

			const cookieValue = cookie.serialize('jwt', token, cookieOptions);

			context.res.setHeader('Set-Cookie', cookieValue);

			return user;

		} finally {
			session.close();
		}
	},
	async logoutUser(_, __, context) {
		const session = driver.session();

		try {
			// Clear the JWT cookie
			const cookieOptions = {
				httpOnly: true,
				//secure: true,
				//sameSite: 'Strict',
				//domain: process.env.NODE_ENV === 'production' ? 'https://www.localhost:3000' : 'localhost',
			};

			const cookieValue = cookie.serialize('jwt', '', cookieOptions);

			context.res.setHeader('Set-Cookie', cookieValue);

			return true;
		} finally {
			session.close();
		}
	}
}


export const UserQueries = {
	async getCurrentUser(_, __, { token }) {
		if (!token) {
			return null;
		}

		const session = driver.session();

		try {
			const decoded = jwt.verifyToken(token);

			const userId = decoded.user_id;

			const result = await session.run(
				`MATCH (u: User { id: $userId }) RETURN u`,
				{ userId }
			);

			if (!result || result.records.length === 0) {
				throw new GraphQLError(
					'No user found with this token',
					{
						extensions: {
							code: 'NO_USER_FOUND' 
						}
					}
				);
			}

			const user = result.records[0].get('u').properties;

			return user;
		} finally {
			session.close();
		}
	}
}