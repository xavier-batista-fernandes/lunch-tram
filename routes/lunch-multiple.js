import { getInvalidInputMessage, parseMeals } from '../utils/parse-meals.js';
import { parsePollActiveMessage, parsePollClosedMessage } from '../utils/poll-messages.js';
import { createMessage } from '../utils/slack/create-message.js';
import { addReaction } from '../utils/slack/reactions/add-reaction.js';
import { getReactions } from '../utils/slack/reactions/get-reactions.js';
import { removeReaction } from '../utils/slack/reactions/remove-reaction.js';
import { replyToMessage } from '../utils/slack/reply-to-message.js';
import { updateMessage } from '../utils/slack/update-message.js';

const LOGS_PREFIX = '\x1b[1;35m[Multiple Meals Lunch]\x1b[0m';
const POLL_DURATION_MINUTES = 10;

export const lunchMultipleHandler = async function (req, res) {
    const request = req.body;
    console.log(
        `\n${LOGS_PREFIX} ${request.user_name} started a multiple meals lunch poll with input: \x1b[32m${request.text}\x1b[0m.`
    );

    const options = parseMeals(request.text);
    if (options.length === 0) return res.status(200).send(getInvalidInputMessage());

    // Acknowledge Slack
    res.status(200).send();

    const requestDetails = {
        user_name: request.user_name,
        user_id: request.user_id,
        trigger_id: request.trigger_id,
        channel_id: request.channel_id,
    };

    // 1. Create poll message
    let remainingMinutes = POLL_DURATION_MINUTES;
    await createMessage(requestDetails, parsePollActiveMessage(options, POLL_DURATION_MINUTES));

    // 2. Add reactions (asynchronously)
    options.forEach(({ emoji }) => addReaction(requestDetails, emoji));
    const messageUpdater = setInterval(async () => {
        remainingMinutes -= 1;
        if (remainingMinutes <= 0) return;
        await updateMessage(requestDetails, parsePollActiveMessage(options, remainingMinutes));
    }, 1000 * 60);

    // 3. Close poll after duration
    setTimeout(
        async () => {
            clearInterval(messageUpdater);

            // Remove reactions (and wait for all of them to complete)
            // Creates an array of Promises and waits for all of them to resolve.
            await Promise.all(options.map(({ emoji }) => removeReaction(requestDetails, emoji)));

            // Get results
            const reactions = await getReactions(requestDetails.channel_id, requestDetails.thread_id);
            const hasParticipants = reactions.length !== 0;

            // Update poll message
            await updateMessage(requestDetails, parsePollClosedMessage(hasParticipants));

            // Build participant summary per meal
            if (!hasParticipants) return;
            let text = '';
            options.forEach(({ meal, emoji }) => {
                const targetReaction = reactions.find((x) => `:${x.name}:` === emoji);
                let reply = '';
                if (!targetReaction) {
                    reply = `:info1: Nobody is hungry for \`${meal}\` ${emoji}.`;
                } else {
                    reply =
                        ':info1: There ' +
                        `${targetReaction.count > 1 ? 'are ' : 'is '}` +
                        `\`${targetReaction.count}\` ` +
                        `${targetReaction.count > 1 ? 'people' : 'person'} hungry for \`${meal}\` ${emoji}:`;

                    targetReaction.users.forEach((user) => {
                        reply += `\n\t- <@${user}>`;
                    });
                }
                reply += '\n\n\n';
                text += reply;
            });

            text += ":monopoly-go-to-jail: *_Don't forget to put money in the jar!_* :monopoly-go-to-jail:";
            replyToMessage(requestDetails, text);
        },
        POLL_DURATION_MINUTES * 60 * 1000
    );
};
