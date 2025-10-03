export function parseMeals(input) {
    const regex = /^([A-Za-z\s]+)\s+(:[a-zA-Z0-9_+-]+:)$/;
    const options = input.split(',').map((x) => x.trim());

    for (const opt of options) if (!regex.test(opt)) return [];

    return options.map((opt) => {
        const [, meal, emoji] = opt.match(regex);
        return { meal: meal.trim(), emoji };
    });
}

export function getInvalidInputMessage() {
    return (
        ':info1: *Please provide at least one valid meal option.*\n\n' +
        'Each option should be written as \`<meal description> <meal emoji>\`.\n' +
        'Separate multiple options with commas.\n\n' +
        '_*Example*: /dev Spaghetti :spaghetti:, Green Salad :green_salad:, Fruit :grapes:_'
    );
}
