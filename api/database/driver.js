import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_URI) throw new Error('DB_URI is not defined');
if (!process.env.DB_USERNAME) throw new Error('DB_USERNAME is not defined');
if (!process.env.DB_PASSWORD) throw new Error('DB_PASSWORD is not defined');

export const driver = neo4j.driver(
    process.env.DB_URI,
    neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD),
    {
        maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
        maxConnectionPoolSize: 50,
        connectionAcquisitionTimeout: 30 * 1000, // 30 seconds
        maxTransactionRetryTime: 30 * 1000, // 30 seconds
        logging: {
            level: 'info',
            logger: (level, message) => console.log(level + ' ' + message)
        }
    }
);

// Add retry logic for initial connection
const waitForNeo4j = async (retries = 10, delay = 3000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await driver.verifyConnectivity();
            console.log('Successfully connected to Neo4j');
            return;
        } catch (error) {
            console.log(`Failed to connect to Neo4j (attempt ${i + 1}/${retries}). Waiting ${delay/1000} seconds...`);
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

// Export the connection check
export const verifyConnection = () => waitForNeo4j();