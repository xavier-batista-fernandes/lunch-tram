export const parseLunchPollActiveMessage = (meal, minutes) =>
    `<!channel>\n\n` +
    `Our beloved *Dona Eugénia* :eugenia-is-the-best: is cooking lunch!\n\n` +
    `Today’s meal is *\`${meal}\`*. Are you hungry?\n\n` +
    'React with :knife_fork_plate: to participate!\n\n' +
    `*This poll will self-destruct in ${minutes} minute${minutes > 1 ? 's' : ''}.* :froschi-explosion:`;

export const parseLunchPollClosedMessage = (meal, count) => {
    let message = `*The lunch poll has ended.*\n\n` + `Dona Eugénia said she was making *\`${meal}\`*.\n\n`;
    message += count >= 1 ? `And *\`${count}\`* ${count > 1 ? 'people' : 'person'} showed up hungry. :yum:` : `But no one was hungry. :cryingketnipz:`;
    return message;
};

export const parseLunchParticipantsMessage = (participants) => {
    let message = `*Here\'s who joined the lunch tram:*`;
    participants.forEach((user) => (message += `\n- <@${user}>`));
    return message;
};
