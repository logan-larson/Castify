import express from 'express';
import { ApolloServer } from "apollo-server-express";

//import { startStandaloneServer } from '@apollo/server/standalone';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

import { resolvers } from './graphql/resolvers/index.js';

import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = fs.readFileSync(path.join(__dirname, 'graphql', 'typeDefs.gql'), 'utf8');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => {
		if (!req.headers.cookie) {
			return { req, res, token: null };
		}

		const token = req.headers.cookie.split('jwt=')[1];

		return { req, res, token };
	},
});

await server.start();

const app = express();

app.use(morgan('dev'));

server.applyMiddleware({
	app,
	cors: {
		origin: [
			"http://localhost",
			"https://localhost",
			"http://localhost:4000",
			"http://localhost:4173",
			"http://localhost:5173",
			"https://studio.apollographql.com",
			"http://172.234.31.87",
			"https://172.234.31.87",
			"http://castify.social",
			"https://castify.social",
			"http://api:4000",
			"http://webapp:3000",
		],
		credentials: true
	}
});

app.listen({ port: process.env.PORT }, () => {
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});