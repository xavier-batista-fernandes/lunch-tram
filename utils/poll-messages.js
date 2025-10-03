export function parsePollActiveMessage(options, minutes) {
    let message =
        `Our beloved *Dona Eugénia* :eugenia-is-the-best: is cooking lunch! <!channel>\n\n` +
        `Today there's multiple options:\n\n`;

    options.forEach(({ meal, emoji }, index) => {
        message += `> *${index + 1}.* ${emoji} — \`${meal}\`\n`;
    });

    message +=
        `\nParticipate by reacting with the option's emojis! \n\n` +
        `*This message will implode in ${minutes} minute${minutes > 1 ? 's' : ''}.* :froschi-explosion:`;

    return message;
}

export function parsePollClosedMessage(hasParticipants) {
    if (hasParticipants) {
        const withVotesEndings = [
            '*Dona Eugénia* is already sharpening her knives. 🔪',
            'The kitchen is heating up and *Dona Eugénia* is making her magic. ✨',
            'The aroma is spreading, and *Dona Eugénia* is in full chef mode! 🌱',
            'The chopping board is ready, and *Dona Eugénia* is on fire! 🔥',
            'Apron tied, spoons ready — *Dona Eugénia* is preparing a feast. 🍲',
            'The pots are clinking, and *Dona Eugénia* is stirring with love. 🥘',
            'Whispers in the kitchen say *Dona Eugénia* is crafting something legendary. 👩‍🍳',
        ];
        const variant = withVotesEndings[Math.floor(Math.random() * withVotesEndings.length)];
        return `:info1: *The lunch poll has ended.*\n\n${variant}\n\nSee you soon in the breakfast room! 🍽️`;
    }

    const withoutVotesEndings = [
        'Today the kitchen rests — even magic needs a break. 😴',
        '*Dona Eugénia* is closing the spice jars for now. 🪄',
        'The pots are waiting silently for hungrier days. 🍲',
        '*Dona Eugénia* is saving her energy for another day. 🌙',
        'The kitchen lights dim, but they’ll shine brighter next round. 💡',
        'No clinking forks today, just a quiet dining room. 🍴',
        'The recipe book stays closed, waiting for the next hungry souls. 📖',
    ];
    const variant = withoutVotesEndings[Math.floor(Math.random() * withoutVotesEndings.length)];
    return `:info1: *The lunch poll has ended.*\n\n${variant}\n\nMore lunch options will be available next time! 🍽️`;
}
