import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import neo4j, { session } from 'neo4j-driver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dateScalar } from './customScalar.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

// ------------------------------------------------------------
// ---------------------- Configuration -----------------------
// ------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
import { verify } from 'crypto';
dotenv.config();

// ------------------------------------------------------------
// --------------------- Auth Middleware ----------------------
// ------------------------------------------------------------

const checkAuth = (context) => {
    //const token = context.req.headers.authorization;
    //console.log(context.req);
    const token = context.req.cookies['jwt'];
    if (!token) {
        console.log("Auth failed, no jwt");
        throw new Error('Authentication failed!');
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user.jwt;
    } catch (error) {
        console.log("Auth failed, invalid jwt");
        throw new Error('Authentication failed!');
    }
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
const typeDefs = fs.readFileSync(path.join(__dirname, 'graphql', 'typeDefs.gql'), 'utf8');

const resolvers = {};

/*
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
                    'CREATE (u:User { id: randomUUID(), username: $username, email: $email, password: $hashedPassword })  RETURN u',
                    { username, email, hashedPassword }
                );

                user = result.records[0].get('u').properties;

                // 3. Create a JWT token
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                context.res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
                });

                session.close();

                return {
                    token,
                    user
                };
            } finally {
                session.close();
            }
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

                const user = userRecord.get('u').properties;

                // 2. Check if password is correct
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    throw new Error('Incorrect password');
                }

                // 3. Create a JWT token
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                context.res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
                });

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
        getCurrentUser: async (_, __, context) => {
            // 1. Check if user is authenticated
            const authUser = checkAuth(context);

            const authUserId = authUser.id;

            //console.log(authUserId);

            const session = driver.session();

            try {
                // 2. Get the user from the database by ID
                const result = await session.run(
                    'MATCH (u:User {id: $id}) RETURN u',
                    { 
                        authUserId
                    }
                );

                const user = result.records[0].get('u').properties;

                // 3. Refresh the JWT token
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                context.res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
                });

                return {
                    token,
                    user
                };
            } finally {
                session.close();
            }
        },
    },
};
*/


// ------------------------------------------------------------
// ------------------------- Server ---------------------------
// ------------------------------------------------------------

const startServer = async () => {

    // Create an instance of Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res })
    });

    // Start Apollo Server
    await server.start();

    // Connect to Neo4j??


    // Initialize Express
    const app = express();


    // Middleware

    //app.use(cookieParser());

    /*
    app.use((req, res, next) => {
        console.log("Cookies: ", req.cookies);
        next();
    })
    */

    //app.use(morgan('dev'));

    // Apply Apollo middleware to Express
    server.applyMiddleware({
        app,
        /*
        cors: {
            origin: ['http://localhost:5173', 'https://studio.apollographql.com'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization']
        }
        */
    });

    // Start the server
    app.listen({ port: process.env.PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    });

}

startServer();

