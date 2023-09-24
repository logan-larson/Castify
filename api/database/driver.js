import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

// ------------------------------------------------------------
// ------------------------- Neo4j ----------------------------
// ------------------------------------------------------------

// TODO: Perform null checks on them
export const driver = neo4j.driver(
    // @ts-ignore
    process.env.NEO4J_URL,
    // @ts-ignore
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);