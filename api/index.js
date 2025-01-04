import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { driver, verifyConnection } from './database/driver.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

import { resolvers } from './graphql/resolvers/index.js';

import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = fs.readFileSync(path.join(__dirname, 'graphql', 'typeDefs.gql'), 'utf8');

// Wait for Neo4j before starting the server
await verifyConnection()
	.then(async () => {
		const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver });
		const server = new ApolloServer({
			context: ({ req, res }) => {
				if (!req.headers.cookie) {
					return { req, res, token: null };
				}

				const token = req.headers.cookie.split('jwt=')[1];

				return { req, res, token };
			},
			schema: await neoSchema.getSchema(),
		});

		await server.start();

		const app = express();

		app.use(morgan('dev'));

		const origins = process.env.PROD === "true"
			? ["https://castify.social"]
			: [
				"http://localhost:3000",     // SvelteKit dev server
				"http://localhost:4173",     // SvelteKit preview
				"http://localhost:5173",     // Vite dev server
				"http://127.0.0.1:3000",
				"http://127.0.0.1:4173",
				"http://127.0.0.1:5173",
				"http://app:3000",           // Docker container name
				"https://studio.apollographql.com",  // Apollo Studio
				"https://sandbox.apollo.dev"         // New Apollo Sandbox
			];

		app.use(cors({
			origin: origins,
			credentials: true
		}));

		server.applyMiddleware({
			app,
			cors: {
				origin: origins,
				credentials: true
			}
		});

		app.listen({ port: process.env.PORT }, () => {
			console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
		});
	})
	.catch(error => {
		console.error('Failed to connect to Neo4j:', error);
		process.exit(1);
	});