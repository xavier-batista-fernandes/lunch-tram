import { devHandler } from './handlers/dev';

export const handler = async (event: any) => {
    devHandler();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from Lambda!',
            event: event,
            eventParsed: JSON.stringify(event, null, 2),
        }),
    };
};
