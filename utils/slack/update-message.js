import axios from 'axios';

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_API_BASE_URL = process.env.SLACK_API_BASE_URL;

const headers = {
    Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
    'Content-Type': 'application/json',
};

/**
 * Updates existing message (thread)
 *
 * @param requestDetails - The request details containing channel_id and thread_id
 * @param new_text - The new text for the message
 */
export async function updateMessage(requestDetails, new_text) {
    const response = await axios.post(
        `${SLACK_API_BASE_URL}/chat.update`,
        {
            channel: requestDetails.channel_id,
            ts: requestDetails.thread_id,
            text: new_text,
        },
        { headers },
    );

    if (!response.data.ok) {
        throw new Error(`[updateMessage] Slack error: ${response.data.error}`);
    }

    return response.data.message;
}
