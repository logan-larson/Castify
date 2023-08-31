const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const neo4j = require('neo4j-driver');
const fs = require('fs');
const path = require('path');
const customScalar = require('./customScalar');

require('dotenv').config();

const JWT_SECRET = 'MY_SECRET_KEY'; // TODO move to environment variable

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
        decodedToken = jwt.verify(token, JWT_SECRET);
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

// TODO: Move these strings to the dotenv eventually
const driver = neo4j.driver(
    'neo4j+s://dfd491da.databases.neo4j.io',
    neo4j.auth.basic('neo4j', '50UlO0OckDcxTiAjvRhwAAXDTorkKmq3a7bHbFotQQ4')
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
            // TODO: this is a dummy response for now
            const user = {
                id: '123',
                email: 'loganlarson@castify.com',
                username: 'logan-larson',
                password: 'Admin123',
                firstName: 'Logan',
                lastName: 'Larson'
            };

            // 3. Create a JWT token
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

            return {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: token
            };
        },
        async login(_, { email, password }, context) {
            // 1. Check if the user exists in the DB
            // TODO: this is a dummy response for now
            const user = {
                id: '123',
                email: 'loganlarson@castify.com',
                username: 'logan-larson',
                password: 'Admin123',
                firstName: 'Logan',
                lastName: 'Larson'
            };

            // 2. Check if password is correct
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new Error('Wrong credentials!');
            }

            // 3. Create a JWT token
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

            return {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: token
            };
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
    Date: customScalar.Date,
    Query: {
        hello: () => 'Hello, world!',
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
    const PORT = 4000;
    app.listen({ port: PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });

}

startServer();

