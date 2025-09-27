// TODO: Allow the requester to delete the message if they want to cancel the poll

import { createMessage } from '../utils/slack/create-message.js';
import { updateMessage } from '../utils/slack/update-message.js';
import { replyToMessage } from '../utils/slack/reply-to-message.js';
import { getPollResults } from '../utils/lunch/get-poll-results.js';
import {
    parseLunchParticipantsMessage,
    parseLunchPollActiveMessage,
    parseLunchPollClosedMessage,
} from '../constants/messages.js';
import axios from 'axios';

const LOGS_PREFIX = '\x1b[1;35m[Multiple Meals Lunch]\x1b[0m';
const POLL_DURATION_MINUTES = 10;

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_API_BASE_URL = process.env.SLACK_API_BASE_URL;
const headers = {
    Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
    'Content-Type': 'application/json',
};

export const lunch2Handler = async function (req, res) {
    const request = req.body;
    console.log(
        `\n${LOGS_PREFIX} ${request.user_name} started a multiple meals lunch poll with input: \x1b[32m${request.text}\x1b[0m.`
    );

    console.log(`${LOGS_PREFIX} Request entries:  ${Object.entries(request)}`);

    const numberOfMeals = Number(request.text);
    // Check if the input is a number
    if (Number.isNaN(numberOfMeals)) {
        console.log(`${LOGS_PREFIX} ${request.user_name} provided invalid input.`);
        return res
            .status(200)
            .send('Please specify in the request the *number of meal options*. \nExample: `/lunch 2`');
    }
    // Check if the input is positive
    if (numberOfMeals <= 0) {
        console.log(`${LOGS_PREFIX} ${request.user_name} provided a negative number of meals.`);
        return res.status(200).send('Please specify a valid number of meals (at least 1). \nExample: `/lunch 2`');
    }

    // Request meets the format.
    // Reply to Slack to acknowledge the request and avoid timeout.
    res.status(200).send();

    // Agglomerate the request details.
    const requestDetails = {
        user_name: request.user_name,
        user_id: request.user_id,
        trigger_id: request.trigger_id,
        channel_id: request.channel_id,
        number_of_meals: numberOfMeals,
    };

    const view = {
        type: 'modal',
        title: {
            type: 'plain_text',
            text: 'Multiple Meals Lunch',
        },
        blocks: buildMealBlocks(requestDetails.number_of_meals, requestDetails.user_id),
        submit: {
            type: 'plain_text',
            text: 'Save',
        },
    };
    // Request further information
    const response = await axios.post(
        `${SLACK_API_BASE_URL}/views.open`,
        { view, trigger_id: requestDetails.trigger_id },
        { headers }
    );
    if (!response.data.ok) {
        console.log(`\x1b[1;34m[Multiple Meals Lunch]\x1b[0m Slack error: ${response.data.response_metadata.messages}`);
    }

    // Send a post ephemeral message
    // const response = await axios.post(
    //     `${SLACK_API_BASE_URL}/chat.postEphemeral`,
    //     {
    //         channel: requestDetails.channel_id,
    //         user: requestDetails.user_id,
    //         text: 'this is a post ephemeral message',
    //         icon_emoji: ':chart_with_upwards_trend:',
    //     },
    //     { headers }
    // );
    // if (!response.data.ok) {
    //     console.log(`[replyToMessage] Slack error: ${response.data.response_metadata.messages}`);
    // }

    return;
};

function buildMealBlocks(numberOfMeals, userId) {
    const blocks = [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Hello, <@${userId}>! \n Can you provide details about each meal?`,
            },
        },
        { type: 'divider' },
    ];

    for (let i = 1; i <= numberOfMeals; i++) {
        blocks.push(
            {
                type: 'input',
                block_id: `meal_${i}_description`,
                label: {
                    type: 'plain_text',
                    text: ' ',
                },
                element: {
                    type: 'plain_text_input',
                    action_id: `desc_input_${i}`,
                    placeholder: {
                        type: 'plain_text',
                        text: `Meal ${i} description`,
                    },
                },
            },
            {
                type: 'input',
                block_id: `meal_${i}_emoji`,
                label: {
                    type: 'plain_text',
                    text: ' ',
                },
                element: {
                    type: 'plain_text_input',
                    action_id: `emoji_input_${i}`,
                    placeholder: {
                        type: 'plain_text',
                        text: `Meal ${i} emoji`,
                    },
                },
            }
        );

        if (i < numberOfMeals) {
            blocks.push({ type: 'divider' });
        }
    }

    return blocks;
}
