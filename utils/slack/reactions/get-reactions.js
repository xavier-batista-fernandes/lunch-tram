import axios from 'axios';

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_API_BASE_URL = process.env.SLACK_API_BASE_URL;

const headers = {
    Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
    'Content-Type': 'application/json',
};

export async function getReactions(channel_id, thread_id) {
    const response = await axios.get(`${SLACK_API_BASE_URL}/reactions.get`, {
        headers,
        params: {
            channel: channel_id,
            timestamp: thread_id,
        },
    });

    return response.data.message.reactions ?? [];
}
