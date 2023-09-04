import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import neo4j from 'neo4j-driver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dateScalar } from './customScalar.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// ------------------------------------------------------------
// ---------------------- Configuration -----------------------
// ------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config();

// ------------------------------------------------------------
// --------------------- Auth Middleware ----------------------
// ------------------------------------------------------------

const checkAuth = (context) => {
    const token = context.req.headers.authorization;
    if (!token) {
        throw new Error('Authentication failed!');
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Authentication failed!');
    }

    if (!decodedToken) {
        throw new Error('Authentication failed!');
    }

    return decodedToken;
};

// ------------------------------------------------------------
// ------------------------- Neo4j ----------------------------
// ------------------------------------------------------------

// TODO: Perform null checks on them
const driver = neo4j.driver(
    // @ts-ignore
    process.env.NEO4J_URL,
    // @ts-ignore
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

// ------------------------------------------------------------
// ------------------------- Graph QL -------------------------
// ------------------------------------------------------------

// GraphQL type definitions
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

const resolvers = {
    Mutation: {
        async register(_, { username, email, password }, context) {
            // 1. Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // 2. Save the user to the DB
            const session = driver.session();

            let user;

            try {
                const result = await session.run(
                    'CREATE (u:User { username: $username, email: $email, password: $hashedPassword }) RETURN u',
                    { username, email, hashedPassword }
                );

                user = result.records[0].get('u').properties;
            } finally {
                session.close();
            }

            // 3. Create a JWT token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return {
                token,
                user
            };
        },
        async login(_, { username, password }, context) {
            // 1. Check if the user exists in the DB
            const session = driver.session();

            try {
                const result = await session.run(
                    'MATCH (u: User { username: $username }) RETURN u',
                    { username }
                )

                const userRecord = result.records[0];

                if (!userRecord) {
                    throw new Error("Username not found");
                }

                const user = userRecord.get('user').properties;

                // 2. Check if password is correct
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    throw new Error('Incorrect password');
                }

                // 3. Create a JWT token
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                return {
                    token,
                    user
                };
            } catch (error) {
                throw error;
            } finally {
                session.close();
            }

        },
        changeUsername: async (_, args, context) => {
            const userData = checkAuth(context);

            const session = driver.session();
            try {
                const result = await session.run(
                    'MATCH ()',
                    { username: args.username }
                );

                return result.records[0].get('u').properties;
            } finally {
                session.close();
            }
        },
    },
    Date: dateScalar,
    Query: {
        hello: () => 'Hello, world!',
        user: async (_, args, context) => {
            const userId = context.userId;

            const session = driver.session();

            try {
                //const result = await session.run();
            } finally {
                session.close();
            }
        },
    },
};


// ------------------------------------------------------------
// ------------------------- Server ---------------------------
// ------------------------------------------------------------

const startServer = async () => {

    // Create an instance of Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            return { req };
        }
    });

    // Start Apollo Server
    await server.start();

    // Initialize Express
    const app = express();

    // Apply Apollo middleware to Express
    server.applyMiddleware({ app });

    // Start the server
    app.listen({ port: process.env.PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    });

}

startServer();

