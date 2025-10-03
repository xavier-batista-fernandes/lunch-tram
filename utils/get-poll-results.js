import { getReactions } from './slack/reactions/get-reactions.js';

export async function getPollResults({ channel_id, thread_id, emoji }) {
    const reactions = await getReactions(channel_id, thread_id);

    console.log('[getPollResults] Getting reactions for thread:', thread_id, 'in channel:', channel_id);
    const details = reactions.filter((reaction) => {
        return reaction.name === emoji;
    })[0];

    const participantsCount = details?.count || 0;
    const participantsList = details?.users || [];

    console.log('[getPollResults] Got results:', participantsCount, participantsList);
    return {
        participantsCount,
        participantsList,
    };
}
