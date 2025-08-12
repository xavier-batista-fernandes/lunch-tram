import { getReactions } from '../slack/reactions/get-reactions.js';

export async function getPollResults({ channel_id, thread_id, emoji }) {
    const reactions = await getReactions(channel_id, thread_id);

    console.log(
        `[getPollResults] Reactions for thread ${thread_id} in channel ${channel_id}:`,
        reactions,
    );
    const details = reactions.filter((reaction) => {
        console.log(`[getPollResults] Checking reaction: ${reaction.name} against emoji: ${emoji}`);
        return reaction.name === emoji;
    })[0];
    console.log('[getPollResults] Filtered reactions:', details);

    const participantsCount = details?.count || 0;
    const participantsList = details?.users || [];

    return {
        participantsCount,
        participantsList,
    };
}
