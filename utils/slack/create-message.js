import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_API_BASE_URL = process.env.SLACK_API_BASE_URL;

const headers = {
    Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
    'Content-Type': 'application/json',
};

/**
 * Creates a new message (thread)
 *
 * @param requestDetails - The request details
 * @param text - The text of the message to be posted
 */
export async function createMessage(requestDetails, text) {
    const response = await axios.post(
        `${SLACK_API_BASE_URL}/chat.postMessage`,
        {
            channel: requestDetails.channel_id,
            text,
        },
        { headers },
    );

    if (!response.data.ok) {
        throw new Error(`[createMessage] Slack error: ${response.data.error}`);
    }

    console.log(`[createMessage] Message created successfully in channel ${requestDetails.channel_id}.`);

    requestDetails.thread_id = response.data.ts;
    console.log(`[createMessage] Updated request details with thread_id ${requestDetails.thread_id}.`);

    return response.data;
}
