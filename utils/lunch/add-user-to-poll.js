export async function addParticipantsToLunch(participantsList, lunchId) {
    try {
        // participants that already exist in the database
        const existingParticipants = await prisma.participant.findMany({
            where: {
                name: {
                    in: participantsList,
                },
            },
        });

        // particpants that do not exist in the database
        const existingNames = new Set(existingParticipants.map((p) => p.name));
        const newParticipants = participantsList.filter((name) => !existingNames.has(name));

        // create new participants
        const createdParticipants = await Promise.all(
            newParticipants.map((name) =>
                prisma.participant.create({
                    data: { name },
                })
            )
        );

        // combine old and new participants
        const allParticipants = [...existingParticipants, ...createdParticipants];

        // verifies if the lunch exists
        const lunchRecord = await prisma.lunch.findUnique({
            where: { id: lunchId },
        });

        if (!lunchRecord) {
            throw new Error('Lunch not found');
        }

        // adds participants to the lunch
        await prisma.lunch.update({
            where: { id: lunchId },
            data: {
                participants: {
                    connect: allParticipants.map((p) => ({ id: p.id })),
                },
            },
        });

        return { success: true, message: 'Participants added to lunch successfully' };
    } catch (error) {
        console.error('Error adding participants to lunch:', error);
        throw new Error('Failed to add participants to lunch');
    }
}

export async function createLunchInDb(meal) {
    prisma.lunch
        .create({ data: { name: meal } })
        .then(() => {
            console.log(`${LOGS_PREFIX} Lunch request saved to the database.`);
        })
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.error(`${LOGS_PREFIX} Database error: ${error.message}`);
            } else {
                console.error(`${LOGS_PREFIX} Unexpected error: ${error}`);
            }
        });
}
