import cron from 'node-cron';
import { ConfidentialClientApplication } from '@azure/msal-node'
import * as config from './config.js'
import { Client } from "@microsoft/microsoft-graph-client";

// Create MSAL configuration
const msalConfig = {
    auth: {
        clientId: config.clientId,
        authority: config.authority,
        clientSecret: config.clientSecret
    }
};

// Initialize MSAL client
const msalClient = new ConfidentialClientApplication(msalConfig);

// Acquire token using client credentials flow
async function getAccessToken() {
    const tokenRequest = {
        scopes: [config.scope], // The scope(s) you need access to
    };

    try {
        const response = await msalClient.acquireTokenByClientCredential(tokenRequest);
        console.log('Access Token:', response.accessToken);
        return response.accessToken;
    } catch (error) {
        console.error('Error acquiring token:', error);
    }
}

async function getGraphClient() {
    const accessToken = await getAccessToken();
    const client = Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
    return client;
}

async function performTask() {
    const client = await getGraphClient();
    let lists = await client.api('/me/todo/lists')
        .get();

    console.log(lists);
}

await performTask();


// Schedule a task to run every minute
// cron.schedule('* * * * *', () => {
//   console.log('Task is running every minute');
// });