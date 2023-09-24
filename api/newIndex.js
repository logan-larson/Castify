import express from 'express';
import { ApolloServer } from "apollo-server-express";

//import { startStandaloneServer } from '@apollo/server/standalone';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

import { resolvers } from './graphql/resolvers/index.js';

import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = fs.readFileSync(path.join(__dirname, 'graphql', 'typeDefs.gql'), 'utf8');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => {
		const token = req.headers.cookie.split('jwt=')[1];
		console.log("Token", token);
		//console.log(req.headers.cookie);
		//const token = req.cookies['jwt'];
		return { req, res, token };
	},
});

await server.start();

const app = express();

server.applyMiddleware({
	app,
	cors: {
		origin: "http://localhost:5173",
		credentials: true
	}
});

app.listen({ port: process.env.PORT }, () => {
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});

/*
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
	context: ({ req, res }) => ({ req, res }),
});

console.log(`🚀 Server ready at ${url}`);
*/