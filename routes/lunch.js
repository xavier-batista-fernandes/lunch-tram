import { createMessage } from '../utils/slack/create-message.js';
import { updateMessage } from '../utils/slack/update-message.js';
import { replyToMessage } from '../utils/slack/reply-to-message.js';
import { getPollResults } from '../utils/lunch/get-poll-results.js';
import {
    parseLunchParticipantsMessage,
    parseLunchPollActiveMessage,
    parseLunchPollClosedMessage,
} from '../constants/messages.js';

const LOGS_PREFIX = '\x1b[1;35m[Single Meal Lunch]\x1b[0m';
const POLL_DURATION_MINUTES = 10;

export const lunchHandler = async function (req, res) {
    const request = req.body;
    const meal = request.text;
    console.log(`\n${LOGS_PREFIX} ${request.user_name} started a lunch poll.`);

    console.log(`${LOGS_PREFIX} Request entries:  ${Object.entries(request)}`);

    // Agglomerate the request details.
    const emoji = 'knife_fork_plate';
    const requestDetails = {
        requester_user: request.user_name,
        channel_id: request.channel_id,
        emoji: emoji,
        meal: meal,
    };

    if (!meal || meal.trim() === '') {
        return res.status(200).send("Please specify what's for lunch. \nExample: `/lunch Bacalhau com Natas`");
    }

    // Request meets the format.
    // Reply to Slack to acknowledge the request and avoid timeout.
    res.status(200).send();

    let remainingMinutes = POLL_DURATION_MINUTES;
    const text = parseLunchPollActiveMessage(meal, remainingMinutes);

    let timeout, interval;

    try {
        // Create an active poll in the channel.
        await createMessage(requestDetails, text);

        // Schedule a callback to evaluate the poll results.
        timeout = setTimeout(
            async () => {
                const { participantsCount, participantsList } = await getPollResults(requestDetails);
                const message = parseLunchPollClosedMessage(meal, participantsCount);
                await updateMessage(requestDetails, message);

                if (participantsCount > 0) {
                    await replyToMessage(requestDetails, parseLunchParticipantsMessage(participantsList));
                    await replyToMessage(
                        requestDetails,
                        `*_Don't forget to put money in the jar!_* :monopoly-go-to-jail:`
                    );
                }

                clearInterval(interval);
            },
            POLL_DURATION_MINUTES * 60 * 1000
        );

        // Create a recurring updater to change the message every minute.
        interval = setInterval(async () => {
            remainingMinutes -= 1;

            if (remainingMinutes <= 0) return;

            const message = parseLunchPollActiveMessage(meal, remainingMinutes);
            await updateMessage(requestDetails, message);
        }, 60 * 1000);
    } catch (err) {
        console.error('Error posting poll:', err);
        res.status(500).send();

        // Clean up running timeouts and intervals to avoid memory leaks.
        clearTimeout(timeout);
        clearInterval(interval);
    }
};
