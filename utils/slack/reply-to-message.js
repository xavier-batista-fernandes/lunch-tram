import axios from 'axios';

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_API_BASE_URL = process.env.SLACK_API_BASE_URL;

const headers = {
    Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
    'Content-Type': 'application/json',
};

/**
 * Creates a new threaded message in a Slack channel
 * @param requestDetails - The details of the request containing channel_id and thread_id
 * @param message - The text of the message to be replied
 */
export async function replyToMessage(requestDetails, message) {
    const response = await axios.post(
        `${SLACK_API_BASE_URL}/chat.postMessage`,
        {
            channel: requestDetails.channel_id,
            thread_ts: requestDetails.thread_id,
            text: message,
        },
        { headers },
    );

    if (!response.data.ok) {
        throw new Error(`[replyToMessage] Slack error: ${response.data.error}`);
    }

    return {
        thread_ts: response.data.ts,
        channel: response.data.channel,
        message: response.data.message,
    };
}
