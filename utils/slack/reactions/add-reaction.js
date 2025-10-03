import axios from 'axios';

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_API_BASE_URL = process.env.SLACK_API_BASE_URL;
const headers = {
    Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
    'Content-Type': 'application/json',
};

export async function addReaction(requestDetails, emoji) {
    const emojiName = emoji.replace(/:/g, '');

    const response = await axios.post(
        `${SLACK_API_BASE_URL}/reactions.add`,
        {
            channel: requestDetails.channel_id,
            timestamp: requestDetails.thread_id,
            name: emojiName,
        },
        { headers }
    );

    if (!response.data.ok) {
        const text =
            `\e[0;31m[addReaction]\x1b[0m` +
            `Could not add reaction on channel ${requestDetails.channel_id} with the emoji \x1b[32m${emojiName}\x1b[0m.\n` +
            `Error details: ${response.data.response_metadata?.messages}`;
        console.log(text);
    }
}
